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
    <div className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow p-3 md:p-6">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] mb-3 md:mb-6 overflow-hidden flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm md:text-lg font-bold text-dark-900 leading-tight mb-1 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[40px] md:min-h-[52px]">
          <Link href={href} className="before:absolute before:inset-0">
            {title}
          </Link>
        </h3>
        <p className="text-[11px] md:text-sm text-gray-500 mb-2 md:mb-4">{category}</p>
        
        {/* Spacer to push price to bottom if titles vary in height */}
        <div className="flex-grow" />

        {/* Price & Actions Row */}
        <div className="flex flex-col mt-1 md:mt-2">
          <span className="text-sm sm:text-base md:text-xl font-bold text-dark-900 mb-3 md:mb-6">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}*
          </span>
          
          <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-3 md:pt-4">
            {id ? (
              <CompareCheckbox productId={id} />
            ) : (
              <div />
            )}
            <Link 
              href={href}
              className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-brand-red rounded-full flex items-center justify-center text-white hover:bg-brand-red-accent transition-colors shadow-md shrink-0"
              aria-label={`View details for ${title}`}
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
