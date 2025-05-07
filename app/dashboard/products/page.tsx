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

// Dummy product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$89.99",
    stock: 120,
    status: "pending",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Sportswear",
    price: "$59.49",
    stock: 80,
    status: "processing",
  },
  {
    id: 3,
    name: "Coffee Maker",
    category: "Home Appliance",
    price: "$35.00",
    stock: 60,
    status: "pending",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Gadgets",
    price: "$129.99",
    stock: 30,
    status: "cancelled",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Audio",
    price: "$45.25",
    stock: 200,
    status: "complete",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Audio",
    price: "$45.25",
    stock: 200,
    status: "complete",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-100 text-orange-500";
    case "processing":
      return "bg-purple-100 text-purple-500";
    case "cancelled":
      return "bg-red-100  text-red-500";
    case "complete":
      return "bg-green-100 text-green-500";

    default:
      return "bg-gray-100 text-gray-800";
  }
};

const page = () => {
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
      {/* TotalStat Card */}

      {/* Dashboard and date time and filter */}
      {/* TotalStat */}
      <div className="flex justify-between gap-2 mb-4">
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/user.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/order.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/dollar.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={-1.3}
          icon="/product.svg"
          title="total products"
        />
      </div>
      {/* Table  */}
      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>ID</CustomTableHead>
            <CustomTableHead>Product Name</CustomTableHead>
            <CustomTableHead>Category</CustomTableHead>
            <CustomTableHead>Price</CustomTableHead>
            <CustomTableHead>Stock</CustomTableHead>
            <CustomTableHead>Status</CustomTableHead>
            <CustomTableHead>Action</CustomTableHead>
          </CustomTableRow>
        </CustomTableHeader>
        <CustomTableBody>
          {products.map((product) => (
            <CustomTableRow key={product.id} variant="striped">
              <CustomTableCell>{product.id}</CustomTableCell>
              <CustomTableCell>{product.name}</CustomTableCell>
              <CustomTableCell>{product.category}</CustomTableCell>
              <CustomTableCell>{product.price}</CustomTableCell>
              <CustomTableCell>{product.stock}</CustomTableCell>
              <CustomTableCell className="capitalize">
                <span
                  className={`${getStatusColor(
                    product.status
                  )} px-3 rounded-4xl py-1 font-semibold `}
                >
                  {product.status}
                </span>
              </CustomTableCell>
              {/* Action Buttons */}
              <CustomTableCell>
                <div className="flex justify-between ">
                  <span>
                    <Eye width={16} />
                  </span>
                  <span>
                    <Pencil width={16} />
                  </span>
                  <span>
                    <Trash2 width={16} className="text-red-400" />
                  </span>
                </div>
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTableBody>
      </CustomTable>
    </div>
  );
};

export default page;
