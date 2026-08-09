import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShieldCheck,
  CheckCircle2,
  Globe,
  Layers,
  Wrench,
  FileSpreadsheet,
  Package,
  Sparkles,
  ArrowRight,
  Building2,
  Check,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("OEM & Private Label Agricultural Equipment Manufacturing"),
  description: formatPageSeoDescription(
    "Partner with Koreva Global LLP for custom OEM agricultural machinery manufacturing, private label branding, specialized tractor attachments, and international export solutions."
  ),
  canonicalUrl: "/oem-services",
  keywords: [
    "OEM Agricultural Machinery",
    "Private Label Farm Equipment",
    "Custom Power Weeder Manufacturer",
    "Tractor Attachment Customization",
    "Koreva Global OEM Manufacturing",
  ],
});

export const dynamic = "force-static";
export const revalidate = 86400;

const oemCapabilities = [
  {
    title: "Private Label Branding & Decals",
    desc: "Custom powder-coat colors, branded vinyl decals, serial plates, and customized user manuals with your enterprise branding.",
  },
  {
    title: "Engine & Gearbox Customization",
    desc: "Pairing custom petrol/diesel engines (7HP, 9HP, 12HP) with specific transmission ratios to meet local soil requirements.",
  },
  {
    title: "Attachment & Hitch Compatibility",
    desc: "Modified 3-point linkage geometry, drawbar hitches, PTO splines, and quick-hitch couplers for international tractor models.",
  },
  {
    title: "Export Containerized Packaging",
    desc: "Heavy-duty wooden crate packaging, rust-inhibitive VCI wrap, and containerized loading optimized for ocean transport.",
  },
];

const oemWorkflow = [
  {
    num: "01",
    stage: "Concept & CAD Engineering",
    details: "Our R&D team reviews your technical drawings or specs and creates 3D CAD assemblies.",
  },
  {
    num: "02",
    stage: "Tooling & Prototype Testing",
    details: "Rapid tooling and functional prototype fabrication followed by 50-hour load testing.",
  },
  {
    num: "03",
    stage: "ISO & Compliance Verification",
    details: "Pre-production audit covering material hardness, emissions, and safety cut-offs.",
  },
  {
    num: "04",
    stage: "Bulk Production & Global Export",
    details: "Automated batch manufacturing, customized packaging, and export documentation.",
  },
];

export default function OemServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "OEM Agricultural Equipment Manufacturing & Private Labeling",
    "provider": {
      "@type": "Organization",
      "name": "Koreva Global LLP",
      "url": "https://koreva9.com",
    },
    "areaServed": "Global",
    "description": "Custom OEM manufacturing, private label branding, and export logistics for power weeders, rotavators, and farm tools.",
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
              alt="KOREVA Global LLP OEM Manufacturing Facility"
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
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL B2B OEM &amp; PRIVATE LABEL PARTNER</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-dark-900 uppercase tracking-tight leading-tight">
              Custom <span className="text-brand-red">OEM &amp; Private Label</span> Manufacturing
            </h1>

            <p className="text-dark-700 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
              Scale your brand with KOREVA Global LLP&apos;s ISO 9001:2015 certified production lines. We engineer custom Power Weeders, Rotavators, and Farm Tools built to your exact technical specifications.
            </p>
          </div>
        </section>

        {/* 2. OEM Customization Capabilities Grid */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-12 md:mb-16">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
                Turnkey Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark-900 uppercase mt-1 mb-4">
                Full Spectrum OEM Customization
              </h2>
              <div className="w-16 h-1 bg-brand-red mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {oemCapabilities.map((cap, idx) => (
                <ScrollReveal key={idx} animation="fade" delay={idx * 100}>
                  <div className="glass-card p-8 rounded-3xl border border-light-300 shadow-xs hover:shadow-md transition-all flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0 mt-1 font-bold">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-2">
                        {cap.title}
                      </h3>
                      <p className="text-dark-600 text-sm leading-relaxed font-medium">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. 4-Stage OEM Workflow */}
        <section className="py-16 md:py-24 bg-light-100/60 border-y border-light-300 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-12 md:mb-16">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
                Structured Process
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark-900 uppercase mt-1 mb-4">
                4-Step OEM Manufacturing Journey
              </h2>
              <div className="w-16 h-1 bg-brand-red mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {oemWorkflow.map((wf, idx) => (
                <ScrollReveal key={idx} animation="fade" delay={idx * 120}>
                  <div className="glass-card p-6 rounded-3xl border border-light-300 text-center h-full flex flex-col items-center">
                    <span className="text-4xl font-black text-brand-red/20 block mb-2">
                      {wf.num}
                    </span>
                    <h3 className="text-base font-extrabold text-dark-900 uppercase mb-2">
                      {wf.stage}
                    </h3>
                    <p className="text-dark-600 text-xs leading-relaxed font-medium">
                      {wf.details}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Global Export & Compliance Banner */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto glass-panel border border-light-300 rounded-3xl p-8 sm:p-12 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
                Worldwide Logistics
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-900 uppercase">
                Global Export &amp; Custom Duty Support
              </h2>
              <p className="text-dark-700 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
                We handle complete export clearance, COO (Certificate of Origin), HS Code classification, and container consolidation for importers in Africa, Southeast Asia, Middle East, and South America.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <div className="p-5 rounded-2xl bg-white border border-light-300 text-center shadow-xs">
                <Globe className="w-8 h-8 text-brand-red mx-auto mb-2" />
                <span className="text-xs font-extrabold text-dark-900 uppercase tracking-wider block">
                  30+ Countries
                </span>
                <span className="text-[11px] text-dark-500 font-medium">Export Ready</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-light-300 text-center shadow-xs">
                <Package className="w-8 h-8 text-brand-red mx-auto mb-2" />
                <span className="text-xs font-extrabold text-dark-900 uppercase tracking-wider block">
                  FCL &amp; LCL Freight
                </span>
                <span className="text-[11px] text-dark-500 font-medium">Wooden Crate Wrapped</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive OEM Consultation Banner */}
        <section className="py-20 px-4 bg-[#fbfbfb] text-center border-t border-light-300 relative overflow-hidden">
          <div className="max-w-4xl mx-auto glass-panel border border-light-300 rounded-3xl p-8 sm:p-12 shadow-md space-y-6">
            <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">
              Direct Engineering Consultation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-dark-900 uppercase tracking-tight">
              Ready to Discuss Custom OEM Production?
            </h2>
            <p className="text-dark-700 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              Submit your project drawings or custom machinery requirements. Our B2B engineering team will respond with technical feasibility and wholesale pricing within 24 hours.
            </p>
            <div className="flex justify-center pt-2">
              <Link
                href="/services-events/contact-us"
                className="px-8 py-4 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Contact OEM Sourcing Team</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
