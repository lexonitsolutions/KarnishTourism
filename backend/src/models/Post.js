const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 220 },
  slug: { type: String, required: true, lowercase: true, unique: true },
  category: { type: String, trim: true, index: true },
  summary: { type: String, trim: true, maxlength: 500 },
  content: { type: String, trim: true },
  imageUrl: String,
  author: { type: String, trim: true, default: "Karnish Tourism" },
  publishedAt: { type: Date, default: Date.now, index: true },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
}, { timestamps: true });
schema.index({ title: "text", summary: "text", content: "text" });
schema.index({ status: 1, featured: 1, publishedAt: -1 });
module.exports = mongoose.model("Post", schema);
