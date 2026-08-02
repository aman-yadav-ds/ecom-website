"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const tabsData = {
  farming: {
    title: "SUSTAINABLE FARMING",
    description1: "KOREVA is dedicated to revolutionizing Indian agriculture through sustainable technology. Our machinery is designed to optimize water usage, reduce soil compaction, and ensure long-term soil health.",
    description2: "By providing affordable, high-efficiency tools, we empower farmers to increase yields without depleting natural resources, building a resilient agricultural ecosystem for generations to come."
  },
  recycling: {
    title: "WASTE RECYCLING",
    description1: "We believe in a circular economy. At KOREVA, our packaging processes are designed to minimize plastic use, and our machinery components are built with high recyclability in mind.",
    description2: "We are establishing initiatives to help farmers responsibly recycle old machinery and parts, reducing agricultural waste across rural India."
  },
  zld: {
    title: "ZERO LIQUID DISCHARGE",
    description1: "Our manufacturing facilities are built with the promise of Zero Liquid Discharge (ZLD). This means all industrial wastewater is purified and recycled back into the plant.",
    description2: "We ensure that not a single drop of polluted water leaves our premises, protecting local water bodies and supporting the communities around us."
  },
  machines: {
    title: "ECO-FRIENDLY MACHINES",
    description1: "The future of farming is green. KOREVA's next-generation engines are engineered to deliver maximum power with significantly reduced emissions and superior fuel efficiency.",
    description2: "From advanced 4-stroke technologies to exploring electric alternatives for hand tools, we are committed to reducing the carbon footprint of Indian agriculture."
  }
};

type TabKey = keyof typeof tabsData;

export function Sustainability() {
  const [activeTab, setActiveTab] = useState<TabKey>("recycling");

  return (
    <section className="relative bg-[#fbfbfb] py-20 md:py-28 px-4 overflow-hidden border-b border-light-300 font-jost">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 space-y-6 md:space-y-8 w-full"
        >
          <div className="flex items-center gap-3">
            <div className="h-[3px] w-8 md:w-12 bg-green-700 rounded-full"></div>
            <span className="text-green-700 font-extrabold tracking-widest text-xs uppercase">Our Green Commitment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase leading-tight">
            SUSTAINABILITY: <br className="hidden sm:block" /> BUILDING A GREEN INDIA
          </h2>
          
          {/* Glassmorphic Tabs */}
          <div className="flex gap-2 pb-1 overflow-x-auto hide-scrollbar snap-x">
            {(Object.keys(tabsData) as TabKey[]).map((tabKey) => {
              const isActive = activeTab === tabKey;
              const labels: Record<TabKey, string> = {
                farming: "Sustainable Farming",
                recycling: "Waste Recycling",
                zld: "Zero Liquid Discharge",
                machines: "Eco-Friendly Machines"
              };

              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 ${
                    isActive 
                      ? "bg-green-700 text-white shadow-md border border-green-700" 
                      : "bg-white/90 text-dark-800 hover:text-green-700 hover:bg-white border border-light-300 shadow-xs"
                  }`}
                >
                  {labels[tabKey]}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel Content */}
          <div className="min-h-[180px] p-6 sm:p-8 rounded-3xl glass-panel border border-light-300/90 shadow-md bg-white/90 backdrop-blur-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl md:text-2xl font-extrabold text-dark-900 uppercase tracking-wide mb-4">
                  {tabsData[activeTab].title}
                </h3>
                <p className="text-dark-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                  {tabsData[activeTab].description1}
                </p>
                <p className="text-dark-700 text-sm md:text-base leading-relaxed font-medium">
                  {tabsData[activeTab].description2}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Circular Orbit Graphic */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-1 justify-center items-center relative w-full"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[440px] md:h-[440px]">
            <div className="absolute inset-0 rounded-full border border-dashed border-green-600/40 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-dashed border-green-600/20 animate-[spin_40s_linear_infinite_reverse]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden bg-white shadow-2xl relative border-4 border-green-600">
                <Image
                  src="/images/agri_machinery_new_1784014752914.jpg"
                  alt="Sustainable Farming"
                  fill
                  sizes="300px"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-green-600/10 mix-blend-multiply" />
              </div>
            </div>

            {/* Orbiting text labels */}
            <div 
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-md border transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'machines' 
                  ? 'bg-green-700 text-white border-green-700 scale-105' 
                  : 'bg-white/95 text-dark-900 border-light-300 hover:border-green-600 hover:text-green-700'
              }`} 
              onClick={() => setActiveTab('machines')}
            >
              <span>● Eco-friendly Machines</span>
            </div>

            <div 
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-md border transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'recycling' 
                  ? 'bg-green-700 text-white border-green-700 scale-105' 
                  : 'bg-white/95 text-dark-900 border-light-300 hover:border-green-600 hover:text-green-700'
              }`} 
              onClick={() => setActiveTab('recycling')}
            >
              <span>● Waste Recycling</span>
            </div>

            <div 
              className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-md border transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'zld' 
                  ? 'bg-green-700 text-white border-green-700 scale-105' 
                  : 'bg-white/95 text-dark-900 border-light-300 hover:border-green-600 hover:text-green-700'
              }`} 
              onClick={() => setActiveTab('zld')}
            >
              <span>● Zero Liquid Discharge</span>
            </div>

            <div 
              className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-md border transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'farming' 
                  ? 'bg-green-700 text-white border-green-700 scale-105' 
                  : 'bg-white/95 text-dark-900 border-light-300 hover:border-green-600 hover:text-green-700'
              }`} 
              onClick={() => setActiveTab('farming')}
            >
              <span>● Sustainable Farming</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
