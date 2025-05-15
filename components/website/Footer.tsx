// import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-gray-900">ACME</span>
              <span className="text-sm text-gray-700">ELECTRONICS</span>
            </div>

            <p className="text-gray-600 text-sm">
              We offer a variety of tech products in various categories. Shipped
              from California
            </p>

            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Visit Our Store
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Locate Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Payment Info
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Exchange And Returns
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Deals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Trending Products
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Large ACME background text */}
        <div className="relative mt-12 mb-8">
          <h2 className="text-6xl md:text-8xl font-bold text-gray-100 text-center">
            ACMELECTRONICS
          </h2>
        </div>

        {/* Footer Bottom */}
        <Separator className="my-6" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#" className="hover:text-gray-900">
              Privacy policy
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Terms of Use
            </Link>
          </div>
          <p>© 2025, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
