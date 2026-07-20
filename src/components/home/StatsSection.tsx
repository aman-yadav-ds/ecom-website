import React from "react";
import { ShieldCheck, Target, MapPin, Wrench } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";

const stats = [
  { 
    icon: <Target className="w-8 h-8 md:w-10 md:h-10 text-brand-red mb-3" />,
    value: "100%", 
    label: "Made for Indian Soils" 
  },
  { 
    icon: <Wrench className="w-8 h-8 md:w-10 md:h-10 text-brand-red mb-3" />,
    value: "Comprehensive", 
    label: "Agri Machinery Range" 
  },
  { 
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-brand-red mb-3" />,
    value: "Assured", 
    label: "Quality & Durability" 
  },
  { 
    icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-brand-red mb-3" />,
    value: "Nationwide", 
    label: "Expanding Dealer Network" 
  },
];

export function StatsSection() {
  return (
    <section className="bg-brand-black py-12 md:py-16 px-4 shadow-inner relative z-20 border-b-4 border-brand-red">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <ScrollReveal 
              key={index}
              animation="slide-bottom" 
              delay={index * 150}
            >
              <div className="flex flex-col items-center justify-center p-2 sm:p-4 hover:bg-white/5 rounded-lg transition-colors duration-300 h-full">
                {stat.icon}
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-100 font-jost mb-1 sm:mb-2">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm font-medium text-light-300 uppercase tracking-wider md:tracking-widest leading-tight md:leading-relaxed">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
