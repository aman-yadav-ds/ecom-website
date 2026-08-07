"use client";

import React, { useState } from "react";
import { Product, Variant } from "@/lib/types";
import ProductGallery from "./ProductGallery";
import Link from "next/link";
import { MapPin, Droplet, ShieldCheck, Download, Check, Truck, Info, PhoneCall, RefreshCw } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";

interface LubricantDetailLayoutProps {
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

export default function LubricantDetailLayout({ product, variants }: LubricantDetailLayoutProps) {
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
    : [product.coverImageAlt || `${product.name} industrial lubricant container`];

  const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const viscosity = activeVariant?.technicalDetails["Viscosity Grade"] || "Universal Fluid";

  return (
    <div className="flex flex-col gap-12 font-jost">
      {/* Top Banner: Fluid Category Badge */}
      <div className="glass-panel border border-emerald-300/60 p-5 sm:p-6 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-300">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-700 font-extrabold">Industrial Fluid & Lubricant Spec</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-dark-900">{product.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-800 border border-emerald-300 rounded-full text-xs font-extrabold uppercase tracking-wider">
            {viscosity} Grade
          </span>
          <span className="px-3 py-1 bg-light-200 text-dark-900 border border-light-300 rounded-full text-xs font-bold uppercase tracking-wider">
            ISO 9001
          </span>
        </div>
      </div>

      {/* Primary Grid: Gallery (Left) & Fluid Selector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
        {/* Left Column: Gallery */}
        <div className="w-full">
          <ProductGallery images={images} imagesAlt={imagesAlt} productName={activeVariant?.name || product.name} />

          {/* Quick Certifications Bar below gallery */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="glass-card border border-emerald-200 p-3 rounded-2xl text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-xs font-bold text-dark-900 block">Anti-Wear Formula</span>
            </div>
            <div className="glass-card border border-emerald-200 p-3 rounded-2xl text-center">
              <Droplet className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-xs font-bold text-dark-900 block">Thermal Stability</span>
            </div>
            <div className="glass-card border border-emerald-200 p-3 rounded-2xl text-center">
              <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-xs font-bold text-dark-900 block">Bulk Supply</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pack Sizes, Pricing, Dealer Action */}
        <div className="flex flex-col gap-6">
          {/* Header Info */}
          <div className="border-b border-light-300 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900 tracking-tight uppercase">
              {activeVariant?.name || product.name}
            </h1>
            <p className="text-sm text-dark-500 font-medium mt-1">
              Part / SKU: <span className="text-dark-900 font-bold">{activeVariant?.id || product.id}</span>
            </p>
          </div>

          {/* Pricing & GST */}
          <div className="glass-panel p-6 rounded-2xl border border-light-300 flex flex-col gap-1 shadow-xs">
            <span className="text-xs font-extrabold text-dark-500 uppercase tracking-wider">Estimated Dealer List Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700">
              {activeVariant?.price ? priceFormatter.format(Number(activeVariant.price)) : "Quote Required"}
            </div>
            {activeVariant?.applicableGst && (
              <p className="text-xs text-dark-500 font-medium">
                Inclusive of {activeVariant.applicableGst}. Bulk discounts available via local authorized dealers.
              </p>
            )}
          </div>

          {/* Pack Size / Container Variant Selector */}
          {variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-bold text-dark-900 uppercase tracking-wide block">
                Select Container / Pack Size:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {variants.map((v) => {
                  const isSelectedVariant = v.id === activeVariantId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantId(v.id)}
                      className={`p-3 rounded-md border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${isSelectedVariant
                          ? "border-emerald-600 bg-emerald-50 shadow-sm"
                          : "border-light-300 bg-white hover:border-emerald-300"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold uppercase ${isSelectedVariant ? "text-emerald-800" : "text-dark-900"}`}>
                          {v.technicalDetails["Container Volume"] || v.name}
                        </span>
                        {isSelectedVariant && <Check className="w-4 h-4 text-emerald-600" />}
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
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-6 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <MapPin className="w-5 h-5" />
              Find Local Fluid Dealer
            </Link>
            <label
              className={`flex-none flex items-center justify-center gap-2 px-5 py-4 border-2 border-light-300 rounded-sm hover:border-dark-500 transition-colors group bg-white focus-within:ring-2 focus-within:ring-emerald-500 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
                className="w-5 h-5 border-gray-300 rounded-sm text-emerald-600 focus:ring-emerald-500 disabled:cursor-not-allowed"
                checked={mounted ? isSelected : false}
                onChange={handleCompareChange}
                disabled={disabled}
              />
              <span className={`text-xs font-bold ${isSelected ? "text-emerald-700" : "text-dark-900"}`}>
                {isSelected ? "In Compare" : "Compare"}
              </span>
            </label>
          </div>

          {/* Download Technical / Safety Sheet CTA */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <p className="text-xs font-bold text-dark-900 uppercase">Technical & Safety Data (TDS/SDS)</p>
                <p className="text-xs text-dark-700">Download official oil viscosity & safety compliance sheets.</p>
              </div>
            </div>
            <Link
              href="/downloads"
              className="px-3 py-2 bg-emerald-700 text-white hover:bg-emerald-800 rounded-xs text-xs font-bold flex items-center gap-1 shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Download className="w-4 h-4" />
              TDS Spec Sheet
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Fluid Maintenance Protocol */}
      <section className="bg-emerald-50/60 border border-emerald-200 rounded-sm p-6 sm:p-8">
        <h3 className="text-lg font-bold text-dark-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-emerald-600" />
          Handling & Storage Guidelines
        </h3>
        <ul className="space-y-2 text-sm text-dark-700">
          {(product.maintenanceTips && product.maintenanceTips.length > 0
            ? product.maintenanceTips
            : [
              "Store lubricant containers in a dry, covered area away from direct sunlight.",
              "Thoroughly clean fill necks and funnels before topping up oil sumps.",
              "Follow OEM equipment maintenance intervals for full fluid drainage and filter replacement."
            ]
          ).map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Technical Specifications Grid for Lubricants */}
      <section aria-labelledby="fluid-specs-heading" className="bg-white border border-light-300 rounded-sm p-6 sm:p-8 shadow-sm">
        <h3 id="fluid-specs-heading" className="text-xl font-bold text-dark-900 uppercase tracking-wide border-b border-light-300 pb-4 mb-6 flex items-center gap-2">
          <Droplet className="w-5 h-5 text-emerald-600" />
          Technical & Chemical Specifications
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

      {/* Bulk Purchase & Technical Support Banner */}
      <section className="bg-dark-900 text-white p-6 sm:p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wide text-white">Need Large Quantity Fleet Supply or Barrel Quotation?</h3>
          <p className="text-sm text-gray-300 mt-1">Our lubricants engineers assist with fleet maintenance schedules and custom barrel orders.</p>
        </div>
        <Link
          href="/services-events/contact-us"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 text-dark-900 hover:bg-emerald-400 font-extrabold text-sm uppercase rounded-sm transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <PhoneCall className="w-4 h-4" />
          Contact Fluid Specialist
        </Link>
      </section>
    </div>
  );
}
