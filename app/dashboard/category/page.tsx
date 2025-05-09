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
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { add } from "date-fns";
import { Edit, Plus, Trash2 } from "lucide-react";
import React from "react";

const Categorypage = () => {
  const CategoryData = [
    {
      id: 1,
      name: "Mobile",
      status: "Active",
      products: 120,
      createdAt: add(new Date(), { days: -2 }).toDateString(),
    },
    {
      id: 2,
      name: "Laptop",
      status: "Active",
      products: 80,
      createdAt: add(new Date(), { days: -5 }).toDateString(),
    },
    {
      id: 3,
      name: "Tablet",
      status: "Inactive",
      products: 50,
      createdAt: add(new Date(), { days: -10 }).toDateString(),
    },
    {
      id: 4,
      name: "Headphones",
      status: "Active",
      products: 200,
      createdAt: add(new Date(), { days: -15 }).toDateString(),
    },
  ];

  return (
    <div>
      <div>
        {/* topdetails */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl text-gray-900 font-bold pb-2">
              Categories
            </h1>
            <p className="text-xs text-gray-500">
              Manage your product categories
            </p>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button className="cursor-pointer">
                  <Plus /> Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col py-4 gap-2">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="name" className="text-right">
                      Category Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Value"
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="name" className="text-right">
                      Status
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant={"outline"}
                    className="cursor-pointer"
                    type="submit"
                  >
                    Cancel
                  </Button>
                  <Button className="cursor-pointer" type="submit">
                    Add Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* Catetory Stats */}
        <div className="flex gap-4">
          <TotalStatCard
            total={5}
            growthPercentage={1.3}
            icon="/cube.svg"
            title="Total Categories"
          />
          <TotalStatCard
            total={4}
            growthPercentage={1.3}
            icon="/select.svg"
            title="Active Categories"
          />
          <TotalStatCard
            total={1200}
            growthPercentage={1.3}
            icon="/square.svg"
            title="Total Products"
          />
        </div>
        {/* Recent Categories */}
        <div className="p-4 mt-4">
          <div className="flex flex-col mb-4">
            <h1 className="font-semibold text-2xl">All Categories</h1>
          </div>
          <div>
            <CustomTable>
              <CustomTableHeader>
                <CustomTableRow>
                  <CustomTableHead>Name</CustomTableHead>
                  <CustomTableHead>Products</CustomTableHead>
                  <CustomTableHead>Created Date</CustomTableHead>
                  <CustomTableHead>Status</CustomTableHead>
                  <CustomTableHead>Actions</CustomTableHead>
                </CustomTableRow>
              </CustomTableHeader>
              <CustomTableBody>
                {CategoryData.map((category) => (
                  <CustomTableRow key={category.id} variant="striped">
                    <CustomTableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </CustomTableCell>
                    <CustomTableCell>{category.products}</CustomTableCell>
                    <CustomTableCell className="text-muted-foreground">
                      {category.createdAt}
                    </CustomTableCell>
                    <CustomTableCell>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          category.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {category.status}
                      </span>
                    </CustomTableCell>
                    <CustomTableCell>
                      <div className="flex items-center gap-3 justify-center w-full">
                        <div>
                          <Dialog>
                            <DialogTrigger>
                              <Edit className="cursor-pointer" />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit Category</DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col py-4 gap-2">
                                <div className="flex flex-col gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Category Name
                                  </Label>
                                  <Input
                                    id="name"
                                    defaultValue={category.name}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="flex flex-col gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Status
                                  </Label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="active">
                                          Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                          Inactive
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant={"outline"}
                                  className="cursor-pointer"
                                  type="submit"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="cursor-pointer"
                                  type="submit"
                                >
                                  Update Category
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <Trash2 className="text-red-500 cursor-pointer" />
                      </div>
                    </CustomTableCell>
                  </CustomTableRow>
                ))}
              </CustomTableBody>
            </CustomTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorypage;
