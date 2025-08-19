import React, { useState, useEffect, useRef } from "react";
import { categoryData } from "../../Data/CategoryData";
import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const panelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setSelectedCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    // Navigate to the product listing page with selected category
    navigate(`/products/${encodeURIComponent(category)}`);
    setSelectedCategory(category);
  };

  const activeCategory = hoveredCategory || selectedCategory;

  return (
    <div className="relative w-full shadow-sm border-b bg-gray-100 z-10">
      <div className="max-w-[1890px] mx-auto flex relative">
        {/* Main Category Bar */}
        <div className="flex space-x-6 px-4 py-2 text-sm font-medium text-gray-700">
          {Object.keys(categoryData).map((category) => (
            <div
              key={category}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="relative"
            >
              <button
                className={`hover:text-blue-600 whitespace-nowrap ${
                  selectedCategory === category ? "text-blue-600" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </div>
          ))}
        </div>

        {/* Subcategory Mega Panel */}
        {activeCategory && (
          <div
            ref={panelRef}
            onMouseEnter={() =>
              hoveredCategory && setHoveredCategory(activeCategory)
            }
            onMouseLeave={() => setHoveredCategory(null)}
            className="absolute left-0 top-full w-full bg-white shadow-md border-t z-20"
          >
            <div className="max-w-[1440px] mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(categoryData[activeCategory]).map(
                ([subcategory, subItems], idx) => (
                  <div key={idx}>
                    <h4 className="text-md font-semibold text-gray-800 mb-2">
                      {subcategory}
                    </h4>
                    <ul className="space-y-1">
                      {Array.isArray(subItems)
                        ? subItems.map((item, subIdx) => (
                            <li
                              key={subIdx}
                              className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/products/${encodeURIComponent(
                                    activeCategory
                                  )}/${encodeURIComponent(item)}`
                                )
                              }
                            >
                              {item}
                            </li>
                          ))
                        : Object.entries(subItems).map(
                            ([deepSub, items], dIdx) => (
                              <li key={dIdx}>
                                <div className="text-sm font-medium text-gray-700">
                                  {deepSub}
                                </div>
                                <ul className="pl-3 space-y-1">
                                  {items.map((item, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                                      onClick={() =>
                                        navigate(
                                          `/products/${encodeURIComponent(
                                            activeCategory
                                          )}/${encodeURIComponent(item)}`
                                        )
                                      }
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            )
                          )}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
