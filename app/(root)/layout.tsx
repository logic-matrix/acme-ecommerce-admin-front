import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

// Configuring Inter Tight font
const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap", // Recommended for performance
});

export const metadata: Metadata = {
  title: "ACME-Electronics User Panel",
  description:
    "Welcome! to ACME-Electronics user panel. Get your service as you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={interTight.className}>
      <Navbar></Navbar>
      <div>{children}</div>
      <Footer></Footer>
    </main>
  );
}
