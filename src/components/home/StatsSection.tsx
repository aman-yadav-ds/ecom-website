import React from "react";
import { ShieldCheck, Target, MapPin, Wrench } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";

const stats = [
  { 
    icon: <Target className="w-8 h-8 md:w-10 md:h-10 text-brand-red mb-3 group-hover:scale-110 transition-transform duration-200" />,
    value: "100%", 
    label: "Indian Terrain Tested",
    subtext: "Power Weeders & Harrows"
  },
  { 
    icon: <Wrench className="w-8 h-8 md:w-10 md:h-10 text-brand-red mb-3 group-hover:scale-110 transition-transform duration-200" />,
    value: "5 Categories", 
    label: "Full Machinery Portfolio",
    subtext: "Machinery, Fluids & Tools" 
  },
  { 
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-brand-red mb-3 group-hover:scale-110 transition-transform duration-200" />,
    value: "ISO 9001", 
    label: "KOREVA GLOBAL Quality",
    subtext: "1-Year OEM Guarantee" 
  },
  { 
    icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-brand-red mb-3 group-hover:scale-110 transition-transform duration-200" />,
    value: "Pan-India", 
    label: "Dealer & Support Hubs",
    subtext: "Fast Spare Delivery" 
  },
];

export function StatsSection() {
  return (
    <section className="bg-brand-black py-12 md:py-16 px-4 shadow-inner relative z-20 border-b-4 border-brand-red font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          {stats.map((stat, index) => (
            <ScrollReveal 
              key={index}
              animation="slide-bottom" 
              delay={index * 100}
            >
              <div className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-red/50 rounded-lg transition-all duration-200 hover:scale-105 h-full backdrop-blur-xs">
                {stat.icon}
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-light-100 mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-light-100 uppercase tracking-wider mb-1">
                  {stat.label}
                </span>
                <span className="text-[11px] font-medium text-gray-400">
                  {stat.subtext}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
