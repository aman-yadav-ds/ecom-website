import React from "react";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, Navigation, ShieldCheck, CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import DealerMapWrapper from "@/components/dealers/DealerMapWrapper";
import { getDb } from "@/db";

export async function generateStaticParams() {
  const db = await getDb();
  const dealersList = await db.query.dealers.findMany();
  return dealersList.map((dealer) => ({
    id: dealer.id,
  }));
}

export default async function DealerDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const db = await getDb();

  const dealer = await db.query.dealers.findFirst({
    where: (d, { eq }) => eq(d.id, params.id),
  });

  if (!dealer) {
    notFound();
  }

  const mapUrl =
    dealer.mapLink ||
    `https://maps.google.com/?q=${dealer.coordinates.lat},${dealer.coordinates.lng}`;

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 font-jost">
      {/* Structural Hero Header */}
      <div className="relative border-b border-light-300 overflow-hidden pt-10 pb-14 px-4 md:px-8 bg-[#fbfbfb]">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-red/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
          <Link
            href="/dealers"
            className="text-dark-600 hover:text-brand-red transition-colors text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5 w-fit"
          >
            <ChevronLeft size={16} />
            <span>Back to Dealer Network</span>
          </Link>

          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="flex items-center gap-3">
              {dealer.isPremiumHub && (
                <span className="shrink-0 inline-flex items-center gap-1.5 bg-brand-red text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  <ShieldCheck size={16} />
                  <span>Elite Authorized Hub</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 tracking-tight leading-tight uppercase">
              {dealer.name}
            </h1>

            <div className="flex items-start gap-3 mt-2 text-dark-700 max-w-2xl font-medium text-sm sm:text-base">
              <MapPin className="shrink-0 mt-0.5 text-brand-red" size={20} />
              <div className="flex flex-col">
                <span>{dealer.addressLine1}</span>
                <span>{dealer.addressLine2}</span>
                <span>{dealer.addressLine3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-10">
        {/* Column 1: Contact & Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          {/* Quick Contact Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dealer.contactNo && (
              <a
                href={`tel:${dealer.contactNo}`}
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl glass-card border border-light-300 shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red group-hover:bg-brand-red group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                  <Phone size={20} />
                </div>
                <div className="text-center">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-dark-500 mb-1">
                    Direct Line
                  </span>
                  <span className="text-base font-extrabold text-dark-900">{dealer.contactNo}</span>
                </div>
              </a>
            )}

            {dealer.email && (
              <a
                href={`mailto:${dealer.email}`}
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl glass-card border border-light-300 shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red group-hover:bg-brand-red group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                  <Mail size={20} />
                </div>
                <div className="text-center">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-dark-500 mb-1">
                    Electronic Mail
                  </span>
                  <span className="text-base font-extrabold text-dark-900 break-all">
                    {dealer.email}
                  </span>
                </div>
              </a>
            )}
          </div>

          <div className="h-[1px] w-full bg-light-300"></div>

          {/* Capabilities Grid */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-lg font-extrabold uppercase tracking-wide mb-5 flex items-center gap-2.5 text-dark-900">
                <span className="w-2.5 h-2.5 bg-brand-red rounded-full"></span>
                <span>Authorized Equipment Assortment</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dealer.assortment.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-light-300 shadow-xs">
                    <CheckCircle2 size={18} className="text-brand-red shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-dark-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-extrabold uppercase tracking-wide mb-5 flex items-center gap-2.5 text-dark-900">
                <span className="w-2.5 h-2.5 bg-brand-red rounded-full"></span>
                <span>On-Site Support Solutions</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {dealer.services.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-light-300 shadow-xs">
                    <CheckCircle2 size={18} className="text-brand-red shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-dark-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Isolated Map */}
        <div className="w-full lg:w-1/2 flex flex-col h-full glass-panel border border-light-300 p-3 rounded-3xl shadow-md">
          <div className="h-[400px] lg:h-[540px] w-full relative z-0 rounded-2xl overflow-hidden border border-light-200">
            <DealerMapWrapper dealers={[dealer]} center={dealer.coordinates} zoom={14} />
          </div>
          <div className="pt-4">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-brand-red hover:bg-brand-red-accent text-white transition-all py-4 rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md active:scale-95"
            >
              <Navigation size={18} />
              <span>Open Route Directions in Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
