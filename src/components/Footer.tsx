import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, MapPin, Mail, ShieldCheck, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-white/90 backdrop-blur-xl text-dark-900 pt-16 pb-12 overflow-hidden font-jost border-t border-light-300">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Accreditation Strip */}
        <div className="mb-12 p-6 rounded-2xl glass-panel border border-light-300 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-dark-900 uppercase tracking-wider">ISO 9001:2015 Certified Manufacturing</h4>
              <p className="text-xs text-dark-500">Engineering heavy-duty farm equipment & ISO certified STOU lubricants for Indian agriculture.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="text-xs font-bold text-dark-700 uppercase tracking-widest">Pan-India Dealer Support</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Logo & Vision Section */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block py-2">
              <div className="p-2 rounded-xl bg-white border border-light-300 shadow-xs inline-block">
                <Image
                  src="/trademark.webp"
                  alt="KOREVA GLOBAL"
                  height={24}
                  width={140}
                  className="object-contain"
                  style={{ height: "auto", width: "auto" }}
                />
              </div>
            </Link>
            <p className="mt-4 text-xs text-dark-600 leading-relaxed max-w-sm font-medium">
              KOREVA GLOBAL LLP is a premier Indian manufacturer of heavy-duty Power Weeders, Rotavators, Disc Harrows, Reapers, STOU Lubricants, and SK5 Hand Tools. Built tough for Indian fields.
            </p>
          </div>

          {/* Quick Links Columns */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-bold mb-4 uppercase tracking-widest text-brand-red">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs text-dark-700 font-medium">
                <li>
                  <Link href="/about" className="hover:text-brand-red transition-colors py-1 block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/dealers" className="hover:text-brand-red transition-colors py-1 block">
                    Dealer Network
                  </Link>
                </li>
                <li>
                </li>
                <li>
                  <Link href="/spare-parts" className="hover:text-white transition-colors py-1 block">
                    Spare Parts
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:text-white transition-colors py-1 block">
                    Warranty Info
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="hover:text-white transition-colors py-1 block">
                    Compare Equipment
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold mb-4 uppercase tracking-widest text-brand-red">
                Contact Service
              </h4>
              <ul className="space-y-3 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <Link href="/services-events/contact-us" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <Link href="/dealers" className="hover:text-white transition-colors">
                    Find Dealer
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <Link href="/services-events/contact-us" className="hover:text-white transition-colors">
                    Support Line
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links & Location */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-4">
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
                aria-label="X (Twitter)"
              >
                <Image
                  src="/x.svg"
                  alt="X"
                  width={16}
                  height={16}
                  className="filter invert brightness-0 group-hover:brightness-200 transition-all"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
                aria-label="Facebook"
              >
                <Image
                  src="/facebook.svg"
                  alt="Facebook"
                  width={16}
                  height={16}
                  className="filter invert brightness-0 group-hover:brightness-200 transition-all"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
                aria-label="Instagram"
              >
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={16}
                  height={16}
                  className="filter invert brightness-0 group-hover:brightness-200 transition-all"
                />
              </a>
            </div>

            <div className="text-gray-400 text-left md:text-right max-w-xs text-[11px] leading-relaxed">
              KOREVA GLOBAL LLP, NH9 KICHHA RUDRAPUR ROAD, KISHANPUR, U.S.NAGAR, UTTARAKHAND, INDIA - 263148
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              <span>India</span>
            </div>
            <span>© 2026 KOREVA GLOBAL LLP. All Rights Reserved</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal-notice" className="hover:text-white transition-colors">
              Legal Notice
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

