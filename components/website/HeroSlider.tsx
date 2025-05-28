"use client";

import { cn } from "@/lib/utils";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

// Configuring Bebas Neue
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Slider data
const sliderData = [
  {
    id: 1,
    title: "EMPOWER YOUR INNER POTENTIAL",
    description:
      "Lorem ipsum dolor sit amet consectetur. Et a nunc quisque elementum habitant. Lorem ipsum dolor sit amet consectetur. Et a nunc quisque elementum habitant.",
    image: "/website/hero-slider-1.jpg",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "EXPERIENCE PURE SOUND",
    description:
      "Immerse yourself in studio-quality audio with our premium noise-cancelling headphones designed for audiophiles and music lovers alike.",
    image: "/website/hero-slider-2.jpg",
    cta: "Learn More",
  },
  {
    id: 3,
    title: "DESIGNED FOR COMFORT",
    description:
      "Engineered with premium materials and ergonomic design for extended listening sessions without fatigue, perfect for work or play.",
    cta: "View Features",
    image: "/website/hero-slider-3.jpg",
  },
];

// Autoplay Plugin for Keen-Slider
const autoplayPlugin = (slider) => {
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
    }, 4000);
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

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged: (slider) => {
        setCurrentSlide(slider.track.details.rel);
      },
      created: (slider) => {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [autoplayPlugin]
  );

  const handleDotClick = (index) => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(index);
    }
  };

  return (
    <div className="container px-4 md:px-12 mx-auto">
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        {/* User testimonials - Hide on small screens for better focus on main content */}
        <div className="absolute top-4 sm:top-1/8 left-4 sm:left-8 z-20 flex items-center md:flex">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden"
              >
                <img
                  src="/website/client-image.png"
                  alt={`User ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start ml-2 sm:ml-3">
            <span className="text-white text-sm sm:text-base font-semibold">
              7,000+
            </span>
            <span className="text-white/80 text-xs sm:text-sm">
              People are our regular users
            </span>
          </div>
        </div>

        {/* Main Keen-Slider carousel */}
        <div
          ref={sliderRef}
          className="keen-slider h-full rounded-2xl md:rounded-4xl"
        >
          {sliderData.map((slide) => (
            <div key={slide.id} className="keen-slider__slide h-full">
              <div className="h-full border-0 rounded-none">
                <div className="flex items-center justify-start h-full p-0 relative">
                  {/* Background image with overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover rounded-2xl md:rounded-4xl"
                    />
                    <div className="absolute inset-0 bg-black/5 rounded-2xl md:rounded-4xl"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 md:p-10 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl">
                    <h1
                      className={cn(
                        bebasNeue.className,
                        "text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl tracking-tight mb-4 sm:mb-6 leading-tight lg:leading-[1.1]"
                      )}
                    >
                      {slide.title}
                    </h1>
                    <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                      {slide.description}
                    </p>
                    <Button className="bg-white text-[#292D32] font-semibold hover:bg-gray-200 rounded-full px-4 py-2 sm:px-6 sm:py-3 group capitalize text-sm sm:text-base">
                      {slide.cta}
                      <Image
                        src="/website/move-up-arrow.svg"
                        alt="arrow icon"
                        width={20} // Adjusted size for smaller screens
                        height={20} // Adjusted size for smaller screens
                        className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300", // Smaller dots on mobile
                currentSlide === index
                  ? "bg-white w-8 sm:w-11" // Wider active dot
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
