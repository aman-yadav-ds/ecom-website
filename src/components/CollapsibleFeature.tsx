"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleFeatureProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleFeature: React.FC<CollapsibleFeatureProps> = ({
  title,
  icon,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-light-300 rounded-sm overflow-hidden mb-4 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left focus-visible:outline-none focus-visible:bg-light-100 hover:bg-light-50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-brand-red">{icon}</div>}
          <span className="text-sm font-bold text-dark-900">{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-dark-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 pt-0 text-sm text-dark-700 border-t border-light-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleFeature;
