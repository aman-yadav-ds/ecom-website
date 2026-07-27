"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseQueryParams, updateQueryParams } from "@/lib/utils/query";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Price: Low to High", value: "price_asc" },
];

const Sort: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSort = searchParams.get("sort") || "featured";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const currentParams = parseQueryParams(searchParams.toString());
    
    // Default sort 'featured' doesn't need to be in URL
    const sortValue = value === "featured" ? null : value;
    
    const newQueryString = updateQueryParams(currentParams, { sort: sortValue });
    router.push(`?${newQueryString}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-bold text-gray-700 whitespace-nowrap uppercase tracking-wider text-xs">
        Sort By:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="block w-full min-h-[44px] px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 focus:ring-brand-red focus:border-brand-red text-gray-900 font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

};

export default Sort;
