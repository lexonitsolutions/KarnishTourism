const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Organization = require("../models/Organization");
const RevokedToken = require("../models/RevokedToken");
const { authenticate, createToken, COOKIE_NAME } = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");
const { slugify } = require("../utils/query");

const router = express.Router();
const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  sameSite: isProd ? "none" : "lax",
  secure: isProd,
  maxAge: 8 * 60 * 60 * 1000,
  path: "/",
};

const resolveHome = (role) => {
  if (["admin", "super_admin"].includes(role)) return "/admin";
  if (["collaborator", "b2b"].includes(role)) return "/partner";
  return "/dashboard";
};

const expose = (user) => ({
  id: String(user._id || user.id),
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  status: user.status,
  organization: user.organization,
  collaboratorProfile: user.collaboratorProfile,
});

// Customer Signup (Strictly customer role)
router.post("/signup", requireFields("fullName", "email", "password"), async (req, res, next) => {
  try {
    const name = String(req.body.fullName).trim();
    const email = String(req.body.email).trim().toLowerCase();
    const phone = String(req.body.phone || "").trim() || undefined;
    const password = String(req.body.password);

    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
      return res.status(400).json({ success: false, error: "Enter a valid name, email and password of at least 8 characters" });
    }

    const conditions = [{ email }];
    if (phone) conditions.push({ phone });
    if (await User.exists({ $or: conditions })) {
      return res.status(409).json({ success: false, error: "An account already exists with this email or phone" });
    }

    // Role cannot be tampered with - always forced to 'customer'
    const user = await User.create({
      name,
      email,
      phone,
      passwordHash: await bcrypt.hash(password, 12),
      role: "customer",
      status: "active",
    });

    const token = createToken(user);
    res
      .cookie(COOKIE_NAME, token, cookieOptions)
      .status(201)
      .json({ success: true, user: expose(user), token, redirectTo: "/dashboard" });
  } catch (error) {
    next(error);
  }
});

// Partner Registration Application
router.post(
  "/register-partner",
  requireFields("companyName", "fullName", "email", "phone", "password"),
  async (req, res, next) => {
    try {
      const companyName = String(req.body.companyName).trim();
      const name = String(req.body.fullName).trim();
      const email = String(req.body.email).trim().toLowerCase();
      const phone = String(req.body.phone).trim();
      const password = String(req.body.password);
      const taxId = String(req.body.taxId || "").trim();

      if (companyName.length < 2 || name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
        return res.status(400).json({ success: false, error: "Please enter valid partner and organization details" });
      }

      if (await User.exists({ email })) {
        return res.status(409).json({ success: false, error: "An account with this email already exists" });
      }

      // Check or create organization stub
      let org = await Organization.findOne({
        $or: [{ name: new RegExp(`^${companyName}$`, "i") }, { contactEmail: email }],
      });

      if (!org) {
        const baseSlug = slugify(companyName);
        let orgSlug = baseSlug;
        let c = 1;
        while (await Organization.exists({ slug: orgSlug })) {
          orgSlug = `${baseSlug}-${c++}`;
        }
        org = await Organization.create({
          name: companyName,
          slug: orgSlug,
          contactEmail: email,
          contactPhone: phone,
          taxId,
          commissionRate: 10,
          status: "pending",
        });
      }

      const user = await User.create({
        name,
        email,
        phone,
        passwordHash: await bcrypt.hash(password, 12),
        role: "collaborator",
        status: "active",
        organization: org._id,
        collaboratorProfile: {
          companyName,
          taxId,
          approvalStatus: "pending",
          commissionRate: 10,
          tier: "standard",
        },
      });

      const token = createToken(user);
      res
        .cookie(COOKIE_NAME, token, cookieOptions)
        .status(201)
        .json({ success: true, user: expose(user), token, redirectTo: "/partner" });
    } catch (error) {
      next(error);
    }
  }
);

// Unified Login Route (All roles: Customer, Admin, Partner)
router.post("/login", async (req, res, next) => {
  const identifier = String(req.body.identifier || req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  try {
    if (!identifier || !password) {
      return res.status(400).json({ success: false, error: "Email or phone and password are required" });
    }

    const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] })
      .select("+passwordHash")
      .populate("organization");

    if (!user || user.status !== "active" || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ success: false, error: "Invalid email/phone or password" });
    }

    user.lastLoginAt = new Date();
    await user.save().catch(() => {});

    const redirectTo = resolveHome(user.role);
    const token = createToken(user);
    res
      .cookie(COOKIE_NAME, token, cookieOptions)
      .json({ success: true, user: expose(user), token, redirectTo });
  } catch (error) {
    next(error);
  }
});

// Logout
router.post("/logout", authenticate, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1 && req.auth?.jti) {
      await RevokedToken.create({ jti: req.auth.jti, expiresAt: new Date(req.auth.exp * 1000) }).catch(() => {});
    }
    res.clearCookie(COOKIE_NAME, { path: "/" });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Current User Verification
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("organization").lean();
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({
      success: true,
      user: expose(user),
      redirectTo: resolveHome(user.role),
    });
  } catch (_e) {
    res.json({ success: true, user: req.user, redirectTo: resolveHome(req.user.role) });
  }
});

module.exports = { authRouter: router, resolveHome };
