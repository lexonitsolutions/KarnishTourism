const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  milestoneDate: { type: Date, required: true },
  mediaUrl: { type: String, trim: true },
  category: { type: String, default: "Company Milestone", trim: true },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  featured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true, collection: "gallery_milestones" });
module.exports = mongoose.model("GalleryMilestone", schema);
