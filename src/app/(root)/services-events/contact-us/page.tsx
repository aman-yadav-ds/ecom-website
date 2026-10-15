import React from "react";
import { Metadata } from "next";
import ContactUsClient from "@/components/ContactUsClient";
import { SITE_CONFIG } from "@/config/site";
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
    "name": SITE_CONFIG.legalName,
    "alternateName": SITE_CONFIG.brandAliases,
    "url": SITE_CONFIG.url,
    "logo": "https://koreva9.com/icon.png",
    "telephone": SITE_CONFIG.phone.display,
    "email": SITE_CONFIG.email.primary,
    "sameAs": [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.youtube,
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.street,
      "addressLocality": SITE_CONFIG.address.city,
      "addressRegion": SITE_CONFIG.address.state,
      "postalCode": SITE_CONFIG.address.postalCode,
      "addressCountry": SITE_CONFIG.address.countryCode,
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SITE_CONFIG.phone.display,
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
