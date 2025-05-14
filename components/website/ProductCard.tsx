import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

// Product Card Component
const ProductCard = ({ title, subtitle, image }) => {
  //   const [selectedColor, setSelectedColor] = useState(colors[0]?.color || null);

  return (
    <Card className="overflow-hidden  shadow-md rounded-xl w-[600px] h-[550px] max-w-md bg-white">
      <CardHeader className="pt-6 pb-2 px-6">
        <h3 className="text-xl font-semibold text-center">{title}</h3>
        <p className="text-sm text-center text-blue-500">{subtitle}</p>
      </CardHeader>

      <CardFooter className="flex justify-center gap-3">
        <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
          Buy Now
        </Button>
        <Button variant="outline" className="border-gray-300 rounded-full px-6">
          View Detail
        </Button>
      </CardFooter>

      <CardContent className="flex justify-center ">
        <div className=" w-full flex justify-center">
          <Image
            width={554}
            height={350}
            src={image}
            alt={title}
            className=" object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component with Product Cards
export default function ProductShowcase() {
  const products = [
    {
      title: "iPhone 16",
      subtitle: "With Apple Intelligence",
      image: "/website/multiple-iphone.png",
    },
    {
      title: "MacBook Air",
      subtitle: "High Performance with M4",
      image: "/website/multiple-iphone.png",
    },
  ];

  return (
    <div className=" bg-gray-50 p-6 flex  justify-center container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            subtitle={product.subtitle}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
