import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import productData from "@/data/product.data";
import ProductsCard from "./ProductsCard";

const SliderRecomanded = () => {
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
          className=""
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
        </Carousel>
      </div>
    </div>
  );
};

export default SliderRecomanded;
