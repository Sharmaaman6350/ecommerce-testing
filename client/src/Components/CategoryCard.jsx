import React from "react";

const CategoryCard = () => {
  const category = [
    {
      img: "https://images.meesho.com/images/marketing/1744634835018.webp",
      title: "Home Décor",
    },
    {
      img: "https://images.meesho.com/images/marketing/1744634654837.webp",
      title: "Ethnic wear",
    },

    {
      img: "https://images.meesho.com/images/marketing/1744634780426.webp",
      title: "Mens Wear",
    },
    {
      img: "https://images.meesho.com/images/marketing/1744634814643.webp",
      title: "Footwear",
    },
    {
      img: "https://images.meesho.com/images/marketing/1744634871107.webp",
      title: "Beauty",
    },
    {
      img: "https://images.meesho.com/images/marketing/1744634909968.webp",
      title: "Accessories",
    },
    {
      img: "https://images.meesho.com/images/marketing/1744634937295.webp",
      title: "Grocery",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center mt-4 gap-8 mb-4 ">
      {category.map((item, index) => (
        <div
          key={index}
          className="w-[150px] flex flex-col items-center text-center"
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-[100px] h-[100px] object-contain mb-2 hover:scale-105 "
          />
          <p className="text-sm font-medium text-gray-700">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
