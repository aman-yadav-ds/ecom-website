import React from "react";
import { Metadata } from "next";
import { NewHero } from "@/components/home/NewHero";
import { StatsSection } from "@/components/home/StatsSection";
import { OurSolutions } from "@/components/home/OurSolutions";
import { OurStrength } from "@/components/home/OurStrength";
import { Sustainability } from "@/components/home/Sustainability";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutUsPreview } from "@/components/home/AboutUsPreview";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Koreva Agriculture & Farm Machines | Koreva Global LLP (Koreva9)",
  description: "Koreva Global LLP (Koreva Agriculture / Koreva Machines / Koreva9) manufactures heavy-duty Power Weeders, Rotavators, Disc Harrows, Power Reapers, STOU Lubricants, and SK5 Hand Tools for Indian agriculture.",
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
    "Laser Land Leveller",
    "Rice Mill",
    "Pulveriser",
    "Pruning Secateur"
  ],
  openGraph: {
    title: "Koreva Agriculture & Farm Machines | Koreva Global LLP (Koreva9)",
    description: "Empowering Indian farmers with precision Koreva Machines, Power Weeders, Harrows, Rotavators, and ISO 9001 certified lubricants by Koreva Global LLP.",
    url: "https://koreva9.com",
    siteName: "Koreva Agriculture & Machines",
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  // JSON-LD WebSite schema with SearchAction for Google Sitelinks Searchbox
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Koreva Agriculture & Machines",
    "alternateName": [
      "Koreva9",
      "Koreva",
      "Koreva Agriculture",
      "Koreva Machines",
      "Koreva Global",
      "Koreva Global LLP"
    ],
    "url": "https://koreva9.com",
    "description": "Koreva Global (Koreva Agriculture / Koreva Machines / Koreva9) is a leading Indian manufacturer of Power Weeders, tractor Harrows, Rotavators, Power Reapers, STOU Lubricants, and Hand Tools.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://koreva9.com/products?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen bg-light-100 flex flex-col font-jost">
      {/* Structured Data Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow">
        <NewHero />
        <StatsSection />
        <FeaturedProducts />
        <OurSolutions />
        <OurStrength />
        <Sustainability />
        <AboutUsPreview />
        <NewsletterSection />
      </main>
    </div>
  );
}