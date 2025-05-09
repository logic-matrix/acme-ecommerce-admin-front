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
import { UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MAX_IMAGE_SIZE = 100 * 1024 * 1024;

// Form validation function
const validateForm = (data) => {
  const errors = {};

  if (!data.productName) errors.productName = "Product name is required";
  if (!data.category) errors.category = "Select a category";

  const price = Number(data.price);
  if (isNaN(price) || price < 1) errors.price = "Enter a valid price";

  const stock = Number(data.stock);
  if (isNaN(stock) || stock < 0) errors.stock = "Stock must be at least 0";

  if (!data.status) errors.status = "Select product status";

  if (!data.images || data.images.length === 0) {
    errors.images = "At least one image is required";
  } else {
    for (const file of data.images) {
      if (file.size > MAX_IMAGE_SIZE) {
        errors.images = "Each image must be less than 100 MB";
        break;
      }
    }
  }

  return errors;
};

export default function AddProductPage() {
  // Initialize state
  const [previews, setPreviews] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    status: "",
    images: [],
  });

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        if (preview.url) URL.revokeObjectURL(preview.url);
      });
    };
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select dropdown changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Store files in array to be submitted with form
    const allFiles = [...formData.images, ...selectedFiles];
    setFormData((prev) => ({
      ...prev,
      images: allFiles,
    }));

    // Generate preview data for each file
    const newPreviews = selectedFiles.map((file) => {
      // Create a FileReader to read the image safely
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            dataUrl: event.target.result, // Use DataURL instead of ObjectURL
            name: file.name,
            size: file.size,
          });
        };
        reader.onerror = () => {
          resolve({
            dataUrl: "/api/placeholder/200/150", // Fallback placeholder
            name: file.name,
            size: file.size,
            error: true,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    // Wait for all preview data to be generated
    Promise.all(newPreviews).then((previewResults) => {
      setPreviews((prev) => [...prev, ...previewResults]);
    });

    // Reset input so the same files can be selected again
    e.target.value = "";
  };

  // Remove image from selection
  const removeImage = (index) => {
    // Create copies without the removed item
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);

    const newImages = Array.from(formData.images);
    newImages.splice(index, 1);

    // Update state
    setPreviews(newPreviews);
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Submitted Data:", formData);
      // Here you would typically send data to your API
      alert("Product submitted successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          {formErrors.productName && (
            <p className="text-sm text-red-500">{formErrors.productName}</p>
          )}
        </div>

        {/* Category, Price, Stock, Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label className="mb-3">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.category && (
              <p className="text-sm text-red-500">{formErrors.category}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price" className="mb-3">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
            {formErrors.price && (
              <p className="text-sm text-red-500">{formErrors.price}</p>
            )}
          </div>

          <div>
            <Label htmlFor="stock" className="mb-3">
              Stock
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock"
            />
            {formErrors.stock && (
              <p className="text-sm text-red-500">{formErrors.stock}</p>
            )}
          </div>

          <div>
            <Label className="mb-3">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.status && (
              <p className="text-sm text-red-500">{formErrors.status}</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <Label className="mb-3">Product Images</Label>
          <label
            htmlFor="product-image"
            className="flex flex-col items-center justify-center border border-dashed border-gray-400 p-4 rounded-md cursor-pointer hover:bg-gray-100 text-gray-500"
          >
            <UploadCloud className="mb-2 h-12 w-12" />
            <span className="text-sm">
              {previews.length > 0
                ? `${previews.length} image(s) selected - Click to add more`
                : "Click to upload or drag images here"}
            </span>
            <span className="text-xs mt-1">Max file size: 100MB</span>
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            multiple={true}
            className="hidden"
            onChange={handleImageUpload}
          />
          {formErrors.images && (
            <p className="text-sm text-red-500">{formErrors.images}</p>
          )}

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group w-full h-32 rounded-md border overflow-hidden bg-gray-100"
                >
                  <img
                    src={preview.dataUrl}
                    alt={`preview ${preview.name}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs truncate px-2 py-1">
                    {preview.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Add Product</Button>
        </div>
      </div>
    </form>
  );
}
