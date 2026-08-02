import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSolutionsGrid } from "./AnimatedSolutionsGrid";

// Static data in Server Component — pre-rendered into HTML, fully SEO-visible
const solutions = [
  {
    title: "AGRICULTURAL MACHINERY",
    subtitle: "Power Weeders, Rotavators & Harrows",
    description:
      "Heavy-duty Power Weeders (DHURANDHAR & VIJAY), tractor-mounted Harrows (RAINO), Rotavators (KOBRA), and Power Reapers engineered for high-yield soil tillage.",
    image: "/images/agri_machinery_new_1784014752914.jpg",
    link: "/products/self-propelled-machinery",
    tags: ["Power Weeder", "Harrow", "Rotavator"],
  },
  {
    title: "GARDEN & HARVEST HAND TOOLS",
    subtitle: "Forged SK5 Steel Pruners & Sickles",
    description:
      "Precision drop-forged SK5 alloy bypass secateurs, harvesting sickles with induction hardened micro-serrations, and ergonomic nursery tools.",
    image: "/images/garden_tools_new_1784014762909.jpg",
    link: "/products/hand-tools",
    tags: ["Bypass Secateur", "Sickle", "SK5 Steel"],
  },
  {
    title: "PREMIUM LUBRICANTS & FLUIDS",
    subtitle: "ISO 9001 Universal STOU Fluids",
    description:
      "High-performance STOU 15W-40 Universal Tractor Oils and 4T Heavy Duty Engine Oils formulated for thermal oxidation stability and wet-brake protection.",
    image: "/images/lubricants_new_1784014772364.jpg",
    link: "/products/lubricants",
    tags: ["STOU 15W-40", "4T Engine Oil", "ISO 9001"],
  },
];

export function OurSolutions() {
  return (
    <section className="relative bg-[#fbfbfb] py-20 md:py-28 px-4 font-jost border-b border-light-300 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header — server-rendered, fully crawler-visible */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red" />
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
                Product Ecosystem
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight">
              KOREVA GLOBAL SOLUTIONS
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-dark-700 text-sm md:text-base font-medium leading-relaxed">
              From land preparation to fluid maintenance and pruning, KOREVA
              GLOBAL LLP supplies heavy-duty, ISO-certified agricultural gear
              for farmers nationwide.
            </p>
          </div>
        </div>

        {/* Client boundary — only the animated card grid */}
        <AnimatedSolutionsGrid solutions={solutions} />
      </div>
    </section>
  );
}
