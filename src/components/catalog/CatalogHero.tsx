"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Tractor, Settings, Users, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  image: string;
  alt: string;
  tagline: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/images/generated/hero_machinery_koreva.jpg",
    alt: "Koreva heavy-duty tractor rotavator preparing field",
    tagline: "Powering Modern Farming",
  },
  {
    image: "/images/agri_machinery_new_1784014752914.jpg",
    alt: "Koreva high-efficiency power weeder in crop field",
    tagline: "Engineered For Indian Fields",
  },
];

export default function CatalogHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#fafafa] border-b border-light-300 font-jost pt-8 pb-12 sm:py-14 lg:py-16">
      {/* Ambient background glow & subtle geometric lines */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-brand-red/5 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-red/4 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Features */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/8 border border-brand-red/25 text-brand-red text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mb-4 sm:mb-5 shadow-xs">
              <Tractor className="w-3.5 h-3.5 text-brand-red shrink-0" />
              <span>Koreva Machinery Catalog</span>
            </div>

            {/* Two-tone Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-black uppercase tracking-tight leading-[1.08] text-dark-900 mb-4 sm:mb-5">
              Agricultural Equipments And{" "}
              <span className="text-brand-red block sm:inline">
                Food Processing Machinery
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-dark-700 max-w-2xl font-medium leading-relaxed mb-6 sm:mb-8">
              High-yield tractor attachments, autonomous self-propelled machinery, food processing units, certified thermal lubricants, and forged SK5 hand tools.
            </p>

            {/* 3 Feature Indicators in a Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full pt-2 border-t border-light-200">
              {/* Feature 1 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-light-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="text-xs sm:text-[13px] font-extrabold text-dark-900 block uppercase">
                    High Performance
                  </span>
                  <span className="text-[11px] text-dark-500 font-medium">
                    &amp; Durability
                  </span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-light-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="text-xs sm:text-[13px] font-extrabold text-dark-900 block uppercase">
                    Trusted Worldwide
                  </span>
                  <span className="text-[11px] text-dark-500 font-medium">
                    By Indian Farmers
                  </span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-light-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="text-xs sm:text-[13px] font-extrabold text-dark-900 block uppercase">
                    Innovation First
                  </span>
                  <span className="text-[11px] text-dark-500 font-medium">
                    For Better Tomorrow
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Stage with Angled Red Graphic & Cursive Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            {/* Red Dynamic Angled Speed Banner behind image */}
            <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-br from-brand-red to-brand-deepred rounded-3xl -rotate-6 opacity-90 filter shadow-xl pointer-events-none -z-10" />

            {/* Main Card Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white bg-white shadow-2xl aspect-[16/11] sm:aspect-[4/3] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={HERO_SLIDES[currentSlide].image}
                    alt={HERO_SLIDES[currentSlide].alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
                </motion.div>
              </AnimatePresence>

              {/* Authentic Cursive Script Badge top-right */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none select-none">
                <div className="px-4 py-1.5 rounded-full bg-white/92 backdrop-blur-md border border-white shadow-lg transform -rotate-3">
                  <span className="font-caveat text-xl sm:text-2xl font-bold text-dark-900 tracking-wide">
                    {HERO_SLIDES[currentSlide].tagline}
                  </span>
                </div>
              </div>

              {/* Slider Controls Bottom */}
              <div className="absolute bottom-3.5 left-4 right-4 z-20 flex items-center justify-between">
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === idx
                          ? "w-6 bg-brand-red"
                          : "w-2 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous machinery slide"
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-dark-900 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next machinery slide"
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-dark-900 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
