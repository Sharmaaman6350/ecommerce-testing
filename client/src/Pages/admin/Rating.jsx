// import React, { useState, useEffect } from "react";
// import {
//   Star,
//   Trash2,
//   Search,
//   TrendingUp,
//   TrendingDown,
//   Filter,
//   Download,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { saveAs } from "file-saver";


// const mockRatings = [
//   {
//     id: 1,
//     product: "Stylish Kurti",
//     user: "Rani Sharma",
//     rating: 4,
//     review: "Great quality and fits perfectly!",
//     date: "2025-08-01",
//     category: "Women Ethnic",
//   },
//   {
//     id: 2,
//     product: "Bluetooth Headphones",
//     user: "Ajay Kumar",
//     rating: 2,
//     review: "Sound is not very clear.",
//     date: "2025-08-03",
//     category: "Electronics",
//   },
//   {
//     id: 3,
//     product: "Men's Denim Jacket",
//     user: "Ravi Singh",
//     rating: 5,
//     review: "Loved it! Value for money.",
//     date: "2025-08-02",
//     category: "Men",
//   },
//     {
//     id: 4,
//     product: "Stylish Kurti",
//     user: "Rani Sharma",
//     rating: 4,
//     review: "Great quality and fits perfectly!",
//     date: "2025-08-01",
//     category: "Women Ethnic",
//   },
//   {
//     id: 5,
//     product: "Bluetooth Headphones",
//     user: "Ajay Kumar",
//     rating: 2,
//     review: "Sound is not very clear.",
//     date: "2025-08-03",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     product: "Men's Denim Jacket",
//     user: "Ravi Singh",
//     rating: 5,
//     review: "Loved it! Value for money.",
//     date: "2025-08-02",
//     category: "Men",
//   },
// ];

// const AdminRatings = () => {
//   const [ratings, setRatings] = useState(mockRatings);
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");

//   const handleDelete = (id) => {
//     setRatings((prev) => prev.filter((r) => r.id !== id));
//   };



// const exportToCSV = () => {
//   const header = "Product,User,Rating,Review,Date,Category\n";
//   const body = ratings
//     .map((r) =>
//       [
//         r.product,
//         r.user,
//         r.rating,
//         `"${r.review}"`,         // Ensure review handles commas/newlines
//         `="${r.date}"`,          // Ensure Excel treats date as text
//         r.category,
//       ].join(",")
//     )
//     .join("\n");

//   const csv = header + body;
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   saveAs(blob, "ratings.csv");
// };


//   const filteredRatings = ratings.filter(
//     (r) =>
//       r.product.toLowerCase().includes(search.toLowerCase()) &&
//       (categoryFilter === "All" || r.category === categoryFilter)
//   );

//   const categories = ["All", ...new Set(ratings.map((r) => r.category))];

//   const productSummary = ratings.reduce((acc, curr) => {
//     const key = curr.product;
//     if (!acc[key]) {
//       acc[key] = { total: 0, count: 0, category: curr.category };
//     }
//     acc[key].total += curr.rating;
//     acc[key].count++;
//     return acc;
//   }, {});

//   const ratingChartData = Object.entries(productSummary).map(([product, data]) => ({
//     product,
//     averageRating: parseFloat((data.total / data.count).toFixed(2)),
//     category: data.category,
//   }));

//   const highRated = ratingChartData.filter((p) => p.averageRating >= 4);
//   const lowRated = ratingChartData.filter((p) => p.averageRating < 3);

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold">Product Ratings & Reviews</h2>
//         <button
//           onClick={exportToCSV}
//           className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           <Download className="w-4 h-4" /> Export CSV
//         </button>
//       </div>

//       {/* Search & Filter */}
//       <div className="flex flex-col md:flex-row md:items-center gap-4">
//         <div className="relative w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Search by product name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
//         </div>
//         <div className="flex items-center gap-2">
//           <Filter className="text-gray-500" />
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border rounded px-3 py-2 focus:ring focus:ring-blue-400"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h4 className="flex items-center gap-2 font-semibold mb-2 text-green-600">
//             <TrendingUp className="w-5 h-5" /> High Rated Products
//           </h4>
//           {highRated.length > 0 ? (
//             highRated.map((item) => (
//               <p key={item.product} className="text-sm">
//                 {item.product} ({item.averageRating}/5) - {item.category}
//               </p>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No highly rated products.</p>
//           )}
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow">
//           <h4 className="flex items-center gap-2 font-semibold mb-2 text-red-600">
//             <TrendingDown className="w-5 h-5" /> Low Rated Products
//           </h4>
//           {lowRated.length > 0 ? (
//             lowRated.map((item) => (
//               <p key={item.product} className="text-sm">
//                 {item.product} ({item.averageRating}/5) - {item.category}
//               </p>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No low rated products.</p>
//           )}
//         </div>
//       </div>

