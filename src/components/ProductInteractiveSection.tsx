"use client";

import React, { useState } from "react";
import { Product, Variant } from "@/lib/types";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import DetailTabsSection from "./DetailTabsSection";
import CollapsibleFeature from "./CollapsibleFeature";
import LubricantDetailLayout from "./LubricantDetailLayout";
import HandToolDetailLayout from "./HandToolDetailLayout";
import TractorAttachmentDetailLayout from "./TractorAttachmentDetailLayout";
import SelfPropelledDetailLayout from "./SelfPropelledDetailLayout";
import FoodProcessingDetailLayout from "./FoodProcessingDetailLayout";
import Link from "next/link";
import { MapPin, Wrench, Shield } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";
import B2BProductActions from "./B2BProductActions";

interface ProductInteractiveSectionProps {
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

function EquipmentDetailLayout({ product, variants }: ProductInteractiveSectionProps) {
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

  const activeVariant = variants.find((v) => v.id === activeVariantId);
  const images = activeVariant?.images?.length
    ? activeVariant.images
    : [product.coverImage];
  const imagesAlt = activeVariant?.imagesAlt?.length
    ? activeVariant.imagesAlt
    : [product.coverImageAlt || `${product.name} agricultural equipment`];

  const priceFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  return (
    <div className="flex flex-col gap-16 font-jost">
      {/* Top Grid: Gallery (Left) & Metadata (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

        {/* Left Column: Gallery */}
        <div className="w-full">
          <ProductGallery images={images} imagesAlt={imagesAlt} productName={activeVariant?.name || product.name} />
        </div>

        {/* Right Column: Metadata, Selectors, Actions */}
        <div className="flex flex-col gap-8">

          {/* Header Block */}
          <div className="flex flex-col gap-2 border-b border-light-300 pb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-dark-900 tracking-tight uppercase">
              {activeVariant?.name || product.name}
            </h1>
            <p className="text-sm font-medium text-dark-500 uppercase tracking-widest">
              Model Code: {activeVariant?.id || product.id}
            </p>
          </div>

          {/* Pricing Block */}
          <div className="flex flex-col gap-1">
            <div className="text-3xl font-bold text-brand-red">
              {activeVariant?.price ? priceFormatter.format(Number(activeVariant.price)) : "Price on Request"}
            </div>
            {activeVariant?.applicableGst && (
              <p className="text-sm text-dark-500 font-medium">
                Includes {activeVariant.applicableGst}. Additional shipping & mounting fees may apply.
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

          {/* B2B Action Area */}
          <B2BProductActions product={product} activeVariant={activeVariant} />

          {/* Quick Accordions */}
          <div className="mt-4">
            <CollapsibleFeature title="Maintenance & Servicing" icon={<Wrench className="w-4 h-4 text-brand-red" />}>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-sm text-dark-700">
                <li>Requires oil change every 50 hours of operation.</li>
                <li>Check belt tension prior to heavy usage.</li>
                <li>All replacement parts available through certified KOREVA dealers.</li>
              </ul>
            </CollapsibleFeature>
            <CollapsibleFeature title="Warranty Information" icon={<Shield className="w-4 h-4 text-brand-red" />}>
              <p className="mt-2 text-sm text-dark-700">
                This unit is covered by KOREVA&apos;s standard 1-year industrial warranty against manufacturing defects. Extended 3-year enterprise warranties are available upon dealer registration.
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
}

export default function ProductInteractiveSection({
  product,
  variants,
}: ProductInteractiveSectionProps) {
  if (product.categoryId === "lubricants") {
    return <LubricantDetailLayout product={product} variants={variants} />;
  }

  if (product.categoryId === "hand-tools") {
    return <HandToolDetailLayout product={product} variants={variants} />;
  }

  if (product.categoryId === "tractor-attachments") {
    return <TractorAttachmentDetailLayout product={product} variants={variants} />;
  }

  if (product.categoryId === "self-propelled-machinery") {
    return <SelfPropelledDetailLayout product={product} variants={variants} />;
  }

  if (product.categoryId === "food-processing-units") {
    return <FoodProcessingDetailLayout product={product} variants={variants} />;
  }

  return <EquipmentDetailLayout product={product} variants={variants} />;
}
