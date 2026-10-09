require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDatabase, disconnectDatabase } = require("./config/database");
const { authRouter } = require("./routes/auth");
const publicRouter = require("./routes/public");
const resourceRouter = require("./routes/resources");
const bookingRouter = require("./routes/bookings");
const inquiryRouter = require("./routes/inquiries");
const collaboratorRouter = require("./routes/collaborators");
const adminRouter = require("./routes/admin");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000").split(",").map((value) => value.trim()).filter(Boolean);
app.disable("x-powered-by");
app.use(cors({ credentials: true, origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); const error = new Error("Origin not allowed"); error.status = 403; callback(error); } }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.get("/", (_req, res) => res.json({ success: true, service: "Karnish Tourism Backend API" }));
app.get("/api/health", (_req, res) => { const connected = mongoose.connection.readyState === 1; res.status(connected ? 200 : 503).json({ success: connected, database: connected ? "connected" : "disconnected" }); });
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/catalog", publicRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/collaborators", collaboratorRouter);
app.use("/api", resourceRouter);
app.use(notFound);
app.use(errorHandler);

const { ensureDestinations } = require("./services/catalogSeed");
const { seedTestAccounts } = require("./services/seedUsers");

let server;
async function start() {
  server = app.listen(port, () => console.log(`[Backend] Server listening on port ${port}`));
  try {
    await connectDatabase();
    await ensureDestinations();
    await seedTestAccounts();
  } catch (error) {
    console.warn("[Backend] Database initial connect warning:", error.message);
  }

  // Permanent watchdog to keep connection alive and auto-reconnect if Atlas drops
  setInterval(async () => {
    if (mongoose.connection.readyState !== 1) {
      try {
        await connectDatabase();
        await ensureDestinations();
      } catch (_) {}
    }
  }, 10000);
}
async function shutdown(signal) { console.log(`[Backend] ${signal} received; shutting down`); if (server) await new Promise((resolve) => server.close(resolve)); await disconnectDatabase(); process.exit(0); }
process.on("SIGINT", () => shutdown("SIGINT")); process.on("SIGTERM", () => shutdown("SIGTERM"));
if (require.main === module) start().catch((error) => { console.error("[Backend] Startup failed:", error.message); process.exitCode = 1; });
module.exports = { app, start };
