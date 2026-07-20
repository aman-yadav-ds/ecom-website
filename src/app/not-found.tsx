import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinNetworkModal from "@/components/JoinNetworkModal";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-light-100">
      <Navbar />
      <JoinNetworkModal />
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center font-jost">
        <h1 className="text-[120px] md:text-[180px] font-bold text-brand-dark leading-none tracking-tighter">
          404
        </h1>
        <div className="w-24 h-2 bg-brand-red mb-8"></div>
        <h2 className="text-2xl md:text-4xl font-bold text-dark-900 uppercase tracking-wide mb-4">
          Page Not Found
        </h2>
        <p className="text-dark-700 text-lg mb-10 max-w-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="bg-brand-red text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Return to Homepage
        </Link>
      </main>
      <Footer />
    </div>
  );
}
