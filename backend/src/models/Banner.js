const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    subtitle: { type: String, trim: true, maxlength: 500 },
    badge: { type: String, trim: true, maxlength: 100 },
    imageUrl: { type: String, required: true, trim: true },
    linkUrl: { type: String, default: "/tours" },
    ctaText: { type: String, default: "Explore Journeys" },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive", "draft"], default: "active", index: true },
    featured: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
