"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeroAnimations } from "./hero/useHeroAnimations";

export function NewHero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const hero = useHeroAnimations();

  return (
    <section
      ref={hero.containerRef}
      className="relative bg-linear-to-b from-[#F2F1ED] to-brand-offwhite pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-brand-border/60 font-manrope transform-gpu will-change-transform"
    >
      {/* Subtle mechanical grid lines in background */}
      <div className="absolute inset-0 bg-[radial-gradient(#C40000_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content Column (6 Cols) */}
          <div className="lg:col-span-6 z-10">
            {/* Status Telemetry Pill */}
            <div
              ref={hero.badgeRef}
              className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-brand-black/5 border border-neutral-300 text-neutral-800 text-[11px] font-bold uppercase tracking-wider mb-5 select-none"
            >
              <span ref={hero.badgeDotRef} className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
              <span>ISO 9001:2015 Certified • Bharat Ready</span>
            </div>

            {/* Primary Editorial Headline with Staggered Line Masks */}
            <h1
              ref={hero.headlineRef}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[54px] font-black text-brand-black leading-[1.08] tracking-tight uppercase mb-4 sm:mb-6"
            >
              <span className="block overflow-hidden">
                <span ref={hero.headlineLine1Ref} className="inline-block">Heavy-Duty Farm </span>{" "}
                <span ref={hero.headlineLine2Ref} className="inline-block">Machinery</span>
              </span>
              <span className="block overflow-hidden text-brand-red">
                <span ref={hero.headlineLine3Ref} className="inline-block">Engineered For </span>{" "}
                <span ref={hero.headlineLine4Ref} className="inline-block">Tough Soil</span>
              </span>
            </h1>

            {/* Body Description */}
            <p
              ref={hero.paragraphRef}
              className="text-neutral-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8 font-medium"
            >
              Koreva Global LLP manufactures high-precision agricultural implements—rotavators, disc harrows, power weeders, and STOU lubricants—built to withstand abrasive Indian terrains and deliver maximum field yield.
            </p>

            {/* Dual Primary & Secondary Actions */}
            <div
              ref={hero.ctaContainerRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Link
                ref={hero.primaryBtnRef}
                href="/products"
                prefetch={false}
                className="group inline-flex items-center justify-center space-x-3 px-6 sm:px-8 py-3.5 rounded bg-brand-red text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:bg-brand-deepred active:scale-[0.98] transition-all duration-300 shadow-lg shadow-brand-red/25 hover:shadow-[0_8px_25px_rgba(196,0,0,0.35)] text-center cursor-pointer"
              >
                <span>Explore Product Fleet</span>
                <ArrowRight
                  ref={hero.primaryArrowRef}
                  className="w-4 h-4 transition-transform duration-300"
                />
              </Link>

              <button
                ref={hero.secondaryBtnRef}
                onClick={() => setIsVideoModalOpen(true)}
                type="button"
                className="group inline-flex items-center justify-center space-x-2.5 px-5 sm:px-6 py-3.5 rounded border border-neutral-300 bg-white/95 hover:bg-white text-neutral-900 text-xs sm:text-sm font-bold tracking-tight shadow-xs active:scale-95 transition-all duration-300 hover:border-brand-red hover:shadow-md cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors duration-300 shrink-0">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span className="group-hover:text-brand-red transition-colors duration-300">
                  Watch Factory Demo
                </span>
              </button>
            </div>

            {/* Quick Confidence Strip */}
            <div
              ref={hero.statsContainerRef}
              className="mt-8 pt-6 border-t border-neutral-200/80 grid grid-cols-3 gap-2 sm:gap-4"
            >
              <div>
                <div ref={hero.stat1NumRef} className="text-base sm:text-lg font-black text-neutral-900">
                  400+
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-500 font-medium">Dealers &amp; Service</div>
              </div>
              <div>
                <div ref={hero.stat2NumRef} className="text-base sm:text-lg font-black text-neutral-900">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-500 font-medium">Forged Metallurgy</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-neutral-900">Subsidy</div>
                <div className="text-[10px] sm:text-xs text-neutral-500 font-medium">Approved Models</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Column */}
          <div
            ref={hero.cardContainerRef}
            className="lg:col-span-6 relative mt-2 sm:mt-4 lg:mt-0 perspective-[1000px]"
          >
            {/* Industrial Machinery Container */}
            <div
              ref={hero.cardRef}
              onClick={() => setIsVideoModalOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-300/80 bg-neutral-950 group cursor-pointer transform-gpu transition-colors duration-300 hover:border-neutral-200"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                ref={hero.imageRef}
                className="relative w-full h-75 xs:h-90 sm:h-115 lg:h-125 transform-gpu will-change-transform"
              >
                <Image
                  src="/images/generated/hero_machinery_koreva.jpg"
                  alt="Heavy-Duty Red Koreva Tractor with Rotavator Attachment working in agricultural field"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Industrial Vignette Gradient */}
              <div
                ref={hero.vignetteRef}
                className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none"
              />

              {/* Atmospheric Warm Sunlight Sheen Layer */}
              <div
                ref={hero.sheenRef}
                className="absolute inset-0 bg-linear-to-r from-transparent via-amber-300/15 to-transparent pointer-events-none skew-x-[-20deg]"
              />

              {/* Floating Live Play Indicator */}
              <div
                ref={hero.trialBadgeRef}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 overflow-hidden rounded-full"
              >
                <div className="relative flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider">
                  <span ref={hero.trialDotRef} className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
                  <span>FIELD TRIAL REEL</span>
                  {/* Subtle Sheen Highlight */}
                  <span
                    ref={hero.trialSheenRef}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent pointer-events-none -translate-x-full"
                  />
                </div>
              </div>

              {/* Machine Technical Badge */}
              <div
                ref={hero.panelRef}
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-brand-black/90 backdrop-blur-md px-4 py-3 border border-neutral-800/90 rounded-xl shadow-xl text-white transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-brand-red uppercase block">
                      K9 Heavy Series
                    </span>
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-neutral-100">
                      Precision Boron Blades • Multi-Speed Gearbox
                    </span>
                  </div>
                  <span
                    ref={hero.panelArrowRef}
                    className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors"
                  >
                    Play Video →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Video / Story Modal */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl bg-brand-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl p-5 sm:p-6 text-white"
              >
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-2 text-brand-red mb-2 sm:mb-3">
                  <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">
                    Koreva Global LLP Brand Film
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase mb-3 sm:mb-4">
                  Engineering for Tough Indian Soils
                </h3>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 mb-4 flex items-center justify-center">
                  <Image
                    src="/images/generated/hero_machinery_koreva.jpg"
                    alt="Koreva Brand Machinery"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="relative z-10 text-center px-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-red text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg shadow-brand-red/50">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Rudrapur Plant &amp; Field Demonstration
                    </p>
                    <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 max-w-md mx-auto hidden xs:block">
                      Precision metallurgy and robotic welding designed for extreme terrain.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 sm:gap-3">
                  <Link
                    href="/dealers"
                    prefetch={false}
                    onClick={() => setIsVideoModalOpen(false)}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded bg-brand-red hover:bg-brand-deepred text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Locate A Demo Center
                  </Link>
                  <button
                    onClick={() => setIsVideoModalOpen(false)}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
