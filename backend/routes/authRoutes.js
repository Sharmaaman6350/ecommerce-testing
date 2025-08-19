// const express = require("express");
// const {
//   login,
//   register,
//   getAllUsers,
// } = require("../controllers/authController.js");
// const {
//   validateRegister,
//   validateLogin,
// } = require("../middleware/ValidatorUser.js");
// const { verifyToken, isAdmin } = require("../middleware/auth.js");

// const router = express.Router();

// router.post("/register", validateRegister, register);
// router.post("/login", validateLogin, login);
// router.get("/users", verifyToken, isAdmin, getAllUsers);

// module.exports = router;

const express = require("express");
const {
  login,
  register,
  getAllUsers,
  googleLogin, // <-- Import this from your controller
} = require("../controllers/authController.js");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/ValidatorUser.js");
const { verifyToken, isAdmin } = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/users", verifyToken, isAdmin, getAllUsers);

// ✅ Add this Google login route
router.post("/google", googleLogin);

module.exports = router;
