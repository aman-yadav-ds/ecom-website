"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseQueryParams, updateQueryParams, removeQueryParam } from "@/lib/utils/query";
import { X, Filter as FilterIcon, ChevronDown, ChevronUp } from "lucide-react";

interface FiltersProps {
  availableFilters: Record<string, string[]>;
  isOpen: boolean;
  onClose: () => void;
}

const Filters: React.FC<FiltersProps> = ({ availableFilters, isOpen, onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local state to manage expanded/collapsed filter groups
  // Groups are collapsed (false) by default, unless they have an active filter
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const currentParams = parseQueryParams(searchParams.toString());
    return Object.keys(availableFilters).reduce((acc, key) => {
      acc[key] = !!currentParams[key];
      return acc;
    }, {} as Record<string, boolean>);
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }));
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

  const handleClearAll = () => {
    // Keep 'search' and 'sort' params but remove all filters and page
    const currentParams = parseQueryParams(searchParams.toString());
    const newParams: Record<string, unknown> = {};
    if (currentParams.search) newParams.search = currentParams.search;
    if (currentParams.sort) newParams.sort = currentParams.sort;
    
    const newQueryString = updateQueryParams({}, newParams);
    router.push(`?${newQueryString}`, { scroll: false });
  };

  // Helper to check if a value is selected
  const isSelected = (group: string, value: string) => {
    const currentValues = searchParams.getAll(group);
    return currentValues.includes(value);
  };

  const filterKeys = Object.keys(availableFilters).sort();
  
  // Calculate total active filters
  let activeFilterCount = 0;
  for (const key of filterKeys) {
    activeFilterCount += searchParams.getAll(key).length;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar/Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white/98 backdrop-blur-2xl shadow-2xl md:static md:z-auto md:block md:shadow-none md:w-64 font-jost transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto p-4 md:p-0">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-light-300">
            <div className="flex items-center gap-2 text-dark-900">
              <FilterIcon className="w-5 h-5 text-brand-red" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-black text-white bg-brand-red rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button 
                  onClick={handleClearAll}
                  className="text-xs text-brand-red hover:text-brand-red-accent font-extrabold uppercase tracking-wider hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs cursor-pointer"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-dark-900 hover:bg-light-200 rounded-full md:hidden cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Groups */}
          <div className="space-y-4 md:mt-2">
            {filterKeys.length === 0 && (
              <p className="text-sm text-dark-500 font-medium">No filters available.</p>
            )}
            
            {filterKeys.map((group) => (
              <div key={group} className="border-b border-light-200 pb-3 last:border-0">
                <button
                  className="flex items-center justify-between w-full text-left min-h-[44px] py-2 px-1 rounded-lg hover:bg-light-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={expandedGroups[group]}
                >
                  <h3 className="text-xs font-extrabold text-dark-900 uppercase tracking-wider">
                    {group.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  {expandedGroups[group] ? (
                    <ChevronUp className="w-4 h-4 text-brand-red shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-dark-500 shrink-0" />
                  )}
                </button>
                
                {expandedGroups[group] && (
                  <div className="mt-1 space-y-0.5">
                    {availableFilters[group].map((value) => {
                      const checked = isSelected(group, value);
                      const id = `filter-${group}-${value}`;
                      return (
                        <label key={value} htmlFor={id} className="flex items-center min-h-[44px] py-1.5 px-2 rounded-lg cursor-pointer select-none hover:bg-light-200/80 transition-colors">
                          <input
                            id={id}
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => handleCheckboxChange(group, value, e.target.checked)}
                            className="w-4 h-4 text-brand-red border-light-300 rounded focus:ring-brand-red focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer shrink-0"
                          />
                          <span className="ml-3 text-xs text-dark-800 font-medium hover:text-brand-red transition-colors">
                            {value}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Filters;
