"use client";
import React, { useState } from "react";
import BannarSection from "@/components/website/BannarSection";
import FiltersSidebar from "@/components/website/FiltersSidebar";
import ProductsCard from "@/components/website/ProductsCard";
import SearchBar from "@/components/website/SearchBar";
import ShippingBenefits from "@/components/website/ShippingBenefits";
import SubscribeSection from "@/components/website/Subscrition";
import productData from "@/data/product.data";
import SliderRecomanded from "@/components/website/SliderRecomanded";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  rating: number;
  image: string;
};

type Filters = {
  category: string;
  availability: string;
  priceRange: number;
  sortBy?: string;
};

const products: Product[] = productData;

const ShopPage = () => {
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    availability: "Available",
    priceRange: 1000,
    sortBy: "",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleFilterChange = (filter: {
    type: keyof Filters;
    value: string | number;
  }) => {
    setFilters((prev) => ({
      ...prev,
      [filter.type]: filter.value,
    }));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchCategory =
        filters.category === "All" || product.category === filters.category;
      const matchAvailability =
        filters.availability === "Available"
          ? product.available === true
          : filters.availability === "Unavailable"
          ? product.available === false
          : true;
      const matchPrice = product.price <= filters.priceRange;
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchAvailability && matchPrice && matchSearch;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "newest":
          return b.id - a.id;
        case "oldest":
          return a.id - b.id;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen md:container px-12 mx-auto">
      <BannarSection
        imageurl="/website/bannercategorytopimg.jpg"
        title="SHOP"
      />

      <div className="flex flex-col md:flex-row gap-2 justify-between items-center my-4">
        <h2 className="text-3xl font-bold">Shop.</h2>
        <SearchBar search={search} onSearch={handleSearch} />
      </div>

      <div className="flex flex-col md:flex-row min-h-screen mt-5 md:mt-0">
        <div className="flex justify-center md:justify-start">
          <FiltersSidebar filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {paginatedProducts.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>

          {paginatedProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No products found matching your Search
            </p>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-md cursor-pointer ${
                      currentPage === page
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`px-3 py-1 border rounded-md  ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <SliderRecomanded />
      <ShippingBenefits />
      <SubscribeSection />
    </div>
  );
};

export default ShopPage;
