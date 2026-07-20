import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrench, CheckCircle, PackageSearch, Truck } from "lucide-react";

export default function SparePartsPage() {
  return (
    <div className="min-h-screen bg-light-100 py-12 md:py-20 px-4 font-jost">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row bg-white border border-light-300 shadow-sm overflow-hidden mb-16">
          <div className="w-full md:w-1/2 relative min-h-[350px]">
            <Image 
              src="//." 
              alt="KOREVA9 Spare Parts Inventory"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
                Nationwide Availability
              </h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-brand-dark text-white">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
              Spare Parts & Service
            </h1>
            <div className="w-20 h-1 bg-brand-red mb-6"></div>
            <p className="text-lg text-light-200 leading-relaxed mb-8">
              At KOREVA9, we understand that in agriculture, downtime is not an option. Because we are a proudly national brand, we maintain a massive, localized inventory of spare parts. You will never have to wait months for international shipping again.
            </p>
            <div className="mt-auto">
              <Link href="/dealers" className="inline-flex items-center px-8 py-4 bg-brand-red text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
                Find Your Local Dealer
              </Link>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 border border-light-300 shadow-sm text-center group hover:border-brand-red transition-colors">
            <div className="w-16 h-16 bg-light-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
              <PackageSearch className="w-8 h-8 text-brand-dark group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-brand-dark uppercase mb-3">Comprehensive Inventory</h3>
            <p className="text-dark-700">
              From rotary tiller tines and engine belts to spark plugs and carburetor replacements, we stock it all locally.
            </p>
          </div>
          
          <div className="bg-white p-8 border border-light-300 shadow-sm text-center group hover:border-brand-red transition-colors">
            <div className="w-16 h-16 bg-light-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
              <Truck className="w-8 h-8 text-brand-dark group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-brand-dark uppercase mb-3">Rapid Fulfillment</h3>
            <p className="text-dark-700">
              Our regional distribution centers ensure that authorized dealers receive emergency spare parts within 48-72 hours.
            </p>
          </div>

          <div className="bg-white p-8 border border-light-300 shadow-sm text-center group hover:border-brand-red transition-colors">
            <div className="w-16 h-16 bg-light-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
              <Wrench className="w-8 h-8 text-brand-dark group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-brand-dark uppercase mb-3">Expert Servicing</h3>
            <p className="text-dark-700">
              All KOREVA9 dealers are extensively trained to provide professional repair and maintenance services for your machinery.
            </p>
          </div>
        </div>

        {/* How to Order */}
        <div className="bg-light-200 p-8 md:p-12 border-l-4 border-brand-red">
          <h2 className="text-2xl font-bold text-brand-dark uppercase mb-6">How to Order Spare Parts</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-dark-700"><strong>Identify the Part:</strong> Check your <Link href="/downloads" className="text-brand-red hover:underline font-bold">Operating Instructions manual</Link> to find the exact part number.</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-dark-700"><strong>Contact Your Dealer:</strong> We fulfill all spare parts exclusively through our authorized dealer network to ensure you receive genuine components.</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-dark-700"><strong>Professional Installation:</strong> If it is a complex internal engine component, we highly recommend having the dealer install it to maintain your <Link href="/warranty" className="text-brand-red hover:underline font-bold">warranty coverage</Link>.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
