"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "../ScrollReveal";

const tabsData = {
  farming: {
    title: "SUSTAINABLE FARMING",
    description1: "KOREVA is dedicated to revolutionizing Indian agriculture through sustainable technology. Our upcoming machinery is designed to optimize water usage, reduce soil compaction, and ensure long-term soil health.",
    description2: "By providing affordable, high-efficiency tools, we empower farmers to increase yields without depleting natural resources, building a resilient agricultural ecosystem for generations to come."
  },
  recycling: {
    title: "WASTE RECYCLING",
    description1: "We believe in a circular economy. At KOREVA, our packaging processes are designed to minimize plastic use, and our machinery components are built with high recyclability in mind.",
    description2: "We are establishing initiatives to help farmers responsibly recycle old machinery and parts, reducing agricultural waste across rural India."
  },
  zld: {
    title: "ZERO LIQUID DISCHARGE",
    description1: "Our upcoming manufacturing facilities are being built with the promise of Zero Liquid Discharge (ZLD). This means all industrial wastewater is purified and recycled back into the plant.",
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
  const [activeTab, setActiveTab] = useState<TabKey>("farming");

  return (
    <section className="bg-light-100 py-16 md:py-24 px-4 overflow-hidden relative border-t border-light-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        
        {/* Text Content */}
        <ScrollReveal animation="slide-left" className="flex-1 space-y-6 md:space-y-8 w-full">
          <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-2">
            <div className="h-[2px] w-8 md:w-12 bg-[#007d48]"></div>
            <span className="text-[#007d48] font-bold tracking-widest text-xs md:text-sm uppercase">Our Commitment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black uppercase leading-tight">
            SUSTAINABILITY: <br className="hidden sm:block" /> BUILDING A GREEN INDIA
          </h2>
          
          {/* Scrollable Tabs */}
          <div className="flex gap-2 border-b border-light-300 pb-0 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            <button 
              onClick={() => setActiveTab("farming")}
              className={`px-4 sm:px-5 py-3 font-semibold rounded-t-md text-xs sm:text-sm whitespace-nowrap transition-colors snap-start shrink-0 ${activeTab === 'farming' ? 'bg-[#007d48] text-white shadow-md' : 'text-brand-dark hover:text-[#007d48] bg-light-200'}`}
            >
              Sustainable Farming
            </button>
            <button 
              onClick={() => setActiveTab("recycling")}
              className={`px-4 sm:px-5 py-3 font-semibold rounded-t-md text-xs sm:text-sm whitespace-nowrap transition-colors snap-start shrink-0 ${activeTab === 'recycling' ? 'bg-[#007d48] text-white shadow-md' : 'text-brand-dark hover:text-[#007d48] bg-light-200'}`}
            >
              Waste Recycling
            </button>
            <button 
              onClick={() => setActiveTab("zld")}
              className={`px-4 sm:px-5 py-3 font-semibold rounded-t-md text-xs sm:text-sm whitespace-nowrap transition-colors snap-start shrink-0 ${activeTab === 'zld' ? 'bg-[#007d48] text-white shadow-md' : 'text-brand-dark hover:text-[#007d48] bg-light-200'}`}
            >
              Zero Liquid Discharge
            </button>
            <button 
              onClick={() => setActiveTab("machines")}
              className={`px-4 sm:px-5 py-3 font-semibold rounded-t-md text-xs sm:text-sm whitespace-nowrap transition-colors snap-start shrink-0 ${activeTab === 'machines' ? 'bg-[#007d48] text-white shadow-md' : 'text-brand-dark hover:text-[#007d48] bg-light-200'}`}
            >
              Eco-friendly Machines
            </button>
          </div>

          <div className="bg-light-200 p-6 md:p-8 rounded-b-xl rounded-tr-xl border-l-4 border-[#007d48] min-h-[220px] shadow-sm animate-[fade-in_0.3s_ease-out]">
            <h3 className="text-xl md:text-2xl font-bold text-brand-black uppercase mb-3 md:mb-4">
              {tabsData[activeTab].title}
            </h3>
            <p className="text-brand-dark text-sm md:text-base leading-relaxed mb-3 md:mb-4">
              {tabsData[activeTab].description1}
            </p>
            <p className="text-brand-dark text-sm md:text-base leading-relaxed">
              {tabsData[activeTab].description2}
            </p>
          </div>
        </ScrollReveal>

        {/* Graphic Content - Hidden on mobile for a cleaner UI */}
        <ScrollReveal animation="slide-right" className="hidden md:flex flex-1 justify-center items-center relative mt-16 md:mt-12 lg:mt-0 w-full">
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[450px] md:h-[450px]">
            {/* The circular graphic */}
            <div className="absolute inset-0 rounded-full border-[1px] border-dashed border-[#007d48]/40 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-6 md:inset-8 rounded-full border-[1px] border-dashed border-[#007d48]/20 animate-[spin_40s_linear_infinite_reverse]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden bg-white shadow-2xl relative border-4 border-[#007d48]">
                <Image
                  src="/images/agri_machinery_new_1784014752914.jpg"
                  alt="Sustainable Farming"
                  fill
                  sizes="(max-width: 768px) 220px, 300px"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-[#007d48]/20 mix-blend-multiply" />
              </div>
            </div>

            {/* Orbiting text labels */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-lg border transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'machines' ? 'bg-[#007d48] text-white border-[#007d48]' : 'bg-white text-brand-black border-light-300'}`} onClick={() => setActiveTab('machines')}>
              <span className={activeTab === 'machines' ? 'text-white mr-1.5' : 'text-[#007d48] mr-1.5'}>●</span> Eco-friendly Machines
            </div>
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-lg border transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'recycling' ? 'bg-[#007d48] text-white border-[#007d48]' : 'bg-white text-brand-black border-light-300'}`} onClick={() => setActiveTab('recycling')}>
              <span className={activeTab === 'recycling' ? 'text-white mr-1.5' : 'text-[#007d48] mr-1.5'}>●</span> Waste Recycling
            </div>
            
            {/* Side labels */}
            <div className={`absolute top-1/2 left-0 md:-left-6 -translate-y-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-lg border transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'zld' ? 'bg-[#007d48] text-white border-[#007d48]' : 'bg-white text-brand-black border-light-300'}`} onClick={() => setActiveTab('zld')}>
              <span className={activeTab === 'zld' ? 'text-white mr-1.5' : 'text-[#007d48] mr-1.5'}>●</span> Zero Liquid Discharge
            </div>
            <div className={`absolute top-1/2 right-0 md:-right-6 -translate-y-1/2 translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-lg border transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'farming' ? 'bg-[#007d48] text-white border-[#007d48]' : 'bg-white text-brand-black border-light-300'}`} onClick={() => setActiveTab('farming')}>
              <span className={activeTab === 'farming' ? 'text-white mr-1.5' : 'text-[#007d48] mr-1.5'}>●</span> Sustainable Farming
            </div>
          </div>
        </ScrollReveal>

      </div>
      
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-64 h-64 md:w-96 md:h-96 bg-[#007d48] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
