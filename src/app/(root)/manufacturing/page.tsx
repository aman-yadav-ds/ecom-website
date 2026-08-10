import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Factory,
  ShieldCheck,
  Wrench,
  FileSpreadsheet,
  Package,
  Cog,
  Cpu,
  ArrowRight,
  Building2,
  Sparkles,
  Users,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("Agricultural Machinery Manufacturing & OEM Services"),
  description: formatPageSeoDescription(
    "Explore Koreva Global LLP's agricultural machinery manufacturing facility in Uttarakhand. We offer custom OEM assembly, private label branding, and bulk wholesale supply."
  ),
  canonicalUrl: "/manufacturing",
  keywords: [
    "Koreva Manufacturing",
    "Agricultural Machinery Manufacturer India",
    "Power Weeder Assembly",
    "OEM Farm Equipment",
    "Private Label Agricultural Tools",
    "Koreva Global LLP Uttarakhand",
  ],
});

export const dynamic = "force-static";
export const revalidate = 86400;

const oemServicesList = [
  {
    title: "Private Labeling & Custom Branding",
    desc: "Custom powder-coating colors, customized brand decals, serial number plate placement, and branded user manual packaging.",
    icon: Sparkles,
  },
  {
    title: "Engine & Transmission Matching",
    desc: "Flexible configuration options pairing 7HP, 9HP, or 12HP petrol/diesel engines with heavy-duty gearboxes suited to regional terrain.",
    icon: Cog,
  },
  {
    title: "Attachment & Hitch Tailoring",
    desc: "Customized mounting hitches, PTO splines, and tiller shaft geometry for multi-purpose farming implement compatibility.",
    icon: Wrench,
  },
  {
    title: "Bulk Wholesale & Secure Freight",
    desc: "Reinforced protective packaging, rust-inhibiting wrapping, and organized batch loading optimized for regional transport.",
    icon: Package,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirement & Technical Alignment",
    desc: "We discuss your target specifications, engine preferences, regional soil needs, and branding requirements.",
  },
  {
    step: "02",
    title: "Assembly & Sample Verification",
    desc: "Trial assembly unit setup with precision torque checks, engine load testing, and fitment verification.",
  },
  {
    step: "03",
    title: "Quality Audit & Pre-Delivery Inspection",
    desc: "Multi-point quality inspection covering weld seams, gearbox oil seals, throttle response, and safety cut-offs.",
  },
  {
    step: "04",
    title: "Batch Production & Bulk Dispatch",
    desc: "Scheduled batch manufacturing, branded packaging, and direct dispatch to regional distributor hubs.",
  },
];

const manufacturingHighlights = [
  {
    title: "Precision Engineering",
    desc: "Strict tolerance standards for shaft alignment, gear engagement, and structural frame stability.",
    icon: Cpu,
  },
  {
    title: "Rigorous Assembly Testing",
    desc: "Every assembled machine undergoes live engine run testing and vibration checks before final packaging.",
    icon: ShieldCheck,
  },
  {
    title: "Uttarakhand Operations Hub",
    desc: "Strategically located in Kichha, Udham Singh Nagar with seamless connectivity across northern and pan-India supply routes.",
    icon: Building2,
  },
  {
    title: "Direct B2B Sourcing",
    desc: "Competitive wholesale pricing structures designed to empower dealers, OEMs, and agricultural enterprise buyers.",
    icon: Users,
  },
];

