import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  category: string;
  price: number;
  image: string;
  variants?: number;
  href?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  category,
  price,
  image,
  variants,
  href = "#",
}) => {
  return (
    <Link href={href} className="group block cursor-pointer">
      <div className="flex flex-col gap-4">
        {/* Image Container */}
        <div className="relative bg-light-200 aspect-[4/5] overflow-hidden group-hover:opacity-95 transition-opacity">
          {/* Product Image */}
          <div className="relative w-full h-full p-4 transition-transform duration-500 group-hover:scale-105">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-1 mt-2">
          {/* Title & Price Row */}
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-body-medium text-dark-900 group-hover:text-dark-700 transition-colors line-clamp-2">
              {title}
            </h3>
            <span className="text-body-medium text-dark-900 whitespace-nowrap">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}
            </span>
          </div>

          {/* Category */}
          <p className="text-body text-dark-700">{category}</p>

          {/* Variants */}
          {variants && variants > 0 && (
            <p className="text-body text-dark-700 mt-1">
              {variants} {variants === 1 ? "Colour" : "Colours"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
