// import React, { useEffect, useState } from "react";
// import {
//   Input,
//   Button,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../Components/UI/UI.jsx";
// import { PlusCircle, Edit, Trash2 } from "lucide-react";
// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import { getProducts, updateProduct, deleteProduct } from "../../api.js";

// const COLORS = ["#4ade80", "#facc15", "#60a5fa"];

// export default function AdminProducts() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts()
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Failed to fetch products", err));
//   }, []);

//   const filteredProducts = products.filter((product) =>
//     product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pieData = products.reduce((acc, curr) => {
//     const found = acc.find((item) => item.name === curr.category);
//     if (found) {
//       found.value += curr.stock;
//     } else {
//       acc.push({ name: curr.category, value: curr.stock });
//     }
//     return acc;
//   }, []);

//   const handleEdit = async (product) => {
//     const title = prompt("Edit Product Title:", product.title);
//     const price = prompt("Edit Price (e.g., ₹799):", product.price);
//     const stock = prompt("Edit Stock:", product.stock);
//     const category = prompt("Edit Category:", product.category);

//     if (title && price && stock && category) {
//       const updated = {
//         ...product,
//         title,
//         price,
//         stock: parseInt(stock),
//         category,
//       };

//       try {
//         const res = await updateProduct(product._id, updated);
//         setProducts((prev) =>
//           prev.map((p) =>
//             p._id === res.data.product._id ? res.data.product : p
//           )
//         );
//       } catch (err) {
//         console.error("Failed to update product", err);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await deleteProduct(id);
//         setProducts((prev) => prev.filter((p) => p._id !== id));
//       } catch (err) {
//         console.error("Failed to delete product", err);
//       }
//     }
//   };

