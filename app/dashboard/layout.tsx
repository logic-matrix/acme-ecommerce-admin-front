import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACME-Electronics Admin Panel",
  description:
    "Welcome! to ACME-Electronics admin panel. Get your service as you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* <DashboardSideNav /> */}
      <div className="flex flex-col flex-1 ml-60">
        {/* <DashboardTopNav /> */}
        <div className="bg-slate-200 flex-1 p-4 mt-12 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
