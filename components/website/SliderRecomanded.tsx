"use client";
import React, { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import productData from "@/data/product.data";
import ProductsCard from "./ProductsCard";

const SliderRecomanded = () => {
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextRef.current?.click();
    }, 30000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="py-10 mx-auto px-4">
      <div>
        <h2 className="font-bold text-3xl md:text-[48px] text-[#292D32]">
          Explore our recommendations.
        </h2>
      </div>
      <div className="mt-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {productData.slice(0, 5).map((product, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 lg:basis-1/2 xl:basis-1/3"
              >
                <div className="p-1">
                  <ProductsCard
                    key={product.id}
                    product={product}
                    className="md:w-[400px]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext ref={nextRef} />
        </Carousel>
      </div>
    </div>
  );
};

export default SliderRecomanded;
