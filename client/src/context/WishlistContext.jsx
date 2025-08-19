// src/context/WishlistContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Helper to normalize ID
  const getProductId = (product) => product._id || product.id;

  const toggleWishlist = (product) => {
    const productId = getProductId(product);

    setWishlistItems((prev) => {
      const exists = prev.find((item) => getProductId(item) === productId);
      if (exists) {
        return prev.filter((item) => getProductId(item) !== productId);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => getProductId(item) === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
