import React from "react";
import { Metadata } from "next";
import DealerListView from "@/components/dealers/DealerListView";
import { Check, Store } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getDb } from "@/db";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("Authorized Dealers & Service Outlets"),
  description: formatPageSeoDescription(
    "Find authorized Koreva9 dealer outlets across India by Koreva Global LLP for power weeders, genuine spare parts, and warranty service."
  ),
  canonicalUrl: "/dealers",
  keywords: ["Koreva Dealer", "Koreva9 Service Center", "Power Weeder Dealer India"],
});

export default async function DealersPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await props.searchParams;

  const db = await getDb();
  const dealersList = await db.query.dealers.findMany();

  // Default center is Uttarakhand
  const defaultCenter = { lat: 30.0668, lng: 79.0193 };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbfb] text-dark-900 font-jost">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col">
        <ScrollReveal animation="slide-bottom">
          <div className="flex flex-col gap-2 mb-8 border-b border-light-300 pb-4">
            <span className="text-brand-red font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Store className="w-4 h-4" /> Authorized Sales & Service Centers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight uppercase">
              Find Your Local KOREVA Dealer
            </h1>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade" delay={200}>
          <DealerListView initialDealers={dealersList} defaultCenter={defaultCenter} />
        </ScrollReveal>
      </main>

      {/* Benefits Section */}
      <div className="py-16 px-4 md:px-8 border-t border-light-300 bg-[#fbfbfb]">
        <ScrollReveal
          animation="slide-bottom"
          className="max-w-5xl mx-auto glass-panel border border-light-300/80 rounded-3xl p-8 sm:p-12 shadow-xs"
        >
          <div className="text-center mb-10">
            <span className="text-brand-red font-extrabold text-xs uppercase tracking-widest block mb-1">
              Pan-India Support
            </span>
            <h2 className="font-jost text-2xl md:text-3xl font-extrabold text-dark-900 uppercase tracking-wide">
              Benefits of a KOREVA Authorized Dealer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Professional machinery consultation",
              "Original spare parts & EP-90 lubricants",
              "Expert field technician after-sales service",
              "100% genuine warranty registration",
              "Complete pre-delivery inspection & handover",
              "Demonstration machines to try before buying",
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-light-300 flex items-center gap-3 shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="font-jost text-xs sm:text-sm font-bold text-dark-900 leading-snug">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
