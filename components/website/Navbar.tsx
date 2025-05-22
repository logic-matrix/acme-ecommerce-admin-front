"use client";

import { useUserStore } from "@/app/store/useUserStore";
import { handleLogout } from "@/lib/logout";
import { ChevronDown, Search, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  return (
    <div className="container mx-auto">
      <nav className="flex items-center justify-between py-4 px-6 md:px-12 bg-white">
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm hover:text-gray-500">
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center text-sm hover:text-gray-500">
              Shop all
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute z-10 hidden group-hover:block top-full left-0 w-48 bg-white shadow-lg rounded-md py-2">
              <Link
                href="/category/phones"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Phones
              </Link>
              <Link
                href="/category/watches"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Watches
              </Link>
              <Link
                href="/category/gaming"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Gaming
              </Link>
              <Link
                href="/category/audio"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Audio
              </Link>
            </div>
          </div>
          <Link href="/about-us" className="text-sm hover:text-gray-500">
            About us
          </Link>
          <Link href="/faqs" className="text-sm hover:text-gray-500">
            FAQs
          </Link>
          <Link href="/contact" className="text-sm hover:text-gray-500">
            Contact us
          </Link>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/acme-electronics.svg"
              width={140}
              height={34}
              alt="Company logo"
            />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-1 hover:text-gray-500">
            <Search size={20} />
          </button>
          <button className="p-1 hover:text-gray-500">
            <ShoppingBag size={20} />
          </button>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none hover:bg-gray-100 px-2 py-1 rounded-lg transition"
              >
                <div className="h-9 w-9 rounded-md bg-gray-200 flex items-center justify-center shadow-sm">
                  <User size={18} className="text-gray-700" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-gray-800">
                    {user?.name ? user.name : "Admin User"}
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform duration-200 ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-200">
                  <p
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center space-x-3 focus:outline-none  px-2 py-1 rounded-lg transition"
            >
              <div className="h-9 w-9 rounded-md flex items-center justify-center shadow-sm">
                <User size={18} className="text-gray-700" />
              </div>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 hover:text-gray-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-20 p-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-sm hover:text-gray-500">
                Home
              </Link>
              <Link href="/shop" className="text-sm hover:text-gray-500">
                Shop all
              </Link>
              <Link href="/about-us" className="text-sm hover:text-gray-500">
                About us
              </Link>
              <Link href="/faqs" className="text-sm hover:text-gray-500">
                FAQs
              </Link>
              <Link href="/contact" className="text-sm hover:text-gray-500">
                Contact us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
