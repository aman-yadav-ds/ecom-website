"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import CompareCheckbox from "./CompareCheckbox";

interface CardProps {
  id?: string;
  title: string;
  category: string;
  price: number;
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
  price,
  image,
  imageAlt,
  href = "#",
}) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-xl sm:rounded-2xl border border-light-300 hover:border-brand-red/40 p-2 sm:p-4 md:p-5 font-jost shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      
      {/* Top Bar: Wishlist Favorite Heart (right) */}
      <div className="relative z-10 flex items-center justify-end min-h-[18px] sm:min-h-[22px] mb-1 sm:mb-2">
        {/* Favorite Heart Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-dark-400 hover:text-brand-red hover:bg-brand-red/5 transition-colors cursor-pointer shrink-0"
        >
          <Heart
            className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
              isFavorite
                ? "fill-brand-red text-brand-red scale-110"
                : "text-dark-400 group-hover:text-dark-600"
            }`}
          />
        </button>
      </div>

      {/* Product Image Stage */}
      <div className="relative w-full aspect-[4/3] mb-1.5 sm:mb-4 overflow-hidden flex items-center justify-center bg-white rounded-lg sm:rounded-xl border border-light-200 p-1 sm:p-3">
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
        {/* Product Title */}
        <h3 className="text-xs sm:text-base font-extrabold text-dark-900 leading-tight sm:leading-snug mb-0.5 sm:mb-1 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[28px] sm:min-h-[44px]">
          <Link
            href={href}
            prefetch={false}
            className="before:absolute before:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xl"
          >
            {title}
          </Link>
        </h3>

        {/* Category Label */}
        <p className="text-[9px] sm:text-xs text-brand-red font-black uppercase tracking-wider mb-1 sm:mb-2 line-clamp-1">
          {category}
        </p>

        {/* Flexible spacer */}
        <div className="flex-grow" />

        {/* Price Row */}
        <div className="mt-1 sm:mt-2 pt-1.5 sm:pt-3 border-t border-light-200">
          <div className="text-xs sm:text-lg md:text-xl font-black text-dark-900 mb-1.5 sm:mb-3 tracking-tight">
            {price > 0
              ? new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(price)
              : "Contact for Price"}
          </div>

          {/* Action Row: [ ] Compare on Left, Red Circle CTA on Right */}
          <div className="flex items-center justify-between mt-auto gap-1">
            {id ? <CompareCheckbox productId={id} /> : <div />}

            <Link
              href={href}
              prefetch={false}
              className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-brand-red rounded-full flex items-center justify-center text-white hover:bg-brand-red-accent transition-all duration-200 shadow-xs hover:scale-110 active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group/btn"
              aria-label={`View details for ${title}`}
            >
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
