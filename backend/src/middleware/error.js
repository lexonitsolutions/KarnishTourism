const mongoose = require("mongoose");
function notFound(req, res) { res.status(404).json({ success: false, error: "Not found", path: req.originalUrl }); }
function errorHandler(error, req, res, _next) {
  let status = error.status || 500; let message = error.message || "Internal server error";
  if (error instanceof mongoose.Error.CastError) { status = 400; message = `Invalid ${error.path}`; }
  if (error instanceof mongoose.Error.ValidationError) { status = 400; message = Object.values(error.errors).map((item) => item.message).join(", "); }
  if (error?.code === 11000) { status = 409; message = `A record with that ${Object.keys(error.keyPattern || {})[0] || "value"} already exists`; }
  if (status >= 500) console.error(`[API] ${req.method} ${req.originalUrl}:`, error.message);
  res.status(status).json({ success: false, error: status >= 500 && process.env.NODE_ENV === "production" ? "Internal server error" : message });
}
module.exports = { notFound, errorHandler };
