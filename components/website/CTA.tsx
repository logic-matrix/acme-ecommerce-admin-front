import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoveUpRight } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="container mx-auto  py-12 px-6">
      <Card
        className="w-full h-[580px]  relative bg-[#1A1B1C] text-white border-0 rounded-lg shadow-xl "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 relative">
            {/* Left Content */}
            <div className="w-full  lg:w-2/3 z-10 space-y-4">
              <h2
                className={`${bebasNeue.className} text-4xl md:text-5xl lg:text-[112px] lg:leading-24 font-bold tracking-tight uppercase`}
              >
                UNLEASH THE POWER WITHIN YOU
              </h2>
              <p className="text-gray-300 max-w-md">
                Experience the next generation of performance. Designed for
                those who demand excellence in every aspect of their digital
                journey.
              </p>
              <Button
                variant="outline"
                className={`bg-white text-black hover:bg-gray-200 rounded-full px-6 py-2 mt-4 group transition-all duration-300 ${
                  isHovered ? "shadow-glow" : ""
                }`}
              >
                <span>Shop Now</span>
                <MoveUpRight className=" h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>

            <div className="relative w-full lg:w-1/2 flex justify-center items-start">
              <div className="absolute z-10 transform -rotate-12  lg:-translate-y-4/5 xl:-translate-x-32 xl:-translate-y-6 ">
                <Image
                  src="/website/cta-1.jpg"
                  width={200}
                  height={200}
                  alt="Headphones"
                  className="rounded-xl  md:w-[300px] md:h-[220px]"
                />
              </div>
              <div className=" hidden md:block absolute z-20 transform rotate-6 xl:translate-x-12 xl:translate-y-24  ">
                <Image
                  src="/website/cta-2.jpg"
                  width={200}
                  height={200}
                  alt="Headphones"
                  className="rounded-xl  md:w-[300px] md:h-[220px]  "
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
