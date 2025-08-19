import React from "react";

const Banner = ({ scrollToProducts }) => {
  const sideImages = [
    "https://images.meesho.com/images/marketing/1744722796811.webp",
    "https://images.meesho.com/images/marketing/1744635113661.webp",
    "https://images.meesho.com/images/marketing/1744635139351.webp",
    "https://images.meesho.com/images/marketing/1744635189897.webp",
  ];

  return (
    <div className="relative w-full">
      {/* Main Banner Image */}
      <img
        src="https://images.meesho.com/images/marketing/1744698265981.webp"
        alt="Meesho Banner"
        className="w-full h-auto object-cover"
      />

      {/* Responsive Overlay Grid */}
     <div className="absolute top-20 right-25 sm:top-8 lg:top-30 lg:right-85">
  <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-6 md:gap-x-6  md:gap-y-8 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[400px]">
    {sideImages.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Overlay ${index + 1}`}
        className="w-full h-auto rounded shadow-md hover:scale-105 transition-transform duration-300"
      />
    ))}
  </div>

  {/* Shop Now Button */}
  <div className="absolute flex flex-col items-center right-[950px] w-[200px] ">
    <button
      onClick={scrollToProducts}
      className="bg-amber-950 text-amber-100 border border-amber-100 rounded-2xl px-6 py-2 font-bold hover:bg-amber-800 transition"
    >
      Shop Now
    </button>
  </div>
</div>

    </div>
  );
};

export default Banner;
