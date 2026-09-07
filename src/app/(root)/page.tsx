import React from "react";
import { Metadata } from "next";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { NewHero } from "@/components/home/NewHero";
import { IndustrialTicker } from "@/components/home/IndustrialTicker";
import { EngineeringStrength } from "@/components/home/EngineeringStrength";
import { FleetShowcase } from "@/components/home/FleetShowcase";
import { EditorialHeritage } from "@/components/home/EditorialHeritage";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { ActionNewsletter } from "@/components/home/ActionNewsletter";
import { FloatingDealerCTA } from "@/components/home/FloatingDealerCTA";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

const pageTitle = formatPageSeoTitle("Koreva Agriculture & Farm Machinery");
const pageDescription = formatPageSeoDescription(
  "Official store of Koreva Global LLP. High-performance Power Weeders, Rotavators, Disc Harrows, STOU Lubricants, and Hand Tools."
);

export const metadata: Metadata = buildProductMetadata({
  title: pageTitle,
  description: pageDescription,
  canonicalUrl: "/",
  keywords: [
    "Koreva",
    "Koreva9",
    "Koreva Agriculture",
    "Koreva Machines",
    "Koreva Global",
    "Koreva Global LLP",
    "Power Weeder",
    "Harrow",
    "Rotavator",
    "Power Reaper",
    "Brush Cutter",
    "STOU Lubricants",
    "Hand Tools",
    "Agricultural Machinery India",
  ],
});

export const dynamic = "force-static";
export const revalidate = 86400;

export default function Home() {
  // JSON-LD WebSite schema with SearchAction for Google Sitelinks Searchbox
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Koreva Agriculture & Machines",
    alternateName: [
      "Koreva9",
      "Koreva",
      "Koreva Agriculture",
      "Koreva Machines",
      "Koreva Global",
      "Koreva Global LLP",
    ],
    url: "https://koreva9.com",
    description:
      "Koreva Global (Koreva Agriculture / Koreva Machines / Koreva9) is a premier Indian manufacturer of Power Weeders, tractor Harrows, Rotavators, Power Reapers, STOU Lubricants, and Hand Tools.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://koreva9.com/products?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col font-manrope selection:bg-brand-red selection:text-white">
      {/* 0. Top Hardware-Accelerated Scroll Progress Bar */}
      <ScrollProgress />

      {/* Structured Data Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow">
        {/* 1. First Viewport Industrial Showcase & Parallax Hero */}
        <NewHero />

        {/* 2. Seamless High-Performance Industrial Ticker */}
        <IndustrialTicker />

        {/* 3. Interactive Metallurgy & Robotic Engineering Showcase */}
        <EngineeringStrength />

        {/* 4. Production Fleet & Machinery Categories Grid */}
        <FleetShowcase />

        {/* 5. Editorial Heritage: Indian Roots, Global Standards */}
        <EditorialHeritage />

        {/* 6. Sustainable Agriculture & Eco-Tillage */}
        <SustainabilitySection />

        {/* 7. Action Deck: Dealer Locator & Field Insights Newsletter */}
        <ActionNewsletter />
      </main>

      {/* 8. Scroll-Aware Floating Dealer Pill */}
      <FloatingDealerCTA />
    </div>
  );
}