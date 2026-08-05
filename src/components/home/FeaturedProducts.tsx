"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export interface FeaturedVariant {
  id: string;
  productId: string;
  price: string;
  images: string[];
  imagesAlt?: string[] | null;
}

export interface FeaturedProductItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  tags: string[];
  coverImage: string;
  coverImageAlt?: string | null;
  defaultVariantId?: string | null;
  isPublished: boolean;
  variants: FeaturedVariant[];
}

interface FeaturedProductsProps {
  products: FeaturedProductItem[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");

  const categoriesList = [
    { label: "All Equipment", value: "All" },
    { label: "Power Weeders", value: "self-propelled-machinery" },
    { label: "Harrows & Rotavators", value: "tractor-attachments" },
    { label: "STOU Lubricants", value: "lubricants" },
    { label: "SK5 Hand Tools", value: "hand-tools" },
  ];

  const displayedProducts = (products || [])
    .filter((product) => {
      if (!product.isPublished) return false;
      if (activeCategoryFilter === "All") return true;
      return product.categoryId === activeCategoryFilter;
    })
    .slice(0, 6);

  const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <section className="relative bg-[#fbfbfb] py-20 md:py-28 px-4 border-b border-light-300 font-jost overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-auto"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red"></div>
              <span className="text-brand-red font-extrabold tracking-widest text-xs md:text-sm uppercase">
                KOREVA GLOBAL LLP Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight">
              TOP AGRICULTURAL MACHINERY
            </h2>
            <p className="max-w-xl text-dark-700 text-sm md:text-base mt-3 md:mt-4 font-medium leading-relaxed">
              Discover high-efficiency <strong className="text-dark-900 font-bold">Power Weeders</strong>, tractor-mounted <strong className="text-dark-900 font-bold">Harrows</strong>, <strong className="text-dark-900 font-bold">Rotavators</strong>, ISO certified <strong className="text-dark-900 font-bold">STOU Lubricants</strong>, and <strong className="text-dark-900 font-bold">SK5 Hand Tools</strong>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block shrink-0"
          >
            <Link
              href="/products"
              className="flex items-center gap-2 text-brand-red border border-brand-red/50 hover:bg-brand-red hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 px-7 py-3.5 rounded-full group shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red active:scale-95"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Glassmorphic Category Tabs */}
        <div className="mb-10">
          <div className="flex flex-nowrap overflow-x-auto gap-2.5 hide-scrollbar pb-2">
            {categoriesList.map((tab) => {
              const isActive = activeCategoryFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveCategoryFilter(tab.value)}
                  className={`px-5 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                    isActive
                      ? "bg-brand-red text-white shadow-md border border-brand-red"
                      : "glass-card text-dark-800 hover:text-brand-red border border-light-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => {
              const productVariants = product.variants || [];
              const defaultVariant =
                productVariants.find((v) => v.id === product.defaultVariantId) ||
                productVariants[0];
              const price = defaultVariant ? Number(defaultVariant.price) : 0;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="group block rounded-2xl glass-card border border-light-300/80 hover:border-brand-red/40 overflow-hidden h-full flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red shadow-xs hover:shadow-md"
                  >
                    <div className="relative w-full h-[140px] sm:h-[200px] md:h-[260px] bg-white p-3 sm:p-6 flex items-center justify-center overflow-hidden border-b border-light-200">
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex items-center gap-1 glass-panel text-dark-900 text-[9px] sm:text-[10px] md:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider border border-light-300 shadow-xs">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-red fill-current" />
                        <span className="hidden xs:inline">KOREVA</span> Grade
                      </div>
                      <Image
                        src={product.coverImage}
                        alt={product.coverImageAlt || `${product.name} - KOREVA GLOBAL LLP Agricultural Equipment`}
                        width={280}
                        height={280}
                        className="object-contain transition-transform duration-500 group-hover:scale-108 w-full h-full"
                      />
                    </div>

                    <div className="p-3 sm:p-5 md:p-6 flex flex-col flex-grow bg-white/80 backdrop-blur-md">
                      <span className="text-[10px] sm:text-[11px] font-bold text-brand-red uppercase tracking-widest mb-1">
                        {product.tags[0] || "Machinery"}
                      </span>
                      <h3 className="text-dark-900 text-xs sm:text-base md:text-xl font-bold uppercase mb-1 sm:mb-2 group-hover:text-brand-red transition-colors duration-200 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-dark-600 text-[11px] sm:text-xs md:text-sm leading-relaxed line-clamp-1 sm:line-clamp-2 mb-2 sm:mb-4 font-medium">
                        {product.description}
                      </p>

                      <div className="mt-auto pt-2 sm:pt-4 border-t border-light-300 flex items-center justify-between gap-1">
                        <span className="text-xs sm:text-lg md:text-xl font-extrabold text-dark-900">
                          {price > 0 ? priceFormatter.format(price) : "Price on Request"}
                        </span>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-brand-red font-bold text-[10px] sm:text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform shrink-0">
                          <span className="hidden sm:inline">View Spec</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 text-white bg-brand-red hover:bg-brand-red-accent font-bold text-sm uppercase tracking-wider transition-all duration-300 px-8 py-4 rounded-full w-full shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
