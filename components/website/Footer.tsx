import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define footer links in separate arrays for better organization
const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Visit Our Store", href: "#" },
  { label: "Locate Us", href: "#" },
  { label: "Blog", href: "#" },
];

const legalLinks = [
  { label: "FAQs", href: "#" },
  { label: "Payment Info", href: "#" },
  { label: "Exchange And Returns", href: "#" },
  { label: "Track Your Order", href: "#" },
];

const quickLinks = [
  { label: "Shop All", href: "#" },
  { label: "Best Sellers", href: "#" },
  { label: "Deals", href: "#" },
  { label: "Trending Products", href: "#" },
];

const socialLinks = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "Youtube" },
];

const FooterLinkSection = ({ title, links }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-white">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-white hover:text-gray-300 text-sm"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1B1C] ">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/website/footer-logo.svg"
                width={140}
                height={35}
                alt="Acme logo"
              />
            </div>

            <p className="text-[#E2E4E6] text-sm">
              We offer a variety of tech products in various categories. Shipped
              from California
            </p>

            <div className="flex space-x-4 ">
              {socialLinks.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="  bg-[#555555] border rounded-full w-[50px] h-[50px] flex justify-center items-center "
                  aria-label={label}
                >
                  <Icon size={18} color="white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation sections */}
          <FooterLinkSection title="Company" links={companyLinks} />
          <FooterLinkSection title="Legal" links={legalLinks} />
          <FooterLinkSection title="Quick Links" links={quickLinks} />
        </div>

        {/* Brand Name */}
        <div className="relative mt-12 mb-8">
          <h2 className="text-4xl md:text-8xl tracking-widest font-[900] text-black/50 text-center">
            ACME ELECTRONICS
          </h2>
        </div>

        {/* Copyright section */}
        <Separator className="my-6 " />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#" className="">
              Privacy policy
            </Link>
            <Link href="#" className="">
              Terms of Use
            </Link>
          </div>
          <p>© {currentYear}, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
