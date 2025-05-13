import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center py-10 md:py-16">
          {/* Left side content */}
          <div className="relative z-10">
            <div className="absolute text-[10rem] font-bold text-gray-100/50 -left-6 -top-10 pointer-events-none">
              ACM
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Empower Your
              <br />
              Potential.
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg">
              Lorem ipsum dolor sit amet consectetur. At tortor et suspendisse
              et feugiat sed dictum maecenas.
            </p>
            <Link href="/shop">
              <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
            </Link>
          </div>

          {/* Right side images */}
          <div className="relative h-[28rem] hidden md:block">
            {/* Background blobs */}
            <div className="absolute inset-0">
              <div className="bg-purple-200 w-48 h-80 rounded-full absolute top-0 right-12"></div>
              <div className="bg-blue-200 w-48 h-48 rounded-full absolute top-0 right-0"></div>
              <div className="bg-orange-200 w-48 h-64 rounded-full absolute bottom-0 right-0"></div>
            </div>

            {/* Product images */}
            <div className="absolute top-10 left-16 bg-white/80 p-2 rounded-lg shadow-sm">
              <Image
                src="/images/phone.jpg"
                alt="Smartphone"
                width={150}
                height={200}
                className="rounded"
              />
            </div>

            <div className="absolute top-4 right-16 bg-white/80 p-2 rounded-full shadow-sm">
              <Image
                src="/images/watch.jpg"
                alt="Smartwatch"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>

            <div className="absolute bottom-8 left-16 bg-white/80 p-2 rounded-lg shadow-sm border-4 border-blue-500/20">
              <Image
                src="/images/controller.jpg"
                alt="Game Controller"
                width={150}
                height={120}
                className="rounded"
              />
            </div>

            <div className="absolute bottom-8 right-16 bg-white/80 p-2 rounded-lg shadow-sm">
              <Image
                src="/images/headphones.jpg"
                alt="Headphones"
                width={150}
                height={150}
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
