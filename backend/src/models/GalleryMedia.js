const mongoose = require("mongoose");

const galleryMediaSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, maxlength: 1200 },
  mediaUrl: { type: String, required: true, trim: true },
  thumbnailUrl: { type: String, trim: true },
  mediaType: { type: String, enum: ["image", "video"], default: "image" },
  category: { type: String, required: true, trim: true },
  destination: { type: String, trim: true },
  eventDate: Date,
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  featured: { type: Boolean, default: false, index: true },
  displayOrder: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true, collection: "gallery_media" });

module.exports = mongoose.model("GalleryMedia", galleryMediaSchema);
