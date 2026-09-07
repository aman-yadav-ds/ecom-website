"use client";

import React from "react";
import Image from "next/image";
import { Leaf, Fuel, Recycle, Sprout } from "lucide-react";
import { motion } from "framer-motion";

const sustainabilityPoints = [
  {
    icon: Fuel,
    title: "Fuel-Optimized Tillage",
    desc: "Computational blade geometry reduces tractor draft resistance, lowering diesel consumption by up to 14%.",
  },
  {
    icon: Sprout,
    title: "Soil Moisture Conservation",
    desc: "Controlled tillage depth preserves vital organic sub-soil moisture and minimizes post-monsoon topsoil erosion.",
  },
  {
    icon: Recycle,
    title: "Closed-Loop Scrap Recycling",
    desc: "100% of stamping drop-offs and metal offcuts in our manufacturing lines are recycled into foundry melts.",
  },
  {
    icon: Leaf,
    title: "Eco-Grade STOU Lubricants",
    desc: "Biodegradable, low-toxicity agricultural fluid options formulated to safeguard farmland aquifers.",
  },
];

export function SustainabilitySection() {
  return (
    <section className="relative py-18 sm:py-24 bg-neutral-950 text-white overflow-hidden font-manrope" id="sustainability">
      {/* Background Farm Landscape Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/guides/tillage_basics_hero.jpg"
          alt="Lush green expansive agricultural farm fields in India"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        {/* Emerald green and dark atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/85 to-[#002B13]/90" />
      </div>

      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center space-x-2 text-brand-green text-xs font-black uppercase tracking-widest mb-3">
            <Leaf className="w-4 h-4" />
            <span>Sustainable Agriculture</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase mb-4 leading-tight">
            Building A <span className="text-brand-green">Greener, Resilient India</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-10 font-normal">
            True agricultural progress protects the soil that feeds our nation. We engineer high-efficiency implements that minimize diesel emissions, conserve topsoil integrity, and deliver sustainable field productivity.
          </p>
        </motion.div>

        {/* 4 Pillars Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-neutral-800">
          {sustainabilityPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-green/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green mb-3 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
