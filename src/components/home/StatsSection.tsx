"use client";

import React from "react";
import { ShieldCheck, Target, MapPin, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { 
    icon: <Target className="w-7 h-7 text-brand-red group-hover:scale-110 transition-transform duration-300" />,
    value: "100%", 
    label: "Indian Terrain Tested",
    subtext: "Power Weeders & Harrows"
  },
  { 
    icon: <Wrench className="w-7 h-7 text-brand-red group-hover:scale-110 transition-transform duration-300" />,
    value: "5 Categories", 
    label: "Full Machinery Portfolio",
    subtext: "Machinery, Fluids & Tools" 
  },
  { 
    icon: <ShieldCheck className="w-7 h-7 text-brand-red group-hover:scale-110 transition-transform duration-300" />,
    value: "ISO 9001", 
    label: "KOREVA Quality Guarantee",
    subtext: "1-Year OEM Warranty" 
  },
  { 
    icon: <MapPin className="w-7 h-7 text-brand-red group-hover:scale-110 transition-transform duration-300" />,
    value: "Pan-India", 
    label: "Dealer & Support Hubs",
    subtext: "Fast Spare Delivery" 
  },
];

export function StatsSection() {
  return (
    <section className="relative bg-[#fbfbfb] py-12 md:py-16 px-4 z-20 border-b border-light-300 font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="group flex flex-col items-center justify-center p-6 rounded-2xl glass-card border border-light-300/80 shadow-xs hover:shadow-md transition-all duration-300 h-full">
                <div className="p-3 rounded-full bg-brand-red/10 border border-brand-red/20 mb-3">
                  {stat.icon}
                </div>
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-900 mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-dark-800 uppercase tracking-wider mb-1">
                  {stat.label}
                </span>
                <span className="text-[11px] font-medium text-dark-500">
                  {stat.subtext}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


