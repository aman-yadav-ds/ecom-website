import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Building2,
  Cpu,
  ShieldCheck,
  Award,
  Factory,
  Cog,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Layers,
  Wrench,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("State-of-the-Art Agricultural Machinery Plant & Infrastructure"),
  description: formatPageSeoDescription(
    "Explore Koreva Global LLP's 50,000+ sq ft ISO 9001:2015 certified manufacturing plant in Uttarakhand, featuring CNC machining, robotic welding, and 10,000+ monthly unit capacity."
  ),
  canonicalUrl: "/manufacturing",
  keywords: [
    "Koreva Manufacturing Facility",
    "Agricultural Machinery Plant India",
    "Power Weeder Factory",
    "Tractor Attachment Manufacturing",
    "ISO 9001 Agricultural Equipment",
  ],
});

export const dynamic = "force-static";
export const revalidate = 86400;

const facilityStats = [
  { label: "Plant Footprint", value: "50,000+ SQ FT", sub: "Modern Uttarakhand Hub" },
  { label: "Monthly Output", value: "10,000+ UNITS", sub: "Power Weeders & Implements" },
  { label: "Quality Standards", value: "ISO 9001:2015", sub: "100% Certified Inspection" },
  { label: "Distribution Hubs", value: "500+ DEALERS", sub: "Pan-India Supply Network" },
];

const machineryHighlights = [
  {
    title: "Robotic Welding Cells",
    desc: "Automated multi-axis robotic arms ensure structural integrity and flawless seam welds across heavy-duty disc harrows and rotavators.",
    icon: Cpu,
  },
  {
    title: "High-Precision CNC Machining",
    desc: "Micron-accurate computer-controlled turning and milling for gearbox housings, tiller shafts, and engine mount assemblies.",
    icon: Cog,
  },
  {
    title: "Automated Powder Coating Line",
    desc: "Multi-stage chemical pre-treatment and electrostatic powder coat application for extreme weather resistance and corrosion protection.",
    icon: Layers,
  },
  {
    title: "Dynamic Balancing & Testing Rig",
    desc: "Every power weeder rotor and reaper cutter bar is dynamically balanced at 3,500 RPM to eliminate operational vibration.",
    icon: Gauge,
  },
];

const qualitySteps = [
  {
    step: "01",
    title: "Raw Material Metallurgy Audit",
    desc: "Spectrometric testing of high-carbon SK5 steel, boron steel, and alloy castings before entering assembly lines.",
  },
  {
    step: "02",
    title: "In-Process Precision Inspection",
    desc: "Computerized coordinate measuring machines (CMM) monitor gear tooth tolerances and shaft alignment.",
  },
  {
    step: "03",
    title: "50-Hour Endurance Testing",
    desc: "Engine and gearbox assemblies undergo simulated field stress testing at full load before final paint finish.",
  },
  {
    step: "04",
    title: "Final Pre-Delivery Inspection (PDI)",
    desc: "100-point checklist covering fuel flow, noise levels, safety cut-offs, and packaging integrity.",
  },
];

export default function ManufacturingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ManufacturingFacility",
    "name": "Koreva Global LLP Manufacturing Plant",
    "url": "https://koreva9.com/manufacturing",
    "description": "ISO 9001:2015 certified agricultural equipment manufacturing plant in Kichha, Uttarakhand, India.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH 9, Kichha Rudrapur Road, Nearby Yes Bank, Kishanpur",
      "addressLocality": "Kichha",
      "addressRegion": "Udham Singh Nagar, Uttarakhand",
      "postalCode": "263148",
      "addressCountry": "IN",
    },
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 flex flex-col font-jost">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow">
        {/* 1. Hero Banner */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-light-300 overflow-hidden bg-[#fbfbfb]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about_factory_1784013199832.jpg"
              alt="KOREVA Global LLP Manufacturing Infrastructure"
              fill
              sizes="100vw"
              priority
              className="object-cover scale-105 filter brightness-95 opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfb]/90 via-[#fbfbfb]/80 to-[#fbfbfb] z-10" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none z-10" />
          </div>

          <div className="max-w-5xl mx-auto relative z-20 text-center flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xs">
              <Factory className="w-4 h-4" />
              <span>ISO 9001:2015 CERTIFIED MANUFACTURING PLANT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-dark-900 uppercase tracking-tight leading-tight">
              State-of-the-Art <span className="text-brand-red">Manufacturing</span> Infrastructure
            </h1>

            <p className="text-dark-700 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
              Combining robotic welding, CNC precision machining, and multi-stage quality control to engineer heavy-duty Power Weeders, Rotavators, and Disc Harrows for global agriculture.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                href="/oem-services"
                className="px-7 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>Explore OEM &amp; Private Labeling</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services-events/contact-us"
                className="px-7 py-3.5 rounded-full glass-panel hover:bg-white text-dark-900 border border-light-300 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-brand-red" />
                <span>Schedule Plant Tour</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Key Plant Statistics Grid */}
        <section className="py-12 bg-white border-b border-light-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {facilityStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-light-100/70 border border-light-300 text-center shadow-2xs hover:border-brand-red/30 transition-colors"
                >
                  <span className="text-xs font-bold text-dark-500 uppercase tracking-wider block mb-1">
                    {stat.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-brand-red block">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-medium text-dark-700 block mt-1">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Advanced Machinery & Technology Showcase */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-12 md:mb-16">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
                Robotics &amp; Automation
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark-900 uppercase mt-1 mb-4">
                Advanced Production Machinery
              </h2>
              <div className="w-16 h-1 bg-brand-red mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {machineryHighlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <ScrollReveal key={idx} animation="fade" delay={idx * 100}>
                    <div className="glass-card p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0 shadow-xs">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-2">
                          {item.title}
                        </h3>
                        <p className="text-dark-600 text-sm leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Quality Assurance Protocol */}
        <section className="py-16 md:py-24 bg-light-100/60 border-y border-light-300 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-12 md:mb-16">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
                Zero-Defect Commitment
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark-900 uppercase mt-1 mb-4">
                4-Stage Quality Assurance Protocol
              </h2>
              <div className="w-16 h-1 bg-brand-red mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualitySteps.map((step, idx) => (
                <ScrollReveal key={idx} animation="fade" delay={idx * 120}>
                  <div className="glass-card p-6 rounded-3xl border border-light-300 text-center h-full flex flex-col items-center">
                    <span className="text-3xl font-black text-brand-red/20 block mb-2">
                      {step.step}
                    </span>
                    <h3 className="text-base font-extrabold text-dark-900 uppercase mb-2">
                      {step.title}
                    </h3>
                    <p className="text-dark-600 text-xs leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Plant Virtual Tour & RFQ Banner */}
        <section className="py-20 px-4 bg-[#fbfbfb] text-center border-t border-light-300 relative overflow-hidden">
          <div className="max-w-4xl mx-auto glass-panel border border-light-300 rounded-3xl p-8 sm:p-12 shadow-md space-y-6">
            <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
              B2B Manufacturer Sourcing
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-dark-900 uppercase tracking-tight">
              Need Custom Machinery Production or Bulk Sourcing?
            </h2>
            <p className="text-dark-700 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              Our engineering team provides end-to-end OEM manufacturing, private labeling, and bulk export pricing tailored to regional distributors.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/oem-services"
                className="px-7 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Submit Wholesale RFQ</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
