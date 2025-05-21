import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  available?: boolean;
  rating?: number;
  image: string;
};

type ProductsCardProps = {
  product: Product;
};

export default function ProductsCard({ product }: ProductsCardProps) {
  return (
    <div className="p-4 rounded-lg border shadow-sm w-[322px]">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[282px] w-[299.96px] object-contain bg-black/5"
      />
      <h3 className="mt-2 font-bold text-lg">{product.name}</h3>
      <div className="flex justify-between">
        <p className="text-gray-500 flex items-center">
          <Star
            size={16}
            className="text-yellow-400 me-1"
            fill="currentColor"
          />
          {product.rating}
        </p>
        <p className="font-bold">${product.price}</p>
      </div>
      <div className="flex gap-2 mt-2">
        <Button>Add to Cart</Button>
        <Button variant="outline">Buy Now</Button>
      </div>
    </div>
  );
}
