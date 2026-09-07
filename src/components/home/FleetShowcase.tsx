"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench, ChevronRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fleetCategories = [
  {
    title: "Heavy Rotavators",
    subtag: "Tillage Machinery",
    spec: "35 - 75 HP Tractor Compatible",
    image: "/images/agri_machinery_new_1784014752914.jpg",
    link: "/products/tractor-attachments",
    desc: "Single & multi-speed heavy rotavators with boron steel L/C blades for fine seedbed preparation.",
  },
  {
    title: "Power Weeders & Tillers",
    subtag: "Self-Propelled",
    spec: "7.0 - 9.0 HP Petrol / Diesel",
    image: "/images/generated/cat_power_weeder.jpg",
    link: "/products/self-propelled-machinery",
    desc: "Direct shaft drive weeders designed for inter-crop de-weeding and soil aeration in sugarcane & orchards.",
  },
  {
    title: "Heavy Disc Harrows",
    subtag: "Primary Tillage",
    spec: "8x8 & 10x10 High-Carbon Discs",
    image: "/images/generated/cat_disc_harrow.jpg",
    link: "/products/tractor-attachments",
    desc: "Heavy notched boron discs breaking hard-pan clays and eradicating stubborn crop roots.",
  },
  {
    title: "SKS Precision Hand Tools",
    subtag: "Forged Implements",
    spec: "Drop-Forged SK5 High-Carbon",
    image: "/images/generated/cat_hand_tools.jpg",
    link: "/products/hand-tools",
    desc: "Ergonomic hedge shears, sickles, pruners, and grafting tools built for commercial horticulture.",
  },
  {
    title: "Crop Sprayers",
    subtag: "Crop Protection",
    spec: "16L - 20L 2-in-1 Knapsack",
    image: "/images/generated/cat_hand_sprayers.jpg",
    link: "/products/hand-tools",
    desc: "High-pressure continuous spray systems ensuring uniform pesticide and fertilizer foliar dispersion.",
  },
  {
    title: "STOU & Agri Lubricants",
    subtag: "High Viscosity Fluids",
    spec: "Universal Tractor Transmission Oil",
    image: "/images/lubricants_new_1784014772364.jpg",
    link: "/products/lubricants",
    desc: "Specialized gear & wet-brake hydraulic lubricants formulated for high-thermal tractor cycles.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function FleetShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-neutral-200 font-manrope" id="products">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 text-brand-red text-xs font-black uppercase tracking-widest mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Production Fleet</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black tracking-tight uppercase">
              Machinery &amp; <span className="text-brand-red">Equipment Categories</span>
            </h2>
          </div>

          <Link
            href="/products"
            prefetch={false}
            className="group mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-brand-red hover:text-brand-deepred transition-colors"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories Grid with Staggered Scroll Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {fleetCategories.map((cat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link
                href={cat.link}
                prefetch={false}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-brand-surface border border-neutral-200 hover:border-brand-red/60 shadow-xs hover:shadow-xl transition-all duration-400 cursor-pointer"
              >
                {/* Visual Container */}
                <div className="relative h-56 sm:h-64 w-full bg-neutral-900 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Subtag Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-neutral-900 px-2.5 py-1 rounded">
                      {cat.subtag}
                    </span>
                  </div>

                  {/* Spec Bar */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-bold text-brand-red bg-brand-black/90 px-2.5 py-1 rounded-lg border border-neutral-800 inline-block">
                      {cat.spec}
                    </span>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-black text-brand-black uppercase tracking-tight group-hover:text-brand-red transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-black group-hover:text-brand-red transition-colors">
                    <span>Explore Specifications</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
