import React from "react";
import { Metadata } from "next";
import ContactUsClient from "@/components/ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us | Koreva9 - Agricultural Equipment Manufacturer",
  description:
    "Contact Koreva Global LLP (Koreva9) for Power Weeders, Laser Land Levellers, Disc Harrows, STOU Lubricants, Hand Tools, and Dealership opportunities in India.",
  keywords: [
    "Contact Koreva9",
    "Koreva Global LLP Address",
    "Koreva Phone Number",
    "Agricultural Machinery Manufacturer Contact",
    "Koreva Dealer Contact",
  ],
  alternates: {
    canonical: "/services-events/contact-us",
  },
  openGraph: {
    title: "Contact Us | Koreva9 - Agricultural Equipment Manufacturer",
    description:
      "Contact Koreva Global LLP (Koreva9) corporate headquarters, sales team, and support hotline in Uttarakhand, India.",
    url: "https://koreva9.com/services-events/contact-us",
    siteName: "Koreva9",
    images: [
      {
        url: "/contact_address.webp",
        width: 1200,
        height: 630,
        alt: "Koreva Global LLP Corporate Headquarters in Uttarakhand",
      },
    ],
    type: "website",
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Koreva Global LLP",
  "url": "https://koreva9.com/services-events/contact-us",
  "description": "Corporate contact page for Koreva Global LLP (Koreva9) agricultural machinery manufacturer.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Koreva Global LLP",
    "alternateName": "Koreva9",
    "url": "https://koreva9.com",
    "logo": "https://koreva9.com/icon.svg",
    "telephone": "+91-7455973188",
    "email": "info@koreva.com",
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
