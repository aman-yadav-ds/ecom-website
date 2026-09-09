import React from "react";
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="relative bg-[#fcfcfc] text-dark-900 pt-16 font-jost border-t border-light-300 overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-12">
          
          {/* Column 1: Brand Logo, Description, Address, Socials */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" prefetch={false} className="inline-block mb-3">
                <Image
                  src="/trademark.webp"
                  alt="Koreva Agriculture & Farm Machines - Koreva Global LLP (Koreva9)"
                  height={28}
                  width={130}
                  style={{ width: "auto" }}
                  className="h-7 w-auto object-contain"
                />
              </Link>
              <p className="text-xs text-dark-600 leading-relaxed max-w-sm font-medium mb-3">
                Koreva Global LLP (Koreva Agriculture) &amp; Koreva Machines (Koreva9) is a premier Indian manufacturer of heavy-duty farm equipment &amp; ISO certified STOU lubricants for Indian agriculture.
              </p>
              <p className="text-xs text-dark-700 font-bold mb-4">
                Rudrapur, Distt. Udham Singh Nagar, Uttarakhand, INDIA
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.youtube.com/@koreva9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-light-300 flex items-center justify-center text-dark-600 hover:text-white hover:bg-brand-red hover:border-brand-red transition-all shadow-2xs"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61592533542061"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-light-300 flex items-center justify-center text-dark-600 hover:text-white hover:bg-brand-red hover:border-brand-red transition-all shadow-2xs"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/koreva_global/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-light-300 flex items-center justify-center text-dark-600 hover:text-white hover:bg-brand-red hover:border-brand-red transition-all shadow-2xs"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/koreva9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-light-300 flex items-center justify-center text-dark-600 hover:text-white hover:bg-brand-red hover:border-brand-red transition-all shadow-2xs"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Equipment */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-black text-dark-900 uppercase tracking-widest mb-4">
              EQUIPMENT
            </h3>
            <ul className="space-y-2.5 text-xs text-dark-600 font-medium">
              <li>
                <Link href="/products/tractor-attachments" prefetch={false} className="hover:text-brand-red transition-colors">
                  Tractor Attachments
                </Link>
              </li>
              <li>
                <Link href="/products/self-propelled-machinery" prefetch={false} className="hover:text-brand-red transition-colors">
                  Self Propelled
                </Link>
              </li>
              <li>
                <Link href="/products/food-processing-units" prefetch={false} className="hover:text-brand-red transition-colors">
                  Food Processing
                </Link>
              </li>
              <li>
                <Link href="/products/lubricants" prefetch={false} className="hover:text-brand-red transition-colors">
                  STOU Lubricants
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-black text-dark-900 uppercase tracking-widest mb-4">
              SUPPORT
            </h3>
            <ul className="space-y-2.5 text-xs text-dark-600 font-medium">
              <li>
                <Link href="/dealers" prefetch={false} className="hover:text-brand-red transition-colors">
                  Dealer Locator
                </Link>
              </li>
              <li>
                <Link href="/spare-parts" prefetch={false} className="hover:text-brand-red transition-colors">
                  Spare Parts
                </Link>
              </li>
              <li>
                <Link href="/warranty" prefetch={false} className="hover:text-brand-red transition-colors">
                  Warranty Claims
                </Link>
              </li>
              <li>
                <Link href="/guides" prefetch={false} className="hover:text-brand-red transition-colors">
                  Farming Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-black text-dark-900 uppercase tracking-widest mb-4">
              CORPORATE
            </h3>
            <ul className="space-y-2.5 text-xs text-dark-600 font-medium">
              <li>
                <Link href="/about" prefetch={false} className="hover:text-brand-red transition-colors">
                  About KOREVA
                </Link>
              </li>
              <li>
                <Link href="/news" prefetch={false} className="hover:text-brand-red transition-colors">
                  News &amp; Events
                </Link>
              </li>
              <li>
                <Link href="/services-events/contact-us" prefetch={false} className="hover:text-brand-red transition-colors">
                  Career / Corporate
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" prefetch={false} className="hover:text-brand-red transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Brand Watermark & Tagline */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start md:items-end justify-center text-left md:text-right">
            <div className="opacity-20 mb-2 select-none pointer-events-none">
              <Image
                src="/trademark.webp"
                alt="Koreva Watermark"
                width={120}
                height={26}
                className="h-6 w-auto grayscale"
              />
            </div>
            <div className="text-xs font-black uppercase tracking-wider leading-tight text-brand-red">
              <span className="block">Stronger Machines.</span>
              <span className="block">Better Harvests.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slim Black Bottom Strip */}
      <div className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-[11px] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="font-semibold text-neutral-300 tracking-wide">
            © 2026 KOREVA GLOBAL LLP. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6 font-medium text-neutral-400">
            <Link href="/privacy-policy" prefetch={false} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-700">|</span>
            <Link href="/legal-notice" prefetch={false} className="hover:text-white transition-colors">
              Legal Notice
            </Link>
            <span className="text-neutral-700">|</span>
            <Link href="/cookies" prefetch={false} className="hover:text-white transition-colors">
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
