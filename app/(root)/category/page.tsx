import BannarSection from "@/components/website/BannarSection";
import React from "react";

const CategoryPage = () => {
  return (
    <div className="min-h-screen md:container px-12 mx-auto">
      <div>
        <BannarSection
          imageurl="/website/bannercategorytopimg.jpg"
          title="SHOP"
        />
      </div>
    </div>
  );
};

export default CategoryPage;
