import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// Slider data
const sliderData = [
  {
    id: 1,
    title: "EMPOWER YOUR INNER POTENTIAL",
    description:
      "Lorem ipsum dolor sit amet consectetur. Et a nunc quisque elementum habitant. Lorem ipsum dolor sit amet consectetur. Et a nunc quisque elementum habitant.",
    image: "/website/headphones-slider.jpg",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "EXPERIENCE PURE SOUND",
    description:
      "Immerse yourself in studio-quality audio with our premium noise-cancelling headphones designed for audiophiles and music lovers alike.",
    image: "/website/headphones-slider.jpg",
    cta: "Learn More",
  },
  {
    id: 3,
    title: "DESIGNED FOR COMFORT",
    description:
      "Engineered with premium materials and ergonomic design for extended listening sessions without fatigue, perfect for work or play.",
    image: "/website/headphones-slider.jpg",
    cta: "View Features",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="container px-12 mx-auto">
      <div className="relative w-full h-[90vh]   overflow-hidden   ">
        {/* User testimonials */}
        <div className="absolute top-1/5 left-10 z-20 flex items-center">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden"
              >
                <img
                  src={`https://randomuser.me/api/portraits/${
                    i % 2 === 0 ? "men" : "women"
                  }/${i + 10}.jpg`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start ml-3">
            <span className="text-white  text-sm font-medium">7,000+</span>
            <span className="text-white/80  text-sm">
              People are our regular users
            </span>
          </div>
        </div>

        {/* Main carousel */}
        <Carousel
          className=""
          current={currentSlide}
          onSelect={(index) => {
            setCurrentSlide(index);
            setIsAutoPlaying(false);
            // Resume auto-play after manual interaction
            setTimeout(() => setIsAutoPlaying(true), 10000);
          }}
        >
          <CarouselContent className="h-[90vh] ">
            {sliderData.map((slide, index) => (
              <CarouselItem key={slide.id} className="h-full ">
                <Card className="h-full border-0 rounded-none">
                  <CardContent className="flex items-center justify-start h-full p-0 relative">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 z-0 rounded-4xl">
                      <img
                        src={slide.image}
                        alt="Headphones"
                        className="w-full h-full object-cover "
                      />
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-10 max-w-2xl">
                      <h1 className="text-white text-[127px] md:text-6xl font-bold tracking-tight mb-6">
                        {slide.title}
                      </h1>
                      <p className="text-white/80 mb-8 max-w-lg">
                        {slide.description}
                      </p>
                      <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 group">
                        {slide.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {sliderData.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              )}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
