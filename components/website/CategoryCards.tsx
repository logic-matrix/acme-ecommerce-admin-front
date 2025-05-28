import { Button } from "@/components/ui/button";
import Image from "next/image";

const categories = [
  {
    title: "Overhead Headphones",
    image: "/website/category-headphone.png", // Replace with your actual path
  },
  {
    title: "Game Joysticks",
    image: "/website/category-joystick.png",
  },
  {
    title: "Smart Watches",
    image: "/website/category-watches.png",
  },
];

const CategoryCards = () => {
  return (
    <section className="md:pt-12 pb-6 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="  py-3 md:p-6 rounded-2xl shadow-md flex flex-col-reverse justify-center  md:flex-row items-center md:justify-between w-full md:w-[400px] md:h-[190px] transition-transform hover:scale-105"
            >
              <div className=" w-1/2 h-full flex flex-col items-center md:items-start justify-between gap-2  ">
                <h3 className="text-xl md:text-2xl font-bold text-black px-1 text-center">
                  {item.title}
                </h3>
                <Button
                  variant="default"
                  className="rounded-full bg-black text-white hover:bg-gray-800 text-sm"
                >
                  Shop Now →
                </Button>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-full  object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
