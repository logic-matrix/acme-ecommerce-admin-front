"use client";

import React, { useState } from "react";
import TotalStatCard from "@/components/dashboard/TotalStatCard";

import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";

const UserPage = () => {
  const [selectedTab, setSelectedTab] = useState("All Users");

  const users = [
    {
      id: 1,
      name: "Tarikul Abir",
      role: "Admin",
      lastActive: "2 Hours ago",
      status: "Active",
      avatar: "/avatars/user1.jpg",
    },
    {
      id: 2,
      name: "Tarikul Abir",
      role: "Admin",
      lastActive: "2 Hours ago",
      status: "Active",
      avatar: "/avatars/user2.jpg",
    },
    {
      id: 3,
      name: "Tarikul Abir",
      role: "Admin",
      lastActive: "2 Hours ago",
      status: "Inactive",
      avatar: "/avatars/user3.jpg",
    },
    {
      id: 4,
      name: "Tarikul Abir",
      role: "Admin",
      lastActive: "2 Hours ago",
      status: "Active",
      avatar: "/avatars/user4.jpg",
    },
  ];

  const filteredUsers =
    selectedTab === "All Users"
      ? users
      : users.filter((user) => user.status === selectedTab);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="pb-6">
        <h1 className="font-semibold text-3xl">Users</h1>
        <p className="font-medium text-gray-500 text-base">
          Manage your user accounts
        </p>
      </div>

      {/* Stat Cards */}
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
          icon="/user.svg"
          title="active users"
        />
        <TotalStatCard
          total={120}
          growthPercentage={1.3}
          icon="/user.svg"
          title="inactive users"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["All Users", "Active", "Inactive"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-full font-medium text-sm border ${
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

      {/* User List Table */}
      <div>
        <h1 className="font-semibold text-2xl mb-1">User List</h1>
        <p className="font-medium text-gray-500 text-base mb-4">
          Manage your user accounts
        </p>

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
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
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
                  <div className="flex items-center gap-3">
                    <button title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button title="Delete">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
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
