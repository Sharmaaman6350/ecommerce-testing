import React, { useState } from "react";
import { XCircle, CheckCircle } from "lucide-react";

const EditModal = ({ product, onSave, onCancel }) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [category, setCategory] = useState(product.category);

  const handleSave = () => {
    onSave({ ...product, title, price, stock: parseInt(stock), category });
  };

  return (
    <div className="fixed inset-0  bg-transparent bg-opacity-30 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
          <XCircle className="w-6 h-6 text-indigo-500" /> Edit Product
        </h3>
        <div className="flex flex-col gap-3 text-left">
          <label>Title</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Price</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Stock</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <label>Category</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-1"
          >
            <CheckCircle className="w-4 h-4" /> Save
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
