import React from 'react';
import { exampleDealers } from '@/lib/details/dealers';
import DealerListView from '@/components/dealers/DealerListView';
import { Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function DealersPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;

  // Default center is Uttarakhand
  const defaultCenter = { lat: 30.0668, lng: 79.0193 };

  return (
    <div className="flex flex-col min-h-screen bg-light-100">

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col">
        <ScrollReveal animation="slide-bottom">
          <h1 className="font-jost text-heading-2 text-brand-dark tracking-wide uppercase mb-2">
            Find Your Local Koreva Dealer
          </h1>
          <div className="w-16 h-2 bg-brand-dark mb-12"></div>
        </ScrollReveal>

        <ScrollReveal animation="fade" delay={200}>
          <DealerListView initialDealers={exampleDealers} defaultCenter={defaultCenter} />
        </ScrollReveal>
      </main>

      {/* Benefits Section */}
      <div className="bg-light-200 py-16 px-4 md:px-8 mt-12">
        <ScrollReveal animation="slide-bottom" className="max-w-4xl mx-auto">
          <h2 className="text-center font-jost text-heading-3 md:text-[32px] text-brand-dark uppercase tracking-wide mb-12">
            Benefits of a Koreva Authorized Dealer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            {[
              "Professional advice",
              "Original spare parts and accessories",
              "Expert after-sales service",
              "First-class service",
              "Full product handover",
              "Products to try before you buy"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Check size={20} className="text-brand-dark shrink-0" strokeWidth={3} />
                <span className="font-jost text-body text-brand-dark">{benefit}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
