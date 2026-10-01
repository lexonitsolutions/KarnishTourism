require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./config/database");
const { seedStarterCatalog } = require("./config/starterCatalog");
const { authRouter, ensureAdmin } = require("./routes/auth");
const adminRouter = require("./routes/admin");
const publicRouter = require("./routes/public");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000").split(",").map((value) => value.trim());

app.disable("x-powered-by");
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); callback(new Error("Origin not allowed")); }, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.get("/", (req, res) => res.json({ status: "ok", service: "Karnish Tourism Backend API" }));
app.get("/api/health", (req, res) => res.json({ status: "ok", service: "Karnish Tourism Backend API", timestamp: new Date().toISOString(), uptime: process.uptime() }));
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/catalog", publicRouter);
app.use("/api", (req, res) => res.status(404).json({ error: "Not Found", path: req.path }));
app.use((error, req, res, next) => { console.error(error); res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal server error" : error.message }); });

initializeDatabase()
  .then(seedStarterCatalog)
  .then(ensureAdmin)
  .then(() => app.listen(PORT, () => console.log(`[Backend] Server listening on http://localhost:${PORT}`)))
  .catch((error) => { console.error("[Backend] Startup failed", error); process.exitCode = 1; });
