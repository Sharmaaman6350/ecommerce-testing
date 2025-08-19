import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const brandLogos = [
  "https://images.meesho.com/images/marketing/1743159322237.webp",
  "https://images.meesho.com/images/marketing/1743159363205.webp",
  "https://images.meesho.com/images/marketing/1743159377598.webp",
  "https://images.meesho.com/images/marketing/1743159393231.webp",
  "https://images.meesho.com/images/marketing/1743159415385.webp",
  "https://images.meesho.com/images/marketing/1744636558884.webp",
  "https://images.meesho.com/images/marketing/1744636599446.webp",
  "https://images.meesho.com/images/marketing/1743159302944.webp",
];

const BrandLogoSlider = () => {
  return (
    <>

      <div className="w-full py-6 bg-fuchsia-50 mt-8 flex justify-center items-center">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          speed={3000}
          slidesPerView={3}
          spaceBetween={30}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
        >
          {brandLogos.map((logo, index) => (
            <SwiperSlide key={index}>
              <img
                src={logo}
                alt={`Brand ${index}`}
                className="h-[100px] w-[200px] mx-auto object-contain opacity-90 hover:opacity-100 transition duration-300 bg-white rounded-xl p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(42,52,63,0.04),0_24px_68px_rgba(67,88,95,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default BrandLogoSlider;
