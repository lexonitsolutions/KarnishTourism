const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  description: { type: String, required: true, trim: true, maxlength: 4000 },
  destination: { type: String, required: true, trim: true },
  travelDate: Date,
  mediaUrls: [{ type: String, trim: true }],
  testimonial: { type: String, trim: true, maxlength: 1200 },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  featured: { type: Boolean, default: false, index: true },
  displayOrder: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true, collection: "gallery_memories" });
module.exports = mongoose.model("GalleryMemory", schema);
