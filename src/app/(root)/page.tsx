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
import { getCachedPublishedProducts } from "@/lib/cached-queries";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

const pageTitle = formatPageSeoTitle("Koreva Agriculture & Farm Machinery");
const pageDescription = formatPageSeoDescription("Official store of Koreva Global LLP. High-performance Power Weeders, Rotavators, Disc Harrows, STOU Lubricants, and Hand Tools.");

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

export default async function Home() {
  const productsList = await getCachedPublishedProducts();

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
        <FeaturedProducts products={productsList} />
        <OurSolutions />
        <OurStrength />
        <Sustainability />
        <AboutUsPreview />
        <NewsletterSection />
      </main>
    </div>
  );
}