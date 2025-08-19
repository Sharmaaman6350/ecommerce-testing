// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getProducts } from "../../api.js";
// import { useCart } from "../../context/CartContext.jsx";
// import ProductImageZoom from "./ProductImageZoom.jsx";
// import ProductRating from "./ProductRating.jsx";
// import ShippingAddressSidebar from "./Checkout.jsx";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const [product, setProduct] = useState(null);
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [selectedImage, setSelectedImage] = useState("");
//    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getProducts();
//         const products = res.data || [];

//         const foundProduct = products.find((p) => p._id === id);
//         if (!foundProduct) return setProduct(null);

//         const normalizedProduct = {
//           ...foundProduct,
//           rating: 5,
//           reviews: 5,
//           images: foundProduct.images || [foundProduct.image], // fallback
//         };

//         setProduct(normalizedProduct);
//         setSelectedImage(normalizedProduct.images[0]);

//         const similar = products.filter(
//           (p) => p._id !== id && p.category === foundProduct.category
//         );
//         setSimilarProducts(similar);
//       } catch (error) {
//         console.error("Failed to fetch product data", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleAddToCart = () => {
//     addToCart(product);
//     toast.success("Product added to cart");
//   };

//   if (!product) {
//     return (
//       <div className="text-center text-red-500 mt-10 font-semibold">
//         Product not found.
//       </div>
//     );
//   }

//   // 👇 Dynamic Sizes & Product Details
//   const sizes = Array.isArray(product.size) && product.size.length > 0 ? product.size : ["Free Size"];
//   const details = Array.isArray(product.description) && product.description.length > 0
//     ? product.details
//     : ["No product details available"];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Left Side */}
//         <div>
//           <ProductImageZoom image={selectedImage} />
//           <div className="flex mt-4 gap-2">
//             {product.images.map((imgUrl, i) => (
//               <img
//                 key={i}
//                 src={imgUrl}
//                 onClick={() => setSelectedImage(imgUrl)}
//                 alt={`Thumbnail ${i + 1}`}
//                 className={`w-16 h-16 object-cover border rounded-lg cursor-pointer ${
//                   selectedImage === imgUrl ? "ring-2 ring-pink-500" : ""
//                 }`}
//               />
//             ))}
//           </div>

//           <div className="mt-6 flex gap-6">
//             <Link to="/cart">
//               <button
//                 onClick={handleAddToCart}
//                 className="px-6 py-2 border border-pink-600 text-pink-600 rounded font-medium hover:bg-pink-50"
//               >
//                 🛒 Add to Cart
//               </button>
//             </Link>
//             <button className="px-6 py-2 bg-pink-600 text-white rounded font-medium hover:bg-pink-700"  onClick={() => setIsSidebarOpen(true)}>
//               ➤ Buy Now
//             </button>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div>
//           <div className="border border-gray-300 p-2 rounded-2xl shadow-md">
//             <h1 className="text-xl font-bold m-2 text-start">{product.title}</h1>
//             <p className="text-xl font-bold text-black text-start">₹{product.price}</p>
//             <div className="flex items-center mt-2 text-sm text-gray-600 gap-2">
//               <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
//                 ⭐ {product.rating}
//               </span>
//               <span>{product.reviews} Reviews</span>
//             </div>
//             {product.freeDelivery && (
//               <p className="text-green-600 text-sm font-medium mt-1">Free Delivery</p>
//             )}
//           </div>

//           {/* Sizes Section */}
//           <div className="mt-6 border p-4 rounded-2xl shadow-md">
//             <h3 className="text-md font-semibold mb-2">Select Size</h3>
//             <div className="flex flex-wrap gap-2">
//               {sizes.map((size, idx) => (
//                 <div
//                   key={idx}
//                   className="border rounded-full px-3 py-1 text-sm cursor-pointer hover:border-pink-500"
//                 >
//                   {size}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product Details Section */}
//           <div className="mt-8 border p-2 border-gray-300 rounded-2xl shadow-md">
//             <h2 className="text-lg font-semibold mb-2">Product Details</h2>
//             <ul className="text-sm text-gray-700 space-y-1 text-start">
//               {details.map((line, idx) => (
//                 <li key={idx}>{line}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-6 border border-gray-300 p-4 rounded-2xl shadow-md">
//             <ProductRating />
//           </div>
//         </div>
//       </div>

