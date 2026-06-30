"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  const navLinks = [
    { name: "Power Weeders", href: "/category/power-weeders" },
    { name: "Rotavators", href: "/category/rotavators" },
    { name: "Brush Cutters", href: "/category/brush-cutters" },
    { name: "All Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-light-100 border-b border-light-300 text-dark-900"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/trademark.webp"
                alt="KOREVA GLOBAL"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-body font-medium hover:text-dark-700 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              aria-label="Search"
              className="text-body font-medium hover:text-dark-700 transition-colors"
            >
              Search
            </button>
            <Link
              href="/cart"
              className="text-body font-medium hover:text-dark-700 transition-colors"
            >
              My Cart ({totalItems})
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-900 hover:text-dark-700 hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-900"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-light-100 border-t border-light-300`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-body font-medium hover:bg-light-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-light-300 my-2 pt-2">
            <button
              className="block w-full text-left px-3 py-2 rounded-md text-body font-medium hover:bg-light-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Search
            </button>
            <Link
              href="/cart"
              className="block px-3 py-2 rounded-md text-body font-medium hover:bg-light-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Cart ({totalItems})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
