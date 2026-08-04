"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  imagesAlt?: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, imagesAlt, productName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Reset active index and error state when images change (e.g. variant changes)
  useEffect(() => {
    setActiveIndex(0);
    setHasError(false);
  }, [images]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveIndex(index);
      setHasError(false);
    } else if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % images.length;
      setActiveIndex(nextIndex);
      setHasError(false);
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + images.length) % images.length;
      setActiveIndex(prevIndex);
      setHasError(false);
    }
  };

  const activeImage = images[activeIndex] || "";
  const activeAlt = (imagesAlt && imagesAlt[activeIndex])
    ? imagesAlt[activeIndex]
    : `${productName} view ${activeIndex + 1}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Display Area */}
      <div className="relative w-full aspect-[4/3] md:aspect-[1/1] lg:aspect-[4/3] bg-light-200 border border-light-300 rounded-sm overflow-hidden flex items-center justify-center">
        {!activeImage || hasError ? (
          <div className="flex flex-col items-center justify-center text-dark-500">
            <ImageOff className="w-12 h-12 mb-2" strokeWidth={1.5} />
            <span className="text-sm font-medium">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={activeImage}
            alt={activeAlt}
            fill
            className="object-contain p-4 mix-blend-multiply"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            loading="eager"
            onError={() => setHasError(true)}
          />
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div 
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-light-400 scrollbar-track-transparent touch-pan-x"
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {images.map((img, idx) => {
            const thumbAlt = (imagesAlt && imagesAlt[idx]) ? imagesAlt[idx] : `Thumbnail ${idx + 1}`;
            return (
              <button
                key={idx}
                role="tab"
                aria-selected={activeIndex === idx}
                tabIndex={activeIndex === idx ? 0 : -1}
                onClick={() => {
                  setActiveIndex(idx);
                  setHasError(false);
                }}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-light-100 border-2 rounded-sm overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${
                  activeIndex === idx ? "border-brand-red shadow-sm" : "border-light-300 hover:border-dark-500 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={thumbAlt}
                  fill
                  className="object-contain p-1"
                  sizes="96px"
                  onError={(e) => {
                    // If thumbnail fails, we hide the actual image and show a small icon
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-light-200');
                  }}
                />
                <span className="sr-only">View image {idx + 1}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