//       {/* Similar Products */}
//       <div className="mt-12">
//         <h3 className="font-semibold mb-4 text-lg">
//           {similarProducts.length} Similar Product
//           {similarProducts.length !== 1 && "s"}
//         </h3>
//         <div className="flex gap-4 overflow-x-auto pb-4">
//           {similarProducts.map((item) => (
//             <Link to={`/ProductDetails/${item._id}`} key={item._id}>
//               <div className="w-40 border rounded-lg p-2 hover:shadow-md">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-32 object-cover rounded-md"
//                 />
//                 <p className="text-sm mt-2 font-medium">{item.name}</p>
//                 <p className="text-pink-600 text-sm font-bold">₹{item.price}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//    {isSidebarOpen && (
//   <ShippingAddressSidebar 
//     onClose={() => setIsSidebarOpen(false)} 
//     product={product} 
//   />
// )}

//     </div>
    
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../api.js";
import { useCart } from "../../context/CartContext.jsx";
import { useUser } from "../../context/UserContext.jsx"; // <-- ✅ Import user context
import ProductImageZoom from "./ProductImageZoom.jsx";
import ProductRating from "./ProductRating.jsx";
import ShippingAddressSidebar from "./Checkout.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { currentUser } = useUser(); // <-- ✅ Use context to get user
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        const products = res.data || [];

        const foundProduct = products.find((p) => p._id === id);
        if (!foundProduct) return setProduct(null);

        const normalizedProduct = {
          ...foundProduct,
          rating: 5,
          reviews: 5,
          images: foundProduct.images || [foundProduct.image], // fallback
        };

        setProduct(normalizedProduct);
        setSelectedImage(normalizedProduct.images[0]);

        const similar = products.filter(
          (p) => p._id !== id && p.category === foundProduct.category
        );
        setSimilarProducts(similar);
      } catch (error) {
        console.error("Failed to fetch product data", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart");
  };

  if (!product) {
    return (
      <div className="text-center text-red-500 mt-10 font-semibold">
        Product not found.
      </div>
    );
  }

  const sizes = Array.isArray(product.size) && product.size.length > 0 ? product.size : ["Free Size"];
  const details = Array.isArray(product.description) && product.description.length > 0
    ? product.details
    : ["No product details available"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div>
          <ProductImageZoom image={selectedImage} />
          <div className="flex mt-4 gap-2">
            {product.images.map((imgUrl, i) => (
              <img
                key={i}
                src={imgUrl}
                onClick={() => setSelectedImage(imgUrl)}
                alt={`Thumbnail ${i + 1}`}
                className={`w-16 h-16 object-cover border rounded-lg cursor-pointer ${
                  selectedImage === imgUrl ? "ring-2 ring-pink-500" : ""
                }`}
              />
            ))}
          </div>

          <div className="mt-6 flex gap-6">
            <Link to="/cart">
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 border border-pink-600 text-pink-600 rounded font-medium hover:bg-pink-50"
              >
                🛒 Add to Cart
              </button>
            </Link>
            <button
              className="px-6 py-2 bg-pink-600 text-white rounded font-medium hover:bg-pink-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              ➤ Buy Now
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div className="border border-gray-300 p-2 rounded-2xl shadow-md">
            <h1 className="text-xl font-bold m-2 text-start">{product.title}</h1>
            <p className="text-xl font-bold text-black text-start">₹{product.price}</p>
            <div className="flex items-center mt-2 text-sm text-gray-600 gap-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                ⭐ {product.rating}
              </span>
              <span>{product.reviews} Reviews</span>
            </div>
            {product.freeDelivery && (
              <p className="text-green-600 text-sm font-medium mt-1">Free Delivery</p>
            )}
          </div>

          <div className="mt-6 border p-4 rounded-2xl shadow-md">
            <h3 className="text-md font-semibold mb-2">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, idx) => (
                <div
                  key={idx}
                  className="border rounded-full px-3 py-1 text-sm cursor-pointer hover:border-pink-500"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border p-2 border-gray-300 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <ul className="text-sm text-gray-700 space-y-1 text-start">
              {details.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border border-gray-300 p-4 rounded-2xl shadow-md">
            <ProductRating />
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <h3 className="font-semibold mb-4 text-lg">
          {similarProducts.length} Similar Product
          {similarProducts.length !== 1 && "s"}
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {similarProducts.map((item) => (
            <Link to={`/ProductDetails/${item._id}`} key={item._id}>
              <div className="w-40 border rounded-lg p-2 hover:shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="text-sm mt-2 font-medium">{item.name}</p>
                <p className="text-pink-600 text-sm font-bold">₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Shipping Sidebar for Razorpay Checkout */}
      {isSidebarOpen && (
        <ShippingAddressSidebar
          onClose={() => setIsSidebarOpen(false)}
          product={product}
          currentUser={currentUser} // ✅ passed properly
        />
      )}
    </div>
  );
};

export default ProductDetails;
