"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingDealerCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal only after scrolling past the first hero viewport (e.g. 350px)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 font-manrope"
          id="find-dealer-floating"
        >
          <Link
            href="/dealers"
            prefetch={false}
            className="inline-flex items-center space-x-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-brand-black text-white border border-neutral-700 shadow-xl hover:shadow-2xl hover:bg-neutral-900 active:scale-95 transition-all text-xs font-black uppercase tracking-wider group cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
              <MapPin className="w-3 h-3" />
            </span>
            <span className="group-hover:text-brand-red transition-colors">Find A Dealer</span>
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
