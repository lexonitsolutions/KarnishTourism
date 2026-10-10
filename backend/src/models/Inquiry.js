const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, index: true },
    phone: { type: String, required: true },
    service: { type: String, trim: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "TourPackage" },
    travelDate: Date,
    numberOfTravelers: { type: Number, min: 1 },
    message: { type: String, maxlength: 5000 },
    status: {
      type: String,
      enum: ["new", "contacted", "in_progress", "converted", "closed"],
      default: "new",
      index: true,
    },
    collaborator: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    // Business Collaboration extensions
    isCollaboration: { type: Boolean, default: false, index: true },
    companyName: { type: String, trim: true },
    businessType: { type: String, trim: true },
    gstNumber: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    servicesOffered: [{ type: String, trim: true }],
    volume: { type: String, trim: true },
    collaborationTypes: [{ type: String, trim: true }],
    requirements: { type: String, maxlength: 5000 },
    requestId: { type: String, trim: true, index: true },
  },
  { timestamps: true }
);

schema.index({ status: 1, createdAt: -1 });
schema.index({ isCollaboration: 1, createdAt: -1 });

module.exports = mongoose.model("Inquiry", schema);
