"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import TotalStatCard from "@/components/dashboard/TotalStatCard";
import { CalendarDays, Eye, Mail, Pencil, Trash2 } from "lucide-react";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditUserDialog } from "@/components/dashboard/users/EditUserDialog";
import ContactInfoLine from "@/components/dashboard/ContactInfoLine";
import { toast } from "sonner";

interface User {
  id: number;
  name: string | null;
  email: string;
  verified: boolean;
  image?: string | null;
  status: "active" | "inactive" | "suspended";
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse {
  success: boolean;
  data: User[];
}

const UserPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("All Users");
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    userId?: number;
    userRole?: string;
    userName?: string;
  }>({ isOpen: false });

  const [editDialogState, setEditDialogState] = useState<{
    isOpen: boolean;
    user?: User;
  }>({ isOpen: false });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<PaginatedResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
          {
            params: { page, limit },
            withCredentials: true,
          }
        );

        if (!data?.data || !Array.isArray(data.data)) {
          throw new Error("Invalid data format");
        }

        setUsers(data.data);
        setUserStats({
          total: data.data.length,
          active: data.data.filter((user) => user.verified).length,
          inactive: data.data.filter((user) => !user.verified).length,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
        setUsers([]);
      }
    };

    fetchUsers();
  }, [page, limit]);

  const handleDeleteUser = async (userId: number) => {
    try {
      const userToDelete = users.find((u) => u.id === userId);
      if (!userToDelete) return;

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
        {
          withCredentials: true,
        }
      );

      setUsers(users.filter((user) => user.id !== userId));
      setUserStats((prev) => ({
        ...prev,
        total: prev.total - 1,
        active: userToDelete.verified ? prev.active - 1 : prev.active,
        inactive: !userToDelete.verified ? prev.inactive - 1 : prev.inactive,
      }));

      toast.success("User deleted successfully");
      setDeleteDialogState({ isOpen: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to delete user");
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  const filteredUsers =
    selectedTab === "All Users"
      ? users
      : users.filter((user) => user.verified === (selectedTab === "Active"));

  return (
    <div>
      {/* Header */}
      <div className="pb-6">
        <h1 className="font-semibold text-3xl">Users</h1>
        <p className="font-medium text-gray-500 text-base">
          Manage your user accounts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-5 mb-6">
        <TotalStatCard
          total={userStats.total}
          growthPercentage={1.3}
          icon="/user.svg"
          title="total users"
        />
        <TotalStatCard
          total={userStats.active}
          growthPercentage={1.3}
          icon="/user1.svg"
          title="active users"
        />
        <TotalStatCard
          total={userStats.inactive}
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

      {/* Table */}
      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>User</CustomTableHead>
            <CustomTableHead>Role</CustomTableHead>
            <CustomTableHead>Last Updated</CustomTableHead>
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
                    src="/default-avatar.png"
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="font-medium">
                    {user.name || "Unnamed User"}
                  </span>
                </div>
              </CustomTableCell>
              <CustomTableCell>{user.role}</CustomTableCell>
              <CustomTableCell className="text-muted-foreground">
                {new Date(user.updatedAt).toLocaleString()}
              </CustomTableCell>
              <CustomTableCell>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    user.status === "active"
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
                              <Image
                                src="/default-avatar.png"
                                alt={user.name || "User"}
                                className="rounded-full"
                                width={56}
                                height={56}
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-lg text-black">
                                    {user.name || "Unnamed User"}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    #{user.role}
                                  </p>
                                </div>
                                <p
                                  className={`text-xs inline-block px-3 rounded-[2px] ${
                                    user.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-200 text-red-600"
                                  }`}
                                >
                                  {user.status}
                                </p>
                              </div>
                            </div>
                            <div className="bg-[#F9FBFC] p-4 rounded-md">
                              <h3 className="font-semibold text-lg">
                                Contact Information
                              </h3>
                              <ContactInfoLine
                                icon={Mail}
                                label="Email"
                                value={user.email}
                              />
                              <ContactInfoLine
                                icon={CalendarDays}
                                label="Joined"
                                value={new Date(
                                  user.createdAt
                                ).toLocaleDateString()}
                              />
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <button
                    title="Edit"
                    onClick={() => setEditDialogState({ isOpen: true, user })}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    title="Delete"
                    disabled={user.role === "admin"}
                    onClick={() =>
                      setDeleteDialogState({
                        isOpen: true,
                        userId: user.id,
                        userRole: user.role,
                        userName: user.name || "Unnamed User",
                      })
                    }
                  >
                    <Trash2
                      className={`w-4 h-4 text-red-500 ${
                        user.role === "admin" ? "opacity-50" : "cursor-pointer"
                      }`}
                    />
                  </button>
                </div>
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTableBody>
      </CustomTable>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-200 text-gray-500"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={users.length < limit}
          className={`px-4 py-2 rounded ${
            users.length < limit
              ? "bg-gray-200 text-gray-500"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Next
        </button>
      </div>

      {/* Delete Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogState.isOpen}
        onClose={() => setDeleteDialogState({ isOpen: false })}
        onConfirm={() => {
          if (deleteDialogState.userId) {
            handleDeleteUser(deleteDialogState.userId);
          }
        }}
        userName={deleteDialogState.userName || ""}
      />

      {/* Edit Dialog */}
      <EditUserDialog
        isOpen={editDialogState.isOpen}
        user={editDialogState.user}
        onClose={() => setEditDialogState({ isOpen: false })}
        onSuccess={async () => {
          try {
            const { data } = await axios.get<PaginatedResponse>(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
              {
                params: { page, limit },
                withCredentials: true,
              }
            );
            if (data?.success && Array.isArray(data.data)) {
              setUsers(data.data);
            }
          } catch (error) {
            console.error("Error refreshing users after edit:", error);
          }
        }}
      />
    </div>
  );
};

// Confirmation dialog with props properly typed
const DeleteConfirmationDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}> = ({ isOpen, onClose, onConfirm, userName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {userName}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserPage;
