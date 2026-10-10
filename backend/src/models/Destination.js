const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 }, slug: { type: String, required: true, lowercase: true, unique: true },
  country: { type: String, required: true, trim: true }, type: { type: String, enum: ["domestic", "international"], required: true, index: true },
  description: { type: String, trim: true, maxlength: 10000 }, imageUrl: String, gallery: [String], featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ["draft", "active", "inactive"], default: "draft", index: true },
}, { timestamps: true });
schema.index({ title: "text", country: "text", description: "text" });
module.exports = mongoose.model("Destination", schema);
