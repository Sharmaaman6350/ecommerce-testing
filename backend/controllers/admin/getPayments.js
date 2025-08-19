const Razorpay = require("razorpay");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Fetch all payments for Admin
const getAllPayments = async (req, res) => {
  try {
    // Fetch all payments from Razorpay
    const razorpayPayments = await razorpay.payments.all({});

    // Map payments for admin panel
    const payments = razorpayPayments.items.map((p) => ({
      _id: p.id,
      amount: p.amount / 100, // Convert paise to rupees
      status: p.status === "captured" ? "Success" : "Failed",
      paymentMethod: p.method || "Unknown",
      createdAt: new Date(p.created_at * 1000),
      user: {
        name: p.notes?.name || "Unknown",
        email: p.notes?.email || "Unknown",
      },
    }));

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("Admin payments fetch failed:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch payments",
    });
  }
};

module.exports = { getAllPayments };
