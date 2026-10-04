"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import { ShowcaseProduct } from "./types";
import { ProductVisualStage } from "./ProductVisualStage";
import { ProductSpecTable } from "./ProductSpecTable";
import { useRfqStore } from "@/store/useRfqStore";

interface ProductShowcaseItemProps {
  product: ShowcaseProduct;
  index: number;
  total: number;
}

export function ProductShowcaseItem({
  product,
  index,
  total,
}: ProductShowcaseItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isSpecExpanded, setIsSpecExpanded] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const addRfqItem = useRfqStore((state) => state.addItem);

  // Scroll tracking across this individual product card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Entrance and exit animations for copy and UI elements (rolls back on scroll up)
  const contentY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [40, 0, 0, -30]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.2, 1, 1, 0.3]);

  // Current selected model
  const activeVariant = product.variants[activeVariantIndex];

  // Handler for adding directly to RFQ cart and opening modal
  const handleInstantQuote = () => {
    addRfqItem({
      productId: product.rfqDefaults.productId,
      variantId: activeVariant.id,
      name: `${product.title} - ${activeVariant.name}`,
      coverImage: activeVariant.image,
      quantity: 1,
    });
    setQuoteSuccess(true);
    setTimeout(() => setQuoteSuccess(false), 2500);
  };

  return (
    <div
      ref={containerRef}
      id={`showcase-product-${product.id}`}
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-white/10 overflow-hidden font-manrope"
    >
      {/* Dynamic Background Grid and Crosshair Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Product Category Telemetry Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-brand-red font-mono font-black text-xs sm:text-sm tracking-wider">
              {product.numericIndex} // {String(total).padStart(2, "0")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-400">
              {product.category}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center space-x-2 text-[11px] font-mono text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>COMMERCIAL DEPLOYMENT READY</span>
          </div>
        </div>

        {/* Master Responsive Grid: Visual Stage & Editorial HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          {/* Column A (Mobile: Visual Top, Desktop: Visual Stage) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              {/* The Cinematic Interactive Visual Stage */}
              <ProductVisualStage
                product={product}
                activeVariantIndex={activeVariantIndex}
                scrollYProgress={scrollYProgress}
              />
            </div>
          </div>

          {/* Column B: Editorial Information, Specs Deck & CTA */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            {/* Badge pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-red/15 border border-brand-red/30 text-brand-red text-xs font-black uppercase tracking-wider mb-3">
              <span>{product.badge}</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[48px] font-black text-white tracking-tight uppercase mb-2.5 leading-[1.08]">
              {product.title}
            </h2>

            {/* Sub-tagline */}
            <p className="text-sm sm:text-base lg:text-lg font-bold text-neutral-300 mb-6 tracking-tight">
              {product.tagline}
            </p>

            {/* Interactive Telemetry Specification Matrix */}
            <div className="mb-6">
              <ProductSpecTable
                product={product}
                activeVariantIndex={activeVariantIndex}
                onVariantChange={setActiveVariantIndex}
                isExpanded={isSpecExpanded}
                onToggleExpand={() => setIsSpecExpanded(!isSpecExpanded)}
              />
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
              {/* PRIMARY BUTTON: "Request for Price" leading to Product Page */}
              <Link
                href={`/products/${product.categorySlug}`}
                className="group relative inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-brand-red hover:bg-brand-deepred text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-xl shadow-brand-red/25 hover:shadow-brand-red/40 active:scale-[0.98] overflow-hidden text-center cursor-pointer"
              >
                {/* Sweeping Sheen Highlight Animation */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

                <span className="relative z-10">Request for Price</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              </Link>

              {/* SECONDARY QUICK ACTION: Instant 1-Click RFQ Quotation Modal Trigger */}
              <button
                type="button"
                onClick={handleInstantQuote}
                className="inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 hover:border-brand-red active:scale-[0.98] cursor-pointer"
              >
                {quoteSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-green-400 font-bold">Added to RFQ Quote!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-brand-red shrink-0" />
                    <span>Quick B2B Quote</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
