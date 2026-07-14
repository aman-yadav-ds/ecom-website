"use client";

import React, { useEffect, useState } from "react";
import { useCompareStore } from "@/store/useCompareStore";

interface CompareCheckboxProps {
  productId: string;
}

const CompareCheckbox: React.FC<CompareCheckboxProps> = ({ productId }) => {
  const { selectedProductIds, toggleProduct } = useCompareStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      className={`relative z-10 flex items-center gap-1.5 md:gap-2 cursor-pointer group/checkbox ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={(e) => e.stopPropagation()} // Prevent card click
    >
      <input 
        type="checkbox" 
        className="w-4 h-4 md:w-5 md:h-5 border-gray-300 rounded-sm text-brand-red focus:ring-brand-red cursor-pointer disabled:cursor-not-allowed" 
        checked={isSelected}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="text-[11px] sm:text-xs md:text-sm text-gray-600 font-medium leading-none">Compare</span>
    </label>
  );
};

export default CompareCheckbox;
