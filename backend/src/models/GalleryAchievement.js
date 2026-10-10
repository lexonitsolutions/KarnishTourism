const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  mediaUrl: { type: String, trim: true },
  category: { type: String, default: "Awards and Recognitions", trim: true },
  year: { type: Number, min: 1900, max: 2200 },
  issuingOrganization: { type: String, required: true, trim: true },
  verificationUrl: { type: String, trim: true },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  featured: { type: Boolean, default: false, index: true },
  featureOnHome: { type: Boolean, default: false },
  featureOnAbout: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true, collection: "gallery_achievements" });
module.exports = mongoose.model("GalleryAchievement", schema);
