import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const products = [
  {
    id: 1,
    title: "Kurti Set",
    image: "https://images.meesho.com/images/marketing/1744635542873.webp",
    price: "₹499",
  },
  {
    id: 2,
    title: "Jeans",
    image: "https://images.meesho.com/images/marketing/1744635521751.webp",
    price: "₹799",
  },
  {
    id: 3,
    title: "Jeans",
    image: "https://images.meesho.com/images/marketing/1744635497001.webp",
    price: "₹799",
  },
  {
    id: 4,
    title: "Jeans",
    image: "https://images.meesho.com/images/marketing/1744635464683.webp",
    price: "₹799",
  },
  {
    id: 5,
    title: "Saree",
    image: "https://images.meesho.com/images/marketing/1744635432891.webp",
    price: "₹599",
  },
  {
    id: 6,
    title: "Saree",
    image: "https://images.meesho.com/images/marketing/1744635402151.webp",
    price: "₹599",
  },
  {
    id: 7,
    title: "Saree",
    image: "https://images.meesho.com/images/marketing/1744635614888.webp",
    price: "₹599",
  },
  {
    id: 8,
    title: "Saree",
    image: "https://images.meesho.com/images/marketing/1744635646070.webp",
    price: "₹599",
  },
];

const ProductSlider = () => {
  return (
    <div className=" bg-transparent px-4">
      <h2 className="text-3xl font-bold m-6 text-start">
        Original Brands{" "}
        <span className="text-indigo-600">
          <FontAwesomeIcon icon={faCheckCircle} />
        </span>
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0} // tight but visible gap
        slidesPerView={1.5}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
              <img
                src={product.image}
                alt={product.title}
                className=" h-[260px] object-cover"
              />
            
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
