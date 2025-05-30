"use client";

import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Assuming cn utility for Tailwind class merging
import Image from "next/image";
import React, { useState } from "react";

// Define types for order and user data
type OrderStatus = "All" | "Shipped" | "Delivered" | "Cancelled" | "Returned";

interface Order {
  id: string;
  date: string;
  time: string;
  orderNo: string;
  status: OrderStatus;
  productName: string;
  quantity: number;
  total: number;
  productImage: string;
}

interface UserDetails {
  name: string;
  status: string; // e.g., "Active"
  address: string;
  email: string;
  phone: string;
  joinedDate: string;
  profileImage: string;
}

// Dummy Data
const allOrders: Order[] = [
  {
    id: "1",
    date: "03-05-2025",
    time: "10:45 am",
    orderNo: "ORD-001",
    status: "Delivered",
    productName: "AirPods Max",
    quantity: 1,
    total: 299,
    productImage: "/website/headphone-2.jpg", // Placeholder image
  },
  {
    id: "2",
    date: "03-05-2025",
    time: "10:45 am",
    orderNo: "ORD-002",
    status: "Shipped",
    productName: "AirPods Max",
    quantity: 1,
    total: 299,
    productImage: "/website/headphone-2.jpg",
  },
  {
    id: "3",
    date: "03-05-2025",
    time: "10:45 am",
    orderNo: "ORD-003",
    status: "Cancelled",
    productName: "AirPods Max",
    quantity: 1,
    total: 299,
    productImage: "/website/headphone-2.jpg",
  },
  {
    id: "4",
    date: "03-05-2025",
    time: "10:45 am",
    orderNo: "ORD-004",
    status: "Returned",
    productName: "AirPods Max",
    quantity: 1,
    total: 299,
    productImage: "/website/headphone-1.jpg",
  },
  {
    id: "5",
    date: "03-05-2025",
    time: "11:00 am",
    orderNo: "ORD-005",
    status: "Delivered",
    productName: "Wireless Headphones",
    quantity: 2,
    total: 450,
    productImage: "/website/headphone-2.jpg", // Another placeholder
  },
];

// Initial dummy user details (can be null to simulate "no account detail")
const initialUserDetails: UserDetails | null = null; // Set to null initially

