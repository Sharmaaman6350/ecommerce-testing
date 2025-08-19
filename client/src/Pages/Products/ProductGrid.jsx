// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// import ProductCard from "../../Components/ProductCard.jsx";
// import { sampleProducts } from "../../Data/ProductsData.js";
// import { categoryData } from "../../Data/CategoryData.js";

// const ProductGrid = () => {
//   const [selectedType, setSelectedType] = useState(null);
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [expandedSubcategory, setExpandedSubcategory] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);

//   const handleCheckboxSelect = (type, category, subcategory) => {
//     if (selectedType === type) {
//       setSelectedType(null); // uncheck
//     } else {
//       setSelectedType(type);
//       setSelectedCategory(category);
//       setSelectedSubcategory(subcategory);
//     }
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedType(null);
//     setSelectedSubcategory(null);
//     setSelectedCategory(category);
//   };

//   const filteredProducts = sampleProducts.filter((product) => {
//     if (selectedType) return product.type === selectedType;
//     if (selectedSubcategory) return product.subcategory === selectedSubcategory;
//     if (selectedCategory) return product.category === selectedCategory;
//     return true;
//   });

//   return (
//     <>
//       <div className="text-start text-3xl m-5 font-stretch-105%">Products For You</div>
//       <div className="flex flex-col lg:flex-row gap-6 p-4">
//         {/* Sidebar */}
//         <aside className="w-full lg:w-[470px] bg-white m-2  rounded-lg shadow-md p-4 h-300 sticky top-4 overflow-y-auto max-h-[90vh] text-start">
//           <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>

//           <button
//             onClick={() => {
//               setSelectedType(null);
//               setSelectedCategory(null);
//               setSelectedSubcategory(null);
//             }}
//             className={`block mb-3 text-sm font-medium ${
//               !selectedType && !selectedCategory ? "text-pink-600 font-semibold" : "text-gray-700"
//             }`}
//           >
//             All Categories
//           </button>

//           {Object.entries(categoryData).map(([mainCat, subCats]) => (
//             <div key={mainCat} className="mb-3">
//               <button
//                 className="flex items-center justify-between w-full text-sm font-semibold text-gray-800"
//                 onClick={() =>
//                   setExpandedCategory((prev) => (prev === mainCat ? null : mainCat))
//                 }
//               >
//                 <span onClick={() => handleCategoryClick(mainCat)}>{mainCat}</span>
//                 {expandedCategory === mainCat ? (
//                   <FaChevronDown className="text-xs" />
//                 ) : (
//                   <FaChevronRight className="text-xs" />
//                 )}
//               </button>

//               {/* Subcategories */}
//               {expandedCategory === mainCat && (
//                 <div className="ml-3 mt-1 space-y-2">
//                   {Object.entries(subCats).map(([subCat, types]) => (
//                     <div key={subCat}>
//                       <button
//                         className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
//                         onClick={() =>
//                           setExpandedSubcategory((prev) => (prev === subCat ? null : subCat))
//                         }
//                       >
//                         <span>{subCat}</span>
//                         {Array.isArray(types) && types.length > 0 ? (
//                           expandedSubcategory === subCat ? (
//                             <FaChevronDown className="text-xs" />
//                           ) : (
//                             <FaChevronRight className="text-xs" />
//                           )
//                         ) : null}
//                       </button>

//                       {/* Type checkboxes */}
//                       {expandedSubcategory === subCat &&
//                         Array.isArray(types) &&
//                         types.length > 0 && (
//                           <div className="ml-4 mt-1 space-y-1">
//                             {types.map((type) => (
//                               <label
//                                 key={type}
//                                 className="flex items-center space-x-2 text-xs text-gray-600"
//                               >
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedType === type}
//                                   onChange={() => handleCheckboxSelect(type, mainCat, subCat)}
//                                 />
//                                 <span
//                                   className={`cursor-pointer ${
//                                     selectedType === type ? "text-pink-600 font-semibold" : ""
//                                   }`}
//                                 >
//                                   {type}
//                                 </span>
//                               </label>
//                             ))}
//                           </div>
//                         )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </aside>

