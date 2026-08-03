"use client";

import React, { useState, useEffect } from "react";
import { Product, Variant } from "@/lib/types";
import ProductGallery from "./ProductGallery";
import Link from "next/link";
import { MapPin, Wrench, Shield, Check, Award, Scissors, CheckCircle, RefreshCw } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";

interface HandToolDetailLayoutProps {
  product: Product;
  variants: Variant[];
}

const emptySubscribe = () => () => {};
function useHasMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function HandToolDetailLayout({ product, variants }: HandToolDetailLayoutProps) {
  const [activeVariantId, setActiveVariantId] = useState(
    product.defaultVariantId || (variants.length > 0 ? variants[0].id : "")
  );

  const { selectedProductIds, toggleProduct } = useCompareStore();
  const mounted = useHasMounted();


  const isSelected = selectedProductIds.includes(product.id);
  const isMaxReached = selectedProductIds.length >= 3;
  const disabled = !isSelected && isMaxReached;

  const handleCompareChange = () => {
    if (disabled) {
      alert("You can only compare up to 3 products at a time.");
      return;
    }
    toggleProduct(product.id);
  };

  const activeVariant = variants.find((v) => v.id === activeVariantId) || variants[0];
  const images = activeVariant?.images?.length ? activeVariant.images : [product.coverImage];
  const imagesAlt = activeVariant?.imagesAlt?.length
    ? activeVariant.imagesAlt
    : [product.coverImageAlt || `${product.name} agricultural hand tool`];

  const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const steel = activeVariant?.technicalDetails["Blade Steel"] || "High Carbon Steel";
  const capacity = activeVariant?.technicalDetails["Cutting Capacity"] || "Pruning & Harvesting";
  const coating = activeVariant?.technicalDetails["Finish / Coating"] || "Anti-Rust Coating";

  return (
    <div className="flex flex-col gap-12 font-jost">
      {/* Top Banner: Hand Tools Category Badge */}
      <div className="glass-panel border border-amber-300/60 p-5 sm:p-6 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center shrink-0 border border-amber-300">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 font-extrabold">Agricultural & Garden Tool Spec</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-dark-900">{product.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-800 border border-amber-300 rounded-full text-xs font-extrabold uppercase tracking-wider">
            {steel}
          </span>
          <span className="px-3 py-1 bg-light-200 text-dark-900 border border-light-300 rounded-full text-xs font-bold uppercase tracking-wider">
            Forged Quality
          </span>
        </div>
      </div>

      {/* Primary Grid: Gallery (Left) & Tool Selectors (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
        {/* Left Column: Gallery */}
        <div className="w-full">
          <ProductGallery images={images} imagesAlt={imagesAlt} productName={activeVariant?.name || product.name} />

          {/* Quick Quality Indicators */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="glass-card border border-amber-200 p-3 rounded-2xl text-center">
              <Scissors className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <span className="text-xs font-bold text-dark-900 block">Induction Hardened Edge</span>
            </div>
            <div className="glass-card border border-amber-200 p-3 rounded-2xl text-center">
              <Shield className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <span className="text-xs font-bold text-dark-900 block">Anti-Sap Teflon</span>
            </div>
            <div className="glass-card border border-amber-200 p-3 rounded-2xl text-center">
              <Award className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <span className="text-xs font-bold text-dark-900 block">Ergonomic Grip</span>
            </div>
          </div>
        </div>

        {/* Right Column: Size / Variant Selection & Pricing */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-light-300 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900 tracking-tight uppercase">
              {activeVariant?.name || product.name}
            </h1>
            <p className="text-sm text-dark-500 font-medium mt-1">
              Model Code: <span className="text-dark-900 font-bold">{activeVariant?.id || product.id}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="glass-panel p-6 rounded-2xl border border-light-300 flex flex-col gap-1 shadow-xs">
            <span className="text-xs font-extrabold text-dark-500 uppercase tracking-wider">Retail List Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-800">
              {activeVariant?.price ? priceFormatter.format(Number(activeVariant.price)) : "Price on Request"}
            </div>
            {activeVariant?.applicableGst && (
              <p className="text-xs text-dark-500 font-medium">
                Inclusive of {activeVariant.applicableGst}% GST. Bulk discount boxes available for orchard managers & nurseries.
              </p>
            )}
          </div>

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-bold text-dark-900 uppercase tracking-wide block">
                Select Tool Size / Blade Specification:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {variants.map((v) => {
                  const isSelectedVariant = v.id === activeVariantId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantId(v.id)}
                      className={`p-3 rounded-md border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        isSelectedVariant
                          ? "border-amber-600 bg-amber-50 shadow-sm"
                          : "border-light-300 bg-white hover:border-amber-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold uppercase ${isSelectedVariant ? "text-amber-900" : "text-dark-900"}`}>
                          {v.name}
                        </span>
                        {isSelectedVariant && <Check className="w-4 h-4 text-amber-600" />}
                      </div>
                      <span className="text-sm font-bold text-dark-900 block mt-1">
                        {priceFormatter.format(Number(v.price))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/dealers"
              className="flex-1 bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 px-6 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <MapPin className="w-5 h-5" />
              Locate Authorized Tool Dealer
            </Link>
            <label
              className={`flex-none flex items-center justify-center gap-2 px-5 py-4 border-2 border-light-300 rounded-sm hover:border-dark-500 transition-colors group bg-white focus-within:ring-2 focus-within:ring-amber-500 ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={(e) => {
                if (disabled) {
                  e.preventDefault();
                  handleCompareChange();
                }
              }}
            >
              <input
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded-sm text-amber-600 focus:ring-amber-500 disabled:cursor-not-allowed"
                checked={mounted ? isSelected : false}
                onChange={handleCompareChange}
                disabled={disabled}
              />
              <span className={`text-xs font-bold ${isSelected ? "text-amber-800" : "text-dark-900"}`}>
                {isSelected ? "In Compare" : "Compare"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Tool Features & Specifications */}
      <section aria-labelledby="tool-specs-heading" className="bg-white border border-light-300 rounded-sm p-6 sm:p-8 shadow-sm">
        <h3 id="tool-specs-heading" className="text-xl font-bold text-dark-900 uppercase tracking-wide border-b border-light-300 pb-4 mb-6 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-700" />
          Tool Material & Ergonomic Specs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(activeVariant?.technicalDetails || {}).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-light-200/60 rounded-xs border border-light-300">
              <span className="text-xs font-bold text-dark-500 uppercase">{key}</span>
              <span className="text-sm font-extrabold text-dark-900">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Maintenance & Sharpening Guide */}
      <section className="bg-amber-50/60 border border-amber-200 rounded-sm p-6 sm:p-8">
        <h3 className="text-lg font-bold text-dark-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-amber-700" />
          Tool Care & Sharpening Instructions
        </h3>
        <ul className="space-y-2 text-sm text-dark-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            Clean blade with a light solvent after each cut to remove plant sap and moisture.
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            Apply a thin film of KOREVA 4T lubricant on pivot screws monthly for smooth spring rebound.
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            Sharpen only the bevel side of the blade using a fine diamond whetstone at a 20° angle.
          </li>
        </ul>
      </section>
    </div>
  );
}
