"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const solutions = [
  {
    title: "AGRICULTURAL MACHINERY",
    subtitle: "Power Weeders, Rotavators & Harrows",
    description: "Heavy-duty Power Weeders (DHURANDHAR & VIJAY), tractor-mounted Harrows (RAINO), Rotavators (KOBRA), and Power Reapers engineered for high-yield soil tillage.",
    image: "/images/agri_machinery_new_1784014752914.jpg",
    link: "/products/self-propelled-machinery",
    tags: ["Power Weeder", "Harrow", "Rotavator"]
  },
  {
    title: "GARDEN & HARVEST HAND TOOLS",
    subtitle: "Forged SK5 Steel Pruners & Sickles",
    description: "Precision drop-forged SK5 alloy bypass secateurs, harvesting sickles with induction hardened micro-serrations, and ergonomic nursery tools.",
    image: "/images/garden_tools_new_1784014762909.jpg",
    link: "/products/hand-tools",
    tags: ["Bypass Secateur", "Sickle", "SK5 Steel"]
  },
  {
    title: "PREMIUM LUBRICANTS & FLUIDS",
    subtitle: "ISO 9001 Universal STOU Fluids",
    description: "High-performance STOU 15W-40 Universal Tractor Oils and 4T Heavy Duty Engine Oils formulated for thermal oxidation stability and wet-brake protection.",
    image: "/images/lubricants_new_1784014772364.jpg",
    link: "/products/lubricants",
    tags: ["STOU 15W-40", "4T Engine Oil", "ISO 9001"]
  }
];

export function OurSolutions() {
  return (
    <section className="relative bg-[#fbfbfb] py-20 md:py-28 px-4 font-jost border-b border-light-300 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red"></div>
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
                Product Ecosystem
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight">
              KOREVA GLOBAL SOLUTIONS
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p className="text-dark-700 text-sm md:text-base font-medium leading-relaxed">
              From land preparation to fluid maintenance and pruning, KOREVA GLOBAL LLP supplies heavy-duty, ISO-certified agricultural gear for farmers nationwide.
            </p>
          </motion.div>
        </div>

        {/* 3-Column Glass Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                href={item.link} 
                className="group relative block rounded-3xl glass-card overflow-hidden border border-light-300 shadow-xs hover:shadow-md h-[460px] md:h-[500px] flex flex-col justify-between p-6 sm:p-8"
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent z-10" />
                </div>

                {/* Top Tags Container */}
                <div className="relative z-20 flex flex-wrap gap-2">
                  {item.tags.map((tag, tIndex) => (
                    <span 
                      key={tIndex} 
                      className="px-3 py-1 rounded-full glass-panel text-dark-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Content Card Area */}
                <div className="relative z-20 text-white">
                  <span className="text-brand-red font-extrabold text-xs uppercase tracking-widest block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide mb-3 group-hover:text-red-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
                    {item.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider group-hover:text-brand-red transition-colors">
                    <span>Explore Lineup</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


