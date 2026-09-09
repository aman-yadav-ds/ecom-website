"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tractor, Disc3, ShieldAlert, Droplet, Wrench, ChevronRight } from "lucide-react";
import { parseQueryParams, updateQueryParams } from "@/lib/utils/query";

interface CategoryMeta {
  id: string;
  slug: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "tractor-attachments",
    slug: "tractor-attachments",
    name: "TRACTOR ATTACHMENTS",
    icon: Tractor,
  },
  {
    id: "self-propelled-machinery",
    slug: "self-propelled-machinery",
    name: "SELF PROPELLED MACHINERY",
    icon: Disc3,
  },
  {
    id: "food-processing-units",
    slug: "food-processing-units",
    name: "FOOD PROCESSING UNITS",
    icon: ShieldAlert,
  },
  {
    id: "lubricants",
    slug: "lubricants",
    name: "LUBRICANTS",
    icon: Droplet,
  },
  {
    id: "hand-tools",
    slug: "hand-tools",
    name: "HAND TOOLS",
    icon: Wrench,
  },
];

export default function CategoryExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";

  const handleCategoryClick = (category: CategoryMeta) => {
    const currentParams = parseQueryParams(searchParams.toString());
    const isCurrentlyActive =
      currentCategory.toLowerCase() === category.name.toLowerCase() ||
      currentCategory.toLowerCase() === category.slug.toLowerCase();

    let newQueryString = "";
    if (isCurrentlyActive) {
      // Toggle off
      delete currentParams.category;
      delete currentParams.page;
      newQueryString = updateQueryParams(currentParams, {});
    } else {
      // Filter by category name
      newQueryString = updateQueryParams(currentParams, {
        category: category.name,
        page: 1,
      });
    }

    router.push(`?${newQueryString}`, { scroll: false });

    // Smooth scroll down to catalog section
    const catalogElement = document.getElementById("product-catalog-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-light-300 font-jost">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-brand-red block mb-1">
              Product Categories
            </span>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-black text-dark-900 uppercase tracking-tight">
                Explore By Category
              </h2>
              <span className="text-xs font-bold text-brand-red md:hidden flex items-center gap-1 shrink-0">
                Swipe &rarr;
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-dark-600 max-w-md font-medium">
            Select a specialized category below to view our wide range of products, specifications, and documentation.
          </p>
        </div>

        {/* Categories Cards Container: Horizontal row on desktop, scrollable on mobile */}
        <div className="flex md:grid md:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            const isActive =
              currentCategory.toLowerCase() === cat.name.toLowerCase() ||
              currentCategory.toLowerCase() === cat.slug.toLowerCase();

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer min-w-[210px] md:min-w-0 shrink-0 md:shrink text-left snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                  isActive
                    ? "bg-brand-red text-white shadow-md shadow-brand-red/20 border border-brand-red"
                    : "bg-white hover:bg-neutral-50 border border-light-300 hover:border-brand-red/40 shadow-xs hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Icon Box */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-brand-red/10 text-brand-red border border-brand-red/20"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Category Name */}
                  <span
                    className={`text-xs sm:text-[13px] font-black uppercase tracking-wider leading-tight line-clamp-2 ${
                      isActive
                        ? "text-white"
                        : "text-dark-900 group-hover:text-brand-red transition-colors"
                    }`}
                  >
                    {cat.name}
                  </span>
                </div>

                {/* Arrow */}
                <div
                  className={`shrink-0 ml-2 transition-transform duration-200 group-hover:translate-x-1 ${
                    isActive ? "text-white" : "text-dark-400 group-hover:text-brand-red"
                  }`}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
