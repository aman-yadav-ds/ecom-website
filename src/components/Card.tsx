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
  variants?: number;
  href?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  category,
  price,
  image,
  href = "#",
}) => {
  return (
    <div className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-sm hover:shadow-lg hover:border-brand-red/40 transition-all duration-200 p-2.5 sm:p-4 md:p-6 font-jost">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] mb-2 sm:mb-4 overflow-hidden flex items-center justify-center bg-gray-50/50 rounded-xs">
        <Image
          src={image}
          alt={`Koreva9 ${title} - Heavy Agriculture Machinery`}
          fill
          loading="lazy"
          className="object-contain transition-transform duration-300 group-hover:scale-105 p-1 sm:p-2"
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xs sm:text-base md:text-lg font-bold text-dark-900 leading-tight mb-1 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[32px] sm:min-h-[44px] md:min-h-[52px]">
          <Link href={href} className="before:absolute before:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs">
            {title}
          </Link>
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-1.5 sm:mb-3 font-medium line-clamp-1">{category}</p>

        {/* Spacer to push price to bottom if titles vary in height */}
        <div className="flex-grow" />

        {/* Price & Actions Row */}
        <div className="flex flex-col mt-1">
          <span className="text-xs sm:text-base md:text-xl font-extrabold text-dark-900 mb-2 sm:mb-4">
            {price > 0 ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price) : 'Contact for Price'}
          </span>

          <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-2 sm:pt-4 gap-1">
            {id ? (
              <CompareCheckbox productId={id} />
            ) : (
              <div />
            )}
            <Link
              href={href}
              className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 min-w-[32px] min-h-[32px] sm:min-w-[40px] sm:min-h-[40px] bg-brand-red rounded-full flex items-center justify-center text-white hover:bg-brand-red-accent transition-colors shadow-md shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-1"
              aria-label={`View details for ${title}`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Card;
