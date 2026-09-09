"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseQueryParams, updateQueryParams } from "@/lib/utils/query";
import { ChevronDown, ArrowUpDown, Check } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Featured Lineup", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const Sort: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentSort = searchParams.get("sort") || "featured";
  const activeOption = SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  };

  const handleSelectOption = (value: string) => {
    const currentParams = parseQueryParams(searchParams.toString());
    const sortValue = value === "featured" ? null : value;
    const newQueryString = updateQueryParams(currentParams, { sort: sortValue, page: 1 });
    
    setIsOpen(false);
    router.push(`?${newQueryString}`, { scroll: false });
  };

  return (
    <div className="relative inline-block text-left w-full sm:w-auto font-jost" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="hidden sm:inline text-xs font-black uppercase tracking-wider text-dark-900 whitespace-nowrap">
          SORT BY:
        </span>

        {/* Custom Brand Styled Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Sort product catalog"
          className={`flex items-center justify-between gap-2 sm:gap-3 w-full sm:w-auto min-h-[34px] sm:min-h-[38px] px-3 sm:px-4 py-1 sm:py-1.5 bg-white border rounded-full shadow-2xs transition-all duration-200 text-xs font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
            isOpen
              ? "border-brand-red text-brand-red ring-1 ring-brand-red"
              : "border-light-300 text-dark-800 hover:border-brand-red/60 hover:text-brand-red"
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-red shrink-0" />
            <span className="truncate max-w-[120px] sm:max-w-none">{activeOption.label}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-dark-400 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180 text-brand-red" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Sort options"
          className="absolute right-0 top-full mt-2 w-full sm:w-60 bg-white/94 backdrop-blur-2xl border border-light-300/80 rounded-2xl shadow-2xl z-50 py-2 font-jost animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-brand-red border-b border-light-200 mb-1">
            Sort Options
          </div>
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === currentSort;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectOption(option.value)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-left transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                  isSelected
                    ? "bg-brand-red/10 text-brand-red font-extrabold"
                    : "text-dark-900 hover:bg-light-200 hover:text-brand-red"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-brand-red shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sort;

