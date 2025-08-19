import React from "react";

const Banner3 = () => {
  const sideImages = [
    {
      src: "https://images.meesho.com/images/marketing/1744635893307.webp",
      title: "Summer Dresses",
    },
    {
      src: "https://images.meesho.com/images/marketing/1744635812270.webp",
      title: "Baggy Jeans",
    },
    {
      src: "https://images.meesho.com/images/marketing/1744635870215.webp",
      title: "Earrings",
    },
    {
      src: "https://images.meesho.com/images/marketing/1744635846873.webp",
      title: "Chic Flats",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Main Banner Image */}
      {/* Main Banner Image */}
      <img
        src="https://images.meesho.com/images/marketing/1744698143534.webp"
        alt="Meesho Banner"
        className="w-full h-auto object-cover"
      />

      {/* Overlay Row of Images */}
      <div className="absolute top-20 left-300 transform -translate-x-1/2 flex gap-12 px-6 py-3 rounded-xl shadow-lg">
  {sideImages.map((item, index) => (
    <div key={index} className="flex flex-col items-center">
      <img
        src={item.src}
        alt={item.title}
        className="w-[160px] h-[180px] rounded shadow-md mb-2 hover:scale-105 transition-transform duration-300"
      />
      <button className="bg-amber-50 text-fuchsia-950 font-bold w-40 hover:bg-amber-100 hover:scale-105 duration-300 border-amber-500 border rounded-xl p-2 transition">
        {item.title}
      </button>
    </div>
  ))}
</div>


      {/* Shop Now Button below the image row */}
      <div className="absolute top-[290px] right-345 transform -translate-x-1/2">
        <button className="bg-white text-fuchsia-950 font-extrabold text-3xl border border-amber-100 rounded-xl px-8 py-2  transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner3;