export default function ManufacturingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ManufacturingFacility",
    "name": "Koreva Global LLP Manufacturing & OEM Hub",
    "url": "https://koreva9.com/manufacturing",
    "description": "Agricultural equipment manufacturing, custom OEM assembly, and private labeling facility in Kichha, Uttarakhand, India.",
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
        {/* 1. Hero Section */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-light-300 overflow-hidden bg-[#fbfbfb]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about_factory_1784013199832.jpg"
              alt="Koreva Global LLP Manufacturing & Assembly Facility"
              fill
              sizes="100vw"
              priority
              className="object-cover scale-105 filter brightness-95 opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfb]/90 via-[#fbfbfb]/80 to-[#fbfbfb] z-10" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none z-10" />
          </div>

          <div className="max-w-5xl mx-auto relative z-20 text-center flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xs">
              <Factory className="w-4 h-4" />
              <span>MANUFACTURING &amp; B2B OEM SERVICES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-dark-900 uppercase tracking-tight leading-tight">
              Engineering Quality <span className="text-brand-red">Farm Machinery</span> &amp; OEM Solutions
            </h1>

            <p className="text-dark-700 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
              Based in Kichha, Uttarakhand, Koreva Global LLP combines quality assembly with custom OEM solutions to build high-performance Power Weeders, Rotavators, Disc Harrows, and agricultural implements.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                href="/services-events/contact-us"
                className="px-7 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Submit Wholesale / OEM Inquiry</span>
              </Link>
              <Link
                href="/products"
                className="px-7 py-3.5 rounded-full glass-panel hover:bg-white text-dark-900 border border-light-300 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-2"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4 text-brand-red" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Key Pillars Grid */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-light-300">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-12">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
                Our Commitment
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-dark-900 uppercase mt-1 mb-3">
                Built For Field Performance
              </h2>
              <p className="text-dark-600 text-sm max-w-2xl mx-auto font-medium">
                We focus on precision assembly, transparent communication, and reliable machinery built to withstand demanding agricultural operations.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {manufacturingHighlights.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <ScrollReveal key={idx} animation="fade" delay={idx * 100}>
                    <div className="glass-card p-6 rounded-3xl border border-light-300 text-center h-full flex flex-col items-center shadow-xs hover:border-brand-red/30 transition-colors">
                      <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center mb-4 shrink-0">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-extrabold text-dark-900 uppercase mb-2">
                        {item.title}
                      </h3>
                      <p className="text-dark-600 text-xs leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Turnkey OEM & Private Label Solutions */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-12 md:mb-16">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
                Custom Assembly
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark-900 uppercase mt-1 mb-4">
                OEM &amp; Private Label Services
              </h2>
              <div className="w-16 h-1 bg-brand-red mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {oemServicesList.map((service, idx) => {
                const IconComp = service.icon;
                return (
                  <ScrollReveal key={idx} animation="fade" delay={idx * 100}>
                    <div className="glass-card p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0 shadow-xs">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-2">
                          {service.title}
                        </h3>
                        <p className="text-dark-600 text-sm leading-relaxed font-medium">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Step-by-Step B2B Collaboration Workflow */}
        <section className="py-16 md:py-24 bg-light-100/60 border-y border-light-300 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-12 md:mb-16">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
                Partnership Process
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark-900 uppercase mt-1 mb-4">
                4-Step B2B Collaboration Workflow
              </h2>
              <div className="w-16 h-1 bg-brand-red mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((proc, idx) => (
                <ScrollReveal key={idx} animation="fade" delay={idx * 120}>
                  <div className="glass-card p-6 rounded-3xl border border-light-300 text-center h-full flex flex-col items-center">
                    <span className="text-4xl font-black text-brand-red/20 block mb-2">
                      {proc.step}
                    </span>
                    <h3 className="text-base font-extrabold text-dark-900 uppercase mb-2">
                      {proc.title}
                    </h3>
                    <p className="text-dark-600 text-xs leading-relaxed font-medium">
                      {proc.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Contact & RFQ Call to Action */}
        <section className="py-20 px-4 bg-[#fbfbfb] text-center border-t border-light-300 relative overflow-hidden">
          <div className="max-w-4xl mx-auto glass-panel border border-light-300 rounded-3xl p-8 sm:p-12 shadow-md space-y-6">
            <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
              Partner With Koreva Global LLP
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-dark-900 uppercase tracking-tight">
              Ready to Discuss Custom Manufacturing or Bulk Supply?
            </h2>
            <p className="text-dark-700 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              Connect directly with our manufacturing and sales team in Kichha, Uttarakhand. We offer tailored OEM packaging, custom machine specifications, and wholesale pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/services-events/contact-us"
                className="px-8 py-4 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Contact Sourcing Team</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
