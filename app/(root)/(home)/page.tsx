"use client";
import AboutUs from "@/components/website/AboutUs";
import BestSellers from "@/components/website/BestSeller";
import CuratedElectronic from "@/components/website/CuratedElectronic";
import HeroSection from "@/components/website/HeroSection";
import ProductShowcase from "@/components/website/ProductCard";
import ShippingBenefits from "@/components/website/ShippingBenefits";
import ShopByCategory from "@/components/website/ShopByCategory";
import SubscribeSection from "@/components/website/Subscrition";
import Testimonials from "@/components/website/Testimonials";
import TrendingProducts from "@/components/website/TrendingProduct";
import { useUserStore } from "../../store/useUserStore";

const Home = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div>
      <HeroSection></HeroSection>
      <AboutUs></AboutUs>
      <ShippingBenefits></ShippingBenefits>
      <CuratedElectronic></CuratedElectronic>
      <BestSellers></BestSellers>
      <ShopByCategory></ShopByCategory>
      <ProductShowcase></ProductShowcase>
      <TrendingProducts></TrendingProducts>
      <Testimonials></Testimonials>
      <SubscribeSection></SubscribeSection>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Home;
