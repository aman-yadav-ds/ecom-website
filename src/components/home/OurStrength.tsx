import React from "react";
import { ShieldCheck, Award, Wrench, MapPin, CheckCircle, Package } from "lucide-react";
import { AnimatedStrengthGrid } from "./AnimatedStrengthGrid";

// Static data in Server Component — all text is pre-rendered and SEO-indexed
const strengths = [
  {
    icon: <Wrench className="w-5 h-5 text-brand-red" />,
    title: "ENGINEERED FOR INDIAN TERRAIN",
    description:
      "KOREVA GLOBAL LLP machinery (Power Weeders, Rotavators, Harrows) is specially built to withstand hard soils and extreme Indian farming conditions.",
  },
  {
    icon: <Award className="w-5 h-5 text-brand-red" />,
    title: "ISO 9001:2015 CERTIFIED",
    description:
      "Every machine and lubricant fluid produced by KOREVA GLOBAL LLP undergoes strict multi-point OEM quality testing before entering the field.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-brand-red" />,
    title: "DEDICATED SERVICE NETWORK",
    description:
      "Our dedicated service team provides rapid on-site technical assistance, maintenance guidance, and warranty support across India.",
  },
  {
    icon: <MapPin className="w-5 h-5 text-brand-red" />,
    title: "NATIONWIDE DEALER REACH",
    description:
      "KOREVA GLOBAL LLP operates an expanding network of authorized dealers across states for easy product inspection and purchase.",
  },
  {
    icon: <Package className="w-5 h-5 text-brand-red" />,
    title: "GENUINE OEM SPARE PARTS",
    description:
      "Guaranteed stock of original blades, belts, gears, and engine spares available directly through certified local dealer hubs.",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-brand-red" />,
    title: "GOVT SUBSIDY COMPLIANT",
    description:
      "KOREVA Power Weeders and agricultural implements comply with state agricultural subsidy guidelines for maximum farmer savings.",
  },
];

export function OurStrength() {
  return (
    <section className="relative bg-[#fbfbfb] py-20 md:py-28 px-4 font-jost border-b border-light-300 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header — server-rendered; h2 is fully indexed by crawlers */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red" />
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
                Why KOREVA GLOBAL LLP
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight">
              OUR MANUFACTURING STRENGTH
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-dark-700 text-sm md:text-base font-medium leading-relaxed">
              Combining precision engineering with extensive field testing,
              KOREVA GLOBAL LLP delivers reliable machinery designed specifically
              for Indian agriculture.
            </p>
          </div>
        </div>

        {/* Client boundary — only the animated card grid */}
        <AnimatedStrengthGrid strengths={strengths} />
      </div>
    </section>
  );
}
