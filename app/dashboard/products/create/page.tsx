"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
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
import { Trash2, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MAX_IMAGE_SIZE = 100 * 1024 * 1024;

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface PreviewImage {
  dataUrl: string | ArrayBuffer | null;
  name: string;
  size: number;
  error?: boolean;
}

interface FormDataType {
  productName: string;
  category: string;
  price: string;
  stock: string;
  status: string;
  images: File[];
}

interface FormErrors {
  [key: string]: string;
}

const validateForm = (data: FormDataType): FormErrors => {
  const errors: FormErrors = {};
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
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataType>({
    productName: "",
    category: "",
    price: "",
    stock: "",
    status: "",
    images: [],
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`)
      .then((res) => {
        if (Array.isArray(res.data?.data)) {
          setCategories(res.data.data);
        } else {
          console.error("Invalid categories response", res.data);
        }
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

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
          reader.onerror = () => {
            resolve({
              dataUrl: "/placeholder.png",
              name: file.name,
              size: file.size,
              error: true,
            });
          };
          reader.readAsDataURL(file);
        })
    );

    Promise.all(previewPromises).then((previewResults) => {
      setPreviews((prev) => [...prev, ...previewResults]);
    });

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    const newImages = [...formData.images];
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    setPreviews(newPreviews);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const productPayload = new FormData();
    productPayload.append("name", formData.productName);
    productPayload.append("price", formData.price);
    productPayload.append("stock", formData.stock);
    productPayload.append(
      "status",
      formData.status === "available" ? "true" : "false"
    );
    productPayload.append("categoryId", formData.category);

    formData.images.forEach((image) => {
      productPayload.append("images", image);
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        productPayload,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      // console.log("Product added successfully:", res.data);
      if (res.data.success) {
        toast.success("Product added successfully");
        setFormData({
          productName: "",
          category: "",
          price: "",
          stock: "",
          status: "",
          images: [],
        });
        setPreviews([]);
        setFormErrors({});
        // window.location.href = "/dashboard/products";
        router.push("/dashboard/products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border"
    >
      <h2 className="text-2xl font-semibold">Add Product</h2>

      {/* Product Name */}
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Input
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter product name"
        />
        {formErrors.productName && (
          <p className="text-sm text-red-500">{formErrors.productName}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <Label>Category</Label>
        <Select
          value={formData.category}
          onValueChange={(val) => handleSelectChange("category", val)}
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
        {formErrors.category && (
          <p className="text-sm text-red-500">{formErrors.category}</p>
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
            placeholder="Enter price"
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
            placeholder="Enter stock"
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

      {/* Image Upload */}
      <div>
        <Label>Images</Label>
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
        </label>
        <input
          id="product-image"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
        {formErrors.images && (
          <p className="text-sm text-red-500">{formErrors.images}</p>
        )}
      </div>

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
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <Link href="/dashboard/products">
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </Link>
        <Button type="submit">Add Product</Button>
      </div>
    </form>
  );
}
