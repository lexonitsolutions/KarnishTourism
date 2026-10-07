const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const RevokedToken = require("../models/RevokedToken");
const { authenticate, createToken, COOKIE_NAME } = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");
const router = express.Router();
const cookieOptions = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 8 * 60 * 60 * 1000, path: "/" };
const expose = (user) => ({ id: String(user._id || user.id), name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status });

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
    const user = await User.create({ name, email, phone, passwordHash: await bcrypt.hash(password, 12), role: "customer" });
    res.cookie(COOKIE_NAME, createToken(user), cookieOptions).status(201).json({ success: true, user: expose(user), redirectTo: "/dashboard" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const identifier = String(req.body.identifier || req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  try {
    if (!identifier || !password) {
      return res.status(400).json({ success: false, error: "Email or phone and password are required" });
    }

    const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] }).select("+passwordHash");
    if (!user || user.status !== "active" || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ success: false, error: "Invalid email/phone or password" });
    }

    user.lastLoginAt = new Date();
    await user.save().catch(() => {});
    const redirectTo = ["b2b", "collaborator"].includes(user.role) ? "/b2b/dashboard" : "/dashboard";
    res.cookie(COOKIE_NAME, createToken(user), cookieOptions).json({ success: true, user: expose(user), redirectTo });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authenticate, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await RevokedToken.create({ jti: req.auth.jti, expiresAt: new Date(req.auth.exp * 1000) }).catch(() => {});
    }
    res.clearCookie(COOKIE_NAME, { path: "/" });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/me", authenticate, (req, res) => res.json({ success: true, user: req.user }));

module.exports = { authRouter: router };
