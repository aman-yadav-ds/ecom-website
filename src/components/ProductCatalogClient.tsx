"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sort from "./Sort";
import Filters from "./Filters";
import Card from "./Card";
import { parseQueryParams } from "@/lib/utils/query";
import { Filter as FilterIcon } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

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
  variantsCount: number;
  technicalDetails: Record<string, string>;
}

interface ProductCatalogClientProps {
  initialProducts: ProductListingItem[];
}

export default function ProductCatalogClient({ initialProducts }: ProductCatalogClientProps) {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Dynamically extract all available filters from technicalDetails
  const availableFilters = useMemo(() => {
    const filters: Record<string, Set<string>> = {};
    const activeCategoryParam = searchParams.get('category');
    
    // Determine allowed keys based on category
    const allowedKeys = (activeCategoryParam && CATEGORY_FILTERS[activeCategoryParam])
      ? CATEGORY_FILTERS[activeCategoryParam]
      : ALLOWED_FILTERS;
    
    initialProducts.forEach(product => {
      // If a category is selected, only process products from that category to generate filters
      if (activeCategoryParam && product.categoryName !== activeCategoryParam) return;

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
  }, [initialProducts, searchParams]);

  // Client-side filtering and sorting engine
  const filteredAndSortedProducts = useMemo(() => {
    // 1. Parse current URL params
    const params = parseQueryParams(searchParams.toString());
    const searchQuery = typeof params.search === 'string' ? params.search.toLowerCase() : '';
    const sortMode = typeof params.sort === 'string' ? params.sort : 'featured';
    
    // Extract active technical filters (anything that isn't search or sort)
    const activeFilters: Record<string, string[]> = {};
    Object.keys(params).forEach(key => {
      if (key !== 'search' && key !== 'sort') {
        const val = params[key];
        activeFilters[key] = Array.isArray(val) ? val : [val];
      }
    });

    // 2. Filter Array
    let result = initialProducts.filter(product => {
      // Search matching
      if (searchQuery) {
        const nameMatch = product.name.toLowerCase().includes(searchQuery);
        const tagMatch = product.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        if (!nameMatch && !tagMatch) {
          return false;
        }
      }

      // Checkbox filters matching (AND across groups, OR within groups)
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

    // 3. Sort Array
    if (sortMode === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    // "featured" doesn't change the order (assumes initial order is featured)

    return result;
  }, [initialProducts, searchParams]);

  const router = useRouter();
  const searchString = searchParams.get('search') || '';
  const activeCategory = searchParams.get('category') || 'All';

  const categories = [
    "All",
    "Tractor Attachments",
    "Self Propelled Machinery",
    "Food Processing Units",
    "Hand Tools",
    "Lubricants"
  ];

  const handleCategoryClick = (cat: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    // Clear technical filters when switching categories
    Array.from(newParams.keys()).forEach(key => {
      if (key !== 'search' && key !== 'sort' && key !== 'category') {
        newParams.delete(key);
      }
    });
    router.push(`/products?${newParams.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar: Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          {searchString ? (
            <div className="flex flex-col items-start">
              <h1 className="text-xl md:text-2xl font-bold text-dark-900 uppercase tracking-wide">
                SEARCH RESULT FOR &quot;{searchString.toUpperCase()}&quot; ({filteredAndSortedProducts.length})
              </h1>
              <div className="w-8 h-1 bg-dark-900 mt-2 mb-4"></div>
              <button 
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams.toString());
                  newParams.delete('search');
                  router.push(`/products?${newParams.toString()}`);
                }}
                className="text-sm text-brand-red hover:underline font-medium"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-dark-900">Products</h1>
              <p className="text-sm text-gray-500 mt-1">
                Showing {filteredAndSortedProducts.length} results
              </p>
            </>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 border-b border-light-300">
        <ul className="flex flex-nowrap overflow-x-auto gap-6 hide-scrollbar pb-2">
          {categories.map((cat) => (
            <li key={cat} className="flex-shrink-0">
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`pb-2 px-1 text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${
                  activeCategory === cat
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-dark-700 hover:text-brand-red hover:border-brand-red/30"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

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
              className="md:hidden flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg"
            >
              <FilterIcon className="w-4 h-4" />
              Filters
            </button>
            <Sort />
          </div>

          {/* Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
              {filteredAndSortedProducts.map((product, index) => (
                <ScrollReveal key={product.id} animation="fade" delay={(index % 12) * 50}>
                  <Card
                    id={product.id}
                    title={product.name}
                    category={product.categoryName}
                    price={product.price}
                    image={product.image}
                    variants={product.variantsCount}
                    href={`/products/${product.id}`}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching products found</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                We couldn&apos;t find any products matching your current search and filter combination.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                Clear all filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
