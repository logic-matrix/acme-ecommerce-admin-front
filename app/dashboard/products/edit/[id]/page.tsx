"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, UploadCloud } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const MAX_IMAGE_SIZE = 100 * 1024 * 1024;

interface Category {
  id: number;
  name: string;
}

interface PreviewImage {
  dataUrl: string | ArrayBuffer | null;
  name: string;
  size: number;
  error?: boolean;
}

interface ProductData {
  name: string;
  price: string;
  stock: string;
  status: string;
  categoryId: string;
  existingImages: string[]; // URLs
  images: File[];
}

interface FormErrors {
  [key: string]: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [formData, setFormData] = useState<ProductData>({
    name: "",
    price: "",
    stock: "",
    status: "",
    categoryId: "",
    existingImages: [],
    images: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`)
      .then((res) => {
        if (Array.isArray(res.data?.data)) {
          setCategories(res.data.data);
        }
      });
  }, []);

  // Fetch product data
  useEffect(() => {
    if (!productId) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}`)
      .then((res) => {
        const product = res.data?.data;
        setFormData({
          name: product.name,
          price: String(product.price),
          stock: String(product.stock),
          status: product.status ? "available" : "unavailable",
          categoryId: String(product.categoryId),
          existingImages: product.images || [],
          images: [],
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load product");
      });
  }, [productId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ProductData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const allFiles = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: allFiles }));

    const previewPromises = files.map(
      (file) =>
        new Promise<PreviewImage>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              dataUrl: event.target?.result ?? null,
              name: file.name,
              size: file.size,
            });
          };
          reader.readAsDataURL(file);
        })
    );

    Promise.all(previewPromises).then((newPreviews) =>
      setPreviews((prev) => [...prev, ...newPreviews])
    );
  };

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    const newImages = [...formData.images];
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    setPreviews(newPreviews);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name) errors.name = "Product name is required";
    if (!formData.categoryId) errors.categoryId = "Category is required";

    const price = Number(formData.price);
    if (isNaN(price) || price < 1) errors.price = "Valid price required";

    const stock = Number(formData.stock);
    if (isNaN(stock) || stock < 0) errors.stock = "Valid stock required";

    if (!formData.status) errors.status = "Status required";

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const updatePayload = new FormData();
    updatePayload.append("name", formData.name);
    updatePayload.append("price", formData.price);
    updatePayload.append("stock", formData.stock);
    updatePayload.append(
      "status",
      formData.status === "available" ? "true" : "false"
    );
    updatePayload.append("categoryId", formData.categoryId);

    formData.images.forEach((img) => updatePayload.append("images", img));

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}`,
        updatePayload,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        router.push("/dashboard/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border"
    >
      <h2 className="text-2xl font-semibold">Update Product</h2>

      {/* Product Name */}
      <div>
        <Label>Product Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product name"
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm">{formErrors.name}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <Label>Category</Label>
        <Select
          value={formData.categoryId}
          onValueChange={(val) => handleSelectChange("categoryId", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formErrors.categoryId && (
          <p className="text-sm text-red-500">{formErrors.categoryId}</p>
        )}
      </div>

      {/* Price, Stock, Status */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          {formErrors.price && (
            <p className="text-sm text-red-500">{formErrors.price}</p>
          )}
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          {formErrors.stock && (
            <p className="text-sm text-red-500">{formErrors.stock}</p>
          )}
        </div>
        <div>
          <Label>Status</Label>
          <Select
            value={formData.status}
            onValueChange={(val) => handleSelectChange("status", val)}
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

      {/* Existing Image Previews */}
      {formData.existingImages.length > 0 && (
        <div>
          <Label>Current Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.existingImages.map((url, idx) => (
              <img
                key={idx}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${url}`}
                alt={`Existing image ${idx}`}
                className="w-full h-32 object-cover border rounded"
              />
            ))}
          </div>
        </div>
      )}

      {/* Upload New Images */}
      <div>
        <Label>Upload New Images</Label>
        <label
          htmlFor="update-image"
          className="flex flex-col items-center justify-center border border-dashed border-gray-400 p-4 rounded-md cursor-pointer hover:bg-gray-100 text-gray-500"
        >
          <UploadCloud className="mb-2 h-10 w-10" />
          <span>Click to upload new images</span>
        </label>
        <input
          id="update-image"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group w-full h-32 rounded-md border overflow-hidden bg-gray-100"
            >
              <img
                src={preview.dataUrl as string}
                alt={`preview ${preview.name}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <Link href="/dashboard/products">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" className="cursor-pointer" disabled={loading}>
          Update Product
        </Button>
      </div>
    </form>
  );
}
