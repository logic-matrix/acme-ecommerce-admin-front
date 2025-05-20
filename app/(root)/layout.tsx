// import Navbar from "@/components/Navbar";
import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar";
import type { Metadata } from "next";

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
    <main>
      <Navbar></Navbar>
      <div>{children}</div>
      <Footer></Footer>
    </main>
  );
}
