import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SpecialOffersCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      productImage: "/website/specialoffer-1.jpg",
      productName: "Marshall ACTION II Speaker",
      productDescription:
        "Compact bluetooth speaker delivering room-filling sound",
      promoBackground: "bg-gradient-to-r from-neutral-800 to-neutral-950",
      promoText: "Black Friday Sale - 40% Off !",
      buttonText: "Check Offers",
    },
    {
      productImage: "/website/specialoffer-1.jpg",
      productName: "Sony WH-1000XM5",
      productDescription:
        "Premium noise cancelling headphones with crystal clear audio",
      promoBackground: "bg-gradient-to-r from-blue-800 to-indigo-900",
      promoText: "Limited Time Deal - 30% Off",
      buttonText: "Shop Now",
    },
    {
      productImage: "/website/specialoffer-1.jpg",
      productName: "Apple AirPods Pro",
      productDescription: "Active noise cancellation with transparency mode",
      promoBackground: "bg-gradient-to-r from-gray-800 to-gray-900",
      promoText: "Members Only - 25% Off",
      buttonText: "View Deal",
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container mx-auto px-6 ">
      <div className="  space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Special Offers Just For You.
        </h1>

        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full  flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                    {/* Product Card */}
                    <Card className="relative w-[600px] h-[600px] overflow-hidden bg-neutral-200  ">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={slide.productImage}
                            alt={slide.productName}
                            className=" absolute -top-6 "
                          />
                        </div>
                        <div className="p-4 absolute bottom-0 left-0 right-0 bg-black/70 text-white">
                          <h3 className="text-lg font-semibold">
                            {slide.productName}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {slide.productDescription}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Promo Card */}
                    <Card
                      className={`${slide.promoBackground} w-[600px] h-[600px] overflow-hidden text-white flex flex-col justify-center items-center text-center p-6 border-0`}
                    >
                      <CardContent className="flex flex-col items-center justify-center space-y-6 p-0 h-full">
                        <div className="space-y-4">
                          <h2 className="text-3xl md:text-4xl font-bold whitespace-pre-line">
                            {slide.promoText}
                          </h2>
                          <Button
                            variant="outline"
                            className="bg-white text-black hover:bg-gray-100 mt-4"
                          >
                            {slide.buttonText}
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicators (Pagination) */}
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-gray-800 w-8 " : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
