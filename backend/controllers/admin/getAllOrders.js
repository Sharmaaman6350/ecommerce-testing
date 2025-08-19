// controllers/orderController.js
const Order = require("../../models/order.js");

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email phone"); // populate user info
    res.json({ orders });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params; // can be MongoDB _id or Razorpay order ID
    const { status } = req.body;

    // Validate status
    if (
      !["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Attempt to find by _id first, then by razorpayOrderId
    let order = null;

    if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
      // looks like a MongoDB ObjectId
      order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    }

    if (!order) {
      // try updating by razorpayOrderId
      order = await Order.findOneAndUpdate(
        { razorpayOrderId: orderId },
        { status },
        { new: true }
      );
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update order status", error: err.message });
  }
};

module.exports = { getAllOrders, updateOrderStatus };
