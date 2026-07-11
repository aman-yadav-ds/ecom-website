"use client";

import React from "react";
import { Variant } from "@/lib/types";

interface VariantSelectorProps {
  variants: Variant[];
  activeVariantId: string;
  onVariantChange: (variantId: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  activeVariantId,
  onVariantChange,
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-dark-500 uppercase tracking-wider">
        Select Configuration
      </h3>
      <div 
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Product Variants"
      >
        {variants.map((variant) => {
          const isActive = variant.id === activeVariantId;
          return (
            <button
              key={variant.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onVariantChange(variant.id)}
              className={`px-5 py-2.5 rounded-sm text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-1 border ${
                isActive
                  ? "bg-brand-black text-light-100 border-brand-black shadow-md"
                  : "bg-light-100 text-dark-900 border-light-300 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {variant.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantSelector;
