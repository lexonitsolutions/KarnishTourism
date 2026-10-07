const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true, maxlength: 254 },
  phone: { type: String, trim: true, sparse: true, unique: true, maxlength: 30 },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["customer", "collaborator", "b2b"], default: "customer", index: true },
  status: { type: String, enum: ["active", "inactive", "suspended", "pending"], default: "active", index: true },
  collaboratorProfile: { companyName: { type: String, trim: true }, assignedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "TourPackage" }] },
  lastLoginAt: Date,
}, { timestamps: true, toJSON: { transform: (_doc, value) => { delete value.passwordHash; delete value.__v; return value; } } });
module.exports = mongoose.model("User", schema);
