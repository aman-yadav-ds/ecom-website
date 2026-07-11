"use client";

import React, { useRef, useEffect, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

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
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose(); // Close the overlay after search
    }
  };

  const handleQuickLink = (term: string) => {
    router.push(`/products?search=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start pt-[15vh] justify-center bg-black/70 backdrop-blur-md transition-all duration-400 ease-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
    >
      <div
        className={`relative w-full max-w-4xl mx-4 transform transition-all duration-400 ease-out delay-75 ${isOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-8"
          }`}
      >
        <div className="bg-light-100 shadow-2xl overflow-hidden border-2 border-brand-red rounded-xl">
          <form onSubmit={handleSubmit} className="flex items-center p-3 bg-white">
            <SearchIcon className="w-6 h-6 text-brand-red ml-4" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products, implements, or models..."
              className="w-full px-4 py-4 text-lg md:text-xl text-dark-900 bg-transparent outline-none placeholder-dark-500 font-medium"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-3 bg-brand-black text-light-100 hover:bg-brand-red transition-colors rounded-lg mr-1 group"
              aria-label="Close search"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </form>

          {/* Quick Links Section */}
          <div className="p-5 md:p-6 bg-light-200/50 border-t border-light-300 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm md:text-base text-dark-700">
            <span className="font-bold text-dark-900 tracking-wide text-xs uppercase">Popular Searches</span>
            <button type="button" onClick={() => handleQuickLink('Power Weeder')} className="hover:text-brand-red transition-colors bg-light-100 px-3 py-1.5 rounded-full border border-light-300 shadow-sm hover:border-brand-red">Power Weeder</button>
            <button type="button" onClick={() => handleQuickLink('Brush Cutter')} className="hover:text-brand-red transition-colors bg-light-100 px-3 py-1.5 rounded-full border border-light-300 shadow-sm hover:border-brand-red">Brush Cutter</button>
            <button type="button" onClick={() => handleQuickLink('Rotavator')} className="hover:text-brand-red transition-colors bg-light-100 px-3 py-1.5 rounded-full border border-light-300 shadow-sm hover:border-brand-red">Rotavator</button>
            <button type="button" onClick={() => handleQuickLink('Mini Rice Mill')} className="hover:text-brand-red transition-colors bg-light-100 px-3 py-1.5 rounded-full border border-light-300 shadow-sm hover:border-brand-red">Mini Rice Mill</button>
          </div>
        </div>
      </div>
    </div>
  );
}
