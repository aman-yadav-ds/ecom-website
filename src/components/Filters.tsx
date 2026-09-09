"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Filter as FilterIcon,
  ChevronDown,
  Tractor,
  MessageSquare,
} from "lucide-react";
import { parseQueryParams, updateQueryParams, removeQueryParam } from "@/lib/utils/query";
import { useRfqStore } from "@/store/useRfqStore";

interface FiltersProps {
  availableFilters: Record<string, string[]>;
  isOpen: boolean;
  onClose: () => void;
}

const Filters: React.FC<FiltersProps> = ({ availableFilters, isOpen, onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal: openRfqModal } = useRfqStore();

  // Local state to manage expanded/collapsed filter groups
  // First group (or groups with active filters) expanded by default
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const currentParams = parseQueryParams(searchParams.toString());
    const keys = Object.keys(availableFilters);
    const initial: Record<string, boolean> = {};

    keys.forEach((key, idx) => {
      // Expand if active or if it's the first key (e.g. Attachment Type)
      initial[key] = !!currentParams[key] || idx === 0;
    });
    return initial;
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckboxChange = (group: string, value: string, checked: boolean) => {
    const currentParams = parseQueryParams(searchParams.toString());
    const currentValues = currentParams[group];
    let valuesArray: string[] = [];

    if (currentValues) {
      valuesArray = Array.isArray(currentValues) ? (currentValues as string[]) : [currentValues as string];
    }

    let newQueryString = "";
    if (checked) {
      newQueryString = updateQueryParams(currentParams, { [group]: [...valuesArray, value], page: 1 });
    } else {
      newQueryString = removeQueryParam(currentParams, group, value);
      const parsed = parseQueryParams(newQueryString);
      delete parsed.page;
      newQueryString = updateQueryParams(parsed, {});
    }

    router.push(`?${newQueryString}`, { scroll: false });
  };

  const handleResetAll = () => {
    const currentParams = parseQueryParams(searchParams.toString());
    const newParams: Record<string, unknown> = {};
    if (currentParams.search) newParams.search = currentParams.search;
    if (currentParams.sort) newParams.sort = currentParams.sort;

    const newQueryString = updateQueryParams({}, newParams);
    router.push(`?${newQueryString}`, { scroll: false });
  };

  const isSelected = (group: string, value: string) => {
    const currentValues = searchParams.getAll(group);
    return currentValues.includes(value);
  };

  const filterKeys = Object.keys(availableFilters).sort();

  // Total active filter count
  let activeFilterCount = 0;
  for (const key of filterKeys) {
    activeFilterCount += searchParams.getAll(key).length;
  }

  return (
    <>
      {/* Mobile Backdrop Blur Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop static / Mobile drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white border-r md:border-r-0 border-light-300 shadow-2xl md:static md:z-auto md:block md:shadow-none md:w-68 font-jost shrink-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto p-4 md:p-0 pr-0 md:pr-4">
          
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-light-300">
            <div className="flex items-center gap-2 text-dark-900">
              <div className="w-6 h-6 rounded-md bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                <FilterIcon className="w-3.5 h-3.5 text-brand-red" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-wider">FILTERS</h2>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[10px] font-black text-white bg-brand-red rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetAll}
                className="text-xs text-dark-500 hover:text-brand-red font-bold transition-colors cursor-pointer"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-dark-900 hover:bg-light-200 rounded-full md:hidden cursor-pointer"
                aria-label="Close filter drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Accordion Filter Groups */}
          <div className="space-y-1">
            {filterKeys.length === 0 && (
              <p className="text-xs text-dark-500 font-medium py-3">No filters available.</p>
            )}

            {filterKeys.map((group) => {
              const isExpanded = !!expandedGroups[group];
              const groupLabel = group.replace(/([A-Z])/g, " $1").trim().toUpperCase();
              const options = availableFilters[group];

              return (
                <div key={group} className="border-b border-light-200/80 py-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group)}
                    aria-expanded={isExpanded}
                    className="flex items-center justify-between w-full text-left py-2.5 px-1 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer group"
                  >
                    <span className="text-[11px] sm:text-xs font-black text-dark-900 uppercase tracking-wider group-hover:text-brand-red transition-colors">
                      {groupLabel}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-dark-400 transition-transform duration-200 shrink-0 ${
                        isExpanded ? "rotate-180 text-brand-red" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-1 pb-2.5 space-y-1 px-1">
                          {options.map((value, idx) => {
                            const checked = isSelected(group, value);
                            const id = `filter-${group}-${value}`;

                            return (
                              <label
                                key={value}
                                htmlFor={id}
                                className="flex items-center justify-between py-1 px-1.5 rounded-md cursor-pointer select-none hover:bg-neutral-100/70 transition-colors group/item"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <input
                                    id={id}
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) =>
                                      handleCheckboxChange(group, value, e.target.checked)
                                    }
                                    className="w-3.5 h-3.5 text-brand-red accent-[#C40000] border-light-300 rounded cursor-pointer shrink-0"
                                  />
                                  <span
                                    className={`text-xs truncate ${
                                      checked
                                        ? "text-brand-red font-black"
                                        : "text-dark-700 font-medium group-hover/item:text-dark-900"
                                    }`}
                                  >
                                    {value}
                                  </span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom Assistance Help Box */}
          <div className="mt-8 mb-4 p-5 rounded-2xl bg-white border border-light-300 text-center shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center mb-3">
              <Tractor className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-[13px] font-extrabold text-dark-900 uppercase tracking-tight mb-1">
              Need help finding the right product?
            </h4>
            <p className="text-[11px] text-dark-500 font-medium mb-4">
              Speak with our machinery engineers for custom recommendations.
            </p>
            <button
              type="button"
              onClick={openRfqModal}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-full border border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Our Experts</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Filters;
