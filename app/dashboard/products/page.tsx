"use client";

import axios from "axios";
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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  status: string;
  images: string[];
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

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
      );
      setProducts(response.data.data);
      // console.log(response.data.data);
    } catch {
      setError("Error fetching product data.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
        { withCredentials: true }
      );
      setSelectedProduct(response.data.data);
      // console.log(response.data.data);
      setShowViewDialog(true);
    } catch {
      alert("Error fetching product details.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
        { withCredentials: true }
      );
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Error deleting product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Product</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your product inventory
          </p>
        </div>
        <Link href="/dashboard/products/create">
          <Button className="cursor-pointer">Add Product</Button>
        </Link>
      </div>

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

      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>ID</CustomTableHead>
            <CustomTableHead>Product Name</CustomTableHead>
            <CustomTableHead>Category</CustomTableHead>
            <CustomTableHead>Price</CustomTableHead>
            <CustomTableHead>Stock</CustomTableHead>
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
              <CustomTableCell>
                <div className="flex gap-2">
                  <Eye
                    width={16}
                    className="cursor-pointer"
                    onClick={() => handleView(product.id)}
                  />
                  <Pencil width={16} className="cursor-pointer" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Trash2
                        className="text-red-500 cursor-pointer"
                        width={16}
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete product:{" "}
                          <strong>{product.name}</strong>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product.id)}
                        >
                          Yes, delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTableBody>
      </CustomTable>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">No products found.</div>
      )}

      {/* View Product Dialog */}
      {selectedProduct && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
              <DialogDescription>
                <div className="space-y-2 text-left">
                  <div className="flex gap-4">
                    <p>
                      <strong>Name:</strong>{" "}
                      <strong>{selectedProduct?.name}</strong>
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedProduct?.category.name}
                    </p>
                  </div>
                  <p>
                    <strong>Price:</strong> {selectedProduct?.price}
                  </p>
                  <p>
                    <strong>Stock:</strong> {selectedProduct?.stock}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedProduct?.status ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">Inactive</span>
                    )}
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {/* {selectedProduct?.images.length > 0 && (
                <div className="flex flex-col gap-2">
                  {selectedProduct.images.map((image) => (
                    <Image
                      key={image}
                      src={image}
                      height={128}
                      width={128}
                      alt="Product Image"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ))}
                </div>
              )} */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Page;
