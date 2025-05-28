// components/BestSellers.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import HeadingTitle from "./common/HeadingTitle";

const products = [
  {
    id: 1,
    name: "AirPods Max",
    price: "$234",
    image: "/website/bestselling-1.jpg",
    href: "/products/airpods-max",
  },
  {
    id: 2,
    name: "Anker 30W Adapter",
    price: "$234",
    image: "/website/bestselling-1.jpg",
    href: "/products/anker-adapter",
  },
  {
    id: 3,
    name: 'Redmi 23.8" Monitor',
    price: "$234",
    image: "/website/bestselling-1.jpg",
    href: "/products/redmi-monitor",
  },
  {
    id: 4,
    name: "Smart Watch Pro",
    price: "$199",
    image: "/website/bestselling-1.jpg",
    href: "/products/smart-watch",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: "$129",
    image: "/website/bestselling-1.jpg",
    href: "/products/wireless-earbuds",
  },
  {
    id: 6,
    name: "Portable Charger",
    price: "$79",
    image: "/website/bestselling-1.jpg",
    href: "/products/portable-charger",
  },
];

const FeatureProduct = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    created(s) {
      setLoaded(true);
      timer.current = setInterval(() => {
        s.next();
      }, 3000);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    destroyed() {
      if (timer.current) clearInterval(timer.current);
    },
  });

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <HeadingTitle title="Featured Products." />
          <Link href="/">
            <Button variant={"outline"}>View All</Button>
          </Link>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {products.map((product) => (
            <div key={product.id} className="keen-slider__slide">
              <Link href={product.href}>
                <Card className="overflow-hidden border border-gray-200 bg-gray-100 h-full transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-6 h-52">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="mt-2 font-medium text-gray-800">
                        {product.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* Dots for pagination */}
        {loaded && slider.current && (
          <div className="flex justify-center space-x-2 mt-8">
            {slider.current.track.details.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  slider.current?.moveToIdx(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? "w-8 bg-gray-800" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureProduct;
// export default FeatureProduct;
