import Image from "next/image";
import { ScrollReveal } from "../ScrollReveal";
import { ShieldCheck, Award, Wrench, MapPin, CheckCircle, Package } from "lucide-react";

const strengths = [
  {
    icon: <Wrench className="w-5 h-5 text-brand-red" />,
    title: "ENGINEERED FOR INDIAN TERRAIN",
    description: "KOREVA GLOBAL LLP machinery (Power Weeders, Rotavators, Harrows) is specially built to withstand hard soils and extreme Indian farming conditions.",
    image: "/images/manufacturing.jpg"
  },
  {
    icon: <Award className="w-5 h-5 text-brand-red" />,
    title: "ISO 9001:2015 CERTIFIED",
    description: "Every machine and lubricant fluid produced by KOREVA GLOBAL LLP undergoes strict multi-point OEM quality testing before entering the field.",
    image: "/images/hero_bg_1784013135158.jpg"
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-brand-red" />,
    title: "DEDICATED SERVICE NETWORK",
    description: "Our dedicated service team provides rapid on-site technical assistance, maintenance guidance, and warranty support across India.",
    image: "/images/manufacturing.jpg"
  },
  {
    icon: <MapPin className="w-5 h-5 text-brand-red" />,
    title: "NATIONWIDE DEALER REACH",
    description: "KOREVA GLOBAL LLP operates an expanding network of authorized dealers across states for easy product inspection and purchase.",
    image: "/images/about_factory_1784013199832.jpg"
  },
  {
    icon: <Package className="w-5 h-5 text-brand-red" />,
    title: "GENUINE OEM SPARE PARTS",
    description: "Guaranteed stock of original blades, belts, gears, and engine spares available directly through certified local dealer hubs.",
    image: "/images/manufacturing.jpg"
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-brand-red" />,
    title: "GOVT SUBSIDY COMPLIANT",
    description: "KOREVA Power Weeders and agricultural implements comply with state agricultural subsidy guidelines for maximum farmer savings.",
    image: "/images/agri_machinery_new_1784014752914.jpg"
  }
];

export function OurStrength() {
  return (
    <section className="bg-light-200 py-16 md:py-24 px-4 border-y border-light-300 font-jost">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-4 md:gap-6">
          <ScrollReveal animation="slide-right" className="w-full md:w-auto">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red"></div>
              <span className="text-brand-red font-bold tracking-widest text-xs md:text-sm uppercase">
                Quality & Reliability
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black uppercase">
              THE KOREVA GLOBAL PROMISE
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="slide-left" className="flex-1 flex justify-start md:justify-end">
            <p className="max-w-md text-brand-dark text-sm md:text-base text-left md:text-right font-medium border-l-4 md:border-l-0 md:border-r-4 border-brand-red pl-4 md:pl-0 md:pr-4">
              At <strong className="text-dark-900 font-bold">KOREVA GLOBAL LLP</strong>, our commitment to Indian agriculture combines rigorous ISO standards, genuine OEM spare parts, and nationwide dealer accessibility.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Grid items with 200ms transitions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {strengths.map((strength, index) => (
            <ScrollReveal key={index} animation="fade" delay={index * 100}>
              <div 
                className="group relative h-auto min-h-[220px] md:h-[260px] overflow-hidden rounded-lg border-l-4 border-brand-red/0 hover:border-brand-red transition-all duration-200 shadow-sm hover:shadow-xl flex flex-col justify-center"
              >
                {/* Background Image */}
                <Image
                  src={strength.image}
                  alt={`${strength.title} - KOREVA GLOBAL LLP`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-black/95 via-brand-black/90 to-brand-black/85 group-hover:from-brand-black/90 group-hover:to-[#3a0000]/90 transition-colors duration-200 z-10" />

                {/* Content */}
                <div className="relative p-6 md:p-8 z-20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-brand-red/20 border border-brand-red/40 rounded-sm">
                      {strength.icon}
                    </div>
                    <h3 className="text-light-100 text-base md:text-lg font-bold uppercase tracking-wide">
                      {strength.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-medium border-t border-white/10 pt-3">
                    {strength.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
