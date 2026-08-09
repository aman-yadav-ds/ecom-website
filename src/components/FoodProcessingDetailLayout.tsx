"use client";

import React, { useState } from "react";
import { Product, Variant } from "@/lib/types";
import ProductGallery from "./ProductGallery";
import Link from "next/link";
import { MapPin, Shield, Check, Factory, Zap, Award, Wrench, RefreshCw, Activity } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";
import B2BProductActions from "./B2BProductActions";

interface FoodProcessingDetailLayoutProps {
  product: Product;
  variants: Variant[];
}

const emptySubscribe = () => () => { };
function useHasMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function FoodProcessingDetailLayout({ product, variants }: FoodProcessingDetailLayoutProps) {
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
    : [product.coverImageAlt || `${product.name} food processing machine`];

  const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const motorPower = activeVariant?.technicalDetails["Motor Power"] || activeVariant?.technicalDetails["Motor HP"] || "3 HP Commercial Motor";
  const material = activeVariant?.technicalDetails["Material"] || activeVariant?.technicalDetails["Body Material"] || "Stainless Steel / Heavy Steel";
  const electricity = activeVariant?.technicalDetails["Electricity"] || activeVariant?.technicalDetails["Voltage"] || "Single / 3-Phase Electric";

  return (
    <div className="flex flex-col gap-10 sm:gap-12 font-jost">
      {/* Category Header Banner */}
      <div className="glass-panel border border-blue-200/80 p-4 sm:p-6 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 border border-blue-200">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-blue-600 font-extrabold">Commercial Grade Milling & Processing Spec</span>
            <h2 className="text-base sm:text-xl font-extrabold text-dark-900 line-clamp-1">{product.name}</h2>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-700 border border-blue-200 rounded-full text-xs font-extrabold uppercase tracking-wider">
            {motorPower}
          </span>
          <span className="px-3 py-1 bg-light-200 text-dark-900 border border-light-300 rounded-full text-xs font-bold uppercase tracking-wider">
            Food Grade Hygiene
          </span>
        </div>
      </div>

      {/* Main Grid: Gallery & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        {/* Left Column: Gallery & Highlights */}
        <div className="w-full">
          <ProductGallery images={images} imagesAlt={imagesAlt} productName={activeVariant?.name || product.name} />

          {/* Key Processing Badges */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="glass-card border border-blue-100 p-3 rounded-2xl text-center">
              <Zap className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block">{motorPower}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Motor HP</span>
            </div>
            <div className="glass-card border border-blue-100 p-3 rounded-2xl text-center">
              <Activity className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block">{electricity}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Power Input</span>
            </div>
            <div className="glass-card border border-blue-100 p-3 rounded-2xl text-center">
              <Award className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block truncate">{material}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Construction</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Variant Selector & Actions */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-light-300 pb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark-900 tracking-tight uppercase">
              {activeVariant?.name || product.name}
            </h1>
            <p className="text-xs sm:text-sm text-dark-500 font-medium mt-1">
              Part / Model Code: <span className="text-dark-900 font-bold">{activeVariant?.id || product.id}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-light-300 flex flex-col gap-1 shadow-xs bg-gradient-to-br from-white to-blue-50/30">
            <span className="text-xs font-extrabold text-dark-500 uppercase tracking-wider">Commercial Processing List Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-700">
              {activeVariant?.price ? priceFormatter.format(Number(activeVariant.price)) : "Price on Request"}
            </div>
            {activeVariant?.applicableGst && (
              <p className="text-xs text-dark-500 font-medium">
                Inclusive of {activeVariant.applicableGst}. Precision mesh sieves & motor pulley included.
              </p>
            )}
          </div>

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-dark-900 uppercase tracking-wide block">
                Select Capacity / Processing Model:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {variants.map((v) => {
                  const isSelectedVariant = v.id === activeVariantId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantId(v.id)}
                      className={`p-3 rounded-md border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isSelectedVariant
                          ? "border-blue-600 bg-blue-50/70 shadow-xs"
                          : "border-light-300 bg-white hover:border-blue-300"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold uppercase ${isSelectedVariant ? "text-blue-800" : "text-dark-900"}`}>
                          {v.name}
                        </span>
                        {isSelectedVariant && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-dark-900 block mt-1">
                        {priceFormatter.format(Number(v.price))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* B2B Action Area */}
          <B2BProductActions product={product} activeVariant={activeVariant} />
        </div>
      </div>

      {/* Description Section */}
      <section className="bg-white border border-light-300 rounded-sm p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-bold text-dark-900 uppercase tracking-wide border-b border-light-300 pb-3 mb-4">
          Product Description & Processing Capabilities
        </h3>
        <p className="text-sm text-dark-700 leading-relaxed">
          {product.description}
        </p>
      </section>

      {/* Full Technical Specifications */}
      <section aria-labelledby="food-specs-heading" className="bg-white border border-light-300 rounded-sm p-6 sm:p-8 shadow-xs">
        <h3 id="food-specs-heading" className="text-xl font-bold text-dark-900 uppercase tracking-wide border-b border-light-300 pb-4 mb-6 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          Technical Specifications & Processing Output
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

      {/* Food Hygiene & Maintenance Routine */}
      <section className="bg-blue-50/60 border border-blue-200 rounded-sm p-6 sm:p-8">
        <h3 className="text-lg font-bold text-dark-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-blue-600" />
          Sanitation & Electrical Maintenance Protocol
        </h3>
        <ul className="space-y-2 text-sm text-dark-700">
          {(product.maintenanceTips && product.maintenanceTips.length > 0
            ? product.maintenanceTips
            : [
              "Clean grinding chamber and mesh sieves after each processing batch to prevent cross-contamination.",
              "Ensure electric motor connections are grounded and protected by a dedicated circuit breaker.",
              "Replacement screens and wear components are available from authorized KOREVA dealers."
            ]
          ).map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
