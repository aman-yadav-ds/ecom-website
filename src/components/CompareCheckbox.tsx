"use client";

import React from "react";
import { useCompareStore } from "@/store/useCompareStore";

interface CompareCheckboxProps {
  productId: string;
}

const emptySubscribe = () => () => {};

const CompareCheckbox: React.FC<CompareCheckboxProps> = ({ productId }) => {
  const { selectedProductIds, toggleProduct } = useCompareStore();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) return null; // Avoid hydration mismatch

  const isSelected = selectedProductIds.includes(productId);
  const isMaxReached = selectedProductIds.length >= 3;
  const disabled = !isSelected && isMaxReached;

  const handleChange = () => {
    if (disabled) {
      alert("You can only compare up to 3 products at a time.");
      return;
    }
    toggleProduct(productId);
  };

  return (
    <label 
      className={`relative z-10 inline-flex items-center gap-1 sm:gap-1.5 cursor-pointer group/checkbox py-1 select-none shrink-0 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={(e) => e.stopPropagation()} // Prevent card click
    >
      <input 
        type="checkbox" 
        className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 border-light-300 rounded text-brand-red accent-[#C40000] focus:ring-brand-red cursor-pointer disabled:cursor-not-allowed shrink-0" 
        checked={isSelected}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="text-[10px] sm:text-xs text-dark-700 font-bold leading-none select-none group-hover/checkbox:text-brand-red transition-colors">
        Compare
      </span>
    </label>
  );
};

export default CompareCheckbox;
