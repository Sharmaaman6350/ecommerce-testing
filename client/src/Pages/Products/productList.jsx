import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sampleProducts } from "../../Data/ProductsData";
import { categoryData } from "../../Data/CategoryData";
import { FaChevronDown, FaChevronRight, FaStar, FaCartPlus } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const ProductList = () => {
  const { category, type } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(category || null);
  const [selectedType, setSelectedType] = useState(type || null);
  const [expandedCategory, setExpandedCategory] = useState(category || null);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null);

  useEffect(() => {
    setSelectedCategory(category || null);
    setSelectedType(type || null);
  }, [category, type]);

  const filteredProducts = sampleProducts.filter((product) => {
    return (
      product.category === selectedCategory &&
      (!selectedType || product.type === selectedType)
    );
  });

  const handleCheckboxSelect = (mainCat, typeVal) => {
    if (selectedType === typeVal) {
      navigate(`/productDetails/${mainCat}`);
    } else {
      navigate(`productDetails/${mainCat}/${typeVal}`);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-[260px] bg-white rounded shadow-md p-4 text-sm text-start h-fit sticky top-4 max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>

          <button
            onClick={() => navigate("/products/Women Ethnic")}
            className={`block mb-3 font-medium ${
              !selectedType && !selectedCategory
                ? "text-pink-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            All Categories
          </button>

          {Object.entries(categoryData).map(([mainCat, subCats]) => (
            <div key={mainCat} className="mb-3">
              <button
                className="flex items-center justify-between w-full font-semibold text-gray-800"
                onClick={() =>
                  setExpandedCategory((prev) => (prev === mainCat ? null : mainCat))
                }
              >
                <span onClick={() => navigate(`/productDetails/${mainCat}`)}>{mainCat}</span>
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
                        className="flex justify-between w-full font-medium text-gray-700"
                        onClick={() =>
                          setExpandedSubcategory((prev) =>
                            prev === subCat ? null : subCat
                          )
                        }
                      >
                        <span>{subCat}</span>
                        {Array.isArray(types) && types.length > 0 ? (
                          expandedSubcategory === subCat ? (
                            <FaChevronDown className="text-xs" />
                          ) : (
                            <FaChevronRight className="text-xs" />
                          )
                        ) : null}
                      </button>

                      {expandedSubcategory === subCat &&
                        Array.isArray(types) &&
                        types.length > 0 && (
                          <div className="ml-4 mt-1 space-y-1">
                            {types.map((t) => (
                              <label
                                key={t}
                                className="flex items-center space-x-2 text-xs"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedType === t}
                                  onChange={() => handleCheckboxSelect(mainCat, t)}
                                />
                                <span
                                  className={`cursor-pointer ${
                                    selectedType === t ? "text-pink-600 font-semibold" : ""
                                  }`}
                                >
                                  {t}
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
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-start">
            {selectedCategory} {selectedType && `> ${selectedType}`}
          </h2>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-xl shadow hover:shadow-md transition duration-300 cursor-pointer group"
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                >
                  <div className="overflow-hidden rounded-t-xl h-48">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-3 flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="text-lg font-semibold text-red-600">
                      {product.price}
                    </div>

                    <div className="flex items-center text-yellow-500 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`$ {
                            i < Math.round(product.rating) ? "" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600 text-xs">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {product.freeDelivery && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full w-fit">
                        Free Delivery
                      </span>
                    )}

                    <button
                      className="mt-2 bg-red-800 text-white text-sm py-1 px-3 rounded flex items-center gap-2 hover:bg-red-950 w-fit"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <FaCartPlus className="text-sm" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-12">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/no-product-found-4166487-3453335.png"
                alt="No Products"
                className="w-64 mx-auto"
              />
              <p className="mt-4 text-lg font-medium">
                No products found for {" "}
                <span className="text-red-500">{category}</span>
                {type && <span className="text-indigo-600"> {"> " + type}</span>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
