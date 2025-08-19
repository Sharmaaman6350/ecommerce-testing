import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const productId = product._id || product.id;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const alreadyInWishlist = isInWishlist(productId);
    toggleWishlist(product);

    toast[alreadyInWishlist ? "info" : "success"](
      alreadyInWishlist ? "Item removed from wishlist" : "Item added to wishlist"
    );
  };

  const liked = isInWishlist(productId); // Recalculate every render

  return (
    <div className="relative group w-full max-w-xs">
      {/* ❤️ Wishlist Icon */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 text-xl transition duration-150 ${
          liked ? "text-pink-600" : "text-gray-400"
        } hover:scale-110`}
      >
        <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} />
      </button>

      <Link
        to={`/ProductDetails/${productId}`}
        className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
      >
        {/* Image */}
        <div className="flex justify-center items-center h-60 bg-white pt-8">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-full max-w-full"
          />
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="font-medium text-gray-800 line-clamp-2">
            {product.title}
          </h3>

          <p className="mt-1 text-lg font-bold text-black text-start">
            ₹{product.price}
          </p>

          {product.freeDelivery && (
            <p className="text-xs inline-block mt-1 px-2 py-1 bg-blue-100 border text-gray-600 rounded-2xl">
              Free Delivery
            </p>
          )}

          <div className="flex items-center gap-2 mt-3">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-2xl font-semibold">
              {product.rating || 5} <FontAwesomeIcon icon={fasStar} />
            </span>
            <span className="text-xs text-gray-700 ml-1">
              {product.reviews || 5} Reviews
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
