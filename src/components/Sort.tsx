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
      <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Sort By:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="block w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-gray-900 cursor-pointer"
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
