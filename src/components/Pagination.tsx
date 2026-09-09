"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils/query";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  pageSize: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalProducts,
  pageSize,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    const currentParamsString = searchParams.toString();
    const newQueryString = updateQueryParams(currentParamsString, { page: newPage });
    router.push(`?${newQueryString}`, { scroll: false });

    // Smoothly scroll to the top of the product catalog container
    const catalogElement = document.getElementById("product-catalog-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalProducts);
  const endItem = Math.min(currentPage * pageSize, totalProducts);

  // Generate page numbers array with optional ellipsis for long lists
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-light-300 font-jost">
      {/* Items count summary */}
      <div className="text-xs sm:text-sm font-semibold text-dark-600">
        Showing <span className="font-extrabold text-dark-900">{startItem}–{endItem}</span> of{" "}
        <span className="font-extrabold text-dark-900">{totalProducts}</span> products
      </div>

      {/* Pagination Controls */}
      <nav aria-label="Pagination Navigation" className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Go to previous page"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-full border border-light-300 bg-white text-dark-700 hover:border-brand-red hover:text-brand-red disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-light-300 disabled:hover:text-dark-700 transition-all shadow-2xs cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>PREV</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (typeof page === "string") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1.5 py-1 text-xs font-bold text-dark-400 select-none"
                >
                  ...
                </span>
              );
            }

            const isCurrent = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                onClick={() => handlePageChange(page)}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Go to page ${page}`}
                className={`w-8 h-8 flex items-center justify-center text-xs font-black rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-brand-red text-white shadow-xs"
                    : "bg-white hover:bg-neutral-100 text-dark-700 hover:text-brand-red border border-light-300"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Go to next page"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-full border border-light-300 bg-white text-dark-700 hover:border-brand-red hover:text-brand-red disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-light-300 disabled:hover:text-dark-700 transition-all shadow-2xs cursor-pointer"
        >
          <span>NEXT</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </nav>
    </div>
  );
}
