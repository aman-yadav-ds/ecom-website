"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  subtext: string;
}

interface AnimatedStatCardsProps {
  stats: StatItem[];
}

export function AnimatedStatCards({ stats }: AnimatedStatCardsProps) {
  return (
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
  );
}
