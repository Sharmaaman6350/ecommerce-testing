const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    freeDelivery: { type: Boolean, default: false },
    stock: { type: Number, required: true },
   size: {
  type: [String],
  default: ["Free Size"],
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
