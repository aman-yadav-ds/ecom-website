import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { importersList } from '@/lib/importer-list';

export default function ImportersListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 uppercase tracking-wide">
          LIST OF IMPORTERS OF KOREVA INDIA
        </h1>
        <div className="w-12 h-1 bg-brand-red mt-4 mb-6"></div>
        <p className="text-dark-700 text-lg leading-relaxed max-w-4xl">
          KOREVA products are distributed globally through a network of authorized importers and dealers. These importers are carefully selected and trained to ensure they meet KOREVA's high standards for product knowledge, service as well as support.
        </p>
      </div>

      {/* Importers List */}
      <div className="space-y-12 md:space-y-16">
        {importersList.map((importer) => (
          <div key={importer.id} className="border-b border-light-300 pb-10 last:border-b-0">
            <h2 className="text-xl md:text-2xl font-bold text-dark-900 uppercase tracking-wide mb-6">
              {importer.name}
            </h2>
            <div className="space-y-2 text-dark-700 mb-8 pl-4 border-l-2 border-brand-red/20">
              <p>
                <span className="font-bold text-dark-900 mr-2">Address :</span>
                {importer.address}
              </p>
              <p>
                <span className="font-bold text-dark-900 mr-2">Contact Person :</span>
                {importer.contactPerson}
              </p>
              <p>
                <span className="font-bold text-dark-900 mr-2">Contact No :</span>
                {importer.contactNo}
              </p>
              <p>
                <span className="font-bold text-dark-900 mr-2">Email-ID :</span>
                <a href={`mailto:${importer.email}`} className="underline decoration-1 underline-offset-4 hover:text-brand-red transition-colors">
                  {importer.email}
                </a>
              </p>
            </div>
            <a 
              href={importer.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-black hover:bg-brand-red text-light-100 font-bold py-3 px-6 text-sm uppercase tracking-wider transition-colors shadow-sm hover:shadow-md"
            >
              Click here to check Location
            </a>
          </div>
        ))}
      </div>

      {/* Footer Contact Section */}
      <div className="mt-20 pt-16 border-t border-light-300">
        <h2 className="text-2xl font-bold text-dark-900 uppercase tracking-wide mb-10 text-center md:text-left">
          FOR MORE INFORMATION CONTACT US WITH
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl">
          {/* Customer Service Card */}
          <div className="group block">
            <div className="relative aspect-[4/3] w-full mb-4 rounded overflow-hidden shadow-md">
              <Image
                src="/contact_support.webp" 
                alt="Customer service"
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <Link href="/services-events/contact-us" className="inline-flex items-center text-dark-900 font-bold text-sm uppercase hover:text-brand-red transition-colors">
              Customer service <span className="ml-2 text-brand-red">{'>'}</span>
            </Link>
          </div>

          {/* FAQ Card */}
          <div className="group block">
            <div className="relative aspect-[4/3] w-full mb-4 rounded overflow-hidden shadow-md">
              <Image
                src="/contact_address.webp" 
                alt="FAQ"
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <Link href="/faq" className="inline-flex items-center text-dark-900 font-bold text-sm uppercase hover:text-brand-red transition-colors">
              FAQ <span className="ml-2 text-brand-red">{'>'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
