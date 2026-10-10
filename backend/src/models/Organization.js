const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, required: true, lowercase: true, unique: true, index: true },
    type: {
      type: String,
      enum: ["travel_agency", "dmc", "hotel_partner", "affiliate", "corporate"],
      default: "travel_agency",
      index: true,
    },
    contactEmail: { type: String, required: true, trim: true, lowercase: true, index: true },
    contactPhone: { type: String, trim: true },
    taxId: { type: String, trim: true },
    website: { type: String, trim: true },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
      zipCode: { type: String, trim: true },
    },
    commissionRate: { type: Number, default: 10, min: 0, max: 100 },
    tier: {
      type: String,
      enum: ["standard", "silver", "gold", "platinum"],
      default: "standard",
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "suspended", "inactive"],
      default: "pending",
      index: true,
    },
    customPricingEnabled: { type: Boolean, default: true },
    contractStartDate: Date,
    contractEndDate: Date,
    notes: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

organizationSchema.index({ name: "text", contactEmail: "text" });

module.exports = mongoose.model("Organization", organizationSchema);
