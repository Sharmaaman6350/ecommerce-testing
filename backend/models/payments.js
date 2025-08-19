const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    razorpayPaymentId: { type: String, required: true, unique: true },
    razorpayOrderId: { type: String, required: true },
    amount: { type: Number, required: true }, // amount in rupees
    status: { type: String, enum: ["Success", "Failed"], required: true },
    paymentMethod: { type: String, required: true }, // e.g., 'card', 'upi', 'netbanking'
    createdAt: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: { type: Object, default: {} }, // store extra info like name/email if needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
