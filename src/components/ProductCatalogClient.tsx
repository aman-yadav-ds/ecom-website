"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sort from "./Sort";
import Filters from "./Filters";
import Card from "./Card";
import { parseQueryParams, removeQueryParam, buildQueryString } from "@/lib/utils/query";
import { Filter as FilterIcon, X } from "lucide-react";

import { ALLOWED_FILTERS, CATEGORY_FILTERS } from "@/lib/filter";

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
}

interface ProductCatalogClientProps {
  initialProducts: ProductListingItem[];
  initialCategory?: string;
}

export default function ProductCatalogClient({ initialProducts, initialCategory }: ProductCatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Dynamically extract all available filters from technicalDetails
  const availableFilters = useMemo(() => {
    const filters: Record<string, Set<string>> = {};
    const activeCategoryParam = searchParams.get('category') || initialCategory;
    
    // Determine allowed keys based on category
    const allowedKeys = (activeCategoryParam && CATEGORY_FILTERS[activeCategoryParam])
      ? CATEGORY_FILTERS[activeCategoryParam]
      : ALLOWED_FILTERS;
    
    initialProducts.forEach(product => {
      // If a category is selected, only process products from that category to generate filters
      if (activeCategoryParam && activeCategoryParam !== 'All' && product.categoryName !== activeCategoryParam) return;

      Object.entries(product.technicalDetails).forEach(([key, value]) => {
        if (!value) return;
        // Only include keys that are in the allowed filters list
        if (!allowedKeys.includes(key)) return;
        
        if (!filters[key]) {
          filters[key] = new Set();
        }
        filters[key].add(value);
      });
    });

    // Convert Sets to Arrays and sort them
    const result: Record<string, string[]> = {};
    Object.keys(filters).forEach(key => {
      result[key] = Array.from(filters[key]).sort();
    });
    
    return result;
  }, [initialProducts, searchParams, initialCategory]);

  // Client-side filtering and sorting engine
  const filteredAndSortedProducts = useMemo(() => {
    const params = parseQueryParams(searchParams.toString());
    const searchQuery = typeof params.search === 'string' ? params.search.toLowerCase() : '';
    const sortMode = typeof params.sort === 'string' ? params.sort : 'featured';
    
    // Extract active technical filters (anything that isn't search or sort)
    const activeFilters: Record<string, string[]> = {};
    Object.keys(params).forEach(key => {
      if (key !== 'search' && key !== 'sort') {
        const val = params[key];
        activeFilters[key] = Array.isArray(val) ? (val as string[]) : [val as string];
      }
    });

    // Filter Array
    let result = initialProducts.filter(product => {
      // Search matching
      if (searchQuery) {
        const nameMatch = product.name.toLowerCase().includes(searchQuery);
        const tagMatch = product.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        if (!nameMatch && !tagMatch) {
          return false;
        }
      }

      // Checkbox filters matching
      for (const [filterKey, selectedValues] of Object.entries(activeFilters)) {
        if (selectedValues.length === 0) continue;
        
        if (filterKey === 'category') {
          if (!selectedValues.includes(product.categoryName)) {
            return false;
          }
        } else {
          const productDetailValue = product.technicalDetails[filterKey];
          if (!productDetailValue || !selectedValues.includes(productDetailValue)) {
            return false;
          }
        }
      }

      return true;
    });

    // Sort Array
    if (sortMode === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, searchParams]);

  // Derive active filters list for chip rendering
  const activeFilterChips = useMemo(() => {
    const params = parseQueryParams(searchParams.toString());
    const chips: { key: string; value: string; label: string }[] = [];

    Object.entries(params).forEach(([key, val]) => {
      if (key === 'sort') return;
      if (Array.isArray(val)) {
        val.forEach((v) => {
          if (typeof v === 'string') {
            chips.push({ key, value: v, label: `${key.replace(/([A-Z])/g, ' $1').trim()}: ${v}` });
          }
        });
      } else if (typeof val === 'string') {
        if (key === 'search') {
          chips.push({ key, value: val, label: `Search: "${val}"` });
        } else {
          chips.push({ key, value: val, label: `${key.replace(/([A-Z])/g, ' $1').trim()}: ${val}` });
        }
      }
    });

    return chips;
  }, [searchParams]);

  const handleRemoveChip = (key: string, value: string) => {
    const newQueryString = removeQueryParam(searchParams.toString(), key, value);
    router.push(`?${newQueryString}`, { scroll: false });
  };

  const handleClearAllFilters = () => {
    const currentParams = parseQueryParams(searchParams.toString());
    const newParams: Record<string, unknown> = {};
    if (currentParams.sort) newParams.sort = currentParams.sort;
    const q = buildQueryString(newParams);
    router.push(`?${q}`, { scroll: false });
  };

  const searchString = (searchParams.get('search') || '') as string;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-jost">
      {/* Top Header & Search Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          {searchString ? (
            <div className="flex flex-col items-start">
              <h2 className="text-xl md:text-2xl font-bold text-dark-900 uppercase tracking-wide">
                SEARCH RESULT FOR &quot;{searchString.toUpperCase()}&quot; ({filteredAndSortedProducts.length})
              </h2>
              <div className="w-8 h-1 bg-brand-red mt-2 mb-2"></div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-dark-900 uppercase tracking-wide">Equipment & Supplies</h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                Showing {filteredAndSortedProducts.length} items
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Active Filter Chips / Pills */}
      {activeFilterChips.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 p-3 bg-light-200/80 rounded-md border border-light-300">
          <span className="text-xs font-bold text-dark-900 uppercase tracking-wider mr-1">Active Filters:</span>
          {activeFilterChips.map((chip, idx) => (
            <button
              key={`${chip.key}-${chip.value}-${idx}`}
              onClick={() => handleRemoveChip(chip.key, chip.value)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-light-300 text-xs font-semibold text-dark-900 rounded-full hover:border-brand-red hover:text-brand-red transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group"
            >
              <span>{chip.label}</span>
              <X className="w-3 h-3 text-dark-500 group-hover:text-brand-red transition-colors" />
            </button>
          ))}
          <button
            onClick={handleClearAllFilters}
            className="text-xs text-brand-red font-bold hover:underline ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs"
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
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {filteredAndSortedProducts.map((product) => (
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
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching products found</h3>
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
