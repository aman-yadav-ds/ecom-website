"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2 } from "lucide-react";

const badges = [
  "ISO 9001:2015 Quality",
  "State Subsidy Compliant",
  "Pan-India Dealer Network",
];

export function AnimatedAboutContent() {
  return (
    <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-5 md:gap-7">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-brand-red text-xs font-bold uppercase tracking-widest border border-brand-red/20 shadow-xs">
          <Building2 className="w-4 h-4" />
          <span>KOREVA GLOBAL LLP Corporate Overview</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-dark-900 font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider relative pb-4 leading-tight">
          ABOUT KOREVA GLOBAL LLP
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-red rounded-full" />
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-dark-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
          <strong className="text-dark-900 font-extrabold">KOREVA GLOBAL LLP</strong> (operating as{" "}
          <strong className="text-dark-900 font-bold">Koreva Agriculture</strong> &{" "}
          <strong className="text-dark-900 font-bold">Koreva Machines / Koreva9</strong>) is a premier Indian manufacturer and exporter dedicated to empowering agricultural productivity. We engineer an advanced lineup of{" "}
          <strong className="text-dark-900 font-bold">Power Weeders</strong>, tractor-mounted{" "}
          <strong className="text-dark-900 font-bold">Harrows</strong>,{" "}
          <strong className="text-dark-900 font-bold">Rotavators</strong>, ISO 9001 certified{" "}
          <strong className="text-dark-900 font-bold">STOU Lubricants</strong>, and forged{" "}
          <strong className="text-dark-900 font-bold">Hand Tools</strong>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-dark-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium">
          Driven by innovation, OEM quality assurance, and a nationwide network of authorized dealer hubs, <strong className="text-dark-900 font-bold">Koreva Agriculture</strong> ensures every machine delivers long-lasting field reliability and exceptional return on investment for Indian farmers.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="mt-2 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-bold uppercase text-dark-800 tracking-wider">
          {badges.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-panel border border-light-300 shadow-xs text-[11px] sm:text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
              {badge}
            </span>
          ))}
        </div>
      </motion.div>

      {/* CTA Button — in-flow element so it never overlaps text or badges on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-4 sm:mt-6 w-full flex justify-center"
      >
        <a
          href="/about"
          className="inline-flex items-center justify-center gap-2 text-white bg-brand-red hover:bg-brand-red-accent border border-brand-red font-extrabold text-xs sm:text-sm transition-all duration-300 group px-7 sm:px-9 py-3.5 sm:py-4 rounded-full uppercase tracking-wider shadow-lg hover:shadow-brand-red/30 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red active:scale-95 cursor-pointer"
        >
          <span>Discover KOREVA Vision</span>
          <CheckCircle2 className="hidden" />
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}
