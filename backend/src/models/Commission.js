const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema(
  {
    collaborator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", index: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    bookingAmount: { type: Number, required: true, min: 0 },
    commissionRate: { type: Number, required: true, min: 0, max: 100 },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR", uppercase: true },
    status: {
      type: String,
      enum: ["pending", "approved", "paid", "cancelled"],
      default: "pending",
      index: true,
    },
    paidAt: Date,
    transactionReference: { type: String, trim: true },
    invoiceNumber: { type: String, trim: true, index: true },
    notes: { type: String, maxlength: 1000 },
  },
  { timestamps: true }
);

commissionSchema.index({ collaborator: 1, status: 1, createdAt: -1 });
commissionSchema.index({ organization: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model("Commission", commissionSchema);
