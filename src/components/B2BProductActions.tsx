"use client";

import React from "react";
import Link from "next/link";
import { Product, Variant } from "@/lib/types";
import { useRfqStore } from "@/store/useRfqStore";
import { useCompareStore } from "@/store/useCompareStore";
import { useCartStore } from "@/store/useCartStore";
import { ENABLE_DIRECT_CHECKOUT } from "@/lib/config";
import {
  FileSpreadsheet,
  MapPin,
  MessageSquare,
  Package,
  Clock,
  ShieldCheck,
  FileText,
  ShoppingCart,
  Check,
  Layers,
} from "lucide-react";

interface B2BProductActionsProps {
  product: Product;
  activeVariant?: Variant;
}

const emptySubscribe = () => () => {};
function useHasMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function B2BProductActions({
  product,
  activeVariant,
}: B2BProductActionsProps) {
  const { addItem: addRfqItem } = useRfqStore();
  const { selectedProductIds, toggleProduct } = useCompareStore();
  const { addItem: addCartItem } = useCartStore();
  const mounted = useHasMounted();

  const isSelected = selectedProductIds.includes(product.id);
  const isMaxReached = selectedProductIds.length >= 3;
  const disabledCompare = !isSelected && isMaxReached;

  const handleCompareChange = () => {
    if (disabledCompare) {
      alert("You can only compare up to 3 products at a time.");
      return;
    }
    toggleProduct(product.id);
  };

  const handleRfqClick = () => {
    addRfqItem({
      productId: product.id,
      variantId: activeVariant?.id,
      name: activeVariant?.name || product.name,
      coverImage: activeVariant?.images?.[0] || product.coverImage,
      moq: product.moq || undefined,
      quantity: 1,
    });
  };

  const handleSampleClick = () => {
    addRfqItem({
      productId: product.id,
      variantId: activeVariant?.id,
      name: `[SAMPLE] ${activeVariant?.name || product.name}`,
      coverImage: activeVariant?.images?.[0] || product.coverImage,
      quantity: 1,
    });
  };

  const activeVariantId = activeVariant?.id || product.id;
  const activeName = activeVariant?.name || product.name;

  const whatsappMessage = encodeURIComponent(
    `Hello KOREVA Team, I am interested in getting a B2B quote for ${activeName} (Model Code: ${activeVariantId}). Please share specifications and pricing.`
  );
  const whatsappUrl = `https://wa.me/917455973188?text=${whatsappMessage}`;

  const priceNumber = activeVariant?.price ? Number(activeVariant.price) : 0;

  return (
    <div className="flex flex-col gap-6 font-jost">
      {/* 1. Defensive B2B Badges Bar */}
      {(product.moq || product.leadTime || product.isOemAvailable || product.specSheetUrl) && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-light-200">
          {product.moq && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-xs font-bold">
              <Package className="w-3.5 h-3.5 text-amber-700" />
              <span>MOQ: {product.moq}</span>
            </div>
          )}

          {product.leadTime && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 border border-blue-300 rounded-full text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>Lead Time: {product.leadTime}</span>
            </div>
          )}

          {product.isOemAvailable && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>OEM / Private Label Available</span>
            </div>
          )}

          {product.specSheetUrl && (
            <a
              href={product.specSheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-brand-red border border-rose-200 rounded-full text-xs font-bold hover:bg-brand-red hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download Spec Sheet (PDF)</span>
            </a>
          )}
        </div>
      )}

      {/* 2. Defensive Bulk Pricing Tiers Table */}
      {activeVariant?.bulkPricingTiers && activeVariant.bulkPricingTiers.length > 0 && (
        <div className="p-4 rounded-2xl bg-light-100/90 border border-light-300/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-dark-900 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-brand-red" />
            <span>Volume Wholesale Tiers</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {activeVariant.bulkPricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white border border-light-300 text-center shadow-2xs"
              >
                <span className="text-[11px] text-dark-500 font-extrabold block uppercase">
                  {tier.minQty}+ Units
                </span>
                <span className="text-sm font-extrabold text-brand-red block">
                  {tier.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Primary & Secondary B2B Action CTAs */}
      <div className="flex flex-col gap-3">
        {/* Row 1: Primary RFQ CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRfqClick}
            className="flex-1 bg-brand-red hover:bg-brand-red-accent text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md hover:shadow-brand-red/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer active:scale-[0.99]"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span>Request a Quote (RFQ)</span>
          </button>

          {/* Conditional Future E-Commerce Add to Cart */}
          {ENABLE_DIRECT_CHECKOUT && (
            <button
              onClick={() =>
                addCartItem({
                  id: Number(product.id.replace(/\D/g, "")) || Date.now(),
                  name: activeName,
                  price: priceNumber,
                  image: activeVariant?.images?.[0] || product.coverImage,
                })
              }
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>

        {/* Row 2: Secondary Sample & WhatsApp Inquiries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleSampleClick}
            className="w-full py-3 px-4 rounded-xl border border-dark-300 hover:border-dark-900 bg-white text-dark-900 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <Package className="w-4 h-4 text-brand-red" />
            <span>Request Sample</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-900 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-2xs"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 group-hover:text-white" />
            <span>WhatsApp Inquiry</span>
          </a>
        </div>

        {/* Row 3: Preserved Local Dealer Locator & Compare Checkbox */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/dealers"
            className="flex-1 bg-dark-900 hover:bg-black text-white font-extrabold py-3.5 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <MapPin className="w-4 h-4 text-brand-red" />
            <span>Find a Local Dealer</span>
          </Link>

          <label
            className={`flex-none flex items-center justify-center gap-2 px-5 py-3.5 border border-light-300 rounded-xl hover:border-dark-400 transition-colors bg-white ${
              disabledCompare ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={(e) => {
              if (disabledCompare) {
                e.preventDefault();
                handleCompareChange();
              }
            }}
          >
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded text-brand-red focus:ring-brand-red disabled:cursor-not-allowed"
              checked={mounted ? isSelected : false}
              onChange={handleCompareChange}
              disabled={disabledCompare}
            />
            <span
              className={`text-xs font-bold ${
                isSelected ? "text-brand-red" : "text-dark-900"
              }`}
            >
              {isSelected ? "Added to Compare" : "Add to Compare"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
