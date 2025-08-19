// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const Order = require("../../models/order");
// const mongoose = require("mongoose");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ✅ 1. Create Razorpay Order
// const createOrder = async (req, res) => {
//   try {
//     const { amount, currency = "INR", receipt } = req.body;

//     if (!amount || !receipt) {
//       return res.status(400).json({
//         success: false,
//         message: "Amount and receipt are required",
//       });
//     }

//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt,
//     };

//     const order = await razorpay.orders.create(options);

//     return res.status(201).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     console.error("Razorpay Order Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Order creation failed",
//     });
//   }
// };

// // ✅ 2. Verify Razorpay Payment & Save Order
// // const verifyOrder = async (req, res) => {
// //   try {
// //     const {
// //       razorpay_order_id,
// //       razorpay_payment_id,
// //       razorpay_signature,
// //       userId,
// //       items,
// //       totalAmount,
// //       shippingAddress,
// //     } = req.body;

// //     if (
// //       !razorpay_order_id ||
// //       !razorpay_payment_id ||
// //       !razorpay_signature ||
// //       !userId ||
// //       !items ||
// //       !totalAmount ||
// //       !shippingAddress
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Missing required fields",
// //       });
// //     }

// //     const formattedShippingAddress = {
// //       name: shippingAddress.name,
// //       phone: shippingAddress.phone,
// //       address: `${shippingAddress.house}, ${shippingAddress.road}`,
// //       city: shippingAddress.city,
// //       pincode: shippingAddress.pincode,
// //       state: shippingAddress.state,
// //     };

// //     const newOrder = new Order({
// //       user: userId,
// //       items,
// //       shippingAddress: formattedShippingAddress,
// //       totalAmount,
// //       status: "Pending",
// //       paymentMethod: "Razorpay",
// //       razorpayOrderId: razorpay_order_id,
// //       razorpayPaymentId: razorpay_payment_id,
// //     });

// //     const savedOrder = await newOrder.save();

// //     res.status(201).json({
// //       success: true,
// //       message: "Payment verified & order placed",
// //       order: savedOrder,
// //     });
// //   } catch (error) {
// //     console.error("Payment verification failed:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Payment verification failed",
// //     });
// //   }
// // };

// const verifyOrder = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       items,
//       totalAmount,
//       shippingAddress,
//       userId: bodyUserId
//     } = req.body;

//     // Check required fields
//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !items?.length ||
//       !totalAmount ||
//       !shippingAddress
//     ) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     // Verify signature
//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid payment signature" });
//     }

//     // Get and validate userId (check _id, id, and bodyUserId)
//     let userId = req.user?._id || req.user?.id || bodyUserId;
//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User ID is missing" });
//     }
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid User ID format" });
//     }

//     // Format address
//     const formattedShippingAddress = {
//       name: shippingAddress.name,
//       phone: shippingAddress.contact || shippingAddress.phone,
//       address: `${shippingAddress.house}, ${shippingAddress.road}`,
//       city: shippingAddress.city,
//       pincode: shippingAddress.pincode,
//       state: shippingAddress.state,
//       landmark: shippingAddress.landmark || ""
//     };

//     // Save order
//   const newOrder = new Order({
//   user: new mongoose.Types.ObjectId(userId),
//   items,
//   totalAmount,
//   status: "Placed",
//   shippingAddress: formattedShippingAddress,
//   paymentMethod: "Razorpay",
//   // Root-level fields for UI
//   razorpayOrderId: razorpay_order_id,
//   razorpayPaymentId: razorpay_payment_id,
//   // Nested payment info for reference/audit
//   paymentInfo: {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     paymentMethod: "Razorpay",
//   },
// });

//     const savedOrder = await newOrder.save();

//     res.status(201).json({
//       success: true,
//       message: "Payment verified & order placed",
//       order: savedOrder
//     });

//   } catch (error) {
//     console.error("Payment verification failed:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ 3. Get User Orders
// const getMyOrders = async (req, res) => {
//   try {
//     const userId = req.user?._id || req.user?.id;
//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User ID missing in token" });
//     }

//     const orders = await Order.find({ user: new mongoose.Types.ObjectId(userId) })
//       .sort({ createdAt: -1 })
//       .populate("items.productId");

//     return res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error("Unable to fetch orders", error);
//     return res.status(500).json({
//       success: false,
//       message: "Unable to fetch orders",
//     });
//   }
// };
// module.exports = {
//   createOrder,
//   verifyOrder,
//   getMyOrders,
// };

const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../../models/order");
const mongoose = require("mongoose");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1️⃣ Create Razorpay Order
const User = require("../../models/user");

const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body; // ✅ Add this line

    if (!amount || !receipt)
      return res.status(400).json({ success: false, message: "Amount and receipt are required" });

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const options = {
      amount: amount * 100, // ✅ amount now defined
      currency,
      receipt,
      notes: {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };

    const order = await razorpay.orders.create(options);
    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return res.status(500).json({ success: false, message: "Order creation failed" });
  }
};



// 2️⃣ Verify Razorpay Payment & Save Order
const verifyOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      totalAmount,
      shippingAddress,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !items?.length ||
      !totalAmount ||
      !shippingAddress
    )
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature)
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });

    // Fetch payment details from Razorpay to get accurate method/status/user
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (!payment)
      return res
        .status(404)
        .json({ success: false, message: "Payment not found on Razorpay" });

    const formattedShippingAddress = {
      name: shippingAddress.name,
      phone: shippingAddress.contact || shippingAddress.phone,
      address: `${shippingAddress.house}, ${shippingAddress.road}`,
      city: shippingAddress.city,
      pincode: shippingAddress.pincode,
      state: shippingAddress.state,
      landmark: shippingAddress.landmark || "",
    };

    const newOrder = new Order({
      user: new mongoose.Types.ObjectId(payment.notes?.userId),
      items,
      totalAmount: payment.amount / 100,
      status: payment.status === "captured" ? "Placed" : "Failed",
      shippingAddress: formattedShippingAddress,
      paymentMethod: payment.method || "Unknown",
      razorpayOrderId: payment.order_id,
      razorpayPaymentId: payment.id,
      paymentInfo: payment,
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Payment verified & order placed",
        order: savedOrder,
      });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3️⃣ Get User Orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "User ID missing in token" });

    const orders = await Order.find({
      user: new mongoose.Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .populate("items.productId");

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Unable to fetch orders", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch orders" });
  }
};

module.exports = { createOrder, verifyOrder, getMyOrders };
