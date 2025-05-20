import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="container mx-auto  py-12 md:py-24 bg-white">
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16">
        {/* Left side - Images */}
        <div>
          <div>
            <Image
              src="/website/aboutus-1.jpg"
              width={300}
              height={300}
              alt="Headphones on table"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Text content */}
        <div className="w-full md:w-1/2 space-y-6 order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About us.
          </h2>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Headquartered in <br />
              Southern California
            </h3>
            <p className="text-gray-600">
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
