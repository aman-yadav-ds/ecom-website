"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Factory, ShieldCheck, Cpu, Flame, ArrowRight, Gauge } from "lucide-react";
import { motion } from "framer-motion";

const engineeringTabs = [
  {
    id: "welding",
    icon: Flame,
    title: "Robotic Welding & CNC Plasma",
    badge: "Structural Rigidity",
    summary: "Precision laser-cut structural frames welded by multi-axis industrial robotics eliminate torsional fatigue in rocky terrains.",
    metric: "0.02mm",
    metricLabel: "Machining Tolerance",
  },
  {
    id: "metallurgy",
    icon: Cpu,
    title: "Heat-Treated Boron Steel",
    badge: "Anti-Wear Metallurgy",
    summary: "Blades and tines forged from premium Boron alloy steel, quenched and tempered for 3x durability against abrasive sandy loams.",
    metric: "48-52 HRC",
    metricLabel: "Rockwell Hardness",
  },
  {
    id: "transmission",
    icon: Gauge,
    title: "Oil-Bath Gear Transmission",
    badge: "Heavy Duty Power Flow",
    summary: "Sealed multi-speed gearboxes bathed in high-viscosity synthetic lubricant provide vibration-free power transfer from tractor PTO.",
    metric: "98.7%",
    metricLabel: "Mechanical Efficiency",
  },
  {
    id: "testing",
    icon: ShieldCheck,
    title: "Multi-Tier Field Testing",
    badge: "Soil Proven",
    summary: "Every model undergoes continuous 500-hour stress tests across hard-pan Deccan soils and wet alluvial paddy fields before production rollout.",
    metric: "500+ Hrs",
    metricLabel: "Field Stress Validation",
  },
];

export function EngineeringStrength() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-brand-surface relative overflow-hidden font-manrope" id="manufacturing">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Interactive Engineering Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center space-x-2 text-brand-red text-xs font-black uppercase tracking-widest mb-3">
              <Factory className="w-4 h-4" />
              <span>Precision Metallurgy &amp; Assembly</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black tracking-tight uppercase mb-4 leading-[1.1]">
              Engineered For <br className="hidden xs:inline" />
              <span className="text-brand-red">Indian Soil Realities</span>
            </h2>

            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-medium">
              We engineer agricultural equipment specifically built to endure hard abrasive soils, seasonal flooding, and high-duty tillage cycles across Indian farmlands.
            </p>

            {/* Interactive Engineering Tabs */}
            <div className="space-y-3 mb-8">
              {engineeringTabs.map((tab, idx) => {
                const Icon = tab.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    type="button"
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start space-x-3.5 ${
                      isActive
                        ? "bg-white border-brand-red shadow-md shadow-brand-red/5 ring-1 ring-brand-red/20"
                        : "bg-white/70 hover:bg-white border-neutral-200 hover:border-neutral-300 shadow-xs"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-brand-red text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-black text-brand-black uppercase tracking-tight">
                          {tab.title}
                        </span>
                        <span className="text-[10px] font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded uppercase">
                          {tab.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                        {tab.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <Link
              href="/manufacturing"
              prefetch={false}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded bg-brand-red hover:bg-brand-deepred text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
            >
              <span>Explore Rudrapur Plant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right Column: Visual Showcase Linked to Active Spec */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-brand-black">
              {/* Plant / Robotics Imagery (Real asset from project) */}
              <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px]">
                <Image
                  src="/images/mega-menu/robotic_factory.jpg"
                  alt="Koreva Advanced Manufacturing Facility with Precision Robotic Systems"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Active Tab Overlaid Metric Card */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 bg-brand-black/90 backdrop-blur-md border border-neutral-700/80 rounded-xl p-4 sm:p-5 text-white">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block">
                      Live Metric Benchmark
                    </span>
                    <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
                      {engineeringTabs[activeTab].title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black text-brand-red font-mono">
                      {engineeringTabs[activeTab].metric}
                    </span>
                    <span className="text-[9px] font-medium text-neutral-400 block uppercase">
                      {engineeringTabs[activeTab].metricLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>FACILITY: RUDRAPUR-UNIT-1</span>
                  <span className="text-neutral-300">CERT: ISO 9001:2015</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
