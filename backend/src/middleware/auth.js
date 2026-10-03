const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const User = require("../models/User");
const RevokedToken = require("../models/RevokedToken");
const { can } = require("../permissions/roles");
const COOKIE_NAME = "karnish_session";
const cookies = (header = "") => Object.fromEntries(header.split(";").map((part) => part.trim().split("=")).filter(([key]) => key));

async function authenticate(req, res, next) {
  try {
    if (!process.env.JWT_SECRET) return res.status(503).json({ success: false, error: "Authentication is not configured" });
    const token = cookies(req.headers.cookie)[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer\s+/i, "");
    if (!token) return res.status(401).json({ success: false, error: "Authentication required" });
    const payload = jwt.verify(token, process.env.JWT_SECRET, { issuer: "karnish-api", audience: "karnish-web" });

    // Immediate fast path for administrator
    if (["admin", "super_admin"].includes(payload.role)) {
      req.user = {
        id: payload.sub,
        name: "Karnish Administrator",
        email: process.env.ADMIN_EMAIL || "admin@karnishtourism.com",
        role: payload.role,
        status: "active"
      };
      req.auth = payload;
      return next();
    }

    if (mongoose.connection.readyState === 1) {
      if (await RevokedToken.exists({ jti: payload.jti })) return res.status(401).json({ success: false, error: "Session expired" });
      const user = await User.findById(payload.sub).lean();
      if (!user || user.status !== "active") return res.status(403).json({ success: false, error: "Account is not active" });
      req.user = { id: String(user._id), name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status };
    } else {
      req.user = { id: payload.sub, name: "Authenticated User", role: payload.role, status: "active" };
    }

    req.auth = payload;
    next();
  } catch (_error) {
    res.status(401).json({ success: false, error: "Invalid or expired session" });
  }
}

const optionalAuthenticate = (req, res, next) => Boolean(cookies(req.headers.cookie)[COOKIE_NAME] || req.headers.authorization) ? authenticate(req, res, next) : next();
const allowRoles = (...roles) => (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ success: false, error: "Insufficient permissions" });
const authorize = (resource, action) => (req, res, next) => can(req.user?.role, resource || req.params.resource, action) ? next() : res.status(403).json({ success: false, error: "Insufficient permissions" });
const createToken = (user) => jwt.sign({ sub: String(user._id || user.id), role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h", jwtid: randomUUID(), issuer: "karnish-api", audience: "karnish-web" });

module.exports = { authenticate, optionalAuthenticate, allowRoles, authorize, createToken, COOKIE_NAME };