const App = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus>("All");
  const [hasAccountDetails, setHasAccountDetails] = useState(
    !!initialUserDetails
  ); // State to track if details exist
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [currentUserDetails, setCurrentUserDetails] =
    useState<UserDetails | null>(initialUserDetails);

  // Form states for the modal
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const filteredOrders =
    activeTab === "All"
      ? allOrders
      : allOrders.filter((order) => order.status === activeTab);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Returned":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddDetailsClick = () => {
    // Reset form fields when opening modal
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress1("");
    setAddress2("");
    setPhone("");
    setProfileImageFile(null);
    setProfileImagePreview(null);
    setIsModalOpen(true);
  };

  const handleSaveDetails = () => {
    // In a real app, you'd send this data to a backend
    // For now, simulate saving and update local state
    const newName = `${firstName} ${lastName}`.trim();
    const newJoinedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const updatedDetails: UserDetails = {
      name: newName || "New User", // Default name if empty
      status: "Active", // Default status
      address: `${address1}${address2 ? ", " + address2 : ""}`,
      email: email,
      phone: phone,
      joinedDate: newJoinedDate,
      profileImage: profileImagePreview || "/website/client-image.png", // Use preview or default
    };

    setCurrentUserDetails(updatedDetails);
    setHasAccountDetails(true);
    setIsModalOpen(false);
    alert("Account details saved!"); // Confirmation
  };

  const handleLogout = () => {
    // Simulate logout
    setCurrentUserDetails(null);
    setHasAccountDetails(false);
    alert("Logged out successfully!"); // Confirmation
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImageFile(null);
      setProfileImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-inter">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 max-w-7xl mx-auto">
        Account.
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Order History */}
        <div className="lg:col-span-2">
          <Card className="p-4 sm:p-6 rounded-xl shadow-lg mb-8">
            <CardContent className="p-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Order history
              </h2>

              {/* Order Status Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["All", "Shipped", "Delivered", "Cancelled", "Returned"].map(
                  (status) => (
                    <Button
                      key={status}
                      variant="outline"
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                        activeTab === status
                          ? "bg-gray-800 text-white hover:bg-gray-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                      onClick={() => setActiveTab(status as OrderStatus)}
                    >
                      {status}
                    </Button>
                  )
                )}
              </div>

              {/* Order List */}
              <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-xl shadow-sm bg-white"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                        <Image
                          src={order.productImage}
                          alt={order.productName}
                          width={60}
                          height={60}
                          className="object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/60x60/E0E0E0/333333?text=Img`;
                          }}
                        />
                      </div>

                      {/* Order Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                          <span
                            className={cn(
                              "text-xs font-medium px-2 py-1 rounded-full",
                              getStatusColor(order.status)
                            )}
                          >
                            {order.status}
                          </span>
                          <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                            {order.date} / {order.time} - Order no:{" "}
                            {order.orderNo}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {order.productName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {order.quantity}
                        </p>
                      </div>

                      {/* Total */}
                      <div className="flex-shrink-0 text-right sm:ml-4">
                        <span className="text-lg font-bold text-gray-900">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No orders found for this status.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Account Details */}
        <div className="lg:col-span-1">
          <Card className="p-4 sm:p-6 rounded-xl shadow-lg h-fit">
            <CardContent className="p-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Account details
              </h2>

              {hasAccountDetails && currentUserDetails ? (
                <>
                  {/* Profile Image and Name */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={currentUserDetails.profileImage}
                        alt={currentUserDetails.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/96x96/E0E0E0/333333?text=User`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {currentUserDetails.name}
                      </h3>
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {currentUserDetails.status}
                      </span>
                    </div>
                  </div>

                  {/* Contact and Address Details */}
                  <div className="space-y-4 text-gray-700 mb-6">
                    <div className="flex items-start">
                      <span className="w-6 flex-shrink-0 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin"
                        >
                          <path d="M12 12.72a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                          <path d="M12 18.5c-3.14 0-6.14-1.5-6.14-5.5S12 2 12 2s6.14 7.5 6.14 11c0 4-3 5.5-6.14 5.5Z" />
                        </svg>
                      </span>
                      <p className="text-sm flex-1">
                        {currentUserDetails.address}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 flex-shrink-0 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-mail"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <p className="text-sm">{currentUserDetails.email}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 flex-shrink-0 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-phone"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.07-8.63A2 2 0 0 1 4.08 2H7a2 2 0 0 1 2 1.73 15.9 15.9 0 0 0 1 4.54A2 2 0 0 1 8.83 12L7.5 13.34a15.96 15.96 0 0 0 8.66 8.66L16.66 14a2 2 0 0 1 2.31-2.26A15.9 15.9 0 0 0 20.27 9a2 2 0 0 1 1.73 2Z" />
                        </svg>
                      </span>
                      <p className="text-sm">{currentUserDetails.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 flex-shrink-0 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-calendar"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                      </span>
                      <p className="text-sm">
                        Joined {currentUserDetails.joinedDate}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1 bg-gray-800 text-white hover:bg-gray-700 rounded-xl px-6 py-3 text-base font-semibold"
                      onClick={handleAddDetailsClick} // Re-use for editing
                    >
                      Edit Details
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xl px-6 py-3 text-base font-semibold"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-gray-500 text-lg mb-4">
                    No account details available.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full px-4">
                    <Button
                      className="flex-1 bg-gray-800 text-white hover:bg-gray-700 rounded-xl px-6 py-3 text-base font-semibold"
                      onClick={handleAddDetailsClick}
                    >
                      Add Details
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xl px-6 py-3 text-base font-semibold"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="">
          <AlertDialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {hasAccountDetails
                ? "Edit Account Details"
                : "Add Account Details"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Provide your account information. Click save when you're done.
            </DialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center gap-2">
              <Label
                htmlFor="profileImage"
                className="text-sm font-medium text-gray-700"
              >
                Profile Image
              </Label>
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center">
                {profileImagePreview ? (
                  <Image
                    src={profileImagePreview}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user text-gray-400"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="col-span-3 mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* First Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right text-gray-700">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Last Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right text-gray-700">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Address 1 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address1" className="text-right text-gray-700">
                Address 1
              </Label>
              <Input
                id="address1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Address 2 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address2" className="text-right text-gray-700">
                Address 2
              </Label>
              <Input
                id="address2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right text-gray-700">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSaveDetails}
              className="bg-gray-800 text-white hover:bg-gray-700 rounded-xl px-6 py-3 text-base font-semibold"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
