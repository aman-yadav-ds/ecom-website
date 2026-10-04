"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Zap, Sliders, ChevronDown, ChevronUp } from "lucide-react";
import { ShowcaseProduct } from "./types";

interface ProductSpecTableProps {
  product: ShowcaseProduct;
  activeVariantIndex: number;
  onVariantChange: (index: number) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function ProductSpecTable({
  product,
  activeVariantIndex,
  onVariantChange,
  isExpanded,
  onToggleExpand,
}: ProductSpecTableProps) {
  const currentVariant = product.variants[activeVariantIndex];

  return (
    <div className="w-full bg-[#141414]/90 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl transition-all duration-300">
      {/* 1. Header with Model Selector Switcher (Tightened) */}
      <div className="p-3 sm:p-3.5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Select Configuration Model
            </span>
          </div>

          <div className="inline-flex items-center text-[10px] text-neutral-400 font-mono">
            <ShieldCheck className="w-3 h-3 text-brand-red mr-1" />
            <span>Heavy-Duty Alloy Grade</span>
          </div>
        </div>

        {/* Tactile Model Selector Pills */}
        <div
          className={`grid ${
            product.variants.length === 1
              ? "grid-cols-1"
              : product.variants.length === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          } p-0.5 sm:p-1 bg-black/60 rounded-lg border border-white/10 relative`}
        >
          {product.variants.map((v, idx) => {
            const isSelected = activeVariantIndex === idx;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onVariantChange(idx)}
                className={`relative z-10 py-1.5 sm:py-2 px-2 rounded-md text-xs font-black uppercase tracking-wider transition-colors duration-200 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  isSelected ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <motion.div
                    layoutId={`variant-pill-${product.id}`}
                    className="absolute inset-0 bg-brand-red rounded-md shadow-md shadow-brand-red/30 -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span>{v.code}</span>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Top Key Performance Indicators (4 KPI Tiles) */}
      <div className="p-3 sm:p-3.5 bg-black/30">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentVariant.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
          >
            {currentVariant.keyStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between transition-colors"
              >
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
                  {stat.label}
                </span>
                <div>
                  <span className="text-sm sm:text-base lg:text-lg font-black text-white tracking-tight block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400 block truncate">
                    {stat.sub}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Comprehensive Specifications Matrix (Collapsible for Clean Mobile Ergonomics) */}
      <div className="border-t border-white/10">
        <button
          type="button"
          onClick={onToggleExpand}
          className="w-full px-3 sm:px-4 py-2 flex items-center justify-between text-[11px] sm:text-xs font-bold text-neutral-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer select-none"
        >
          <div className="flex items-center space-x-1.5">
            <Sliders className="w-3 h-3 text-brand-red" />
            <span className="uppercase tracking-wider">
              {isExpanded ? "Hide Technical Specifications" : "View Full Engineering Matrix"}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-brand-red text-[10px] sm:text-[11px]">
            <span>{isExpanded ? "Collapse" : "Expand Matrix"}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="p-3 sm:p-3.5 pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300 border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] sm:text-[11px] font-black uppercase text-neutral-400 tracking-wider">
                        <th className="py-1.5 pr-3">Parameter</th>
                        {product.variants.map((v, vIdx) => (
                          <th
                            key={v.id}
                            className={`py-1.5 px-2.5 ${
                              activeVariantIndex === vIdx ? "text-brand-red font-bold" : "text-neutral-400"
                            }`}
                          >
                            {v.code}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-medium">
                      {product.specs.map((row, idx) => {
                        const isRowHighlighted = row.highlight;
                        const rowValues = row.values ?? [
                          row.variant1Value ?? "",
                          row.variant2Value ?? "",
                        ];
                        return (
                          <tr
                            key={row.label}
                            className={`transition-colors ${
                              isRowHighlighted
                                ? "bg-brand-red/[0.07]"
                                : idx % 2 === 0
                                ? "bg-white/[0.01]"
                                : "bg-transparent"
                            } hover:bg-white/[0.04]`}
                          >
                            <td className="py-1.5 pr-3 text-neutral-200 font-semibold flex items-center text-xs">
                              {isRowHighlighted && (
                                <Zap className="w-2.5 h-2.5 text-brand-red mr-1 shrink-0" />
                              )}
                              <span>{row.label}</span>
                            </td>
                            {rowValues.map((val, vIdx) => (
                              <td
                                key={vIdx}
                                className={`py-1.5 px-2.5 font-mono text-xs transition-colors ${
                                  activeVariantIndex === vIdx
                                    ? "text-white font-bold bg-white/[0.04]"
                                    : "text-neutral-400"
                                }`}
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
