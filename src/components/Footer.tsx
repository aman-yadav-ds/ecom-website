import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-900 text-light-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Logo Section */}
          <div className="md:col-span-3 mb-8 md:mb-0">
            <Link href="/" className="inline-block">
              <Image
                src="/trademark.webp"
                alt="KOREVA GLOBAL"
                height={24}
                width={300}
                className="object-contain invert mix-blend-screen"
                style={{ height: "auto", width: "auto" }}
              />
            </Link>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-body font-medium mb-6 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/catalogue-download" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Catalogue download
                  </Link>
                </li>
                <li>
                  <Link href="/integrity-line" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    KOREVA Integrity Line
                  </Link>
                </li>
                <li>
                  <Link href="/csr" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    CSR
                  </Link>
                </li>
                <li>
                  <Link href="/e-waste" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    E-Waste
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-body font-medium mb-6 uppercase tracking-wider">
                KOREVA FAQ
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/faq/assortment" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Questions on the assortment
                  </Link>
                </li>
                <li>
                  <Link href="/faq/self-propelled-machinery" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Self-propelled machinery
                  </Link>
                </li>
                <li>
                  <Link href="/faq/owner-manuals" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Owner manuals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-body font-medium mb-6 uppercase tracking-wider">
                Service
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-dark-500" />
                  <Link href="/services-events/contact-us" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Contact us
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-dark-500" />
                  <Link href="/dealer-search" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Dealer search
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-dark-500" />
                  <Link href="/newsletter" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    KOREVA Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="md:col-span-3 flex md:justify-end gap-4 mt-8 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center hover:bg-light-100 group transition-colors"
              aria-label="X (Twitter)"
            >
              <Image
                src="/x.svg"
                alt="X"
                width={18}
                height={16}
                className="filter invert brightness-0 group-hover:invert-0 transition-all"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center hover:bg-light-100 group transition-colors"
              aria-label="Facebook"
            >
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={18}
                height={18}
                className="filter invert brightness-0 group-hover:invert-0 transition-all"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center hover:bg-light-100 group transition-colors"
              aria-label="Instagram"
            >
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={18}
                height={18}
                className="filter invert brightness-0 group-hover:invert-0 transition-all"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-footnote text-dark-500">
            <div className="flex items-center gap-2 text-light-100">
              <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.84534 0C2.61747 0 0 2.5401 0 5.67389C0 9.87325 5.25368 14.7397 5.48554 14.949C5.68884 15.1337 5.9996 15.1333 6.20239 14.949C6.43425 14.7397 11.6907 9.87325 11.6907 5.67389C11.6879 2.5401 9.07043 0 5.84534 0ZM5.84534 8.52841C4.22557 8.52841 2.90906 7.25052 2.90906 5.67807C2.90906 4.10562 4.22557 2.82774 5.84534 2.82774C7.46511 2.82774 8.78161 4.10562 8.78161 5.67807C8.78161 7.25052 7.46511 8.52841 5.84534 8.52841Z" fill="currentColor" />
              </svg>
              <span>India</span>
            </div>
            <span>© 2026 KOREVA GLOBAL LLP. All Rights Reserved</span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-footnote text-dark-500">
            <Link href="/privacy-policy" className="hover:text-light-100 transition-colors">
              Privacy policy
            </Link>
            <Link href="/legal-notice" className="hover:text-light-100 transition-colors">
              Legal notice
            </Link>
            <Link href="/cookies" className="hover:text-light-100 transition-colors">
              Cookies
            </Link>
          </div>

          <div className="text-footnote text-dark-500 text-center md:text-right max-w-xs ml-auto">
            KOREVA GLOBAL LLP, NH9 KICHHA RUDRAPUR ROAD, KISHANPUR, U.S.NAGAR, UTTARAKHAND, INDIA - 263148
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
