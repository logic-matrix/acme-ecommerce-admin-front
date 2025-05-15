"use client";
import Loader from "@/components/common/loader";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import TotalStatCard from "@/components/dashboard/TotalStatCard";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define interfaces for the product and category
interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  status: string;
  images: string[];
  description?: string | null;
  categoryId: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "low stock":
//       return "bg-orange-100 text-orange-500";
//     case "out of stock":
//       return "bg-red-100 text-red-500";
//     case "in stock":
//       return "bg-green-100 text-green-500";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch product data from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data.data);
      } catch {
        setError("Error fetching product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate stats for each category and show them in totalStatCard
  const inStockCount = products.filter((p) => p.status === "in stock").length;
  const lowStockCount = products.filter((p) => p.status === "low stock").length;
  const outOfStockCount = products.filter(
    (p) => p.status === "out of stock"
  ).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {/* product */}
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Product</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your product inventory
          </p>
        </div>
        <Link href="/dashboard/products/create">
          <Button>Add Product</Button>
        </Link>
      </div>

      {/* TotalStat */}
      <div className="flex justify-between gap-2 mb-4">
        <TotalStatCard
          total={products.length}
          growthPercentage={1.3}
          icon="/product.svg"
          title="total product"
        />
        <TotalStatCard
          total={inStockCount}
          growthPercentage={1.3}
          icon="/instock.svg"
          title="in stock"
        />
        <TotalStatCard
          total={lowStockCount}
          growthPercentage={1.3}
          icon="/lowstock.svg"
          title="low stock"
        />
        <TotalStatCard
          total={outOfStockCount}
          growthPercentage={-1.3}
          icon="/outofstock.svg"
          title="out of stock"
        />
      </div>

      {/* Table without tabs */}
      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>ID</CustomTableHead>
            <CustomTableHead>Product Name</CustomTableHead>
            <CustomTableHead>Category</CustomTableHead>
            <CustomTableHead>Price</CustomTableHead>
            <CustomTableHead>Stock</CustomTableHead>
            {/* <CustomTableHead>Status</CustomTableHead> */}
            <CustomTableHead>Action</CustomTableHead>
          </CustomTableRow>
        </CustomTableHeader>
        <CustomTableBody>
          {products.map((product) => (
            <CustomTableRow key={product.id} variant="striped">
              <CustomTableCell>{product.id}</CustomTableCell>
              <CustomTableCell>{product.name}</CustomTableCell>
              <CustomTableCell>{product.category.name}</CustomTableCell>
              <CustomTableCell>{product.price}</CustomTableCell>
              <CustomTableCell>{product.stock}</CustomTableCell>
              {/* <CustomTableCell className="capitalize">
                <span
                  className={`${getStatusColor(
                    product.status
                  )} px-3 rounded-4xl py-1 font-semibold`}
                >
                  {product.status}
                </span>
              </CustomTableCell> */}
              {/* Action Buttons */}
              <CustomTableCell>
                <div className="flex justify-between">
                  <span className="cursor-pointer">
                    <Eye width={16} />
                  </span>
                  <span className="cursor-pointer">
                    <Pencil width={16} />
                  </span>
                  <span className="cursor-pointer">
                    <Trash2 width={16} className="text-red-400" />
                  </span>
                </div>
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTableBody>
      </CustomTable>
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">No products found.</div>
      )}
    </div>
  );
};

export default Page;
