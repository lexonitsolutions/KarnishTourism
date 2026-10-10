const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  key: { type: String, default: "primary", unique: true },
  heroTitle: { type: String, default: "Our Journey in Frames", trim: true },
  heroSubtitle: { type: String, default: "Explore unforgettable memories, remarkable milestones, and beautiful destinations with Karnish Tourism.", trim: true },
  heroImage: { type: String, trim: true },
  visibleCategories: [{ type: String, trim: true }],
  sectionVisibility: { photos: { type: Boolean, default: true }, achievements: { type: Boolean, default: true }, memories: { type: Boolean, default: true }, milestones: { type: Boolean, default: true }, videos: { type: Boolean, default: true } },
  showHomePreview: { type: Boolean, default: true },
  showAboutPreview: { type: Boolean, default: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true, collection: "gallery_settings" });
module.exports = mongoose.model("GallerySettings", schema);
