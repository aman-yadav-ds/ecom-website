"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-light-100 text-dark-900 border-b border-light-300 shadow-sm" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/trademark.webp"
                alt="KOREVA"
                width={140}
                height={45}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Middle */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-10">
            <Link href="/about" className="relative text-body font-medium group py-2">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-dark-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative py-2"
              ref={dropdownRef}
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                className="flex items-center text-body font-medium group focus:outline-none"
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                aria-expanded={isProductsDropdownOpen}
              >
                Products
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-dark-900 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-light-100 shadow-lg rounded-xl overflow-hidden transition-all duration-300 origin-top transform border border-light-300 ${isProductsDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto visible' : 'opacity-0 scale-95 pointer-events-none invisible'
                  }`}
              >
                <div className="py-2">
                  <Link
                    href="/products/self-propelled-machinery"
                    className="block px-6 py-3 text-body font-medium hover:bg-light-200 hover:text-dark-900 transition-colors"
                    onClick={() => setIsProductsDropdownOpen(false)}
                  >
                    Self Propelled Machinery
                  </Link>
                  <Link
                    href="/products/tractor-driven-equipments"
                    className="block px-6 py-3 text-body font-medium hover:bg-light-200 hover:text-dark-900 transition-colors"
                    onClick={() => setIsProductsDropdownOpen(false)}
                  >
                    Tractor Driven Equipments
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/distributors" className="relative text-body font-medium group py-2">
              Distributors
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-dark-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/contact" className="relative text-body font-medium group py-2">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-dark-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Join Us Button */}
            <Link
              href="/join"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden rounded-full bg-dark-900 text-light-100 font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_15px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-dark-500 focus:ring-offset-2"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative z-10 flex items-center gap-2">
                Join Us
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-900 hover:bg-light-200 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 flex flex-col items-end gap-1.5">
                <span className={`block h-[2px] w-full bg-dark-900 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                <span className={`block h-[2px] bg-dark-900 transition-all duration-300 ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-full'}`}></span>
                <span className={`block h-[2px] w-full bg-dark-900 transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-light-100 border-t border-light-300 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <Link
            href="/about"
            className="block px-4 py-3 rounded-xl text-body font-medium hover:bg-light-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>

          <div className="px-4 py-2 bg-light-200/50 rounded-xl">
            <button
              className="flex w-full items-center justify-between text-body font-medium mb-2 focus:outline-none"
              onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
            >
              <span>Products</span>
              <svg
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`space-y-2 pl-4 border-l-2 border-light-300 overflow-hidden transition-all duration-300 ${isProductsDropdownOpen ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
              <Link
                href="/products/self-propelled-machinery"
                className="block py-2 text-body hover:text-dark-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Self Propelled Machinery
              </Link>
              <Link
                href="/products/tractor-driven-equipments"
                className="block py-2 text-body hover:text-dark-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tractor Driven Equipments
              </Link>
            </div>
          </div>

          <Link
            href="/distributors"
            className="block px-4 py-3 rounded-xl text-body font-medium hover:bg-light-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Distributors
          </Link>

          <Link
            href="/contact"
            className="block px-4 py-3 rounded-xl text-body font-medium hover:bg-light-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>

          <div className="px-4 pt-4">
            <Link
              href="/join"
              className="flex w-full items-center justify-center px-6 py-3.5 rounded-full bg-dark-900 text-light-100 text-body font-medium hover:bg-dark-700 transition-colors shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
