// const express = require("express");

// const {
//   CreateProduct,
//   DeleteProducts,
//   GetProducts,
//   UpdateProducts,
// } = require("../controllers/ProductsController.js");

// const router = express.Router();

// // ✅ CREATE Product
// router.post("/add", CreateProduct);

// // ✅ GET all Products
// router.get("/get", GetProducts);

// // ✅ UPDATE Product
// router.put("/update/:id", UpdateProducts);

// // ✅ DELETE Product
// router.delete("/delete/:id", DeleteProducts);

// module.exports = router;

const express = require("express");

const {
  CreateProduct,
  DeleteProducts,
  GetProducts,
  UpdateProducts,
} = require("../controllers/ProductsController.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

// ✅ CREATE Product
router.post("/add", upload.single("image"), CreateProduct);

// ✅ GET all Products
router.get("/get", GetProducts);

// ✅ UPDATE Product
router.put("/update/:id", upload.single("image"), UpdateProducts);

// ✅ DELETE Product
router.delete("/delete/:id", DeleteProducts);

module.exports = router;
