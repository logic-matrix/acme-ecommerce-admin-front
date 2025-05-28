// components/CuratedElectronic.jsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import HeadingTitle from "./common/HeadingTitle";

const productData = [
  {
    id: 1,
    title: "Lightweight luxury earphones",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "/website/headphone-1.jpg",
    link: "/products/earphones",
  },
  {
    id: 2,
    title: "Upgrade your listening experience",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "/website/headphone-2.jpg",
    link: "/products/headphones",
  },
  {
    id: 3,
    title: "Discover exclusive collaborations",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "/website/headphone-3.png",
    link: "/collections/exclusive",
  },
];

const CuratedElectronic = () => {
  return (
    <div className="w-full py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          {/* Ensure HeadingTitle handles its own responsiveness or is centered */}
          <HeadingTitle title={"Curated Electronic\nEnsemble"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productData.map((product) => (
            <Link key={product.id} href={product.link} className="block">
              <Card className="w-full h-full flex flex-col justify-between overflow-hidden">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Remove default padding and allow flex column */}
                  <div className="p-6 pb-2">
                    <h3 className="font-semibold text-xl md:text-2xl mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-[#8B8B8C]">
                      {product.description}
                    </p>
                  </div>
                  <div className="relative w-full h-[250px] sm:h-[300px] flex-grow mt-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill // Use fill for better responsiveness with parent container
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Optimize image loading
                      className="object-cover object-center" // Ensure image covers and is centered
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuratedElectronic;
