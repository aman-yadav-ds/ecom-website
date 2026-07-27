"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";
import { exampleProducts, exampleVariants } from "@/lib/details";

export function FeaturedProducts() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");

  const categoriesList = [
    { label: "All Equipment", value: "All" },
    { label: "Power Weeders", value: "self-propelled-machinery" },
    { label: "Harrows & Rotavators", value: "tractor-attachments" },
    { label: "STOU Lubricants", value: "lubricants" },
    { label: "SK5 Hand Tools", value: "hand-tools" },
  ];

  // Filter products dynamically based on selected tab
  const displayedProducts = exampleProducts
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
    <section className="bg-light-200 py-16 md:py-24 px-4 border-b border-light-300 font-jost">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-6">
          <ScrollReveal animation="slide-left" className="w-full md:w-auto">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red"></div>
              <span className="text-brand-red font-bold tracking-widest text-xs md:text-sm uppercase">
                KOREVA GLOBAL LLP Featured Equipment
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black uppercase tracking-tight">
              TOP AGRICULTURAL PRODUCTS
            </h2>
            <p className="max-w-xl text-brand-dark text-sm md:text-base mt-3 md:mt-4 font-medium">
              Explore high-performance <strong className="text-dark-900 font-bold">Power Weeders</strong>, tractor <strong className="text-dark-900 font-bold">Harrows</strong>, <strong className="text-dark-900 font-bold">Rotavators</strong>, ISO certified <strong className="text-dark-900 font-bold">STOU Lubricants</strong>, and forged <strong className="text-dark-900 font-bold">Hand Tools</strong> built by <strong className="text-dark-900 font-bold">KOREVA GLOBAL LLP</strong>.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" className="hidden md:block shrink-0">
            <Link
              href="/products"
              className="flex items-center gap-2 text-brand-red border-2 border-brand-red hover:bg-brand-red hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 px-6 py-3 rounded-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="mb-8 border-b border-light-300">
          <div className="flex flex-nowrap overflow-x-auto gap-3 hide-scrollbar pb-3">
            {categoriesList.map((tab) => {
              const isActive = activeCategoryFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveCategoryFilter(tab.value)}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                    isActive
                      ? "bg-brand-red text-white shadow-md"
                      : "bg-white text-dark-700 hover:bg-light-300 hover:text-brand-red border border-light-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid with 200ms Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {displayedProducts.map((product, index) => {
            const productVariants = exampleVariants.filter((v) => v.productId === product.id);
            const defaultVariant = productVariants.find((v) => v.id === product.defaultVariantId) || productVariants[0];
            const price = defaultVariant ? Number(defaultVariant.price) : 0;

            return (
              <ScrollReveal key={product.id} animation="slide-bottom" delay={index * 100}>
                <Link
                  href={`/products/${product.id}`}
                  className="group block bg-white rounded-lg shadow-xs hover:shadow-xl transition-all duration-200 overflow-hidden border border-light-300 hover:border-brand-red h-full flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                >
                  <div className="relative w-full h-[240px] md:h-[270px] bg-gray-50/70 p-6 flex items-center justify-center">
                    {/* Premium Star Badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-brand-black text-white text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      <Star className="w-3 h-3 text-brand-red fill-current" />
                      KOREVA Grade
                    </div>
                    <Image
                      src={product.coverImage}
                      alt={`${product.name} - KOREVA GLOBAL LLP Agricultural Equipment`}
                      width={280}
                      height={280}
                      className="object-contain transition-transform duration-200 group-hover:scale-105 w-full h-full"
                    />
                  </div>

                  <div className="p-5 md:p-6 border-t border-light-200 bg-white flex flex-col flex-grow">
                    <span className="text-[11px] font-extrabold text-brand-red uppercase tracking-wider mb-1">
                      {product.tags[0] || "Equipment"}
                    </span>
                    <h3 className="text-brand-black text-lg md:text-xl font-bold uppercase mb-2 group-hover:text-brand-red transition-colors duration-200 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-dark-500 text-xs md:text-sm leading-relaxed line-clamp-2 mb-4 font-medium">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-light-200 flex items-center justify-between">
                      <span className="text-lg md:text-xl font-extrabold text-dark-900">
                        {price > 0 ? priceFormatter.format(price) : "Price on Request"}
                      </span>
                      <div className="flex items-center gap-1 text-brand-red font-bold text-xs uppercase tracking-wider">
                        <span>Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <ScrollReveal animation="fade" className="mt-8 flex justify-center md:hidden">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 text-white bg-brand-red hover:bg-brand-red-accent font-bold text-sm uppercase tracking-wider transition-all duration-200 px-8 py-3.5 rounded-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
