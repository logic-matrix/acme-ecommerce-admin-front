import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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
    image: "/website/hero-slider-3.jpg",
    cta: "View Features",
  },
];

const HeroSlider = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Set up carousel API
  const onApiChange = (api) => {
    setApi(api);

    // Listen for carousel changes
    api?.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      // Pause auto-play temporarily when manually navigated
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    });
  };

  // Handle manual slide selection
  const handleDotClick = (index) => {
    if (!api) return;
    api.scrollTo(index);
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 1000); // Time interval

    return () => clearInterval(interval);
  }, [isAutoPlaying, api]);

  return (
    <div className="container px-4 md:px-12 mx-auto">
      <div className="relative w-full h-[90vh] overflow-hidden">
        {/* User testimonials */}
        <div className="absolute top-1/5 left-8 z-20 flex items-center">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden"
              >
                <img
                  src="/website/client-image.png"
                  alt={`User ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start ml-3">
            <span className="text-white text-base font-semibold">7,000+</span>
            <span className="text-white/80 text-sm">
              People are our regular users
            </span>
          </div>
        </div>

        {/* Main carousel */}
        <Carousel className="h-full" setApi={onApiChange}>
          <CarouselContent className="h-[90vh]">
            {sliderData.map((slide) => (
              <CarouselItem key={slide.id} className="h-full">
                <Card className="h-full border-0 rounded-none">
                  <CardContent className="flex items-center justify-start h-full p-0 relative">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={slide.image}
                        alt="Headphones"
                        className="w-full h-full object-cover rounded-4xl"
                      />
                      <div className="absolute inset-0 bg-black/5 rounded-4xl"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-10 max-w-4xl ">
                      <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-6">
                        {slide.title}
                      </h1>
                      <p className="text-white/80 mb-8 max-w-lg">
                        {slide.description}
                      </p>
                      <Button className="bg-white text-[#292D32] font-semibold hover:bg-gray-200 rounded-full px-3 group capitalize">
                        {slide.cta}
                        {/* <MoveUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /> */}
                        <Image
                          src="/website/move-up-arrow.svg"
                          alt="arrow"
                          width={24}
                          height={24}
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination dots */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300",
                current === index
                  ? "bg-white w-11"
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
