import React from "react";
import { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { FaqAccordionClient } from "@/components/FaqAccordionClient";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("Frequently Asked Questions (FAQ)"),
  description: formatPageSeoDescription("Find answers to common questions about Koreva9 farm machinery, E20 petrol care, warranty coverage, and authorized dealers."),
  canonicalUrl: "/faq",
  keywords: ["Koreva FAQ", "Koreva9 Support", "Power Weeder Warranty FAQ"],
});

// Static FAQ data lives here in the Server Component.
// All question text is pre-rendered into the HTML — fully crawlable and indexable.
const faqs: {
  category: string;
  items: { question: string; answer: React.ReactNode }[];
}[] = [
  {
    category: "General Inquiries",
    items: [
      {
        question: "Where are KOREVA products manufactured?",
        answer:
          "KOREVA is a national brand built on over 20 years of manufacturing experience. Our high-quality agricultural machinery, power weeders, disc harrows, and lubricants are designed and assembled locally in Uttarakhand to meet the rugged demands of domestic farming.",
      },
      {
        question: "How can I find an authorized local dealer?",
        answer:
          "You can use our 'Find a Dealer' page to locate one of our 500+ authorized sales and service representatives across India.",
      },
      {
        question: "How do I become an authorized KOREVA dealer?",
        answer:
          "We are actively looking for passionate partners to join our expanding dealer network. Submit your application through our 'Join Network' button, and our regional manager will contact you within 24 hours.",
      },
    ],
  },
  {
    category: "Product Maintenance & Care",
    items: [
      {
        question:
          "IMPORTANT: How should I store my Petrol Power Weeder when not in use?",
        answer: (
          <div className="bg-red-50 border-l-4 border-brand-red p-4 rounded-2xl text-red-950 my-1 font-medium text-xs sm:text-sm">
            <p className="mb-2 font-bold uppercase tracking-wider text-brand-red">
              Crucial Maintenance Tip regarding E20 Petrol:
            </p>
            <p className="mb-2">
              Due to the 20% Ethanol blend (E20) in standard petrol, it is
              critical that you do not leave fuel sitting in the carburetor for
              extended periods of inactivity.
            </p>
            <p>
              Ethanol-blended petrol attracts moisture, which chokes and damages
              precision carburetor jets.{" "}
              <strong>
                Always turn off the fuel valve and run the engine until it stops
                to completely empty the carburetor before long-term storage.
              </strong>
            </p>
          </div>
        ),
      },
      {
        question: "Are genuine spare parts readily available?",
        answer:
          "Yes! Because we maintain domestic assembly lines and a nationwide distribution hub, we stock complete inventories of replacement blades, carburetor kits, EP-90 gear oils, and cables at local dealer points.",
      },
      {
        question: "How often should I service my Tractor Attachments?",
        answer:
          "Perform a basic visual inspection before every field session (checking bolt torque and blade wear). Perform a complete lubricant change and service with your local authorized dealer at the end of every harvesting season.",
      },
    ],
  },
  {
    category: "Warranty & Support",
    items: [
      {
        question: "What does the KOREVA warranty cover?",
        answer:
          "Our standard warranty covers manufacturing defects, engine structural components, and gear transmission failures under normal agricultural operation. Refer to your product manual or warranty card for specific coverage periods.",
      },
      {
        question: "Who do I contact if my machine requires field service?",
        answer:
          "Contact the authorized KOREVA dealer where you purchased your equipment. They house certified technicians equipped with genuine factory parts.",
      },
    ],
  },
];

// Server Component — no "use client" needed. The h1, p, and all FAQ
// question text are pre-rendered in the HTML stream for maximum SEO value.
export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap((cat) =>
      cat.items.map((item) => {
        let answerText = "";
        if (typeof item.answer === "string") {
          answerText = item.answer;
        } else {
          answerText =
            "Due to 20% Ethanol blend (E20) in petrol, do not leave fuel sitting in the carburetor during long storage. Always turn off the fuel valve and run the engine until it stops to completely empty the carburetor.";
        }
        return {
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answerText,
          },
        };
      })
    ),
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Page header — server-rendered; h1 and description are immediately
            available to crawlers without waiting for JS */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
            <HelpCircle className="w-4 h-4" />
            <span>Help &amp; Knowledge Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-dark-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Find answers to common questions about KOREVA machinery, E20 petrol
            maintenance tips, and our national dealer network.
          </p>
        </div>

        {/* Accordion state is the only client concern — isolated to this boundary */}
        <FaqAccordionClient faqs={faqs} />
      </div>
    </div>
  );
}
