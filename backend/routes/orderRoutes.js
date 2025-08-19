const express = require("express");

const router = express.Router();
const {
  createOrder,
  verifyOrder,

  getMyOrders,
} = require("../controllers/user/orderController.js");

const { verifyToken, isAdmin } = require("../middleware/auth.js");
const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/admin/getAllOrders.js");
const { getAllPayments } = require("../controllers/admin/getPayments.js");
router.post("/create", verifyToken, createOrder);
router.post("/verify", verifyToken, verifyOrder);

router.get("/myOrders", verifyToken, getMyOrders);
router.get("/admin/allOrders", verifyToken, isAdmin, getAllOrders);
router.put(
  "/admin/statusUpdate/:orderId",
  verifyToken,
  isAdmin,
  updateOrderStatus
);

router.get("/admin/allPayments", verifyToken, isAdmin, getAllPayments);

module.exports = router;
