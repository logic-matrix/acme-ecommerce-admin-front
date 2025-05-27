"use client";
import AboutUs from "@/components/website/AboutUs";
import CategoryCards from "@/components/website/CategoryCards";
import CTA from "@/components/website/CTA";
import CuratedElectronic from "@/components/website/CuratedElectronic";
import FeatureProduct from "@/components/website/FeatureProduct";
import HeroSlider from "@/components/website/HeroSlider";
import ShippingBenefits from "@/components/website/ShippingBenefits";
import ShopByCategory from "@/components/website/ShopByCategory";
import SpecialOffersCarousel from "@/components/website/SpecialOffersCarousel";
import SubscribeSection from "@/components/website/Subscrition";
import Testimonials from "@/components/website/Testimonials";
import { useUserStore } from "../../store/useUserStore";

const Home = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div>
      <HeroSlider />
      <AboutUs />
      <CategoryCards />
      <CuratedElectronic />
      <ShopByCategory />
      <FeatureProduct />
      <CTA />
      <ShippingBenefits />
      <SpecialOffersCarousel />
      <Testimonials />
      <SubscribeSection />
    </div>
  );
};

export default Home;
