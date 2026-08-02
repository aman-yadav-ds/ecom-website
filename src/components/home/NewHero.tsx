"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, Award, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function NewHero() {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden font-jost bg-[#fbfbfb] py-16 md:py-24 border-b border-light-300">
      {/* Background Facility Image with Soft Light Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about_factory_1784013199832.jpg"
          alt="KOREVA GLOBAL LLP Agricultural Machinery Manufacturing Facility"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 filter brightness-95 opacity-20"
        />
        {/* Ambient Light Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfb]/90 via-[#fbfbfb]/80 to-[#fbfbfb] z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-red/8 rounded-full blur-[140px] pointer-events-none z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 md:gap-8">
        
        {/* Floating Glass Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-dark-900 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
            <span>KOREVA GLOBAL LLP — Precision Agricultural Equipment</span>
          </div>
        </motion.div>

        {/* H1 Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-dark-900 leading-[1.08]">
            POWER WEEDERS, HARROWS & <span className="text-brand-red">MACHINERY</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-dark-700 text-sm sm:text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Engineered for durability and high field productivity. Premier Indian manufacturer of ISO 9001 certified farm equipment, rotavators, lubricants, and SK5 tools.
          </p>
        </motion.div>

        {/* Quick Search Glass Pill Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl"
        >
          <div className="p-2 sm:p-3 rounded-full glass-panel-elevated border border-light-300 shadow-md flex items-center gap-2">
            <div className="pl-3 text-brand-red shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              readOnly
              placeholder="Search Power Weeders, Harrows, Rotavators..."
              className="w-full bg-transparent text-dark-900 placeholder-dark-500 text-xs sm:text-sm font-medium outline-none cursor-pointer"
              onClick={() => {
                const searchBtn = document.querySelector('button[aria-label="Product search"]') as HTMLButtonElement;
                if (searchBtn) searchBtn.click();
              }}
            />
            <Link
              href="/products"
              className="px-5 py-2.5 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-red-accent transition-colors shrink-0 shadow-xs flex items-center gap-1"
            >
              <span>Explore</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Popular Tag Pills */}
          <div className="mt-3 flex flex-wrap justify-center items-center gap-2 text-xs font-bold text-dark-600">
            <span className="text-dark-500 uppercase tracking-widest text-[10px]">Popular:</span>
            <Link href="/products/self-propelled-machinery?search=Power+Weeder" className="px-3 py-1 rounded-full glass-pill hover:bg-brand-red hover:text-white transition-all">
              Power Weeder
            </Link>
            <Link href="/products/tractor-attachments?search=Harrow" className="px-3 py-1 rounded-full glass-pill hover:bg-brand-red hover:text-white transition-all">
              Disc Harrow
            </Link>
            <Link href="/products/tractor-attachments?search=Rotavator" className="px-3 py-1 rounded-full glass-pill hover:bg-brand-red hover:text-white transition-all">
              Rotavator
            </Link>
          </div>
        </motion.div>

        {/* Dual Primary Light Glass CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2"
        >
          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-brand-red/30 flex items-center justify-center gap-2 group active:scale-95"
          >
            <span>View Full Machinery Catalog</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/dealers"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-white text-dark-900 border border-light-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Find Authorized Dealer</span>
          </Link>
        </motion.div>

        {/* Key Trust Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-light-300/80 w-full flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-bold text-dark-700 uppercase tracking-wider"
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-red" />
            <span>ISO 9001:2015 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-red" />
            <span>Pan-India Dealer Support</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-red" />
            <span>State Subsidy Compliant</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
