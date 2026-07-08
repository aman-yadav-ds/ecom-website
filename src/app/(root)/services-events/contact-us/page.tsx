import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Page Header */}
      <div className="mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 uppercase tracking-wide">
          Contact Us
        </h1>
        <div className="w-16 h-1 bg-brand-red mt-4"></div>
      </div>

      <div className="space-y-20 md:space-y-32">
        {/* Section 1: Address & Email */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] w-full rounded overflow-hidden shadow-lg">
              <Image
                src="/contact_address.webp"
                alt="Typing on a laptop"
                fill
                className="object-cover"
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-dark-900 uppercase tracking-wide">
              Address & Email ID
            </h2>
            <div className="space-y-4 text-dark-700 text-lg leading-relaxed pt-2">
              <p className="text-dark-900 uppercase font-medium">KOREVA GLOBAL LLP</p>
              <p>
                NH 9, KICHHA RUDRAPUR ROAD, NEARBY YES BANK, KICHHA<br />
                Vill - KISHANPUR, UDHAM SINGH NAGAR, Uttarakhand, 263148
              </p>
              <p className="pt-2">
                <span className="font-bold text-dark-900">Email:</span>{' '}
                <a href="mailto:info@koreva.in" className="font-bold text-dark-900 underline decoration-2 decoration-brand-red underline-offset-4 hover:text-brand-red transition-colors">
                  info@koreva.com
                </a>
              </p>
            </div>
          </div>
        </div>


        {/* Section 3: Call Us */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] w-full rounded overflow-hidden shadow-lg">
              <Image
                src="/contact_support.webp"
                alt="Customer service representative"
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-dark-900 uppercase tracking-wide">
              Call Us
            </h2>
            <div className="space-y-4 text-dark-700 text-lg leading-relaxed pt-2">
              <p>Our customer service will be happy to answer any questions you may have.</p>
              <p>
                Reach Us at{' '}
                <span className="font-bold text-dark-900">+91 7455 973 188</span>{' '}
                , Monday to Saturday between 10 AM to 6 PM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
