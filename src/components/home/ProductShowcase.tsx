"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SHOWCASE_PRODUCTS } from "./product-showcase/showcase-data";
import { ProductShowcaseItem } from "./product-showcase/ProductShowcaseItem";
import { Shield, Sparkles, Layers, ChevronDown } from "lucide-react";

export function ProductShowcase() {
  const [activeProductId, setActiveProductId] = useState<string>(
    SHOWCASE_PRODUCTS[0]?.id || ""
  );

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToProduct = (id: string) => {
    const el = document.getElementById(`showcase-product-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="product-showcase"
      className="relative bg-[#0A0A0A] text-white overflow-hidden border-b border-white/10 select-none-safe"
      style={{
        contain: "paint",
      }}
    >
      {/* 0. Motion Graphics Dynamic Ambient Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-brand-red/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* 1. Master Section Header (Cinema Studio Feel - Balanced) */}
      <div className="pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 relative z-10 font-manrope">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              <span>Flagship Field Implements • Series 2026</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-[1.08] text-white">
              Industrial <span className="text-brand-red">Product Showcase</span>
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm lg:text-base max-w-xl mt-2 font-medium leading-relaxed">
              Explore high-torque agricultural powerhouses engineered with heat-treated boron metallurgy and sealed multi-speed transmissions for extreme field productivity.
            </p>
          </div>

          {/* Quick-Jump Machine Scrubber Tabs (Ready for 5 products) */}
          <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/10 shrink-0">
            {SHOWCASE_PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToProduct(p.id)}
                className="group relative px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-black uppercase tracking-wider text-neutral-300 hover:text-white transition-all duration-200 cursor-pointer flex items-center space-x-1.5 bg-black/40 hover:bg-white/10 border border-white/5 hover:border-brand-red/50"
              >
                <span className="text-brand-red font-mono text-[11px]">
                  {p.numericIndex}
                </span>
                <span>{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Interactive Product Stages */}
      <div className="relative">
        {SHOWCASE_PRODUCTS.map((product, index) => (
          <ProductShowcaseItem
            key={product.id}
            product={product}
            index={index}
            total={SHOWCASE_PRODUCTS.length}
          />
        ))}
      </div>
    </section>
  );
}
