"use client";
import AboutUs from "@/components/website/AboutUs";
import CategoryCards from "@/components/website/CategoryCards";
import CTA from "@/components/website/CTA";
import CuratedElectronic from "@/components/website/CuratedElectronic";
import FeatureProduct from "@/components/website/FeatureProduct";
import HeroSlider from "@/components/website/HeroSlider";
import ShippingBenefits from "@/components/website/ShippingBenefits";
import SubscribeSection from "@/components/website/Subscrition";
import Testimonials from "@/components/website/Testimonials";
import { useUserStore } from "../../store/useUserStore";

const Home = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div>
      {/* <HeroSlider></HeroSlider> */}
      <HeroSlider />
      <AboutUs></AboutUs>
      <CategoryCards />
      <CuratedElectronic />
      <ShippingBenefits></ShippingBenefits>
      <FeatureProduct></FeatureProduct>
      <CTA />
      {/* <ShopByCategory></ShopByCategory> */}
      {/* <ProductShowcase></ProductShowcase> */}
      {/* <TrendingProducts></TrendingProducts> */}
      <Testimonials></Testimonials>
      <SubscribeSection></SubscribeSection>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Home;
