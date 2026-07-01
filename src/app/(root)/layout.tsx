import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-light-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
