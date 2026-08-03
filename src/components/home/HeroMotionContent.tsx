"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Award, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroMotionContent() {
  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5 md:gap-6">
      {/* Floating Glass Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-red/20 text-dark-900 text-xs font-extrabold uppercase tracking-widest shadow-xs">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
          <span>KOREVA GLOBAL — Precision Agricultural Equipment</span>
        </div>
      </motion.div>

      {/* H1 Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-dark-900 leading-[1.1]">
          SELF PROPELLED MACHINERY & <span className="text-brand-red">TRACTOR ATTACHMENTS</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-dark-800 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
          Engineered for durability and high field productivity. Premier Indian manufacturer of
          ISO 9001 certified farm equipment, rotavators, lubricants, and SK5 Hand tools.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mt-1"
      >
        <Link
          href="/products"
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-brand-red/30 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
        >
          <span>View Machinery Catalog</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/dealers"
          className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-panel hover:bg-white text-dark-900 border border-light-300 font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Find Authorized Dealer</span>
        </Link>
      </motion.div>

      {/* Trust Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="pt-5 border-t border-light-300/80 w-full flex flex-wrap justify-center items-center gap-5 sm:gap-8 text-xs font-extrabold text-dark-800 uppercase tracking-wider"
      >
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-brand-red" />
          <span>ISO 9001:2015 Certified</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-brand-red" />
          <span>Pan-India Dealer Support</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-brand-red" />
          <span>State Subsidy Compliant</span>
        </div>
      </motion.div>
    </div>
  );
}
