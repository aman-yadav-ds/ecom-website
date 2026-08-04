"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";
import { exampleProducts, exampleVariants } from "@/lib/details";
import { buildQueryString } from "@/lib/utils/query";

const CompareDrawer = () => {
  const { selectedProductIds, removeProduct, clearAll } = useCompareStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isVisible = selectedProductIds.length > 0;

  // Derive product details for the drawer
  const selectedProducts = selectedProductIds.map(id => {
    const product = exampleProducts.find(p => p.id === id);
    if (!product) return null;
    const variants = exampleVariants.filter(v => v.productId === id);
    const defaultVariant = variants.find(v => v.id === product.defaultVariantId) || variants[0];
    const image = product.coverImage || defaultVariant?.images?.[0] || "/placeholder.png";

    return {
      id,
      name: product.name,
      image,
      imageAlt: product.coverImageAlt || defaultVariant?.imagesAlt?.[0] || product.name,
    };
  }).filter(Boolean) as { id: string; name: string; image: string; imageAlt?: string }[];

  const queryStringResult = selectedProductIds.length > 0
    ? buildQueryString({ ids: selectedProductIds.join(",") })
    : "";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/94 backdrop-blur-3xl border-t border-light-300 shadow-2xl px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Selected Products Area */}
          <div className="flex-1 flex items-center justify-center md:justify-start gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {/* Render 3 slots */}
            {[0, 1, 2].map((index) => {
              const product = selectedProducts[index];

              return (
                <div
                  key={index}
                  className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/80 border border-light-300 rounded-2xl flex-shrink-0 shadow-xs"
                >
                  {product ? (
                    <>
                      <div className="relative w-full h-full p-2 flex flex-col items-center justify-center">
                        <div className="relative w-12 h-12 md:w-16 md:h-16 mb-1">
                          <Image
                            src={product.image}
                            alt={product.imageAlt || `${product.name} - Koreva Agriculture Equipment`}
                            fill
                            sizes="(max-width: 768px) 48px, 64px"
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-center text-dark-900 line-clamp-2 leading-tight">
                          {product.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-white border border-light-300 text-dark-700 hover:text-white hover:bg-brand-red hover:border-brand-red rounded-full flex items-center justify-center shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group"
                        aria-label="Remove product from comparison"
                      >
                        <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                      </button>
                    </>
                  ) : (
                    <div className="text-dark-400 text-xs font-medium text-center px-2">
                      Add Product
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions Area */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={clearAll}
              className="text-xs sm:text-sm font-bold text-dark-600 hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red min-h-[44px] px-4 py-2 uppercase tracking-wider"
            >
              Clear All
            </button>
            <Link
              href={`/compare${queryStringResult ? `?${queryStringResult}` : ""}`}
              className="bg-brand-red hover:bg-brand-red-accent text-white px-8 py-3.5 rounded-full font-extrabold shadow-md transition-all w-full sm:w-auto text-center flex items-center justify-center min-h-[44px] uppercase text-xs sm:text-sm tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red active:scale-95"
            >
              Compare Products ({selectedProductIds.length})
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
;

export default CompareDrawer;

