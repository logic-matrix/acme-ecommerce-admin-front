"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const MAX_IMAGE_SIZE = 100 * 1024 * 1024;

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Select a category"),
  price: z.coerce.number().min(1, "Enter a valid price"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  status: z.string().min(1, "Select product status"),
  images: z
    .any()
    .refine(
      (files) =>
        files?.length &&
        Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      "Each image must be less than 100 MB"
    ),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProductPage() {
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormData) => {
    console.log("Submitted Data:", data);
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...files]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border"
    >
      <h2 className="text-2xl font-semibold">Add Product</h2>

      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <Label htmlFor="productName" className="mb-3">
            Product Name
          </Label>
          <Input
            id="productName"
            {...register("productName")}
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-sm text-red-500">{errors.productName.message}</p>
          )}
        </div>

        {/* Category, Price, Stock, Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label className="mb-3">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price" className="mb-3">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price")}
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="stock" className="mb-3">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              {...register("stock")}
              placeholder="Enter stock"
            />
            {errors.stock && (
              <p className="text-sm text-red-500">{errors.stock.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-3">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <Label className="mb-3">Product Images</Label>
          <label
            htmlFor="product-image"
            className="flex items-center justify-center border border-dashed border-gray-400 p-4 rounded-md cursor-pointer hover:bg-gray-100 text-gray-500"
          >
            <UploadCloud className="mr-2 h-[200px]" />
            {previews.length > 0
              ? `${previews.length} image(s) selected`
              : "Click to upload or drag images here"}
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            multiple
            {...register("images")}
            className="hidden"
            onChange={(e) => {
              handleImagePreview(e);
              register("images").onChange(e); // sync with react-hook-form
            }}
          />
          {errors.images && (
            <p className="text-sm text-red-500">{errors?.images?.message}</p>
          )}

          <div className="mt-4 grid grid-cols-3 gap-4">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative w-full h-32 overflow-hidden rounded-md border"
              >
                <img
                  src={src}
                  alt={`preview ${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit">Add Product</Button>
        </div>
      </div>
    </form>
  );
}
