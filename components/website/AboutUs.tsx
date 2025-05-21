import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="container mx-auto px-12 py-12 md:py-24 bg-white">
      <h2 className="text-3xl md:text-4xl px-12  mb-4 font-bold text-gray-900  ">
        About us.
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 ">
        {/* Left side - Images */}
        <div className="relative w-1/2 flex justify-center items-center">
          <div className="absolute z-10 transform -rotate-12 -translate-x-32 -translate-y-6">
            <Image
              src="/website/aboutus-1.jpg"
              width={300}
              height={300}
              alt="Headphones"
              className="rounded-xl shadow-lg w-[250px] h-[250px]"
            />
          </div>
          <div className="absolute z-20 transform rotate-6 translate-x-12 translate-y-24">
            <Image
              src="/website/aboutus-2.jpg"
              width={300}
              height={300}
              alt="Headphones"
              className="rounded-xl shadow-xl w-[250px] h-[250px]"
            />
          </div>
        </div>

        {/* Right side - Text content */}
        <div className="w-1/2 space-y-6 order-1 md:order-2">
          <div className="space-y-4">
            <h3 className="text-5xl md:text-3xl font-semibold text-gray-800">
              Headquartered in <br />
              Southern California
            </h3>
            <p className="text-gray-600 text-lg">
              We are an audio technology company focused on creating premium
              headphones that deliver exceptional sound quality. Our team of
              engineers and designers work together to craft products that
              combine innovative technology with elegant design, ensuring an
              immersive listening experience.
            </p>
            <p className="text-gray-600">
              Founded with a passion for music and sound, we continue to push
              the boundaries of audio technology while maintaining our
              commitment to quality and craftsmanship.
            </p>

            <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-5 mt-4 h-auto font-medium flex items-center gap-2">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
