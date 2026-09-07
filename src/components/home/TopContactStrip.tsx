import React from "react";
import Link from "next/link";
import { Phone, Store, ChevronRight } from "lucide-react";

export function TopContactStrip() {
  return (
    <aside
      suppressHydrationWarning
      className="bg-neutral-950 text-white text-xs font-medium border-b border-neutral-800/80 tracking-wide z-30 relative font-manrope select-none"
    >
      <div className="max-w-345 mx-auto px-3 sm:px-6 lg:px-8 h-8 sm:h-9 flex items-center justify-between text-[11px] sm:text-xs">
        {/* Phone Support Hotline */}
        <a
          href="tel:+917455973188"
          className="group flex items-center gap-1.5 sm:gap-2 text-neutral-300 hover:text-white active:scale-95 transition-all py-1"
          aria-label="Call Support Hotline +91 7455 973 188"
        >
          <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/5 border border-white/10 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all shrink-0">
            <Phone className="w-2.5 h-2.5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          </span>

          <span className="hidden sm:inline text-neutral-400 font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
            SUPPORT HOTLINE:
          </span>
          <span className="hidden xs:inline sm:hidden text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
            HOTLINE:
          </span>
          <span className="text-white font-bold tracking-tight text-[11px] sm:text-xs group-hover:text-brand-red transition-colors whitespace-nowrap">
            +91 7455 973 188
          </span>
        </a>

        {/* Quick Utility Links - Find a Dealer */}
        <div className="flex items-center text-neutral-300">
          <Link
            href="/dealers"
            prefetch={false}
            className="group flex items-center gap-1.5 py-1 px-2.5 rounded-full hover:bg-white/5 text-neutral-300 hover:text-white active:scale-95 transition-all shrink-0"
            aria-label="Find an authorized dealer"
          >
            <Store className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-red transition-colors shrink-0" />
            <span className="uppercase tracking-wider font-semibold text-[10px] sm:text-[11px] whitespace-nowrap">
              <span className="hidden xs:inline">Find a Dealer</span>
              <span className="xs:hidden">Dealers</span>
            </span>
            <ChevronRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all hidden sm:inline-block" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

