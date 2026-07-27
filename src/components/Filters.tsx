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
      newQueryString = updateQueryParams(currentParams, { [group]: [...valuesArray, value] });
    } else {
      newQueryString = removeQueryParam(currentParams, group, value);
    }
    
    router.push(`?${newQueryString}`, { scroll: false });
  };

  const handleClearAll = () => {
    // Keep 'search' and 'sort' params but remove all filters
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
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar/Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl md:static md:z-auto md:block md:shadow-none md:w-64 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 md:px-0">
            <div className="flex items-center gap-2 text-dark-900">
              <FilterIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-red rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button 
                  onClick={handleClearAll}
                  className="text-sm text-brand-red hover:text-brand-red-accent font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 text-gray-500 hover:bg-gray-100 rounded-md md:hidden"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Groups */}
          <div className="p-4 md:px-0 space-y-6 md:mt-4">
            {filterKeys.length === 0 && (
              <p className="text-sm text-gray-500">No filters available.</p>
            )}
            
            {filterKeys.map((group) => (
              <div key={group} className="border-b border-gray-100 pb-4 last:border-0">
                <button
                  className="flex items-center justify-between w-full text-left min-h-[44px] py-2 px-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={expandedGroups[group]}
                >
                  <h3 className="text-sm font-bold text-gray-900 capitalize">
                    {group.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  {expandedGroups[group] ? (
                    <ChevronUp className="w-4 h-4 text-brand-red" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                
                {expandedGroups[group] && (
                  <div className="mt-1 space-y-1">
                    {availableFilters[group].map((value) => {
                      const checked = isSelected(group, value);
                      const id = `filter-${group}-${value}`;
                      return (
                        <label key={value} htmlFor={id} className="flex items-center min-h-[44px] py-1.5 px-1 rounded-xs cursor-pointer select-none hover:bg-light-200 transition-colors">
                          <input
                            id={id}
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => handleCheckboxChange(group, value, e.target.checked)}
                            className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer shrink-0"
                          />
                          <span className="ml-3 text-sm text-gray-700 font-medium hover:text-brand-red transition-colors">
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
