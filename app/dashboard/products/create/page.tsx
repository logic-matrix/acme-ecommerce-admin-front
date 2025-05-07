"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";

export default function AddProductModal() {
  const [fileName, setFileName] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" placeholder="Value" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Input" type="number" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" placeholder="Input" type="number" />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Product Images</Label>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md h-36 cursor-pointer text-sm text-muted-foreground"
            >
              <UploadCloud className="w-6 h-6 mb-2" />
              {fileName ? fileName : "Click to upload or drag images here"}
              <p className="text-xs text-gray-500 mt-1">
                Image Size Must be less than 3 MB
              </p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileName(file.name);
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit">Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
