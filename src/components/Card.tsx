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
    <div className="group relative flex flex-col h-full glass-card border border-light-300/80 hover:border-brand-red/30 rounded-2xl p-3 sm:p-5 md:p-6 font-jost shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] mb-2 sm:mb-4 overflow-hidden flex items-center justify-center bg-white rounded-xl border border-light-200 p-2">
        <Image
          src={image}
          alt={imageAlt || `KOREVA ${title} - Heavy Agriculture Machinery`}
          fill
          loading="lazy"
          className="object-contain transition-transform duration-500 group-hover:scale-105 p-1 sm:p-2"
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xs sm:text-base md:text-lg font-extrabold text-dark-900 leading-tight mb-1 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[36px] sm:min-h-[48px]">
          <Link href={href} prefetch={false} className="before:absolute before:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xl">
            {title}
          </Link>
        </h3>
        <p className="text-[10px] sm:text-xs text-brand-red font-bold uppercase tracking-wider mb-1.5 sm:mb-2 line-clamp-1">{category}</p>

        {/* Spacer to push price to bottom */}
        <div className="flex-grow" />

        {/* Price & Actions Row */}
        <div className="flex flex-col mt-1.5 sm:mt-2 pt-2 sm:pt-3 border-t border-light-200">
          <span className="text-xs sm:text-base md:text-xl font-extrabold text-dark-900 mb-2 sm:mb-3 tracking-tight">
            {price > 0 ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price) : 'Contact for Price'}
          </span>

          <div className="flex justify-between items-center mt-auto gap-1.5 sm:gap-2">
            {id ? (
              <CompareCheckbox productId={id} />
            ) : (
              <div />
            )}
            <Link
              href={href}
              prefetch={false}
              className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-brand-red rounded-full flex items-center justify-center text-white hover:bg-brand-red-accent transition-all duration-200 shadow-xs hover:scale-105 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red active:scale-95"
              aria-label={`View details for ${title}`}
            >
              <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Card;
