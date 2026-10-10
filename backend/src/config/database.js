const mongoose = require("mongoose");
mongoose.set("sanitizeFilter", true);
mongoose.set("strictQuery", true);

async function connectDatabase() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
  mongoose.connection.on("error", (error) => console.error("[Database] MongoDB error:", error.message));
  mongoose.connection.on("disconnected", () => console.warn("[Database] MongoDB disconnected"));
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME || "karnish_tourism",
    serverSelectionTimeoutMS: 10000,
  });
  console.log("[Database] MongoDB connected");
  return mongoose.connection;
}

const disconnectDatabase = () => mongoose.disconnect();
module.exports = { connectDatabase, disconnectDatabase };
