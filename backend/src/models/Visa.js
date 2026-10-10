const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema(
  {
    country: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    region: { type: String, trim: true, default: "International" },
    flag: { type: String, trim: true },
    imageUrl: { type: String, default: "/images/destination-01.jpg" },
    badge: { type: String, trim: true },
    tagline: { type: String, trim: true },
    startingPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR", uppercase: true },
    processingTime: { type: String, default: "3 – 5 Days" },
    validity: { type: String, default: "60 Days" },
    stayPeriod: { type: String, default: "30 Days" },
    entryType: { type: String, default: "Single Entry" },
    approvalRate: { type: String, default: "99.5%" },
    expressAvailable: { type: Boolean, default: false },
    expressTime: { type: String },
    types: [
      {
        id: String,
        name: String,
        validity: String,
        stay: String,
        fee: Number,
        expressFee: Number,
        description: String,
      },
    ],
    requirements: [String],
    documentsNeeded: [String],
    status: {
      type: String,
      enum: ["draft", "active", "inactive"],
      default: "active",
      index: true,
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

visaSchema.index({ country: "text", title: "text" });

module.exports = mongoose.model("Visa", visaSchema);
