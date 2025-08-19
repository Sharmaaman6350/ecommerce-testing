// const Product = require("../models/Products.js");

// // Create a new product
// const CreateProduct = async (req, res) => {
//   try {
//     const {
//       title,
//       image,
//       price,
//       category,
//       subcategory,
//       type,
//       description,
//       stock,
//       freeDelivery,
//       size, // ✅ Include size from request
//     } = req.body;

//     // Validate required fields
//     if (
//       !title ||
//       !image ||
//       !price ||
//       !category ||
//       !subcategory ||
//       !type ||
//       stock == null
//     ) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const product = new Product({
//       title,
//       image,
//       price,
//       category,
//       subcategory,
//       type,
//       description,
//       stock,
//       freeDelivery,
//       size: Array.isArray(size) && size.length > 0 ? size : ["Free Size"], // ✅ Fallback to default
//     });

//     await product.save();
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all products
// const GetProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update product by ID
// const UpdateProducts = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.body,
//         size:
//           Array.isArray(req.body.size) && req.body.size.length > 0
//             ? req.body.size
//             : ["Free Size"],
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json({ success: true, product: updated });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // Delete product by ID
// const DeleteProducts = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);

//     if (!deleted) return res.status(404).json({ message: "Product not found" });

//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// module.exports = {
//   CreateProduct,
//   GetProducts,
//   UpdateProducts,
//   DeleteProducts,
// };
const Product = require("../models/Products.js");

const cloudinary = require("../config/cloudinary.js"); // import Cloudinary

const CreateProduct = async (req, res) => {
  try {
    const {
      title,
      image,
      price,
      category,
      subcategory,
      type,
      description,
      stock,
      freeDelivery,
      size,
    } = req.body;

    if (
      !title ||
      !image ||
      !price ||
      !category ||
      !subcategory ||
      !type ||
      stock == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "EcommerceDemo", // folder name in Cloudinary
    });

    const product = new Product({
      title,
      image: req.file.path,
      price,
      category,
      subcategory,
      type,
      description,
      stock,
      freeDelivery: freeDelivery || false,
      size: Array.isArray(size) && size.length > 0 ? size : ["Free Size"],
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
const GetProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product by ID
const UpdateProducts = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Agar image bheji gayi ho to Cloudinary upload karo
    if (req.body.image) {
      const uploadedImage = await cloudinary.uploader.upload(req.body.image, {
        folder: "EcommerceDemo",
      });
      updateData.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...updateData,
        size:
          Array.isArray(updateData.size) && updateData.size.length > 0
            ? updateData.size
            : ["Free Size"],
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete product by ID
const DeleteProducts = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  CreateProduct,
  GetProducts,
  UpdateProducts,
  DeleteProducts,
};
