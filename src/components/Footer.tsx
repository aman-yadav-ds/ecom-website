import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-white/90 backdrop-blur-xl text-dark-900 pt-16 pb-12 overflow-hidden font-jost border-t border-light-300">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Accreditation Strip */}
        <div className="mb-12 p-5 sm:p-6 rounded-2xl glass-panel-elevated border border-brand-red/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase tracking-wider">ISO 9001:2015 Certified Manufacturing</p>
              <p className="text-xs text-dark-700 font-medium">Engineering heavy-duty farm equipment &amp; ISO certified STOU lubricants for Indian agriculture.</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-green-500/10 border border-green-500/20 shrink-0">
            <ShieldCheck className="w-4 h-4 text-green-700 shrink-0" />
            <span className="text-[11px] font-extrabold text-green-800 uppercase tracking-widest">Pan-India Dealer Support</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Logo & Vision Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block py-1">
              <div className="p-2 rounded-xl bg-white border border-light-300 shadow-xs inline-block">
                <Image
                  src="/trademark.webp"
                  alt="Koreva Agriculture & Farm Machines - Koreva Global LLP (Koreva9)"
                  height={24}
                  width={140}
                  className="h-6 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 text-xs text-dark-600 leading-relaxed max-w-sm font-medium">
              Koreva Global LLP (Koreva Agriculture / Koreva Machines / Koreva9) is a premier Indian manufacturer of heavy-duty Power Weeders, Rotavators, Disc Harrows, Reapers, STOU Lubricants, and SK5 Hand Tools. Built tough for Indian fields.
            </p>
          </div>

          {/* Direct Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3.5">Equipment</h3>
              <ul className="space-y-2.5 text-xs text-dark-700 font-medium">
                <li>
                  <Link href="/products/tractor-attachments" className="hover:text-brand-red transition-colors">
                    Tractor Attachments
                  </Link>
                </li>
                <li>
                  <Link href="/products/self-propelled-machinery" className="hover:text-brand-red transition-colors">
                    Self Propelled
                  </Link>
                </li>
                <li>
                  <Link href="/products/food-processing-units" className="hover:text-brand-red transition-colors">
                    Food Processing
                  </Link>
                </li>
                <li>
                  <Link href="/products/lubricants" className="hover:text-brand-red transition-colors">
                    STOU Lubricants
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3.5">Support</h3>
              <ul className="space-y-2.5 text-xs text-dark-700 font-medium">
                <li>
                  <Link href="/dealers" className="hover:text-brand-red transition-colors">
                    Dealer Locator
                  </Link>
                </li>
                <li>
                  <Link href="/spare-parts" className="hover:text-brand-red transition-colors">
                    Spare Parts
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:text-brand-red transition-colors">
                    Warranty Claims
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-brand-red transition-colors">
                    Farming Guides
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3.5">Corporate</h3>
              <ul className="space-y-2.5 text-xs text-dark-700 font-medium">
                <li>
                  <Link href="/about" className="hover:text-brand-red transition-colors">
                    About KOREVA
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-brand-red transition-colors">
                    News &amp; Events
                  </Link>
                </li>
                <li>
                  <Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors">
                    Contact Corporate
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-brand-red transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links & Location */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col items-start lg:items-end justify-between gap-4">
            <div className="flex gap-3">
              <a
                href="https://x.com/koreva9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-200 border border-light-300 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
                aria-label="X (Twitter)"
              >
              <Image
                src="/x.svg"
                alt="X (Twitter) - Koreva Global LLP"
                width={16}
                height={16}
                className="w-4 h-4 filter group-hover:invert transition-all"
              />
            </a>
              <a
                href="https://www.facebook.com/profile.php?id=61592533542061"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-200 border border-light-300 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
                aria-label="Facebook"
              >
              <Image
                src="/facebook.svg"
                alt="Facebook - Koreva Global LLP"
                width={16}
                height={16}
                className="w-4 h-4 filter group-hover:invert transition-all"
              />
            </a>
              <a
                href="https://www.instagram.com/koreva_global/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-200 border border-light-300 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
                aria-label="Instagram"
              >
              <Image
                src="/instagram.svg"
                alt="Instagram - Koreva Global LLP"
                width={16}
                height={16}
                className="w-4 h-4 filter group-hover:invert transition-all"
              />
            </a>
            </div>

            <div className="text-dark-600 text-left lg:text-right max-w-xs text-[11px] leading-relaxed font-medium">
              KOREVA GLOBAL LLP, NH9 KICHHA RUDRAPUR ROAD, KISHANPUR, U.S.NAGAR, UTTARAKHAND, INDIA - 263148
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-dark-700 font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-dark-900 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              <span>India</span>
            </div>
            <span>© 2026 KOREVA GLOBAL LLP. All Rights Reserved</span>
          </div>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-brand-red transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal-notice" className="hover:text-brand-red transition-colors">
              Legal Notice
            </Link>
            <Link href="/cookies" className="hover:text-brand-red transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
