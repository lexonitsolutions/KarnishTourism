const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true, index: true }, user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, package: { type: mongoose.Schema.Types.ObjectId, ref: "TourPackage", required: true, index: true },
  travelDate: { type: Date, required: true, index: true }, numberOfTravelers: { type: Number, required: true, min: 1, max: 100 }, adultCount: { type: Number, required: true, min: 1 }, childCount: { type: Number, default: 0, min: 0 },
  contactInformation: { name: { type: String, required: true }, email: { type: String, required: true, lowercase: true }, phone: { type: String, required: true } }, totalAmount: { type: Number, required: true, min: 0 }, currency: { type: String, default: "INR", uppercase: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded", "partially_refunded"], default: "pending", index: true }, bookingStatus: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending", index: true }, specialRequests: { type: String, maxlength: 2000 }, collaborator: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
}, { timestamps: true });
schema.index({ user: 1, createdAt: -1 }); module.exports = mongoose.model("Booking", schema);
