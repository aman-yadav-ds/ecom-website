"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Users, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const brandPillars = [
  {
    icon: Landmark,
    title: "Indian Agronomic Roots",
    description: "Designed specifically around the depth, moisture, and rock density profiles of northern alluvial basins and central clay tracts.",
  },
  {
    icon: Shield,
    title: "Zero-Compromise Metallurgy",
    description: "Every implement uses verified tensile alloys and robotic seams to handle tractor torque without frame cracking.",
  },
  {
    icon: Users,
    title: "Farmer-Centric Aftersales",
    description: "Dedicated regional agronomy teams and fast-tracked spare part logistics to keep machines running during critical sowing windows.",
  },
];

export function EditorialHeritage() {
  return (
    <section className="py-16 sm:py-24 bg-brand-offwhite relative overflow-hidden border-t border-neutral-200 font-manrope" id="about">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Factory Montage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-300 shadow-2xl bg-neutral-900">
              <div className="relative w-full h-[320px] xs:h-[380px] sm:h-[460px]">
                <Image
                  src="/images/about_factory_1784013199832.jpg"
                  alt="Koreva Global Manufacturing Unit and Equipment Assembly Floor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-widest block mb-1">
                  Rudrapur • Uttarakhand Facility
                </span>
                <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-white mb-1">
                  Precision Machinery Born in India
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                  Built to empower farming communities with accessible mechanization and extreme reliability.
                </p>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-brand-red font-mono">25k+</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-neutral-600 uppercase">Field Units</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-brand-red font-mono">18+</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-neutral-600 uppercase">States Served</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-brand-red font-mono">98.4%</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-neutral-600 uppercase">Spares Uptime</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Mission Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center space-x-2 text-brand-red text-xs font-black uppercase tracking-widest mb-3">
              <span className="w-6 h-[2px] bg-brand-red" />
              <span>About Koreva Global</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black tracking-tight uppercase mb-4 leading-[1.1]">
              Indian Roots. <br className="hidden xs:inline" />
              <span className="text-brand-red">Global Engineering Standards.</span>
            </h2>

            <p className="text-neutral-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-medium">
              At Koreva Global LLP, we believe the backbone of national prosperity is the Indian farmer. Our machinery is designed from the ground up to reduce labor overhead, improve seed germination rates, and deliver unyielding durability through peak harvest cycles.
            </p>

            <div className="space-y-4 mb-8">
              {brandPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-brand-black uppercase tracking-tight mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/about"
              prefetch={false}
              className="group inline-flex items-center space-x-2.5 px-6 py-3 rounded bg-brand-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
