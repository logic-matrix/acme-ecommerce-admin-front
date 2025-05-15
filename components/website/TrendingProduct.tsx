"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const TrendingProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Gator Case Molded LCD TV & Monitor",
      price: 94.54,
      image: "/website/casing.png",
    },
    {
      id: 2,
      name: "Gator Case Molded LCD TV & Monitor",
      price: 94.54,
      image: "/website/casing.png",
    },
    {
      id: 3,
      name: "Gator Case Molded LCD TV & Monitor",
      price: 94.54,
      image: "/website/casing.png",
    },
    {
      id: 4,
      name: "Gator Case Molded LCD TV & Monitor",
      price: 94.54,
      image: "/website/casing.png",
    },
    {
      id: 5,
      name: "Gator Case Molded LCD TV & Monitor",
      price: 94.54,
      image: "/website/casing.png",
    },
    {
      id: 6,
      name: "Gator Case Molded LCD TV & Monitor",
      price: "94.54",
      image: "/website/casing.png",
    },
  ];

  const productsPerPage = 3;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const visibleProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-4xl font-bold">Trending Products.</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full border-gray-200"
            onClick={handlePrevPage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full border-gray-200"
            onClick={handleNextPage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visibleProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden border border-gray-100 rounded-lg shadow-sm"
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-50 rounded-md flex items-center justify-center mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-40 object-contain"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
                {product.name}
              </h3>
              <p className="text-sm font-medium text-gray-700 mt-1">
                ${product.price}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-black text-white hover:bg-gray-800 rounded">
                Add
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              currentPage === index ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(index)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
