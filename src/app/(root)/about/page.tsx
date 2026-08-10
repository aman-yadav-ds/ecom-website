import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BecomePartnerButton } from "@/components/BecomePartnerButton";
import { Building2, Users, ShieldCheck, TrendingUp, Leaf } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("About Koreva Global LLP & Machinery"),
  description: formatPageSeoDescription("Learn about Koreva Global LLP (Koreva9), a premier Indian manufacturer of heavy-duty Power Weeders, Rotavators, Disc Harrows, and ISO certified lubricants."),
  canonicalUrl: "/about",
  keywords: ["About Koreva Global LLP", "Koreva9 Manufacturer", "Agricultural Machinery Manufacturer"],
});

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Koreva Global LLP",
  "url": "https://koreva9.com/about",
  "description": "Corporate about page for Koreva Global LLP (Koreva Agriculture / Koreva Machines / Koreva9) agricultural machinery manufacturer in Uttarakhand, India.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Koreva Global LLP",
    "alternateName": [
      "Koreva",
      "Koreva9",
      "Koreva Agriculture",
      "Koreva Machines",
      "Koreva Global"
    ],
    "url": "https://koreva9.com",
    "logo": "https://koreva9.com/icon.png",
    "foundingDate": "2026",
    "knowsAbout": [
      "Power Weeders",
      "Disc Harrows",
      "Rotavators",
      "Agricultural Lubricants",
      "Farm Equipment"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH 9, Kichha Rudrapur Road, Nearby Yes Bank, Kishanpur",
      "addressLocality": "Kichha",
      "addressRegion": "Udham Singh Nagar, Uttarakhand",
      "postalCode": "263148",
      "addressCountry": "IN"
    }
  }
};

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 flex flex-col font-jost">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageJsonLd),
        }}
      />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden py-16 md:py-24 border-b border-light-300">
          {/* Background Image with Light Glass Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about_factory_1784013199832.jpg"
              alt="Koreva Agriculture & Koreva Machines Manufacturing Facility - Koreva Global LLP (Koreva9)"
              fill
              sizes="100vw"
              className="object-cover scale-105 filter brightness-95 opacity-25"
              priority
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfb]/90 via-[#fbfbfb]/80 to-[#fbfbfb] z-10" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-red/8 rounded-full blur-[140px] pointer-events-none z-10" />
          </div>

          <ScrollReveal animation="slide-bottom" className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xs">
              <Building2 className="w-4 h-4" />
              <span>ABOUT KOREVA GLOBAL LLP (KOREVA AGRICULTURE & MACHINES)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-dark-900 uppercase tracking-tight leading-tight">
              A LEGACY IN AGRICULTURAL INNOVATION
            </h1>
            <p className="text-dark-700 text-sm sm:text-base md:text-lg font-medium max-w-2xl leading-relaxed">
              Empowering Indian farmers with state-of-the-art Koreva Machines, precision hand tools, and ISO 9001:2015 certified lubricants by Koreva Global LLP (Koreva9).
            </p>
          </ScrollReveal>
        </section>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal animation="fade" className="glass-panel border border-light-300 rounded-3xl p-8 sm:p-12 md:p-16 shadow-xs text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-900 uppercase mb-6 tracking-wide">
                Who We Are
              </h2>
              <p className="text-dark-700 text-base md:text-lg leading-relaxed mb-6 font-medium">
                Welcome to <strong className="text-dark-900 font-extrabold">Koreva Agriculture</strong> & <strong className="text-dark-900 font-extrabold">Koreva Machines</strong>, flagship divisions of <strong className="text-brand-red font-extrabold">Koreva Global LLP</strong> (widely known as <strong className="text-dark-900 font-extrabold">Koreva9</strong> / <strong className="text-dark-900 font-extrabold">Koreva Global</strong>). We are a leading force in the Indian agricultural sector, dedicated to empowering farmers with heavy-duty Power Weeders, Disc Harrows, Rotavators, Reapers, robust garden tools, and high-performance lubricants.
              </p>
              <p className="text-dark-700 text-base md:text-lg leading-relaxed font-medium max-w-3xl mx-auto">
                Based in Uttarakhand, India, our mission at Koreva Global is straightforward: to provide high-quality, affordable, and sustainable farming machinery engineered specifically for the unique demands of Indian soils and terrain.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="bg-light-100/60 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-y border-light-300">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-12 md:mb-16">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">Our Foundation</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark-900 uppercase mt-1 mb-4">
                Our Core Values
              </h2>
              <div className="w-16 h-1 bg-brand-red mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Value 1 */}
              <ScrollReveal animation="fade" delay={0}>
                <div className="glass-card p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all text-center h-full flex flex-col items-center">
                  <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mb-6 text-brand-red shadow-xs">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-3 tracking-wide">FARMER FIRST</h3>
                  <p className="text-dark-600 text-sm leading-relaxed font-medium">
                    Every machine we manufacture under KOREVA is engineered with the farmer&apos;s profitability, comfort, and success at heart.
                  </p>
                </div>
              </ScrollReveal>

              {/* Value 2 */}
              <ScrollReveal animation="fade" delay={150}>
                <div className="glass-card p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all text-center h-full flex flex-col items-center">
                  <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mb-6 text-brand-red shadow-xs">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-3 tracking-wide">QUALITY ASSURANCE</h3>
                  <p className="text-dark-600 text-sm leading-relaxed font-medium">
                    As an ISO 9001:2015 certified company, KOREVA GLOBAL LLP ensures that every product undergoes rigorous multi-stage field testing.
                  </p>
                </div>
              </ScrollReveal>

              {/* Value 3 */}
              <ScrollReveal animation="fade" delay={300}>
                <div className="glass-card p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all text-center h-full flex flex-col items-center">
                  <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mb-6 text-brand-red shadow-xs">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-3 tracking-wide">CONTINUOUS R&D</h3>
                  <p className="text-dark-600 text-sm leading-relaxed font-medium">
                    We continuously invest in modern R&D to bring efficient, low-maintenance agricultural machinery to the Indian market.
                  </p>
                </div>
              </ScrollReveal>

              {/* Value 4 */}
              <ScrollReveal animation="fade" delay={450}>
                <div className="glass-card p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all text-center h-full flex flex-col items-center">
                  <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mb-6 text-brand-red shadow-xs">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-3 tracking-wide">SUSTAINABILITY</h3>
                  <p className="text-dark-600 text-sm leading-relaxed font-medium">
                    From Zero Liquid Discharge manufacturing to eco-friendly engines, KOREVA is committed to building a greener India.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Manufacturing Highlights Banner */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto glass-panel border border-light-300 rounded-3xl p-8 sm:p-12 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs">Certified Manufacturing Infrastructure</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-900 uppercase">
                ISO 9001:2015 CERTIFIED FACILITY
              </h2>
              <p className="text-dark-700 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
                Our Uttarakhand manufacturing &amp; assembly facility focuses on precision engineering, strict quality inspection, and custom OEM solutions for modern farming.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/manufacturing"
                  className="px-5 py-2.5 rounded-full bg-brand-red text-white font-extrabold text-xs uppercase tracking-wider hover:bg-brand-red-accent transition-all shadow-xs"
                >
                  Explore Manufacturing &amp; OEM Services &gt;
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 shrink-0">
              <div className="px-6 py-4 rounded-2xl bg-white border border-light-300 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-red block">10,000+</span>
                <span className="text-xs font-bold text-dark-700 uppercase tracking-wider">Units / Month</span>
              </div>
              <div className="px-6 py-4 rounded-2xl bg-white border border-light-300 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-dark-900 block">500+</span>
                <span className="text-xs font-bold text-dark-700 uppercase tracking-wider">Dealer Outlets</span>
              </div>
            </div>
          </div>
        </section>

        {/* Vision CTA */}
        <section className="py-20 md:py-24 px-4 bg-[#fbfbfb] text-center border-t border-light-300 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/5 rounded-full blur-[140px] pointer-events-none" />
          <ScrollReveal animation="slide-bottom" className="max-w-3xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight">
              Join the <span className="text-brand-red">KOREVA</span> Family
            </h2>
            <p className="text-dark-700 text-base sm:text-lg font-medium leading-relaxed">
              We are actively expanding our dealer network across India. Partner with KOREVA GLOBAL LLP and be a part of the agricultural revolution.
            </p>
            <div>
              <BecomePartnerButton />
            </div>
          </ScrollReveal>
        </section>

      </main>
    </div>
  );
}
