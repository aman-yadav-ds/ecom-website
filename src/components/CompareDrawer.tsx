"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";
import { exampleProducts, exampleVariants } from "@/lib/details";

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
    };
  }).filter(Boolean) as { id: string; name: string; image: string }[];

  const queryParams = new URLSearchParams();
  if (selectedProductIds.length > 0) {
    queryParams.set("ids", selectedProductIds.join(","));
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Selected Products Area */}
          <div className="flex-1 flex items-center justify-center md:justify-start gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {/* Render 3 slots */}
            {[0, 1, 2].map((index) => {
              const product = selectedProducts[index];

              return (
                <div
                  key={index}
                  className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gray-50 border border-gray-200 rounded-lg flex-shrink-0"
                >
                  {product ? (
                    <>
                      <div className="relative w-full h-full p-2 flex flex-col items-center justify-center">
                        <div className="relative w-12 h-12 md:w-16 md:h-16 mb-1">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[10px] md:text-xs font-semibold text-center text-dark-900 line-clamp-2 leading-tight">
                          {product.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="absolute -top-2 -right-2 bg-white border border-gray-300 text-gray-500 hover:text-brand-red hover:border-brand-red rounded-full p-1 shadow-sm transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="text-gray-400 text-xs text-center px-2">
                      Add Product
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions Area */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={clearAll}
              className="text-sm font-medium text-gray-500 hover:text-dark-900 transition-colors"
            >
              Remove all and close
            </button>
            <Link
              href={`/compare?${queryParams.toString()}`}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-colors w-full sm:w-auto text-center"
            >
              Compare ({selectedProductIds.length})
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompareDrawer;
