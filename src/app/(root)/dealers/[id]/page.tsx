import React from 'react';
import { exampleDealers } from '@/lib/details/dealers';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Mail, Navigation, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import DealerMapWrapper from '@/components/dealers/DealerMapWrapper';

// Next.js 15+ generateStaticParams
export async function generateStaticParams() {
  return exampleDealers.map((dealer) => ({
    id: dealer.id,
  }));
}

export default async function DealerDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const dealer = exampleDealers.find(d => d.id === params.id);

  if (!dealer) {
    notFound();
  }

  const mapUrl = dealer.mapLink || `https://maps.google.com/?q=${dealer.coordinates.lat},${dealer.coordinates.lng}`;

  return (
    <div className="min-h-screen bg-light-100 text-brand-dark">
      {/* Structural Hero Header */}
      <div className="relative border-b border-light-300 overflow-hidden pt-12 pb-16 px-4 md:px-8">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
          <Link href="/dealers" className="text-dark-500 hover:text-brand-dark transition-colors font-jost text-sm uppercase tracking-wider flex items-center gap-2">
            &larr; Back to Network
          </Link>
          
          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="flex items-center gap-3">
              {dealer.isPremiumHub && (
                <span className="shrink-0 inline-flex items-center gap-1 bg-brand-red text-light-100 px-3 py-1 text-sm font-jost font-[500] uppercase tracking-wider border border-brand-red-accent">
                  <ShieldCheck size={16} />
                  Elite Authorized Hub
                </span>
              )}
            </div>
            
            <h1 className="font-jost text-heading-1 text-brand-dark tracking-tight leading-none uppercase">
              {dealer.name}
            </h1>
            
            <div className="flex items-start gap-3 mt-4 text-lead text-dark-700 max-w-2xl">
              <MapPin className="shrink-0 mt-1 text-brand-red" />
              <div className="flex flex-col font-jost">
                <span>{dealer.addressLine1}</span>
                <span>{dealer.addressLine2}</span>
                <span>{dealer.addressLine3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
        {/* Column 1: Contact & Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-12">
          
          {/* Quick Contact Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dealer.contactNo && (
              <a href={`tel:${dealer.contactNo}`} className="group flex flex-col items-center justify-center gap-3 p-6 border border-light-300 bg-light-200 hover:bg-brand-red/10 hover:border-brand-red transition-all">
                <div className="w-12 h-12 rounded-full bg-light-300 group-hover:bg-brand-red flex items-center justify-center transition-colors">
                  <Phone size={20} className="text-brand-dark group-hover:text-light-100 transition-colors" />
                </div>
                <div className="text-center">
                  <span className="block font-jost text-xs uppercase tracking-wider text-dark-500 mb-1">Direct Line</span>
                  <span className="font-jost text-body-medium text-brand-dark">{dealer.contactNo}</span>
                </div>
              </a>
            )}
            
            {dealer.email && (
              <a href={`mailto:${dealer.email}`} className="group flex flex-col items-center justify-center gap-3 p-6 border border-light-300 bg-light-200 hover:bg-brand-red/10 hover:border-brand-red transition-all">
                <div className="w-12 h-12 rounded-full bg-light-300 group-hover:bg-brand-red flex items-center justify-center transition-colors">
                  <Mail size={20} className="text-brand-dark group-hover:text-light-100 transition-colors" />
                </div>
                <div className="text-center">
                  <span className="block font-jost text-xs uppercase tracking-wider text-dark-500 mb-1">Electronic Mail</span>
                  <span className="font-jost text-body-medium text-brand-dark break-all">{dealer.email}</span>
                </div>
              </a>
            )}
          </div>

          <div className="h-[1px] w-full bg-light-300"></div>

          {/* Capabilities Grid */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-jost text-heading-3 uppercase tracking-tight mb-6 flex items-center gap-3 text-brand-dark">
                <span className="w-2 h-2 bg-brand-red"></span>
                Authorized Equipment Assortment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dealer.assortment.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 border border-light-300 bg-light-200">
                    <CheckCircle2 size={18} className="text-brand-red shrink-0" />
                    <span className="font-jost text-body text-brand-dark">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-jost text-heading-3 uppercase tracking-tight mb-6 flex items-center gap-3 text-brand-dark">
                <span className="w-2 h-2 bg-brand-red"></span>
                On-Site Support Solutions
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {dealer.services.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 border border-light-300 bg-light-200">
                    <CheckCircle2 size={18} className="text-brand-red shrink-0" />
                    <span className="font-jost text-body text-brand-dark">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Column 2: Isolated Map */}
        <div className="w-full lg:w-1/2 flex flex-col h-full border border-light-300 p-2 bg-light-200">
          <div className="h-[400px] lg:h-[600px] w-full relative z-0">
            <DealerMapWrapper 
              dealers={[dealer]} 
              center={dealer.coordinates} 
              zoom={14} 
            />
          </div>
          <div className="p-4 mt-2 border border-light-300 bg-light-100">
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-brand-red hover:bg-brand-red-accent text-light-100 transition-colors py-4 font-jost text-body-medium uppercase tracking-wider"
            >
              <Navigation size={18} />
              Open Route in Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
