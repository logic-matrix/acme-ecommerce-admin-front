"use client";
import BestSellers from "@/components/website/BestSeller";
import CuratedElectronic from "@/components/website/CuratedElectronic";
import HeroSection from "@/components/website/HeroSection";
import Navbar from "@/components/website/Navbar";
import ProductShowcase from "@/components/website/ProductCard";
import ShippingBenefits from "@/components/website/ShippingBenefits";
import ShopByCategory from "@/components/website/ShopByCategory";
import SubscribeSection from "@/components/website/Subscrition";
import TrendingProducts from "@/components/website/TrendingProduct";
import { useUserStore } from "../store/useUserStore";

const Home = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <ShippingBenefits></ShippingBenefits>
      <CuratedElectronic></CuratedElectronic>
      <BestSellers></BestSellers>
      <ShopByCategory></ShopByCategory>
      <ProductShowcase></ProductShowcase>
      <TrendingProducts></TrendingProducts>
      <SubscribeSection></SubscribeSection>
    </div>
  );
};

export default Home;
