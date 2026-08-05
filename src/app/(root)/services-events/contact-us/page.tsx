import React from "react";
import { Metadata } from "next";
import ContactUsClient from "@/components/ContactUsClient";
import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("Contact Us - Sales & Support"),
  description: formatPageSeoDescription("Contact official manufacturer Koreva9 (Koreva Global LLP) for Power Weeders, farm machinery inquiries, and dealership opportunities."),
  canonicalUrl: "/services-events/contact-us",
  keywords: ["Contact Koreva9", "Koreva Global LLP Phone", "Koreva Dealership Inquiry"],
});

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Koreva Global LLP",
  "url": "https://koreva9.com/services-events/contact-us",
  "description": "Corporate contact page for Koreva Global LLP (Koreva Agriculture / Koreva Machines / Koreva9) agricultural machinery manufacturer.",
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
    "telephone": "+91-7455973188",
    "email": "info@koreva.com",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61592533542061",
      "https://www.instagram.com/koreva_global/",
      "https://x.com/koreva9"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH 9, Kichha Rudrapur Road, Nearby Yes Bank, Kishanpur",
      "addressLocality": "Kichha",
      "addressRegion": "Udham Singh Nagar, Uttarakhand",
      "postalCode": "263148",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7455973188",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    }
  }
};

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-light-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageJsonLd),
        }}
      />
      <ContactUsClient />
    </main>
  );
}
