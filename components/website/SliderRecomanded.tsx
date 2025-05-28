"use client";
import productData from "@/data/product.data";
import { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductsCard from "./ProductsCard";

const SliderRecomanded = ({ heading }) => {
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextRef.current?.click();
    }, 4000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="py-10 mx-auto px-4">
      <div>
        <h2 className="font-bold text-3xl md:text-[48px] text-[#292D32]">
          {heading}
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
          <div className="hidden lg:block">
            <CarouselPrevious />
            <CarouselNext ref={nextRef} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default SliderRecomanded;
