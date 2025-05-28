"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import HeadingTitle from "./common/HeadingTitle";

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

// Autoplay Plugin for Keen-Slider
const autoplay = (slider: number) => {
  let timeout;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2500); // Autoplay interval (2.5 seconds)
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

const ShopByCategory = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: 2,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 3, spacing: 20 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 6, spacing: 24 },
        },
      },
    },
    [autoplay] // Apply the autoplay plugin here
  );

  return (
    <section className="container mx-auto py-6 px-6 bg-gray-50">
      <HeadingTitle title="Shop by Category" />

      <div className="relative">
        {/* Arrow Left */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 p-2 bg-white border rounded-full shadow hover:bg-gray-100"
          aria-label="Previous category"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider bg-white p-6 rounded-xl">
          {categories.map((cat: Category) => (
            <div
              key={cat.name}
              className="keen-slider__slide flex flex-col items-center space-y-2 py-5 rounded-4xl  transition-transform cursor-pointer border hover:bg-gray-100 hover:shadow-xl"
            >
              <div className="w-16 h-16 flex items-center justify-center border rounded-full bg-gray-100">
                <Image src={cat.icon} alt={cat.name} width={32} height={32} />
              </div>
              <span className="text-lg leading-6">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Arrow Right */}
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 p-2 bg-white border rounded-full shadow hover:bg-gray-100"
          aria-label="Next category"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default ShopByCategory;
