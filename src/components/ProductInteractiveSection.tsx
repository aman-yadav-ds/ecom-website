"use client";

import React, { useState, useEffect } from "react";
import { Product, Variant } from "@/lib/types";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import DetailTabsSection from "./DetailTabsSection";
import CollapsibleFeature from "./CollapsibleFeature";
import Link from "next/link";
import { MapPin, Wrench, Shield, FileText } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";

interface ProductInteractiveSectionProps {
  product: Product;
  variants: Variant[];
}

const ProductInteractiveSection: React.FC<ProductInteractiveSectionProps> = ({
  product,
  variants,
}) => {
  // If no variants, fallback to basic product info
  const [activeVariantId, setActiveVariantId] = useState(
    product.defaultVariantId || (variants.length > 0 ? variants[0].id : "")
  );

  const { selectedProductIds, toggleProduct } = useCompareStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const activeVariant = variants.find((v) => v.id === activeVariantId);
  
  // Resolve images: if variant has images, use them. Else fallback to product cover image.
  const images = activeVariant?.images?.length
    ? activeVariant.images
    : [product.coverImage];

  const priceFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  return (
    <div className="flex flex-col gap-16">
      {/* Top Grid: Gallery (Left) & Metadata (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
        
        {/* Left Column: Gallery */}
        <div className="w-full">
          <ProductGallery images={images} productName={activeVariant?.name || product.name} />
        </div>

        {/* Right Column: Metadata, Selectors, Actions */}
        <div className="flex flex-col gap-8">
          
          {/* Header Block */}
          <div className="flex flex-col gap-2 border-b border-light-300 pb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-dark-900 tracking-tight uppercase">
              {activeVariant?.name || product.name}
            </h1>
            <p className="text-sm font-medium text-dark-500 uppercase tracking-widest">
              Part No: {activeVariant?.id || product.id}
            </p>
          </div>

          {/* Pricing Block */}
          <div className="flex flex-col gap-1">
            <div className="text-3xl font-bold text-brand-red">
              {activeVariant?.price ? priceFormatter.format(Number(activeVariant.price)) : "Price on Request"}
            </div>
            {activeVariant?.applicableGst && (
              <p className="text-sm text-dark-500 font-medium">
                Includes {activeVariant.applicableGst}% GST. Additional shipping may apply.
              </p>
            )}
          </div>

          {/* Variant Selector */}
          {variants.length > 1 && (
            <VariantSelector
              variants={variants}
              activeVariantId={activeVariantId}
              onVariantChange={setActiveVariantId}
            />
          )}

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/dealers" className="flex-1 bg-brand-red hover:bg-brand-red-accent text-white font-bold py-4 px-6 rounded-sm shadow-md transition-all flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Find a Local Dealer
            </Link>
            <label 
              className={`flex-none flex items-center justify-center gap-2 px-6 py-4 border-2 border-light-300 rounded-sm hover:border-dark-500 transition-colors group bg-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={(e) => {
                // Prevent default behavior if disabled to stop checkbox toggle
                if (disabled) {
                  e.preventDefault();
                  handleCompareChange();
                }
              }}
            >
              <input 
                type="checkbox" 
                className="w-5 h-5 border-gray-300 rounded-sm text-orange-500 focus:ring-orange-500 disabled:cursor-not-allowed" 
                checked={mounted ? isSelected : false}
                onChange={handleCompareChange}
                disabled={disabled}
              />
              <span className={`text-sm font-bold ${isSelected ? 'text-brand-red' : 'text-dark-900 group-hover:text-dark-700'}`}>
                {isSelected ? 'Added to Compare' : 'Add to Compare'}
              </span>
            </label>
          </div>

          {/* Quick Accordions */}
          <div className="mt-4">
            <CollapsibleFeature title="Maintenance & Servicing" icon={<Wrench className="w-4 h-4" />}>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Requires oil change every 50 hours of operation.</li>
                <li>Check belt tension prior to heavy usage.</li>
                <li>All replacement parts available through certified KOREVA dealers.</li>
              </ul>
            </CollapsibleFeature>
            <CollapsibleFeature title="Warranty Information" icon={<Shield className="w-4 h-4" />}>
              <p className="mt-2">
                This unit is covered by KOREVA's standard 1-year industrial warranty against manufacturing defects. Extended 3-year enterprise warranties are available upon dealer registration.
              </p>
            </CollapsibleFeature>
          </div>
        </div>
      </div>

      {/* Full Width Specs & Details */}
      <div className="w-full">
        <DetailTabsSection 
          description={product.description}
          technicalDetails={activeVariant?.technicalDetails || {}}
        />
      </div>
    </div>
  );
};

export default ProductInteractiveSection;
