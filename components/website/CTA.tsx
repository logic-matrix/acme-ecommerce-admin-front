import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-full max-w-6xl mx-auto overflow-hidden relative bg-black text-white border-0 rounded-lg shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 relative">
          {/* Left Content */}
          <div className="w-full md:w-1/2 z-10 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold tracking-tight uppercase">
              UNLEASH THE POWER WITHIN YOU
            </h2>
            <p className="text-gray-300 max-w-md">
              Experience the next generation of performance. Designed for those
              who demand excellence in every aspect of their digital journey.
            </p>
            <Button
              variant="outline"
              className={`bg-white text-black hover:bg-gray-200 rounded-full px-6 py-2 mt-4 group transition-all duration-300 ${
                isHovered ? "shadow-glow" : ""
              }`}
            >
              <span>Shop Now</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Content - Image */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 relative">
            <div className="relative">
              {/* Glowing backdrop effect */}

              {/* Main image container */}
              <div className="flex  items-center">
                <div>
                  <Image
                    src="/website/cta-1.jpg"
                    width={200}
                    height={200}
                    alt="cta image"
                    className="w-[320px] h-[230px]"
                  />
                </div>

                <div>
                  <Image
                    src="/website/cta-2.jpg"
                    width={200}
                    height={200}
                    alt="cta image"
                    className="w-[320px] h-[230px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
