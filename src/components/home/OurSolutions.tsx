import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";

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
    <section className="bg-light-100 py-16 md:py-24 px-4 relative font-jost">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-red-accent to-brand-red opacity-20" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-6">
          <ScrollReveal animation="slide-left" className="flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
              Product Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black uppercase tracking-tight mt-1">
              KOREVA GLOBAL SOLUTIONS
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="slide-right" className="flex-1 flex justify-start md:justify-end">
            <p className="max-w-md text-brand-dark text-sm md:text-base border-l-4 border-brand-red pl-4 leading-relaxed font-medium">
              From heavy-duty soil tillage with <strong className="text-dark-900 font-bold">Harrows</strong> and <strong className="text-dark-900 font-bold">Power Weeders</strong> to ISO certified <strong className="text-dark-900 font-bold">STOU Lubricants</strong>, KOREVA GLOBAL LLP delivers a complete agricultural ecosystem.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Column Grid with 200ms smooth hover overlays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <ScrollReveal
              key={index}
              animation="slide-bottom"
              delay={index * 100}
            >
              <div
                className="group relative h-[400px] md:h-[440px] overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-2xl transition-all duration-200 border border-light-300 hover:border-brand-red flex flex-col justify-end"
              >
                {/* Red accent bar on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-brand-red z-30 scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />

                {/* Background Image */}
                <Image
                  src={solution.image}
                  alt={`${solution.title} - KOREVA GLOBAL LLP`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent z-10" />

                {/* Content Overlay */}
                <div className="relative p-6 md:p-8 z-20 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {solution.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-brand-red/90 text-white text-[10px] font-bold uppercase rounded-xs tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-light-100 text-xl md:text-2xl font-bold uppercase mb-1 group-hover:text-brand-red transition-colors duration-200">
                    {solution.title}
                  </h3>
                  <p className="text-xs font-bold text-gray-300 uppercase mb-3 tracking-wider">
                    {solution.subtitle}
                  </p>
                  <p className="text-light-200 text-xs md:text-sm mb-5 opacity-90 leading-relaxed font-medium line-clamp-3">
                    {solution.description}
                  </p>

                  <Link
                    href={solution.link}
                    className="inline-flex items-center gap-2 text-white bg-brand-red hover:bg-brand-red-accent font-bold text-xs px-4 py-2.5 rounded-full tracking-wider uppercase transition-all duration-200 group/link w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                  >
                    <span>Explore Lineup</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
