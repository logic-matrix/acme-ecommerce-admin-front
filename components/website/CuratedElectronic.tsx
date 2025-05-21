// components/CuratedElectronic.jsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

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
    <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-5xl font-bold ">
            Curated Electronic
            <br />
            Ensemble.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productData.map((product) => (
            <Link key={product.id} href={product.link}>
              <Card className="w-[400px] h-[470px]">
                <CardContent>
                  <div className="flex flex-col justify-between">
                    <div className="p-6">
                      <h3 className="font-semibold text-2xl mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-[#8B8B8C]">
                        {product.description}
                      </p>
                    </div>
                    <div className="w-[315px] h-[300px]">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
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
