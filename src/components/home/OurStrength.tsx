"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    <section className="relative bg-[#fbfbfb] py-20 md:py-28 px-4 font-jost border-b border-light-300 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-auto"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red"></div>
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
                Why KOREVA GLOBAL LLP
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight">
              OUR MANUFACTURING STRENGTH
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
              Combining precision engineering with extensive field testing, KOREVA GLOBAL LLP delivers reliable machinery designed specifically for Indian agriculture.
            </p>
          </motion.div>
        </div>

        {/* 6-Card Grid */}
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
      </div>
    </section>
  );
}
