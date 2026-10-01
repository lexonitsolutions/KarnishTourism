const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const { get } = require("../config/database");
const { can } = require("../permissions/roles");
const COOKIE_NAME = "karnish_session";
const SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === "production" ? "" : "development-only-change-me");
const parseCookies = (header = "") => Object.fromEntries(header.split(";").map((part) => part.trim().split("=")).filter(([key]) => key));
async function authenticate(req, res, next) { try { if (!SECRET) return res.status(503).json({ error: "JWT_SECRET is not configured" }); const token = parseCookies(req.headers.cookie)[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer /, ""); if (!token) return res.status(401).json({ error: "Authentication required" }); const payload = jwt.verify(token, SECRET); if (await get("SELECT token_id FROM revoked_tokens WHERE token_id = ?", [payload.jti])) return res.status(401).json({ error: "Session expired" }); const profile = await get("SELECT id,full_name,email,phone,role,status FROM profiles WHERE id = ?", [payload.sub]); if (!profile || profile.status !== "active") return res.status(403).json({ error: "Account is not active" }); req.user = { ...profile, name: profile.full_name }; req.auth = payload; next(); } catch { res.status(401).json({ error: "Invalid or expired session" }); } }
const authorize = (resource, action) => (req, res, next) => can(req.user.role, resource || req.params.resource, action) ? next() : res.status(403).json({ error: `Missing permission: ${action} ${resource || req.params.resource}` });
const createToken = (user) => jwt.sign({ sub: user.id, role: user.role }, SECRET, { expiresIn: "8h", jwtid: randomUUID(), issuer: "karnish-api", audience: "karnish-admin" });
module.exports = { authenticate, authorize, createToken, COOKIE_NAME };
