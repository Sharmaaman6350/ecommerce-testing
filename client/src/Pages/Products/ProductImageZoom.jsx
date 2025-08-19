import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImageZoom = ({ image }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Zoom>
        <img
          src={image}
          alt="Product"
          className="rounded-lg w-full object-cover"
        />
      </Zoom>
    </div>
  );
};

export default ProductImageZoom;
