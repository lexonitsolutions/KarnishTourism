const express = require("express");
const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const { get, run } = require("../config/database");
const { authenticate, createToken, COOKIE_NAME } = require("../middleware/auth");
const router = express.Router();

const publicUser = (user) => ({ id: user.id, name: user.full_name, email: user.email, phone: user.phone, role: user.role, status: user.status });
const cookieOptions = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 8 * 60 * 60 * 1000, path: "/" };

router.post("/signup", async (req, res, next) => {
  try {
    const fullName = String(req.body.fullName || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const phone = String(req.body.phone || "").trim() || null;
    const password = String(req.body.password || "");
    if (fullName.length < 2 || !email.includes("@") || password.length < 8) return res.status(400).json({ error: "Enter a valid name, email and password of at least 8 characters" });
    if (await get("SELECT id FROM profiles WHERE email = ? OR (? IS NOT NULL AND phone = ?)", [email, phone, phone])) return res.status(409).json({ error: "An account already exists with this email or phone" });
    const id = randomUUID(), timestamp = new Date().toISOString();
    await run("INSERT INTO profiles(id,full_name,email,phone,password_hash,role,status,created_at,updated_at) VALUES(?,?,?,?,?,'customer','active',?,?)", [id, fullName, email, phone, await bcrypt.hash(password, 12), timestamp, timestamp]);
    const user = await get("SELECT * FROM profiles WHERE id = ?", [id]);
    res.cookie(COOKIE_NAME, createToken(user), cookieOptions).status(201).json({ user: publicUser(user), redirectTo: "/dashboard" });
  } catch (error) { next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const identifier = String(req.body.identifier || req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!identifier || !password) return res.status(400).json({ error: "Email or phone and password are required" });
    const user = await get("SELECT * FROM profiles WHERE lower(email) = ? OR phone = ?", [identifier, identifier]);
    if (!user || user.status !== "active" || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: "Invalid email/phone or password" });
    await run("UPDATE profiles SET last_login = ?,updated_at = ? WHERE id = ?", [new Date().toISOString(), new Date().toISOString(), user.id]);
    const redirectTo = ["admin","super_admin"].includes(user.role) ? "/admin/dashboard" : ["b2b","collaborator"].includes(user.role) ? "/b2b/dashboard" : "/dashboard";
    res.cookie(COOKIE_NAME, createToken(user), cookieOptions).json({ user: publicUser(user), redirectTo });
  } catch (error) { next(error); }
});

router.post("/logout", authenticate, async (req, res, next) => { try { await run("INSERT OR IGNORE INTO revoked_tokens(token_id,expires_at) VALUES(?,?)", [req.auth.jti, new Date(req.auth.exp * 1000).toISOString()]); res.clearCookie(COOKIE_NAME, { path: "/" }); res.json({ ok: true }); } catch (error) { next(error); } });
router.get("/me", authenticate, (req, res) => res.json({ user: req.user }));

async function ensureAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@karnishtourism.com").toLowerCase();
  const existing = await get("SELECT id FROM profiles WHERE email = ?", [email]);
  if (existing) return;
  const password = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? null : "Karnish@123");
  if (!password) return console.warn("[Backend] ADMIN_PASSWORD is required to create the first admin");
  const legacy = await get("SELECT id FROM admin_users WHERE email = ?", [email]);
  const id = legacy?.id || randomUUID(), timestamp = new Date().toISOString(), hash = await bcrypt.hash(password, 12);
  await run("INSERT INTO profiles(id,full_name,email,password_hash,role,status,created_at,updated_at) VALUES(?,?,?,?,?,'active',?,?)", [id,"Karnish Administrator",email,hash,"super_admin",timestamp,timestamp]);
  await run("INSERT OR IGNORE INTO admin_users(id,name,email,password_hash,role,status,created_at) VALUES(?,?,?,?,?,'Active',?)", [id,"Karnish Administrator",email,hash,"Super Admin",timestamp]);
  console.log(`[Backend] Initial administrator created: ${email}`);
}
module.exports = { authRouter: router, ensureAdmin };
