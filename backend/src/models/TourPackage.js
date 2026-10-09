const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 }, slug: { type: String, required: true, lowercase: true, unique: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true, index: true }, type: { type: String, enum: ["domestic", "international"], required: true, index: true },
  summary: { type: String, trim: true, maxlength: 1000 }, description: { type: String, trim: true, maxlength: 20000 },
  durationDays: { type: Number, required: true, min: 1, max: 365 }, price: { type: Number, required: true, min: 0 }, currency: { type: String, default: "INR", uppercase: true, minlength: 3, maxlength: 3 },
  imageUrl: String, gallery: [String], inclusions: [String], exclusions: [String], itinerary: [{ day: { type: Number, min: 1 }, title: String, description: String }],
  featured: { type: Boolean, default: false, index: true }, available: { type: Boolean, default: true, index: true },
  status: { type: String, enum: ["draft", "active", "inactive", "archived"], default: "draft", index: true },
  collaborator: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", index: true },
  b2bPricing: [
    {
      tier: { type: String, enum: ["standard", "silver", "gold", "platinum"], default: "standard" },
      discountPercentage: { type: Number, default: 10, min: 0, max: 100 },
      netPrice: { type: Number, min: 0 },
    }
  ],
}, { timestamps: true });
schema.index({ title: "text", summary: "text", description: "text" }); schema.index({ status: 1, type: 1, featured: 1, createdAt: -1 });
module.exports = mongoose.model("TourPackage", schema);