//         {/* Product Grid */}
//         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product, index) => {
//               const id = product.id || `temp-${index}`;
//               return (
//                 <Link to={`/ProductDetails/${id}`} key={id}>
//                   <ProductCard product={product} />
//                 </Link>
//               );
//             })
//           ) : (
//             <p className="text-gray-500 text-lg col-span-full text-center">
//               No products found.
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductGrid;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import ProductCard from "../../Components/ProductCard.jsx";
import { getProducts } from "../../api.js";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [categoryTree, setCategoryTree] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();

        // ✅ FIX: directly using response.data instead of response.data.products
        const fetched = response.data || [];

        // ✅ Add default rating/reviews
        const processed = fetched.map((p) => ({
          ...p,
          rating: p.rating || 5,
          reviews: p.reviews || 5,
        }));

        setProducts(processed);
        buildCategoryTree(processed);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const buildCategoryTree = (products) => {
    const tree = {};

    products.forEach(({ category, subcategory, type }) => {
      if (!category || !subcategory || !type) return;

      if (!tree[category]) tree[category] = {};
      if (!tree[category][subcategory]) tree[category][subcategory] = new Set();
      tree[category][subcategory].add(type);
    });

    const result = {};
    for (const cat in tree) {
      result[cat] = {};
      for (const sub in tree[cat]) {
        result[cat][sub] = Array.from(tree[cat][sub]);
      }
    }

    setCategoryTree(result);
  };

  const handleCheckboxSelect = (type, category, subcategory) => {
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
      setSelectedCategory(category);
      setSelectedSubcategory(subcategory);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedType(null);
    setSelectedSubcategory(null);
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedType) return product.type === selectedType;
    if (selectedSubcategory) return product.subcategory === selectedSubcategory;
    if (selectedCategory) return product.category === selectedCategory;
    return true;
  });

  return (
    <>
      <div className="text-start text-3xl m-5 font-stretch-105%">Products For You</div>
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* Sidebar */}
        <aside className="w-full lg:w-[470px] bg-white m-2 rounded-lg shadow-md p-4 h-300 sticky top-4 overflow-y-auto max-h-[90vh] text-start">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>

          <button
            onClick={() => {
              setSelectedType(null);
              setSelectedCategory(null);
              setSelectedSubcategory(null);
            }}
            className={`block mb-3 text-sm font-medium ${
              !selectedType && !selectedCategory ? "text-pink-600 font-semibold" : "text-gray-700"
            }`}
          >
            All Categories
          </button>

          {Object.entries(categoryTree).map(([mainCat, subCats]) => (
            <div key={mainCat} className="mb-3">
              <button
                className="flex items-center justify-between w-full text-sm font-semibold text-gray-800"
                onClick={() =>
                  setExpandedCategory((prev) => (prev === mainCat ? null : mainCat))
                }
              >
                <span onClick={() => handleCategoryClick(mainCat)}>{mainCat}</span>
                {expandedCategory === mainCat ? (
                  <FaChevronDown className="text-xs" />
                ) : (
                  <FaChevronRight className="text-xs" />
                )}
              </button>

              {expandedCategory === mainCat && (
                <div className="ml-3 mt-1 space-y-2">
                  {Object.entries(subCats).map(([subCat, types]) => (
                    <div key={subCat}>
                      <button
                        className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
                        onClick={() =>
                          setExpandedSubcategory((prev) => (prev === subCat ? null : subCat))
                        }
                      >
                        <span>{subCat}</span>
                        {types.length > 0 ? (
                          expandedSubcategory === subCat ? (
                            <FaChevronDown className="text-xs" />
                          ) : (
                            <FaChevronRight className="text-xs" />
                          )
                        ) : null}
                      </button>

                      {expandedSubcategory === subCat && (
                        <div className="ml-4 mt-1 space-y-1">
                          {types.map((type) => (
                            <label
                              key={type}
                              className="flex items-center space-x-2 text-xs text-gray-600"
                            >
                              <input
                                type="checkbox"
                                checked={selectedType === type}
                                onChange={() => handleCheckboxSelect(type, mainCat, subCat)}
                              />
                              <span
                                className={`cursor-pointer ${
                                  selectedType === type ? "text-pink-600 font-semibold" : ""
                                }`}
                              >
                                {type}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => {
              const id = product._id || `temp-${index}`;
              return (
                <Link to={`/ProductDetails/${id}`} key={id}>
                  <ProductCard product={product} />
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500 text-lg col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;

