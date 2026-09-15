"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import CompareCheckbox from "./CompareCheckbox";

interface CardProps {
  id?: string;
  title: string;
  category: string;
  price?: number;
  image: string;
  imageAlt?: string;
  variants?: number;
  href?: string;
  badge?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  category,
  image,
  imageAlt,
  variants,
  badge,
  href = "#",
}) => {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-xl sm:rounded-2xl border border-light-300 hover:border-brand-red/40 p-2 sm:p-4 md:p-5 font-jost shadow-xs hover:shadow-lg hover:shadow-brand-red/[0.04] transition-all duration-300 hover:-translate-y-1">
      
      {/* Optional Badge */}
      {badge && (
        <div className="relative z-10 flex items-center mb-1.5 sm:mb-2">
          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded sm:rounded-md text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase bg-brand-red/10 text-brand-red border border-brand-red/20 line-clamp-1">
            {badge}
          </span>
        </div>
      )}

      {/* Product Image Stage */}
      <div className="relative w-full aspect-[4/3] mb-1.5 sm:mb-4 overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FAF9F7] to-[#F3F2EE] rounded-lg sm:rounded-xl border border-light-200/90 group-hover:border-brand-red/25 p-1 sm:p-3 transition-colors duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
        <Image
          src={imgSrc}
          alt={imageAlt || `KOREVA ${title} - Industrial Agricultural Machinery`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-105 p-0.5 sm:p-1"
          onError={() => setImgSrc("/placeholder.png")}
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        {/* Category Label */}
        <p className="text-[9px] sm:text-xs text-brand-red font-black uppercase tracking-wider mb-0.5 sm:mb-1 line-clamp-1">
          {category}
        </p>

        {/* Product Title */}
        <h3 className="text-xs sm:text-base font-extrabold text-dark-900 leading-tight sm:leading-snug mb-1 sm:mb-2 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[28px] sm:min-h-[44px]">
          <Link
            href={href}
            prefetch={false}
            className="before:absolute before:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xl"
          >
            {title}
          </Link>
        </h3>

        {/* Flexible spacer */}
        <div className="flex-grow min-h-[4px]" />

        {/* Multi-Variant Specification Callout (Replaces fixed single price) */}
        <div className="mt-1 sm:mt-2 pt-1.5 sm:pt-3 border-t border-light-200">
          <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-3">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-light-200/90 border border-light-300/80 text-dark-700">
              <Layers className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand-red shrink-0" />
              <span className="text-[9px] sm:text-xs font-bold leading-tight">
                {variants && variants > 1 ? (
                  <>
                    <span className="sm:hidden">{variants} Variants</span>
                    <span className="hidden sm:inline">{variants} Variants Available</span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">Multi-Variant</span>
                    <span className="hidden sm:inline">Multiple Configurations</span>
                  </>
                )}
              </span>
            </div>
            
            <span className="text-[8px] sm:text-[11px] font-semibold text-dark-500 uppercase tracking-tight line-clamp-1 text-right">
              <span className="hidden xs:inline">Spec-based </span>pricing
            </span>
          </div>

          {/* Action Row: [ ] Compare on Left, Interactive CTA on Right */}
          <div className="flex items-center justify-between mt-auto gap-1">
            {id ? <CompareCheckbox productId={id} /> : <div />}

            <Link
              href={href}
              prefetch={false}
              className="relative z-10 inline-flex items-center justify-center gap-1 sm:gap-1.5 h-6 w-6 sm:w-auto sm:h-8 p-0 sm:px-3 bg-brand-red hover:bg-brand-red-accent text-white rounded-full sm:rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.03] active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group/btn"
              aria-label={`View details and specs for ${title}`}
            >
              <span className="hidden sm:inline">View Specs</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;