//   return (
//     <div className="p-6 space-y-10 bg-gray-50 min-h-screen dark:bg-[#111827]">
//       <div className="flex items-center justify-between">
//         <h2 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
//           🛒 Product Dashboard
//         </h2>
//         <Button
//           onClick={() => navigate("/admin/products/add")}
//           className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
//         >
//           <PlusCircle className="w-5 h-5" /> Add Product
//         </Button>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <Card className="bg-gradient-to-r from-indigo-100 to-white dark:from-indigo-900 dark:to-[#111827] border-l-4 border-indigo-500">
//           <CardContent className="p-6">
//             <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
//               📊 Product Category Distribution
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-purple-100 to-white dark:from-purple-900 dark:to-[#111827] border-l-4 border-purple-500">
//           <CardContent className="p-6">
//             <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
//               📦 Stock Overview
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={products}>
//                 <XAxis dataKey="title" hide />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="stock" fill="#6366f1" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Product Table */}
//       <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               📋 Product List
//             </h3>
//             <Input
//               className="w-full md:w-1/3 border-gray-300 shadow-sm"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-100 dark:bg-gray-800">
//                 <TableHead>ID</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Stock</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredProducts.map((product) => (
//                 <TableRow key={product._id}>
//                   <TableCell>{product._id}</TableCell>
//                   <TableCell className="font-medium text-gray-800 dark:text-white">
//                     {product.title}
//                   </TableCell>
//                   <TableCell className="dark:text-gray-300">
//                     {product.category}
//                   </TableCell>
//                   <TableCell className="dark:text-gray-300">
//                     {product.price}
//                   </TableCell>
//                   <TableCell className="dark:text-gray-300">
//                     {product.stock}
//                   </TableCell>
//                   <TableCell className="text-right space-x-2">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-indigo-600 hover:underline dark:text-indigo-400"
//                       onClick={() => handleEdit(product)}
//                     >
//                       <Edit className="w-4 h-4 mr-1 inline" /> Edit
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-red-600 hover:underline dark:text-red-400"
//                       onClick={() => handleDelete(product._id)}
//                     >
//                       <Trash2 className="w-4 h-4 mr-1 inline" /> Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {filteredProducts.length === 0 && (
//             <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
//               No matching products found.
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   Input,
//   Button,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../Components/UI/UI.jsx";
// import { PlusCircle, Edit, Trash2 } from "lucide-react";
// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import { getProducts, updateProduct, deleteProduct } from "../../api.js";
// import ConfirmModal from "../../Components/UI/confirmationModel.jsx";

// const COLORS = ["#4ade80", "#facc15", "#60a5fa"];

// export default function AdminProducts() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     getProducts()
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Failed to fetch products", err));
//   }, []);

//   const filteredProducts = products.filter((product) =>
//     product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pieData = products.reduce((acc, curr) => {
//     const found = acc.find((item) => item.name === curr.category);
//     if (found) {
//       found.value += curr.stock;
//     } else {
//       acc.push({ name: curr.category, value: curr.stock });
//     }
//     return acc;
//   }, []);

//   const handleEdit = async (product) => {
//     // prompt abhi use ho raha hai, modal future me add karenge
//     const title = prompt("Edit Product Title:", product.title);
//     const price = prompt("Edit Price (e.g., ₹799):", product.price);
//     const stock = prompt("Edit Stock:", product.stock);
//     const category = prompt("Edit Category:", product.category);

//     if (title && price && stock && category) {
//       const updated = { ...product, title, price, stock: parseInt(stock), category };
//       try {
//         const res = await updateProduct(product._id, updated);
//         setProducts((prev) =>
//           prev.map((p) => (p._id === res.data.product._id ? res.data.product : p))
//         );
//       } catch (err) {
//         console.error("Failed to update product", err);
//       }
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setShowConfirm(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteProduct(deleteId);
//       setProducts((prev) => prev.filter((p) => p._id !== deleteId));
//     } catch (err) {
//       console.error("Failed to delete product", err);
//     } finally {
//       setShowConfirm(false);
//       setDeleteId(null);
//     }
//   };

//   return (
//     <div className="p-6 space-y-10 bg-gray-50 min-h-screen dark:bg-[#111827]">
//       <div className="flex items-center justify-between">
//         <h2 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
//           🛒 Product Dashboard
//         </h2>
//         <Button
//           onClick={() => navigate("/admin/products/add")}
//           className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
//         >
//           <PlusCircle className="w-5 h-5" /> Add Product
//         </Button>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <Card className="bg-gradient-to-r from-indigo-100 to-white dark:from-indigo-900 dark:to-[#111827] border-l-4 border-indigo-500">
//           <CardContent className="p-6">
//             <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
//               📊 Product Category Distribution
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-purple-100 to-white dark:from-purple-900 dark:to-[#111827] border-l-4 border-purple-500">
//           <CardContent className="p-6">
//             <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
//               📦 Stock Overview
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={products}>
//                 <XAxis dataKey="title" hide />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="stock" fill="#6366f1" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Product Table */}
//       <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               📋 Product List
//             </h3>
//             <Input
//               className="w-full md:w-1/3 border-gray-300 shadow-sm"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-100 dark:bg-gray-800">
//                 <TableHead>ID</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Stock</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredProducts.map((product) => (
//                 <TableRow key={product._id}>
//                   <TableCell>{product._id}</TableCell>
//                   <TableCell className="font-medium text-gray-800 dark:text-white">{product.title}</TableCell>
//                   <TableCell className="dark:text-gray-300">{product.category}</TableCell>
//                   <TableCell className="dark:text-gray-300">{product.price}</TableCell>
//                   <TableCell className="dark:text-gray-300">{product.stock}</TableCell>
//                   <TableCell className="text-right space-x-2">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-indigo-600 hover:underline dark:text-indigo-400"
//                       onClick={() => handleEdit(product)}
//                     >
//                       <Edit className="w-4 h-4 mr-1 inline" /> Edit
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-red-600 hover:underline dark:text-red-400"
//                       onClick={() => handleDeleteClick(product._id)}
//                     >
//                       <Trash2 className="w-4 h-4 mr-1 inline" /> Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {filteredProducts.length === 0 && (
//             <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
//               No matching products found.
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* --- Confirmation Modal --- */}
//       {showConfirm && (
//         <ConfirmModal
//           message="Are you sure you want to delete this product?"
//           onConfirm={confirmDelete}
//           onCancel={() => setShowConfirm(false)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Components/UI/UI.jsx";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { getProducts, updateProduct, deleteProduct } from "../../api.js";
import ConfirmModal from "../../Components/UI/confirmationModel.jsx";
import EditModal from "../../Components/UI/editModel.jsx";

const COLORS = ["#4ade80", "#facc15", "#60a5fa"];

export default function AdminProducts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pieData = products.reduce((acc, curr) => {
    const found = acc.find((item) => item.name === curr.category);
    if (found) {
      found.value += curr.stock;
    } else {
      acc.push({ name: curr.category, value: curr.stock });
    }
    return acc;
  }, []);

  // --- Edit Handlers ---
  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEdit(true);
  };

  const confirmEdit = async (updatedProduct) => {
    try {
      const res = await updateProduct(updatedProduct._id, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p._id === res.data.product._id ? res.data.product : p))
      );
    } catch (err) {
      console.error("Failed to update product", err);
    } finally {
      setShowEdit(false);
      setEditProduct(null);
    }
  };

  // --- Delete Handlers ---
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(deleteId);
      setProducts((prev) => prev.filter((p) => p._id !== deleteId));
    } catch (err) {
      console.error("Failed to delete product", err);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen dark:bg-[#111827]">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
          🛒 Product Dashboard
        </h2>
        <Button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <PlusCircle className="w-5 h-5" /> Add Product
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-r from-indigo-100 to-white dark:from-indigo-900 dark:to-[#111827] border-l-4 border-indigo-500">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
              📊 Product Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-100 to-white dark:from-purple-900 dark:to-[#111827] border-l-4 border-purple-500">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
              📦 Stock Overview
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={products}>
                <XAxis dataKey="title" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Product Table */}
      <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              📋 Product List
            </h3>
            <Input
              className="w-full md:w-1/3 border-gray-300 shadow-sm"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell className="font-medium text-gray-800 dark:text-white">{product.title}</TableCell>
                  <TableCell className="dark:text-gray-300">{product.category}</TableCell>
                  <TableCell className="dark:text-gray-300">{product.price}</TableCell>
                  <TableCell className="dark:text-gray-300">{product.stock}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-indigo-600 hover:underline dark:text-indigo-400"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="w-4 h-4 mr-1 inline" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:underline dark:text-red-400"
                      onClick={() => handleDeleteClick(product._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1 inline" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
              No matching products found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- Modals --- */}
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showEdit && editProduct && (
        <EditModal
          product={editProduct}
          onSave={confirmEdit}
          onCancel={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}
