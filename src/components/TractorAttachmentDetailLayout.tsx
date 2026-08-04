"use client";

import React, { useState } from "react";
import { Product, Variant } from "@/lib/types";
import ProductGallery from "./ProductGallery";
import Link from "next/link";
import { MapPin, Shield, Check, Cog, Gauge, Award, Wrench, RefreshCw, Layers } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";

interface TractorAttachmentDetailLayoutProps {
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

export default function TractorAttachmentDetailLayout({ product, variants }: TractorAttachmentDetailLayoutProps) {
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
    : [product.coverImageAlt || `${product.name} tractor attachment`];

  const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const tractorHp = activeVariant?.technicalDetails["Tractor HP"] || activeVariant?.technicalDetails["Tractor Power Required"] || "45 - 65 HP";
  const workingWidth = activeVariant?.technicalDetails["Working Width"] || activeVariant?.technicalDetails["Cutter Bar Width"] || activeVariant?.technicalDetails["Basket / Drum Size"] || "Standard Width";
  const assemblyConfig = activeVariant?.technicalDetails["Number of Discs"]
    ? `${activeVariant.technicalDetails["Number of Discs"]} Discs`
    : activeVariant?.technicalDetails["Number of Blades"]
    ? `${activeVariant.technicalDetails["Number of Blades"]} Blades`
    : activeVariant?.technicalDetails["Bucket Sheet Thickness"]
    ? `Bucket ${activeVariant.technicalDetails["Bucket Sheet Thickness"]}`
    : activeVariant?.technicalDetails["Threshing Blades"] || "Heavy Duty Steel";

  return (
    <div className="flex flex-col gap-10 sm:gap-12 font-jost">
      {/* Category Header Banner */}
      <div className="glass-panel border border-red-200/80 p-4 sm:p-6 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-500/10 text-brand-red rounded-2xl flex items-center justify-center shrink-0 border border-red-200">
            <Cog className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-brand-red font-extrabold">Tractor Attachment & Tillage Spec</span>
            <h2 className="text-base sm:text-xl font-extrabold text-dark-900 line-clamp-1">{product.name}</h2>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-brand-red/10 text-brand-red border border-brand-red/20 rounded-full text-xs font-extrabold uppercase tracking-wider">
            {tractorHp}
          </span>
          <span className="px-3 py-1 bg-light-200 text-dark-900 border border-light-300 rounded-full text-xs font-bold uppercase tracking-wider">
            3-Point Linkage
          </span>
        </div>
      </div>

      {/* Main Grid: Gallery & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        {/* Left Column: Gallery & Highlights */}
        <div className="w-full">
          <ProductGallery images={images} imagesAlt={imagesAlt} productName={activeVariant?.name || product.name} />

          {/* Key Hardware Badges */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="glass-card border border-red-100 p-3 rounded-2xl text-center">
              <Gauge className="w-5 h-5 text-brand-red mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block truncate">{tractorHp}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Tractor Power</span>
            </div>
            <div className="glass-card border border-red-100 p-3 rounded-2xl text-center">
              <Layers className="w-5 h-5 text-brand-red mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block truncate">{workingWidth}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Working Width</span>
            </div>
            <div className="glass-card border border-red-100 p-3 rounded-2xl text-center">
              <Award className="w-5 h-5 text-brand-red mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block truncate">{assemblyConfig}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Assembly Config</span>
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
              Part / SKU Code: <span className="text-dark-900 font-bold">{activeVariant?.id || product.id}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-light-300 flex flex-col gap-1 shadow-xs bg-gradient-to-br from-white to-red-50/30">
            <span className="text-xs font-extrabold text-dark-500 uppercase tracking-wider">Commercial List Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-red">
              {activeVariant?.price ? priceFormatter.format(Number(activeVariant.price)) : "Price on Request"}
            </div>
            {activeVariant?.applicableGst && (
              <p className="text-xs text-dark-500 font-medium">
                Inclusive of {activeVariant.applicableGst}% GST. Additional tractor hitch mounting accessories included.
              </p>
            )}
          </div>

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-dark-900 uppercase tracking-wide block">
                Select Model Size / Attachment Variant:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {variants.map((v) => {
                  const isSelectedVariant = v.id === activeVariantId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantId(v.id)}
                      className={`p-3 rounded-md border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                        isSelectedVariant
                          ? "border-brand-red bg-red-50/70 shadow-xs"
                          : "border-light-300 bg-white hover:border-red-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold uppercase ${isSelectedVariant ? "text-brand-red" : "text-dark-900"}`}>
                          {v.name}
                        </span>
                        {isSelectedVariant && <Check className="w-4 h-4 text-brand-red" />}
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

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <Link
              href="/dealers"
              className="flex-1 bg-brand-red hover:bg-brand-red-accent text-white font-bold py-4 px-6 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red min-h-[48px]"
            >
              <MapPin className="w-5 h-5" />
              Find Authorized Attachment Dealer
            </Link>
            <label
              className={`flex-none flex items-center justify-center gap-2 px-5 py-4 border-2 border-light-300 rounded-sm hover:border-dark-500 transition-colors group bg-white focus-within:ring-2 focus-within:ring-brand-red min-h-[48px] ${
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
                className="w-5 h-5 border-gray-300 rounded-sm text-brand-red focus:ring-brand-red disabled:cursor-not-allowed"
                checked={mounted ? isSelected : false}
                onChange={handleCompareChange}
                disabled={disabled}
              />
              <span className={`text-xs font-bold ${isSelected ? "text-brand-red" : "text-dark-900"}`}>
                {isSelected ? "In Compare" : "Compare"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="bg-white border border-light-300 rounded-sm p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-bold text-dark-900 uppercase tracking-wide border-b border-light-300 pb-3 mb-4">
          Product Description & Application
        </h3>
        <p className="text-sm text-dark-700 leading-relaxed">
          {product.description}
        </p>
      </section>

      {/* Full Technical Specifications */}
      <section aria-labelledby="tractor-specs-heading" className="bg-white border border-light-300 rounded-sm p-6 sm:p-8 shadow-xs">
        <h3 id="tractor-specs-heading" className="text-xl font-bold text-dark-900 uppercase tracking-wide border-b border-light-300 pb-4 mb-6 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-brand-red" />
          Technical Specifications & Engineering Details
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

      {/* Field Maintenance & Operating Guidance */}
      <section className="bg-red-50/60 border border-red-200 rounded-sm p-6 sm:p-8">
        <h3 className="text-lg font-bold text-dark-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-brand-red" />
          Field Maintenance & Setup Recommendations
        </h3>
        <ul className="space-y-2 text-sm text-dark-700">
          {(product.maintenanceTips && product.maintenanceTips.length > 0
            ? product.maintenanceTips
            : [
                "Grease triple-sealed bearings and PTO cross joints every 20 hours of field operation.",
                "Check hitch pin connections and torque frame bolts prior to heavy field work.",
                "Genuine replacement parts and hydraulic seal kits are available through certified KOREVA dealers."
              ]
          ).map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
