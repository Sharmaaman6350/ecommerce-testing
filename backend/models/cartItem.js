const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  selectedSize: {
    type: String, // e.g., "M", "L"
    required: true,
  },
});

module.exports = cartItemSchema;
