"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, MotionValue, useTransform } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";
import { ShowcaseProduct } from "./types";

interface ProductVisualStageProps {
  product: ShowcaseProduct;
  activeVariantIndex: number;
  scrollYProgress: MotionValue<number>;
}

export function ProductVisualStage({
  product,
  activeVariantIndex,
  scrollYProgress,
}: ProductVisualStageProps) {
  const currentVariant = product.variants[activeVariantIndex];
  const [activePin, setActivePin] = useState<string | null>(null);

  // 1. Scroll-driven Motion Graphics transforms (Smooth rollback on scroll up, zero blur)
  // Input progress across this section: 0 -> 0.5 (center) -> 1.0 (leaving)
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.02, 0.94]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.4]);
  
  // Parallax horizontal drift for giant background watermark text
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.02, 0.07, 0.07, 0.01]);

  // Subtle ambient glow pulse driven by scroll
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 0.25, 0.25, 0.08]);

  return (
    <div className="relative w-full aspect-square xs:aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11] min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] flex items-center justify-center overflow-visible select-none">
      {/* A. Atmospheric Background Motion Graphics Elements */}
      {/* 1. Volumetric Crimson Halo Glow */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute w-[75%] h-[75%] rounded-full bg-radial from-brand-red/35 via-brand-red/10 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* 2. Secondary Studio White Floor Spotlight Rim */}
      <div className="absolute inset-x-12 bottom-4 h-10 bg-white/5 blur-xl rounded-full pointer-events-none -z-10" />

      {/* 3. Kinetic Watermark Typography (Motion Graphics Parallax) */}
      <motion.div
        style={{ x: watermarkX, opacity: watermarkOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden"
      >
        <span className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white whitespace-nowrap select-none scale-105 font-manrope">
          {product.bgWatermark}
        </span>
      </motion.div>

      {/* 4. Subtle Telemetry Crosshairs & Coordinate HUD */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/30 hidden xs:flex items-center space-x-1.5 pointer-events-none">
        <Compass className="w-3 h-3 text-brand-red/60 animate-spin-slow" />
        <span>K9-METROLOGY // {currentVariant.code}</span>
      </div>

      <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 hidden xs:flex items-center space-x-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
        <span>STAGE ACTIVE</span>
      </div>

      {/* B. The Hero Machinery Visual with Zero Blur (Crisp at all times) */}
      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
          opacity: imageOpacity,
        }}
        className="relative w-full h-full max-h-[360px] sm:max-h-[420px] lg:max-h-[460px] flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVariant.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -12 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full h-full flex items-center justify-center p-2 sm:p-3"
          >
            {/* The Cutout Machine Image */}
            <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]">
              <Image
                src={currentVariant.image}
                alt={currentVariant.imageAlt}
                fill
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 60vw, 40vw"
                className="object-contain object-center transition-transform duration-500 hover:scale-[1.02]"
                preload={product.numericIndex === "01"}
                loading={product.numericIndex === "01" ? "eager" : "lazy"}
              />
            </div>

            {/* Subtle Laser Scanline Effect during variant morph */}
            <motion.div
              initial={{ top: "-10%", opacity: 0 }}
              animate={{ top: "110%", opacity: [0, 0.7, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent pointer-events-none blur-[1px]"
            />
          </motion.div>
        </AnimatePresence>

        {/* C. Interactive Floating Telemetry Hotspots */}
        {product.id === "super-seeder" && (
          <>
            {/* Pin 1: Gearbox */}
            <div className="absolute top-[28%] left-[22%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "gearbox" ? null : "gearbox")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Multi-Speed Gearbox Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "gearbox" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    Multi-Speed Gearbox
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    Heavy-duty dual-ratio gear train with enclosed oil-bath protection.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Pin 2: Boron Blades */}
            <div className="absolute bottom-[24%] right-[28%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "blades" ? null : "blades")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Boron Blades Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "blades" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    Boron J/F Blades
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    Forged heat-treated steel providing 3x wear resistance in hard soils.
                  </p>
                </motion.div>
              )}
            </div>
          </>
        )}

        {product.id === "power-weeder" && (
          <>
            {/* Pin 1: Engine */}
            <div className="absolute top-[32%] right-[32%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "engine" ? null : "engine")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Gasoline Engine Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "engine" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    {currentVariant.name} Engine
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    High torque OHV powertrain engineered for prolonged field cycles.
                  </p>
                </motion.div>
              )}
            </div>
          </>
        )}

        {product.id === "reaper-binder" && (
          <>
            {/* Pin 1: Cutter Bar */}
            <div className="absolute bottom-[30%] left-[25%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "cutter-bar" ? null : "cutter-bar")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Cutter Bar Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "cutter-bar" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    2150 mm Cutter Bar
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    High-speed reciprocating serrated blades designed for clean wheat stalk shearing.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Pin 2: Auto-Binding Unit */}
            <div className="absolute top-[28%] right-[24%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "binding-unit" ? null : "binding-unit")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Auto-Binding Unit Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "binding-unit" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    Automatic Twine Knotter
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    Precision mechanical knotting mechanism packaging uniform crop sheaves.
                  </p>
                </motion.div>
              )}
            </div>
          </>
        )}

        {product.id === "straw-reaper" && (
          <>
            {/* Pin 1: Thresher Drum */}
            <div className="absolute bottom-[35%] left-[26%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "thresher-drum" ? null : "thresher-drum")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Thresher Drum Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "thresher-drum" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    785 mm Thresher Drum
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    Up to 320 high-carbon blades for ultrafine stubble shredding and fodder making.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Pin 2: Straw Blower Chute */}
            <div className="absolute top-[20%] right-[32%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "blower-chute" ? null : "blower-chute")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Straw Blower Chute Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "blower-chute" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    Curved High-Lift Chute
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    Heavy-duty exhaust duct directing chopped straw directly into trailing trolleys.
                  </p>
                </motion.div>
              )}
            </div>
          </>
        )}

        {product.id === "pulverizer" && (
          <>
            {/* Pin 1: Electric Motor */}
            <div className="absolute top-[26%] left-[20%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "pulverizer-motor" ? null : "pulverizer-motor")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Electric Motor Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "pulverizer-motor" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    {currentVariant.code} Electric Motor
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    Copper-wound motor delivering continuous 2800 RPM high-torque operation.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Pin 2: Grinding Chamber */}
            <div className="absolute top-[32%] right-[22%] z-20">
              <button
                type="button"
                onClick={() => setActivePin(activePin === "grinding-chamber" ? null : "grinding-chamber")}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-brand-red text-white cursor-pointer"
                aria-label="Grinding Chamber Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-brand-red/40 animate-ping" />
              </button>
              {activePin === "grinding-chamber" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/95 border border-white/20 text-white text-[11px] shadow-xl backdrop-blur-md z-30"
                >
                  <p className="font-bold text-brand-red uppercase tracking-wider text-[10px]">
                    Stainless Steel Chamber
                  </p>
                  <p className="text-neutral-300 text-[10px] mt-0.5 leading-snug">
                    Dual-stage micro-grinding rotor chamber with interchangeable sieves.
                  </p>
                </motion.div>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* D. Floating Machine Model Identifier Pill */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-xl">
        <Sparkles className="w-3 h-3 text-brand-red shrink-0" />
        <span className="text-[11px] font-black uppercase tracking-wider">
          {currentVariant.name}
        </span>
        <span className="text-[10px] text-neutral-400 font-mono hidden xs:inline">
          • {currentVariant.badge}
        </span>
      </div>
    </div>
  );
}
