"use client";

import React, { useRef, useEffect, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { buildQueryString } from "@/lib/utils/query";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Search({ isOpen, onClose }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus search input when overlay opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const q = buildQueryString({ search: searchTerm.trim() });
      router.push(`/products?${q}`);
      onClose(); // Close the overlay after search
    }
  };

  const handleQuickLink = (term: string) => {
    const q = buildQueryString({ search: term });
    router.push(`/products?${q}`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start pt-[12vh] md:pt-[15vh] justify-center bg-black/40 backdrop-blur-3xl transition-all duration-300 ease-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div
        className={`relative w-full max-w-4xl mx-4 transform transition-all duration-300 ease-out ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-6"
        }`}
      >
        <div className="glass-panel-elevated shadow-2xl overflow-hidden border border-white/95 rounded-3xl">
          <form onSubmit={handleSubmit} className="flex items-center p-3 bg-white/90 backdrop-blur-xl">
            <SearchIcon className="w-6 h-6 text-brand-red ml-4 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Power Weeders, Harrows, Rotavators, STOU Lubricants..."
              className="w-full px-4 py-4 text-base md:text-xl text-dark-900 bg-transparent outline-none placeholder-dark-400 font-medium focus-visible:ring-0"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-3 bg-light-200 text-dark-900 hover:bg-brand-red hover:text-white transition-all rounded-full mr-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red shadow-xs border border-light-300/80"
              aria-label="Close search"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </form>

          {/* Quick Links Section */}
          <div className="p-5 md:p-6 bg-light-100/80 border-t border-light-300 flex flex-wrap items-center gap-x-3 gap-y-2.5 text-xs md:text-sm font-medium text-dark-700">
            <span className="font-extrabold text-dark-900 tracking-wider text-xs uppercase mr-1">Popular Searches:</span>
            <button 
              type="button" 
              onClick={() => handleQuickLink('Power Weeder')} 
              className="glass-pill px-3.5 py-1.5 rounded-full hover:bg-brand-red hover:text-white transition-all shadow-xs"
            >
              Power Weeder
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickLink('Brush Cutter')} 
              className="glass-pill px-3.5 py-1.5 rounded-full hover:bg-brand-red hover:text-white transition-all shadow-xs"
            >
              Brush Cutter
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickLink('Rotavator')} 
              className="glass-pill px-3.5 py-1.5 rounded-full hover:bg-brand-red hover:text-white transition-all shadow-xs"
            >
              Rotavator
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickLink('Mini Rice Mill')} 
              className="glass-pill px-3.5 py-1.5 rounded-full hover:bg-brand-red hover:text-white transition-all shadow-xs"
            >
              Mini Rice Mill
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickLink('STOU Lubricant')} 
              className="glass-pill px-3.5 py-1.5 rounded-full hover:bg-brand-red hover:text-white transition-all shadow-xs"
            >
              STOU Lubricant
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickLink('Pruning Secateur')} 
              className="glass-pill px-3.5 py-1.5 rounded-full hover:bg-brand-red hover:text-white transition-all shadow-xs"
            >
              Pruning Secateur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


