"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Sort from "./Sort";
import Filters from "./Filters";
import Card from "./Card";
import Pagination from "./Pagination";
import CatalogToolbar from "./catalog/CatalogToolbar";
import { parseQueryParams, removeQueryParam, buildQueryString } from "@/lib/utils/query";
import { Filter as FilterIcon, X, AlertCircle } from "lucide-react";

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

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 font-jost scroll-mt-24"
      id="product-catalog-section"
    >
      {/* Search & Compare Toolbar */}
      <CatalogToolbar />

      {/* Active Filter Chips / Pills */}
      {activeFilterChips.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 p-3.5 bg-white rounded-2xl border border-light-300 shadow-2xs">
          <span className="text-xs font-black text-brand-red uppercase tracking-widest mr-1">
            Active Filters:
          </span>
          {activeFilterChips.map((chip, idx) => (
            <button
              key={`${chip.key}-${chip.value}-${idx}`}
              onClick={() => handleRemoveChip(chip.key, chip.value)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-red/5 border border-brand-red/20 text-xs font-black text-dark-900 rounded-full hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group"
            >
              <span>{chip.label}</span>
              <X className="w-3.5 h-3.5 text-brand-red group-hover:text-white transition-colors" />
            </button>
          ))}
          <button
            onClick={handleClearAllFilters}
            className="text-xs text-brand-red font-black uppercase tracking-wider hover:underline ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Catalog Layout (2 columns on desktop: Filters + Product Area) */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Filters Sidebar / Mobile Drawer */}
        <Filters
          availableFilters={availableFilters}
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
        />

        {/* Product Catalog Grid Area */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          
          {/* Top Bar: Matching items count on left, Mobile Filter toggle + Sort on right */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-light-300 gap-2.5 sm:gap-4">
            <div className="text-xs sm:text-sm font-semibold text-dark-600">
              Showing{" "}
              <span className="font-black text-dark-900">{totalProducts}</span>{" "}
              matching items
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-dark-900 bg-white border border-light-300 px-3 py-1.5 rounded-full shadow-2xs hover:border-brand-red cursor-pointer shrink-0"
              >
                <FilterIcon className="w-3.5 h-3.5 text-brand-red" />
                <span>Filters</span>
                {activeFilterChips.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-brand-red text-white text-[9px] font-black flex items-center justify-center">
                    {activeFilterChips.length}
                  </span>
                )}
              </button>

              <Sort />
            </div>
          </div>

          {/* Product Grid: 2 columns on mobile, 2 on tablet, 3 on desktop */}
          {products.length > 0 ? (
            <>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                    },
                  },
                }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                    }}
                    className="h-full"
                  >
                    <Card
                      id={product.id}
                      title={product.name}
                      category={product.categoryName}
                      price={product.price}
                      image={product.image}
                      imageAlt={product.imageAlt}
                      variants={product.variantsCount}
                      href={`/products/${product.id}`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalProducts={totalProducts}
                pageSize={pageSize}
              />
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 sm:p-16 bg-white rounded-3xl border border-dashed border-light-300 text-center shadow-xs">
              <div className="w-14 h-14 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-dark-900 uppercase tracking-wide mb-2">
                No Products Found
              </h3>
              <p className="text-xs sm:text-sm text-dark-600 mb-6 max-w-md font-medium leading-relaxed">
                We couldn&apos;t find any machinery matching your current filter combination. Try adjusting or clearing your filters.
              </p>
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="inline-flex items-center justify-center px-6 py-3 text-xs font-black uppercase tracking-wider text-white bg-brand-red hover:bg-brand-red-accent rounded-full transition-colors shadow-xs active:scale-95 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
