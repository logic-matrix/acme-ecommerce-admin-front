"use client";

import React, { useState } from "react";
import TotalStatCard from "@/components/dashboard/TotalStatCard";

import {
  CalendarDays,
  Eye,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { add } from "date-fns";
import ContactInfoLine from "@/components/dashboard/ContactInfoLine";
import TotalStatUserDetailsCard from "@/components/dashboard/TotalStatUserDetailsCard";

const UserPage = () => {
  const [selectedTab, setSelectedTab] = useState("All Users");

  const users = [
    {
      id: 1,
      name: "Tarikul Abir",
      role: "Admin",
      lastActive: "2 Hours ago",
      status: "Active",
      avatar: "/user1.png",
      address: "23 Main St, New York, NY 10001  ",
      email: "tarikulabir@gmailcom",
      phone: "+880 1234567890",
      createdAt: add(new Date(), { days: -2 }).toDateString(),
      totalOrders: 120,
      totalSpent: 1200,
    },
    {
      id: 2,
      name: "Tarikul Abir",
      role: "Admin",
      lastActive: "2 Hours ago",
      status: "Active",
      avatar: "/user1.png",
      address: "23 Main St, Dhaka, NY 10001  ",
      email: "tarikulabir@gmailcom",
      phone: "+880 1234567890",
      createdAt: add(new Date(), { days: -2 }).toDateString(),
      totalOrders: 120,
      totalSpent: 1200,
    },
    {
      id: 3,
      name: "Logic Matrix",
      role: "Admin",
      lastActive: "2 Hours ago",
      status: "Inactive",
      avatar: "/user1.png",
      address: "23 Main St, New York, NY 10001  ",
      email: "tarikulabir@gmailcom",
      phone: "+880 1234567890",
      createdAt: add(new Date(), { days: -2 }).toDateString(),
      totalOrders: 120,
      totalSpent: 1200,
    },
    {
      id: 4,
      name: "Tarikul Abir",
      role: "Admin",
      lastActive: "2 Hours ago",
      status: "Active",
      avatar: "/user1.png",
      address: "23 Main St, New York, NY 10001  ",
      email: "tarikulabir@gmailcom",
      phone: "+880 1234567890",
      createdAt: add(new Date(), { days: -2 }).toDateString(),
      totalOrders: 120,
      totalSpent: 1200,
    },
  ];

  const filteredUsers =
    selectedTab === "All Users"
      ? users
      : users.filter((user) => user.status === selectedTab);

  return (
    <div>
      <div className="pb-6">
        <h1 className="font-semibold text-3xl">Users</h1>
        <p className="font-medium text-gray-500 text-base">
          Manage your user accounts
        </p>
      </div>
      <div className="flex gap-5 mb-6">
        <TotalStatCard
          total={1200}
          growthPercentage={1.3}
          icon="/user.svg"
          title="total users"
        />
        <TotalStatCard
          total={1000}
          growthPercentage={1.3}
          icon="/user1.svg"
          title="active users"
        />
        <TotalStatCard
          total={120}
          growthPercentage={1.3}
          icon="/user.svg"
          title="inactive users"
        />
      </div>

      <div className="flex gap-3 mb-6">
        {["All Users", "Active", "Inactive"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-full font-medium text-sm border cursor-pointer ${
              selectedTab === tab
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        <CustomTable>
          <CustomTableHeader>
            <CustomTableRow>
              <CustomTableHead>User</CustomTableHead>
              <CustomTableHead>Role</CustomTableHead>
              <CustomTableHead>Last Active</CustomTableHead>
              <CustomTableHead>Status</CustomTableHead>
              <CustomTableHead>Actions</CustomTableHead>
            </CustomTableRow>
          </CustomTableHeader>
          <CustomTableBody>
            {filteredUsers.map((user) => (
              <CustomTableRow key={user.id} variant="striped">
                <CustomTableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                      width={32}
                      height={32}
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </CustomTableCell>
                <CustomTableCell>{user.role}</CustomTableCell>
                <CustomTableCell className="text-muted-foreground">
                  {user.lastActive}
                </CustomTableCell>
                <CustomTableCell>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </CustomTableCell>
                <CustomTableCell>
                  <div className="flex items-center gap-3 justify-center w-full">
                    <Dialog>
                      <DialogTrigger>
                        <Eye className="w-4 h-4 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent className="lg:min-w-[616px]">
                        <DialogHeader>
                          <DialogTitle>
                            <div>
                              <h2 className="font-semibold text-3xl">
                                User Details
                              </h2>
                              <p className="text-sm text-gray-500">
                                Detailed information about the selected user
                              </p>
                            </div>
                          </DialogTitle>
                          <DialogDescription>
                            <div>
                              <div className="flex items-center gap-4 mb-4 mt-6">
                                <div>
                                  <Image
                                    src={user.avatar}
                                    alt={user.name}
                                    className="rounded-full"
                                    width={56}
                                    height={56}
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg text-black">
                                      {user.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      #{user.role}
                                    </p>
                                  </div>
                                  <div>
                                    <p
                                      className={`text-xs inline-block px-3  rounded-[2px] ${
                                        user.status === "Active"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-200 text-red-600"
                                      }`}
                                    >
                                      {user.status}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Contact Information */}
                              <div className="bg-[#F9FBFC] p-4 rounded-md">
                                <h3 className="font-semibold text-lg">
                                  Contact Information
                                </h3>
                                <div>
                                  <ContactInfoLine
                                    icon={MapPin}
                                    label="Address"
                                    value={user.address}
                                  />
                                  <div className="flex items-center gap-2">
                                    <ContactInfoLine
                                      icon={Mail}
                                      label="Email"
                                      value={user.email}
                                    />
                                    <ContactInfoLine
                                      icon={Phone}
                                      label="Phone"
                                      value={user.phone}
                                    />
                                  </div>

                                  <ContactInfoLine
                                    icon={CalendarDays}
                                    label="Joined"
                                    value={user.createdAt}
                                  />
                                </div>
                              </div>
                              {/* details  */}
                              <div className="flex items-center gap-4 mt-6">
                                <TotalStatUserDetailsCard
                                  total={12}
                                  icon="/cart.svg"
                                  title="Total Orders"
                                />
                                <TotalStatUserDetailsCard
                                  total={1200}
                                  icon="/dollar.svg"
                                  currency
                                  title="inactive users"
                                />
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    <Link href={`/dashboard/users/${user.id}`} title="View">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <Link href={`/dashboard/users/${user.id}`} title="View">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Link>
                  </div>
                </CustomTableCell>
              </CustomTableRow>
            ))}
          </CustomTableBody>
        </CustomTable>
      </div>
    </div>
  );
};

export default UserPage;
