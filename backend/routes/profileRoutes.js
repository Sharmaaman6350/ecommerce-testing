const express = require("express");
const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/user/profileController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyToken, getProfile);

router.put("/updateProfile", verifyToken, updateProfile);

router.put("/changePassword", verifyToken, changePassword);

module.exports = router;
