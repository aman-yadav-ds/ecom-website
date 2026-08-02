"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqAccordionClientProps {
  faqs: { category: string; items: FAQItem[] }[];
}

export function FaqAccordionClient({ faqs }: FaqAccordionClientProps) {
  const [openIndex, setOpenIndex] = useState<string | null>("1-0");

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="space-y-10">
      {faqs.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h2 className="text-xl sm:text-2xl font-extrabold text-dark-900 uppercase mb-4 border-b border-light-300 pb-3 tracking-wide">
            {group.category}
          </h2>
          <div className="space-y-4">
            {group.items.map((item, itemIndex) => {
              const id = `${groupIndex}-${itemIndex}`;
              const isOpen = openIndex === id;
              return (
                <div
                  key={id}
                  className={`glass-panel border rounded-3xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-brand-red shadow-md bg-white"
                      : "border-light-300 hover:border-light-400 bg-white/80"
                  }`}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between focus:outline-none text-left cursor-pointer group"
                    onClick={() => toggleFAQ(id)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-extrabold text-base md:text-lg pr-6 uppercase tracking-wide transition-colors ${
                        isOpen ? "text-brand-red" : "text-dark-900"
                      }`}
                    >
                      {item.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-light-200 group-hover:bg-brand-red group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-xs">
                      {isOpen ? (
                        <X className="w-4 h-4 text-brand-red group-hover:text-white" />
                      ) : (
                        <Plus className="w-4 h-4 text-dark-700 group-hover:text-white" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`px-6 transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-[600px] pb-6 opacity-100"
                        : "max-h-0 pb-0 opacity-0"
                    }`}
                  >
                    <div className="text-dark-700 text-sm md:text-base leading-relaxed pt-3 border-t border-light-200 font-medium">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
