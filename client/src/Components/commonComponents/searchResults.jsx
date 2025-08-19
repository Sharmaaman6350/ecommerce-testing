import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sampleProducts } from "../../Data/ProductsData";
import ProductCard from "../../Components/ProductCard";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";

  const filteredProducts = sampleProducts.filter((product) => {
    const title = product.title.toLowerCase();
    const price = product.price.toLowerCase();
    const category = product.category?.toLowerCase();
    const subcategory = product.subcategory?.toLowerCase();
    const type = product.type?.toLowerCase();

    return (
      title.includes(searchQuery) ||
      category?.includes(searchQuery) ||
      subcategory?.includes(searchQuery) ||
      type?.includes(searchQuery) ||
      price?.includes(searchQuery)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for:{" "}
        <span className="text-pink-600">"{searchQuery}"</span>
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/ProductDetails/${product.id}`}>
              <ProductCard key={product.id} product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
