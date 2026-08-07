"use client";

import React, { useState } from "react";
import { Product, Variant } from "@/lib/types";
import ProductGallery from "./ProductGallery";
import Link from "next/link";
import { MapPin, Zap, Shield, Check, Flame, Award, Wrench, RefreshCw, Cpu } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";

interface SelfPropelledDetailLayoutProps {
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

export default function SelfPropelledDetailLayout({ product, variants }: SelfPropelledDetailLayoutProps) {
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
    : [product.coverImageAlt || `${product.name} self propelled machinery`];

  const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const enginePower = activeVariant?.technicalDetails["Engine Power"] || "7 HP OHV Engine";
  const startSystem = activeVariant?.technicalDetails["Starting System"] || "Recoil / Electric Start";
  const transmission = activeVariant?.technicalDetails["Transmission Type"] || "Gear Driven Transmission";

  return (
    <div className="flex flex-col gap-10 sm:gap-12 font-jost">
      {/* Category Header Banner */}
      <div className="glass-panel border border-orange-200/80 p-4 sm:p-6 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 border border-orange-200">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-orange-600 font-extrabold">Autonomous Engine & Self-Propelled Power Spec</span>
            <h2 className="text-base sm:text-xl font-extrabold text-dark-900 line-clamp-1">{product.name}</h2>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-orange-500/10 text-orange-700 border border-orange-200 rounded-full text-xs font-extrabold uppercase tracking-wider">
            {enginePower}
          </span>
          <span className="px-3 py-1 bg-light-200 text-dark-900 border border-light-300 rounded-full text-xs font-bold uppercase tracking-wider">
            OHV 4-Stroke
          </span>
        </div>
      </div>

      {/* Main Grid: Gallery & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        {/* Left Column: Gallery & Highlights */}
        <div className="w-full">
          <ProductGallery images={images} imagesAlt={imagesAlt} productName={activeVariant?.name || product.name} />

          {/* Key Engine Badges */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="glass-card border border-orange-100 p-3 rounded-2xl text-center">
              <Flame className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block">{enginePower}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Engine Rating</span>
            </div>
            <div className="glass-card border border-orange-100 p-3 rounded-2xl text-center">
              <Cpu className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block">{transmission}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Drive System</span>
            </div>
            <div className="glass-card border border-orange-100 p-3 rounded-2xl text-center">
              <Award className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs font-extrabold text-dark-900 block">{startSystem}</span>
              <span className="text-[10px] text-dark-500 font-medium uppercase">Ignition System</span>
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
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-light-300 flex flex-col gap-1 shadow-xs bg-gradient-to-br from-white to-orange-50/30">
            <span className="text-xs font-extrabold text-dark-500 uppercase tracking-wider">Commercial Equipment Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-orange-600">
              {activeVariant?.price ? priceFormatter.format(Number(activeVariant.price)) : "Price on Request"}
            </div>
            {activeVariant?.applicableGst && (
              <p className="text-xs text-dark-500 font-medium">
                Inclusive of {activeVariant.applicableGst}. Pre-tested engine oil & tool kit included.
              </p>
            )}
          </div>

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-dark-900 uppercase tracking-wide block">
                Select Machinery Configuration:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {variants.map((v) => {
                  const isSelectedVariant = v.id === activeVariantId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantId(v.id)}
                      className={`p-3 rounded-md border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${isSelectedVariant
                          ? "border-orange-500 bg-orange-50/70 shadow-xs"
                          : "border-light-300 bg-white hover:border-orange-300"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold uppercase ${isSelectedVariant ? "text-orange-700" : "text-dark-900"}`}>
                          {v.name}
                        </span>
                        {isSelectedVariant && <Check className="w-4 h-4 text-orange-600" />}
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
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 min-h-[48px]"
            >
              <MapPin className="w-5 h-5" />
              Find Authorized Machinery Dealer
            </Link>
            <label
              className={`flex-none flex items-center justify-center gap-2 px-5 py-4 border-2 border-light-300 rounded-sm hover:border-dark-500 transition-colors group bg-white focus-within:ring-2 focus-within:ring-orange-500 min-h-[48px] ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
                className="w-5 h-5 border-gray-300 rounded-sm text-orange-600 focus:ring-orange-500 disabled:cursor-not-allowed"
                checked={mounted ? isSelected : false}
                onChange={handleCompareChange}
                disabled={disabled}
              />
              <span className={`text-xs font-bold ${isSelected ? "text-orange-600" : "text-dark-900"}`}>
                {isSelected ? "In Compare" : "Compare"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="bg-white border border-light-300 rounded-sm p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-bold text-dark-900 uppercase tracking-wide border-b border-light-300 pb-3 mb-4">
          Product Description & Operational Scope
        </h3>
        <p className="text-sm text-dark-700 leading-relaxed">
          {product.description}
        </p>
      </section>

      {/* Full Technical Specifications */}
      <section aria-labelledby="machinery-specs-heading" className="bg-white border border-light-300 rounded-sm p-6 sm:p-8 shadow-xs">
        <h3 id="machinery-specs-heading" className="text-xl font-bold text-dark-900 uppercase tracking-wide border-b border-light-300 pb-4 mb-6 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-orange-600" />
          Technical Specifications & Engine Metrics
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

      {/* Engine & Transmission Maintenance Guide */}
      <section className="bg-orange-50/60 border border-orange-200 rounded-sm p-6 sm:p-8">
        <h3 className="text-lg font-bold text-dark-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-orange-600" />
          Engine & Machinery Maintenance Routine
        </h3>
        <ul className="space-y-2 text-sm text-dark-700">
          {(product.maintenanceTips && product.maintenanceTips.length > 0
            ? product.maintenanceTips
            : [
              "Check engine oil level (using KOREVA 4T 20W-50) before every field operation.",
              "Clean foam air filter element every 25 hours to prevent dirt ingress into engine carburetor.",
              "Inspect gear oil level and clutch cable tension monthly for smooth speed shifting."
            ]
          ).map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
