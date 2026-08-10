"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sort from "./Sort";
import Filters from "./Filters";
import Card from "./Card";
import Pagination from "./Pagination";
import { parseQueryParams, removeQueryParam, buildQueryString } from "@/lib/utils/query";
import { Filter as FilterIcon, X } from "lucide-react";

export interface ProductListingItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  tags: string[];
  price: number;
  image: string;
  imageAlt?: string;
  variantsCount: number;
  technicalDetails: Record<string, string>;
  allVariantsTechnicalDetails?: Record<string, string>[];
}

interface ProductCatalogClientProps {
  products: ProductListingItem[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  availableFilters: Record<string, string[]>;
  initialCategory?: string;
}

export default function ProductCatalogClient({
  products,
  totalProducts,
  currentPage,
  totalPages,
  pageSize,
  availableFilters,
}: ProductCatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Derive active filters list for chip rendering
  const activeFilterChips = useMemo(() => {
    const params = parseQueryParams(searchParams.toString());
    const chips: { key: string; value: string; label: string }[] = [];

    Object.entries(params).forEach(([key, val]) => {
      if (key === "sort" || key === "page" || key === "limit") return;
      if (Array.isArray(val)) {
        val.forEach((v) => {
          if (typeof v === "string") {
            chips.push({
              key,
              value: v,
              label: `${key.replace(/([A-Z])/g, " $1").trim()}: ${v}`,
            });
          }
        });
      } else if (typeof val === "string") {
        if (key === "search") {
          chips.push({ key, value: val, label: `Search: "${val}"` });
        } else {
          chips.push({
            key,
            value: val,
            label: `${key.replace(/([A-Z])/g, " $1").trim()}: ${val}`,
          });
        }
      }
    });

    return chips;
  }, [searchParams]);

  const handleRemoveChip = (key: string, value: string) => {
    let newQueryString = removeQueryParam(searchParams.toString(), key, value);
    // Reset page to 1 when removing a filter
    const parsed = parseQueryParams(newQueryString);
    delete parsed.page;
    newQueryString = buildQueryString(parsed);
    router.push(`?${newQueryString}`, { scroll: false });
  };

  const handleClearAllFilters = () => {
    const currentParams = parseQueryParams(searchParams.toString());
    const newParams: Record<string, unknown> = {};
    if (currentParams.sort) newParams.sort = currentParams.sort;
    const q = buildQueryString(newParams);
    router.push(`?${q}`, { scroll: false });
  };

  const searchString = (searchParams.get("search") || "") as string;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-jost scroll-mt-24" id="product-catalog-section">
      {/* Top Header & Search Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          {searchString ? (
            <div className="flex flex-col items-start">
              <h2 className="text-xl md:text-2xl font-bold text-dark-900 uppercase tracking-wide">
                SEARCH RESULT FOR &quot;{searchString.toUpperCase()}&quot; ({totalProducts})
              </h2>
              <div className="w-8 h-1 bg-brand-red mt-2 mb-2"></div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-dark-900 uppercase tracking-wide">
                Equipment & Supplies
              </h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                {totalProducts > 0
                  ? `Showing ${totalProducts} matching items`
                  : "No products available"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Active Filter Chips / Pills */}
      {activeFilterChips.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 p-3.5 bg-white/80 backdrop-blur-md rounded-2xl border border-light-300 shadow-xs">
          <span className="text-xs font-extrabold text-brand-red uppercase tracking-widest mr-1">
            Active Filters:
          </span>
          {activeFilterChips.map((chip, idx) => (
            <button
              key={`${chip.key}-${chip.value}-${idx}`}
              onClick={() => handleRemoveChip(chip.key, chip.value)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-red/5 border border-brand-red/20 text-xs font-extrabold text-dark-900 rounded-full hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group"
            >
              <span>{chip.label}</span>
              <X className="w-3.5 h-3.5 text-brand-red group-hover:text-white transition-colors" />
            </button>
          ))}
          <button
            onClick={handleClearAllFilters}
            className="text-xs text-brand-red font-extrabold uppercase tracking-wider hover:underline ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar/Drawer */}
        <Filters
          availableFilters={availableFilters}
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
        />

        {/* Product Grid Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Controls Bar */}
          <div className="flex items-center justify-between md:justify-end mb-6 pb-4 border-b border-gray-200">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <FilterIcon className="w-4 h-4 text-brand-red" />
              Filters
            </button>
            <Sort />
          </div>

          {/* Grid */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    category={product.categoryName}
                    price={product.price}
                    image={product.image}
                    imageAlt={product.imageAlt}
                    variants={product.variantsCount}
                    href={`/products/${product.id}`}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalProducts={totalProducts}
                pageSize={pageSize}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No matching products found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                We couldn&apos;t find any products matching your current search and filter combination.
              </p>
              <button
                onClick={handleClearAllFilters}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-brand-red rounded-lg hover:bg-brand-red-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

