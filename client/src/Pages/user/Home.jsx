import React, { useRef } from "react";
import HeroBanner from "../../Components/Banners/Banner1";
import Banner from "../../Components/Banners/Banner2";
import Banner3 from "../../Components/Banners/Banner3";
import CategoryCard from "../../Components/CategoryCard";
import BrandLogoSlider from "../../Components/Sliders/BrandLogoSlider";
import ProductSlider from "../../Components/Sliders/BrandProductSlider";
import ProductGrid from "../../Pages/products/ProductGrid";

const Home = () => {
  const productGridRef = useRef(null); // 👈 Step 1

  return (
    <>
      <HeroBanner scrollToProducts={() => productGridRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <CategoryCard />
      <Banner />
      <ProductSlider />
      <BrandLogoSlider />
      <Banner3 />
      
      {/* 👇 Attach ref here */}
      <div ref={productGridRef}>
        <ProductGrid />
      </div>
    </>
  );
};

export default Home;
