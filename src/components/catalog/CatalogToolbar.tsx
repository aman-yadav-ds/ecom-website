"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, X, Scale } from "lucide-react";
import { parseQueryParams, updateQueryParams, buildQueryString } from "@/lib/utils/query";
import { useCompareStore } from "@/store/useCompareStore";

export default function CatalogToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedProductIds } = useCompareStore();

  const currentSearch = searchParams.get("search") || "";
  const [prevSearch, setPrevSearch] = useState(currentSearch);
  const [inputValue, setInputValue] = useState(currentSearch);

  // Sync state if URL search param changes without effect
  if (prevSearch !== currentSearch) {
    setPrevSearch(currentSearch);
    setInputValue(currentSearch);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentParams = parseQueryParams(searchParams.toString());
    const query = inputValue.trim();

    let newQueryString = "";
    if (query) {
      newQueryString = updateQueryParams(currentParams, { search: query, page: 1 });
    } else {
      delete currentParams.search;
      delete currentParams.page;
      newQueryString = updateQueryParams(currentParams, {});
    }

    router.push(`?${newQueryString}`, { scroll: false });
  };

  const handleClearSearch = () => {
    setInputValue("");
    const currentParams = parseQueryParams(searchParams.toString());
    delete currentParams.search;
    delete currentParams.page;
    const newQueryString = updateQueryParams(currentParams, {});
    router.push(`?${newQueryString}`, { scroll: false });
  };

  const handleClearAll = () => {
    const currentParams = parseQueryParams(searchParams.toString());
    const newParams: Record<string, unknown> = {};
    if (currentParams.sort) newParams.sort = currentParams.sort;
    setInputValue("");
    const q = buildQueryString(newParams);
    router.push(`?${q}`, { scroll: false });
  };

  const compareQueryString =
    selectedProductIds.length > 0
      ? buildQueryString({ ids: selectedProductIds.join(",") })
      : "";

  return (
    <div className="bg-white rounded-2xl sm:rounded-full border border-light-300 p-2 sm:p-2.5 mb-6 sm:mb-8 shadow-xs font-jost overflow-hidden max-w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 w-full">
        
        {/* Left Side: Brand Red Diagonal Slash Accent + Search Input */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:flex-1 min-w-0">
          {/* Decorative Red Stripes (///) */}
          <div className="hidden sm:flex items-center gap-1 pl-2.5 text-brand-red select-none shrink-0" aria-hidden="true">
            <span className="w-1.5 h-6 bg-brand-red -skew-x-20 rounded-xs block"></span>
            <span className="w-1.5 h-6 bg-brand-red -skew-x-20 rounded-xs block"></span>
            <span className="w-1.5 h-6 bg-brand-red -skew-x-20 rounded-xs block"></span>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 flex items-center min-w-0 w-full">
            <Search className="absolute left-2.5 sm:left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-dark-400 pointer-events-none shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Find the right product for your needs..."
              className="w-full bg-transparent pl-8 sm:pl-9 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-dark-900 placeholder:text-dark-400 focus:outline-none truncate"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-1.5 sm:right-2 p-1 text-dark-400 hover:text-dark-900 rounded-full cursor-pointer"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right Side: Clear All + Compare Pill */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-light-200 shrink-0">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-dark-600 hover:text-brand-red transition-colors px-2 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg shrink-0"
          >
            Clear All
          </button>

          <Link
            href={`/compare${compareQueryString ? `?${compareQueryString}` : ""}`}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red whitespace-nowrap"
          >
            <Scale className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Compare Products ({selectedProductIds.length})</span>
            <span className="sm:hidden">Compare ({selectedProductIds.length})</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
