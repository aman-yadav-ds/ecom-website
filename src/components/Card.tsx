import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
  return (
    <div className="group relative flex flex-col h-full glass-card border border-light-300/80 rounded-2xl p-4 sm:p-5 md:p-6 font-jost shadow-xs hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] mb-3 sm:mb-4 overflow-hidden flex items-center justify-center bg-white rounded-xl border border-light-200 p-2">
        <Image
          src={image}
          alt={imageAlt || `KOREVA ${title} - Heavy Agriculture Machinery`}
          fill
          loading="lazy"
          className="object-contain transition-transform duration-500 group-hover:scale-108 p-1 sm:p-2"
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-dark-900 leading-tight mb-1 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[32px] sm:min-h-[44px]">
          <Link href={href} className="before:absolute before:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xl">
            {title}
          </Link>
        </h3>
        <p className="text-[11px] sm:text-xs text-brand-red font-bold uppercase tracking-wider mb-2 line-clamp-1">{category}</p>

        {/* Spacer to push price to bottom */}
        <div className="flex-grow" />

        {/* Price & Actions Row */}
        <div className="flex flex-col mt-2 pt-3 border-t border-light-200">
          <span className="text-sm sm:text-base md:text-xl font-extrabold text-dark-900 mb-3">
            {price > 0 ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price) : 'Contact for Price'}
          </span>

          <div className="flex justify-between items-center mt-auto gap-2">
            {id ? (
              <CompareCheckbox productId={id} />
            ) : (
              <div />
            )}
            <Link
              href={href}
              className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 bg-brand-red rounded-full flex items-center justify-center text-white hover:bg-brand-red-accent transition-colors shadow-xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red active:scale-95"
              aria-label={`View details for ${title}`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Card;
