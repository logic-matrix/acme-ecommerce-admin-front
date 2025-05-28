"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface ProductData {
  title: string;
  price: number;
  rating: number;
  reviews: string;
  stockStatus: string;
  productCode: string;
  brand: string;
  model: string;
  description: string;
  colors: string[];
  imagePaths: string[];
}

const dummyData: ProductData = {
  title: "AirPods Max",
  price: 299,
  rating: 5.0,
  reviews: "1.2k Reviews",
  stockStatus: "In Stock",
  productCode: "#123",
  brand: "Apple",
  model: "2nd Generation (2024)",
  description:
    "Lorem ipsum dolor sit amet consectetur. Et a a nunc quisque elementum habitant.",
  colors: ["#000000", "#cbd5e1", "#bae6fd", "#d9f99d", "#f0abfc"],
  imagePaths: [
    "/website/image-1.avif",
    "/website/image-2.avif",
    "/website/image-3.avif",
    "/website/image-1.avif",
  ],
};

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState<string>(
    dummyData.colors[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    dummyData.imagePaths[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 text-[#292D32]">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex md:flex-col gap-4">
          {dummyData.imagePaths.map((path, i) => (
            <Image
              key={i}
              src={path}
              alt="Thumbnail"
              width={80}
              height={80}
              className="cursor-pointer "
              onClick={() => setSelectedImage(path)}
            />
          ))}
        </div>
        <Card className="w-full">
          <CardContent className="p-4">
            <Image
              src={selectedImage}
              alt="Main Product"
              width={500}
              height={500}
              className="w-full object-contain "
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-semibold">{dummyData.title}</h2>
        <div className="text-sm text-muted-foreground flex justify-start items-center gap-2 font-medium">
          <Star size={14} color="#FF9500" fill="#FF9500" /> {dummyData.rating} (
          {dummyData.reviews})
        </div>

        <div className="flex justify-start items-center gap-5">
          <p className="text-2xl font-semibold ">${dummyData.price}</p>
          <Badge className="text-green-600 bg-green-100 font-semibold">
            {dummyData.stockStatus}
          </Badge>
          <Badge className="text-sm text-purple-600 bg-purple-100 font-semibold">
            Product Code:
            <span className="underline">{dummyData.productCode}</span>
          </Badge>
        </div>
        <p>{dummyData.description}</p>

        <div className="text-sm">
          <p>
            <strong>Brand:</strong> {dummyData.brand}
          </p>
          <p>
            <strong>Model Number:</strong> {dummyData.model}
          </p>
        </div>

        <div>
          <p className="font-medium">Choose Color</p>
          <div className="flex gap-2 mt-2">
            {dummyData.colors.map((color, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  selectedColor === color
                    ? "border-black"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="number"
            className="w-16 px-2 py-1 border rounded"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <Button className="w-full">
            <ShoppingCart /> Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
