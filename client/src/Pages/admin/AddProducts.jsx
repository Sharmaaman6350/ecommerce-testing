

import React, { useState } from "react";
import {
  Input,
  Label,
  Button,
  Textarea,
  Card,
  CardContent,
} from "../../Components/UI/UI.jsx";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../api.js";

// All allowed categories
const categories = [
  "Women Ethnic",
  "Women Western",
  "Men",
  "Kids",
  "Home & Kitchen",
  "Beauty & Health",
  "Jewellery & Accessories",
  "Bags & Footwear",
  "Electronics",
  "Sports & Fitness",
  "Car & Motorbike",
  "Office Supplies & Stationery",
  "Pet Supplies",
  "Food & Drinks",
  "Musical Instruments",
  "Books",
];

// Category → Size mapping
const categorySizeMap = {
  "Women Ethnic": ["XS", "S", "M", "L", "XL", "XXL", "Free Size"],
  "Women Western": ["XS", "S", "M", "L", "XL", "XXL", "Free Size"],
  "Men": ["S", "M", "L", "XL", "XXL"],
  "Kids": ["0-3M", "3-6M", "6-12M", "1-2Y", "2-3Y", "3-4Y", "4-5Y", "Free Size"],
  "Bags & Footwear": ["5", "6", "7", "8", "9", "10", "Free Size"],
  "Home & Kitchen": ["Free Size"],
  "Beauty & Health": ["Free Size"],
  "Jewellery & Accessories": ["Free Size"],
  "Electronics": ["Free Size"],
  "Sports & Fitness": ["S", "M", "L", "XL", "XXL", "Free Size"],
  "Car & Motorbike": ["Free Size"],
  "Office Supplies & Stationery": ["Free Size"],
  "Pet Supplies": ["Free Size"],
  "Food & Drinks": ["Free Size"],
  "Musical Instruments": ["Free Size"],
  "Books": ["Free Size"],
};

export default function AddProductPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
    category: "",
    subcategory: "",
    type: "",
    description: "",
    freeDelivery: true,
    stock: "",
    sizes: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeChange = (size) => {
    setForm((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        title: form.title,
        image: form.image,
        price: parseFloat(form.price),
        category: form.category,
        subcategory: form.subcategory,
        type: form.type,
        description: form.description,
        freeDelivery: form.freeDelivery,
        stock: parseInt(form.stock),
        sizes: form.sizes.length > 0 ? form.sizes : ["Free Size"],
      };
      await addProduct(newProduct);
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Error adding product");
    }
  };

  const sizeOptions = categorySizeMap[form.category] || [];

  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-[#0f172a] min-h-screen">
      <Card className="max-w-3xl mx-auto shadow-md dark:bg-gray-900">
        <CardContent className="space-y-6 p-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            ➕ Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
                Product Title
              </Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Image */}
            <div>
              <Label htmlFor="image" className="text-gray-700 dark:text-gray-300">
                Image URL
              </Label>
              <Input
                name="image"
                value={form.image}
                onChange={handleChange}
                required
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            {form.image && (
              <div className="pt-2">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md border dark:border-gray-700"
                />
              </div>
            )}

            {/* Price */}
            <div>
              <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">
                Price (in ₹)
              </Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
                Category
              </Label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Checkboxes */}
            {sizeOptions.length > 0 && (
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Sizes</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sizeOptions.map((size) => (
                    <label
                      key={size}
                      className={`px-3 py-1 border rounded-full cursor-pointer ${
                        form.sizes.includes(size)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="sizes"
                        value={size}
                        checked={form.sizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="hidden"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Subcategory */}
            <div>
              <Label htmlFor="subcategory" className="text-gray-700 dark:text-gray-300">
                Subcategory
              </Label>
              <Input
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                required
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Type */}
            <div>
              <Label htmlFor="type" className="text-gray-700 dark:text-gray-300">
                Type
              </Label>
              <Input
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                Description
              </Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                required
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Free Delivery */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="freeDelivery"
                checked={form.freeDelivery}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <Label className="text-gray-700 dark:text-gray-300">Free Delivery</Label>
            </div>

            {/* Stock */}
            <div>
              <Label htmlFor="stock" className="text-gray-700 dark:text-gray-300">
                Stock
              </Label>
              <Input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition"
              >
                Add Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


