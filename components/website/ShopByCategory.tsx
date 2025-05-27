"use client";

import Image from "next/image";

type Category = {
  name: string;
  icon: string;
};

const categories: Category[] = [
  { name: "Cables", icon: "/website/category-cable.svg" },
  { name: "Headphones", icon: "/website/category-headphone.svg" },
  { name: "Monitors", icon: "/website/category-monitor.svg" },
  { name: "Mobile Phones", icon: "/website/category-phone.svg" },
  { name: "Mouses", icon: "/website/category-mouse.svg" },
  { name: "Smart Watches", icon: "/website/category-watch.svg" },
];

const ShopByCategory = () => {
  return (
    <section className="container mx-auto px-6 bg-gray-50">
      <h1 className="text-[#292D32] text-5xl font-bold leading-28 mb-12">
        Shop by Category
      </h1>
      <div className="grid grid-cols-2 sm:grid-col-3 md:grid-cols-6 gap-6 bg-white p-6 ">
        {categories.map((cat: Category) => (
          <div
            key={cat.name}
            className="flex flex-col items-center space-y-2  py-5 rounded-4xl hover:scale-105 transition-transform cursor-pointer border hover:bg-gray-100 hover:shadow-xl "
          >
            <div className="w-16 h-16 flex items-center justify-center border  rounded-full bg-gray-100 ">
              <Image src={cat.icon} alt={cat.name} width={32} height={32} />
            </div>
            <span className="text-lg  leading-6">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
