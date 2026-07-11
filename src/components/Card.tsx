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
    <div className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow p-6">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-dark-900 leading-tight mb-1 group-hover:text-brand-red transition-colors line-clamp-2">
          <Link href={href} className="before:absolute before:inset-0">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-4">{category}</p>
        
        {/* Spacer to push price to bottom if titles vary in height */}
        <div className="flex-grow" />

        {/* Price & Actions Row */}
        <div className="flex flex-col mt-2">
          <span className="text-xl font-bold text-dark-900 mb-6">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(price)}*
          </span>
          
          <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-4">
            {id ? (
              <CompareCheckbox productId={id} />
            ) : (
              <div />
            )}
            <Link 
              href={href}
              className="relative z-10 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-md"
              aria-label={`View details for ${title}`}
            >
              <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
