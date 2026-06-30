"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 transition-shadow duration-300 group-hover:shadow-emerald-500/40">
            <span className="text-lg font-black text-white">K</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            KOREVA
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
          >
            Contact
          </Link>
        </div>

        {/* Cart */}
        <button className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/10">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.34-1.867l1.586-6.977a1.125 1.125 0 0 0-1.098-1.37H6.113m1.387 8.214L5.106 5.272M7.5 14.25 5.106 5.272m0 0H3.636"
            />
          </svg>
          Cart
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-500/40 animate-bounce-in">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
