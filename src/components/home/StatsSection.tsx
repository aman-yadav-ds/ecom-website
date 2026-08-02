import React from "react";
import { ShieldCheck, Target, MapPin, Wrench } from "lucide-react";
import { AnimatedStatCards } from "./AnimatedStatCards";

// Static data lives here in the Server Component — serialized into the HTML
// before any JS runs, making it fully crawler-visible.
const stats = [
  {
    icon: <Target className="w-7 h-7 text-brand-red group-hover:scale-110 transition-transform duration-300" />,
    value: "100%",
    label: "Indian Terrain Tested",
    subtext: "Power Weeders & Harrows",
  },
  {
    icon: <Wrench className="w-7 h-7 text-brand-red group-hover:scale-110 transition-transform duration-300" />,
    value: "5 Categories",
    label: "Full Machinery Portfolio",
    subtext: "Machinery, Fluids & Tools",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-brand-red group-hover:scale-110 transition-transform duration-300" />,
    value: "ISO 9001",
    label: "KOREVA Quality Guarantee",
    subtext: "1-Year OEM Warranty",
  },
  {
    icon: <MapPin className="w-7 h-7 text-brand-red group-hover:scale-110 transition-transform duration-300" />,
    value: "Pan-India",
    label: "Dealer & Support Hubs",
    subtext: "Fast Spare Delivery",
  },
];

export function StatsSection() {
  return (
    <section className="relative bg-[#fbfbfb] py-12 md:py-16 px-4 z-20 border-b border-light-300 font-jost">
      <div className="max-w-7xl mx-auto">
        {/* AnimatedStatCards is the ONLY client boundary — the <section> and
            its max-width wrapper are fully server-rendered */}
        <AnimatedStatCards stats={stats} />
      </div>
    </section>
  );
}
