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
  title: "KOREVA GLOBAL LLP | Power Weeders, Harrows & Agricultural Machinery India",
  description: "KOREVA GLOBAL LLP manufactures heavy-duty Power Weeders, Rotavators, Harrows, Power Reapers, Brush Cutters, Rice Mills, STOU Lubricants, and SK5 Hand Tools for Indian agriculture.",
  keywords: [
    "KOREVA",
    "KOREVA GLOBAL LLP",
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
    title: "KOREVA GLOBAL LLP | Premium Agricultural Machinery & Equipment",
    description: "Empowering Indian farmers with precision Power Weeders, Harrows, Rotavators, and ISO 9001 certified lubricants.",
    url: "https://korevaglobal.com",
    siteName: "KOREVA GLOBAL LLP",
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  // JSON-LD Structured Data for Google SEO indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KOREVA GLOBAL LLP",
    "altName": "KOREVA",
    "url": "https://korevaglobal.com",
    "logo": "https://korevaglobal.com/trademark.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7455973188",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "description": "KOREVA GLOBAL LLP is a leading Indian manufacturer of Power Weeders, tractor Harrows, Rotavators, Power Reapers, STOU Lubricants, and Hand Tools.",
    "makesOffer": [
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "KOREVA Power Weeder DHURANDHAR" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "KOREVA Harrow RAINO" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "KOREVA Rotavator KOBRA" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "KOREVA STOU 15W-40 Universal Tractor Fluid" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "KOREVA Bypass Pruning Secateur PRO" } }
    ]
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