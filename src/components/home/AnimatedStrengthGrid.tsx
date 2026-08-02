"use client";

import React from "react";
import { motion } from "framer-motion";

interface StrengthItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AnimatedStrengthGridProps {
  strengths: StrengthItem[];
}

export function AnimatedStrengthGrid({ strengths }: AnimatedStrengthGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {strengths.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="group rounded-2xl glass-card border border-light-300/80 p-6 md:p-8 h-full flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-brand-red/10 border border-brand-red/20">
                  {item.icon}
                </div>
                <h3 className="text-dark-900 font-extrabold text-sm sm:text-base uppercase tracking-wider group-hover:text-brand-red transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-dark-600 text-xs sm:text-sm leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
