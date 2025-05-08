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
import { UploadCloud } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AddProductPage() {
  const [fileName, setFileName] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border ">
      <h2 className="text-2xl font-semibold ">Add Product</h2>

      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <Label htmlFor="productName" className="mb-3">
            Product Name
          </Label>
          <Input id="productName" placeholder="Enter product name" />
        </div>

        {/* Category  & Price*/}
        <div className="flex  justify-between">
          <div>
            <Label className="mb-3">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price" className="mb-3">
              Price
            </Label>
            <Input id="price" type="number" placeholder="Enter price" />
          </div>

          {/* Stock */}
          <div>
            <Label htmlFor="stock" className="mb-3">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Status */}
          <div>
            <Label className="mb-3">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Product Image Upload */}
        <div>
          <Label className="mb-3">Product Images</Label>
          <label
            htmlFor="product-image"
            className="flex items-center justify-center border border-dashed border-gray-400 p-4 rounded-md cursor-pointer hover:bg-gray-100 text-gray-500"
          >
            <UploadCloud className="mr-2 h-[200px]" />
            {fileName || "Click to upload or drag images here"}
          </label>
          <p className="text-sm text-gray-400 mt-1">
            Image size must be less than 3 MB
          </p>
          <input
            id="product-image"
            type="file"
            accept="image/*" // now accept only image
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setFileName(file.name);
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit">Add Product</Button>
        </div>
      </div>
    </div>
  );
}
