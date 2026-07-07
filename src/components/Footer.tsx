import React from "react";
import Image from "next/image";
import Link from "next/link";

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
                style={{ height: "auto" }}
              />
            </Link>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-body font-medium mb-6 uppercase tracking-wider">
                Products
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/power-weeders" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Power Weeders
                  </Link>
                </li>
                <li>
                  <Link href="/brush-cutters" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Brush Cutters
                  </Link>
                </li>
                <li>
                  <Link href="/rotavators" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Rotavators
                  </Link>
                </li>
                <li>
                  <Link href="/all-products" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    All Products
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-body font-medium mb-6 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/investors" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Investors
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-body font-medium mb-6 uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/help" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/service" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Service Centers
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Warranty Info
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-body font-medium mb-6 uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/guides" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Farming Guides
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Video Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/catalogs" className="text-caption text-dark-500 hover:text-light-100 transition-colors">
                    Product Catalogs
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
            <span>© 2025 KOREVA GLOBAL. All Rights Reserved</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-footnote text-dark-500">
            <Link href="/guides" className="hover:text-light-100 transition-colors">
              Guides
            </Link>
            <Link href="/terms-of-sale" className="hover:text-light-100 transition-colors">
              Terms of Sale
            </Link>
            <Link href="/terms-of-use" className="hover:text-light-100 transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy-policy" className="hover:text-light-100 transition-colors">
              Koreva Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
