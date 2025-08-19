import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTurnDown,
  faMoneyBillWave,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";

const HeroBanner = ({ scrollToProducts }) => {
  return (
    <>
      {/* Main Banner with Text Overlay */}
      <div className="relative w-full">
        <img
          src="https://images.meesho.com/images/marketing/1753857426779.webp"
          alt="Meesho Banner"
          className="w-full h-auto object-cover"
        />

        {/* Overlay Text */}
        <div className="absolute top-1/4 right-90 text-left">
          <h2 className="text-5xl font-extrabold text-white mb-2">Smart Shopping</h2>
          <p className="text-white text-5xl font-extrabold">Trusted by Millions</p>

          {/* 👇 Scroll on button click */}
          <button
            onClick={scrollToProducts}
            className="mt-4 px-8 py-2 bg-white text-pink-600 font-bold text-2xl rounded border-1 hover:border-white"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Icon Strip */}
      <div className="flex justify-center items-center m-2">
        <div className="w-[1150px] border border-blue-300 h-[35px] rounded-xl flex items-center justify-around text-blue-950">
          <span>
            <FontAwesomeIcon icon={faArrowTurnDown} /> 7 Days Easy Return
          </span>
          <span>
            <FontAwesomeIcon icon={faMoneyBillWave} /> Cash on Delivery
          </span>
          <span>
            <FontAwesomeIcon icon={faHandHoldingDollar} /> Lowest Prices
          </span>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;



