import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareDrawer from "@/components/CompareDrawer";
import JoinNetworkModal from "@/components/JoinNetworkModal";
import CookieConsent from "@/components/CookieConsent";
import RfqModal from "@/components/RfqModal";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-light-100">
      <Navbar />
      {/* <Breadcrumb /> */}
      {children}
      <CompareDrawer />
      <JoinNetworkModal />
      <CookieConsent />
      <RfqModal />
      <Footer />
    </div>
  );
}
