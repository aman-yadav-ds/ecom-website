"use client";

import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  category: string;
  inStock: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  inStock,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)] hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="rounded-full border border-red-500/30 bg-red-500/20 px-4 py-1.5 text-sm font-semibold text-red-400">
              Out of Stock
            </span>
          </div>
        )}
        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-400">
          {name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Price
            </span>
            <span className="text-xl font-bold text-white">
              ₹{Number(price).toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={!inStock}
            className={`relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              !inStock
                ? "cursor-not-allowed bg-zinc-800 text-zinc-600"
                : added
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95"
            }`}
          >
            {added ? (
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Added
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