//       {/* Rating Chart */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h4 className="font-semibold mb-4">Average Rating per Product</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={ratingChartData}>
//             <XAxis dataKey="product" tick={{ fontSize: 12 }} />
//             <YAxis domain={[0, 5]} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="averageRating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Rating List Table */}
//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         <table className="min-w-full">
//           <thead>
//             <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
//               <th className="p-4">Product</th>
//               <th className="p-4">User</th>
//               <th className="p-4">Rating</th>
//               <th className="p-4">Review</th>
//               <th className="p-4">Date</th>
//               <th className="p-4">Category</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRatings.length > 0 ? (
//               filteredRatings.map((r) => (
//                 <tr
//                   key={r.id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="p-4 font-medium">{r.product}</td>
//                   <td className="p-4">{r.user}</td>
//                   <td className="p-4">
//                     <div className="flex items-center gap-1 text-yellow-500">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${i < r.rating ? "fill-yellow-500" : "text-gray-300"}`}
//                         />
//                       ))}
//                       <span className="ml-2 text-sm text-gray-600">
//                         {r.rating}/5
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-4">{r.review}</td>
//                   <td className="p-4 text-sm text-gray-500">{r.date}</td>
//                   <td className="p-4">{r.category}</td>
//                   <td className="p-4 text-center">
//                     <button
//                       onClick={() => handleDelete(r.id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td className="p-4 text-center text-gray-500" colSpan={7}>
//                   No reviews found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminRatings;

import React, { useState } from "react";
import {
  Star,
  Trash2,
  Search,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { saveAs } from "file-saver";

// Sample Ratings
const mockRatings = [
  {
    id: 1,
    product: "Stylish Kurti",
    user: "Rani Sharma",
    rating: 4,
    review: "Great quality and fits perfectly!",
    date: "2025-08-01",
    category: "Women Ethnic",
  },
  {
    id: 2,
    product: "Bluetooth Headphones",
    user: "Ajay Kumar",
    rating: 2,
    review: "Sound is not very clear.",
    date: "2025-08-03",
    category: "Electronics",
  },
  {
    id: 3,
    product: "Men's Denim Jacket",
    user: "Ravi Singh",
    rating: 5,
    review: "Loved it! Value for money.",
    date: "2025-08-02",
    category: "Men",
  },
];

const AdminRatings = () => {
  const [ratings, setRatings] = useState(mockRatings);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleDelete = (id) => {
    setRatings((prev) => prev.filter((r) => r.id !== id));
  };

  const exportToCSV = () => {
    const header = "Product,User,Rating,Review,Date,Category\n";
    const body = ratings
      .map((r) =>
        [
          r.product,
          r.user,
          r.rating,
          `"${r.review}"`,
          `="${r.date}"`,
          r.category,
        ].join(",")
      )
      .join("\n");

    const csv = header + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "ratings.csv");
  };

  const filteredRatings = ratings.filter(
    (r) =>
      r.product.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "All" || r.category === categoryFilter)
  );

  const categories = ["All", ...new Set(ratings.map((r) => r.category))];

  const productSummary = ratings.reduce((acc, curr) => {
    const key = curr.product;
    if (!acc[key]) {
      acc[key] = { total: 0, count: 0, category: curr.category };
    }
    acc[key].total += curr.rating;
    acc[key].count++;
    return acc;
  }, {});

  const ratingChartData = Object.entries(productSummary).map(([product, data]) => ({
    product,
    averageRating: parseFloat((data.total / data.count).toFixed(2)),
    category: data.category,
  }));

  const highRated = ratingChartData.filter((p) => p.averageRating >= 4);
  const lowRated = ratingChartData.filter((p) => p.averageRating < 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Product Ratings & Reviews</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:ring focus:ring-blue-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="flex items-center gap-2 font-semibold mb-2 text-green-600">
            <TrendingUp className="w-5 h-5" /> High Rated Products
          </h4>
          {highRated.length > 0 ? (
            highRated.map((item) => (
              <p key={item.product} className="text-sm">
                {item.product} ({item.averageRating}/5) - {item.category}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-500">No highly rated products.</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="flex items-center gap-2 font-semibold mb-2 text-red-600">
            <TrendingDown className="w-5 h-5" /> Low Rated Products
          </h4>
          {lowRated.length > 0 ? (
            lowRated.map((item) => (
              <p key={item.product} className="text-sm">
                {item.product} ({item.averageRating}/5) - {item.category}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-500">No low rated products.</p>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-4">Average Rating per Product</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingChartData}>
            <XAxis dataKey="product" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageRating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Ratings Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
              <th className="p-4">Product</th>
              <th className="p-4">User</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review</th>
              <th className="p-4">Date</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.length > 0 ? (
              filteredRatings.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{r.product}</td>
                  <td className="p-4">{r.user}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < r.rating ? "text-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{r.rating}/5</span>
                    </div>
                  </td>
                  <td className="p-4">{r.review}</td>
                  <td className="p-4 text-sm text-gray-500">{r.date}</td>
                  <td className="p-4">{r.category}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRatings;
