"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Search, Plus, X, ArrowRight } from "lucide-react";

type NavItem = {
  title: string;
  hasDropdown: boolean;
};

const navItems: NavItem[] = [
  { title: "Products", hasDropdown: true },
  { title: "Advice and projects", hasDropdown: true },
  { title: "Service and events", hasDropdown: true },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (link) {
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Search Overlay - Animated */}
      <div
        className={`fixed inset-0 z-[100] flex items-start pt-[15vh] justify-center bg-black/70 backdrop-blur-md transition-all duration-400 ease-out ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <div className={`relative w-full max-w-4xl mx-4 transform transition-all duration-400 ease-out delay-75 ${isSearchOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-8"
          }`}>
          <div className="bg-light-100 shadow-2xl overflow-hidden border-2 border-brand-red rounded-xl">
            <div className="flex items-center p-3 bg-white">
              <Search className="w-6 h-6 text-brand-red ml-4" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products, implements, or models..."
                className="w-full px-4 py-4 text-lg md:text-xl text-dark-900 bg-transparent outline-none placeholder-dark-500 font-medium"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-3 bg-brand-black text-light-100 hover:bg-brand-red transition-colors rounded-lg mr-1 group"
                aria-label="Close search"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Quick Links Section */}
            <div className="p-5 md:p-6 bg-light-200/50 border-t border-light-300 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm md:text-base text-dark-700">
              <span className="font-bold text-dark-900 tracking-wide text-xs uppercase">Popular Searches</span>
              <button className="hover:text-brand-red transition-colors bg-light-100 px-3 py-1.5 rounded-full border border-light-300 shadow-sm hover:border-brand-red">Power Weeders</button>
              <button className="hover:text-brand-red transition-colors bg-light-100 px-3 py-1.5 rounded-full border border-light-300 shadow-sm hover:border-brand-red">Brush Cutters</button>
              <button className="hover:text-brand-red transition-colors bg-light-100 px-3 py-1.5 rounded-full border border-light-300 shadow-sm hover:border-brand-red">Rotavators</button>
              <button className="hover:text-brand-red transition-colors bg-light-100 px-3 py-1.5 rounded-full border border-light-300 shadow-sm hover:border-brand-red">Earth Augers</button>
            </div>
          </div>
        </div>
      </div>

      <header className="w-full sticky top-0 z-50 flex flex-col" onClick={handleLinkClick}>
        {/* Top Red Strip */}
        <div className="w-full bg-brand-red text-light-100 py-2 text-center text-sm font-bold uppercase tracking-wider">
          Contact Us: +91 7455 973 188.
        </div>

        {/* Second row (Find Dealer, Mail, Product Search) */}
        <div className="w-full bg-light-200 border-b border-light-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-2 text-sm text-dark-900 font-medium">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-brand-red transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Find a Dealer</span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/services-events/contact-us" className="flex items-center cursor-pointer hover:text-brand-red transition-colors">
                <Mail className="w-4 h-4" />
              </Link>
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-brand-red transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4" />
                <span>Product search</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="w-full bg-light-100 border-b border-light-300 shadow-sm relative" ref={dropdownRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative bg-light-100 z-50">
            <div className="flex justify-between items-center h-[80px]">
              {/* Left: Logo Area */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/trademark.webp"
                    alt="KOREVA"
                    width={80}
                    height={20}
                    className="object-contain"
                    style={{ height: "auto", width: "auto" }}
                    priority
                  />
                </Link>
              </div>

              {/* Center: Desktop Navigation */}
              <nav className="hidden md:flex items-stretch h-full">
                {navItems.map((item, index) => (
                  <div key={item.title} className={`flex items-stretch border-light-300 ${index === 0 ? 'border-x' : 'border-r'}`}>
                    <button
                      className={`flex items-center justify-between px-6 text-[16px] font-bold hover:bg-light-200 transition-colors text-dark-900 ${activeDropdown === item.title ? "bg-light-200" : ""
                        }`}
                      onClick={() => toggleDropdown(item.title)}
                    >
                      <span>{item.title}</span>
                      {item.hasDropdown && (
                        <span className="ml-3 relative w-4 h-4 overflow-hidden">
                          {/* Animated Plus / Cross Icons */}
                          <Plus
                            className={`absolute inset-0 w-4 h-4 text-dark-900 transition-all duration-300 ${activeDropdown === item.title ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                              }`}
                          />
                          <X
                            className={`absolute inset-0 w-4 h-4 text-dark-900 transition-all duration-300 ${activeDropdown === item.title ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                              }`}
                          />
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </nav>

              {/* Right: Join Us */}
              <div className="hidden md:flex flex-shrink-0 items-center">
                <Link
                  href="/join"
                  className="group inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-black text-light-100 font-medium transition-all duration-300 hover:bg-brand-red hover:shadow-lg focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    Join Us
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  className="p-2 rounded-md text-dark-900 hover:bg-light-200 focus:outline-none relative w-10 h-10 overflow-hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Plus className={`absolute inset-0 m-auto w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                    }`} />
                  <X className={`absolute inset-0 m-auto w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                    }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Mega Menu Dropdowns Container */}
          <div className="hidden md:block">
            {/* Products Dropdown - Animated */}
            <div
              className={`absolute top-full left-0 w-full bg-light-100 border-b border-light-300 shadow-xl py-10 px-4 sm:px-6 lg:px-8 z-40 transform origin-top transition-all duration-300 ease-in-out ${activeDropdown === "Products"
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-4 invisible pointer-events-none"
                }`}
            >
              <div className="max-w-7xl mx-auto relative">
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="absolute -top-10 right-0 p-3 bg-brand-black text-light-100 hover:bg-brand-red transition-colors shadow-sm group"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-2">
                  {/* Column 1 */}
                  <div className="space-y-6">
                    <div>
                      <Link href="#" className="text-[16px] font-bold text-dark-900 hover:text-brand-red flex items-center transition-colors">
                        All battery products <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                      <div className="mt-3 space-y-2 text-sm text-dark-700">
                        <Link href="#" className="block hover:text-brand-red transition-colors">Battery technology</Link>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-dark-900">Sawing and cutting</h3>
                      <div className="mt-3 space-y-2 text-sm text-dark-700">
                        <Link href="#" className="block hover:text-brand-red transition-colors">Chainsaws</Link>
                        <Link href="#" className="block hover:text-brand-red transition-colors">Hedge trimmers and long-reach hedge trimmers</Link>
                        <Link href="#" className="block hover:text-brand-red transition-colors">Pole pruner</Link>
                        <Link href="#" className="block hover:text-brand-red transition-colors">KombiSystem and MultiSystem</Link>
                        <Link href="#" className="block hover:text-brand-red transition-colors leading-snug">Garden pruners, secateurs, loppers, shears & pruning saws</Link>
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h3 className="text-[16px] font-bold text-dark-900">Mowing and planting</h3>
                    <div className="mt-3 space-y-2 text-sm text-dark-700">
                      <Link href="#" className="block hover:text-brand-red transition-colors leading-snug">Grass trimmers, brushcutters and clearing saws</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Lawn mowers</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Mulching lawn mowers</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Tillers</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Earth augers</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Mistblowers and sprayers</Link>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h3 className="text-[16px] font-bold text-dark-900">Cleaning and tidying</h3>
                    <div className="mt-3 space-y-2 text-sm text-dark-700">
                      <Link href="#" className="block hover:text-brand-red transition-colors">Pressure Washer</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Wet and dry vacuum cleaners</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Sweeping machines and sweepers</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Blowers and vacuum shredders</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">Water pumps</Link>
                    </div>
                  </div>

                  {/* Column 4 */}
                  <div>
                    <Link href="#" className="text-[16px] font-bold text-dark-900 hover:text-brand-red flex items-center transition-colors">
                      Promotions and new arrivals <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                    <div className="mt-3 space-y-2 text-sm text-dark-700">
                      <Link href="#" className="block hover:text-brand-red transition-colors">Current bestsellers</Link>
                      <Link href="#" className="block hover:text-brand-red transition-colors">New products</Link>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-light-300 pt-6">
                  <Link href="#" className="text-[16px] font-bold text-dark-900 hover:text-brand-red flex items-center transition-colors">
                    All products <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Advice and Projects Dropdown - Animated */}
            <div
              className={`absolute top-full left-0 w-full bg-light-100 border-b border-light-300 shadow-xl py-10 px-4 sm:px-6 lg:px-8 z-40 transform origin-top transition-all duration-300 ease-in-out ${activeDropdown === "Advice and projects"
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-4 invisible pointer-events-none"
                }`}
            >
              <div className="max-w-7xl mx-auto relative flex flex-col items-center justify-center min-h-[200px] text-dark-700">
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="absolute -top-10 right-0 p-3 bg-brand-black text-light-100 hover:bg-brand-red transition-colors shadow-sm group"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
                <h2 className="text-2xl font-bold mb-4">Advice and projects</h2>
                <p className="text-lg">Detailed navigation for Advice and projects goes here.</p>
              </div>
            </div>

            {/* Service and Events Dropdown - Animated */}
            <div
              className={`absolute top-full left-0 w-full bg-light-100 border-b border-light-300 shadow-xl py-10 px-4 sm:px-6 lg:px-8 z-40 transform origin-top transition-all duration-300 ease-in-out ${activeDropdown === "Service and events"
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-4 invisible pointer-events-none"
                }`}
            >
              <div className="max-w-7xl mx-auto relative flex flex-col items-start min-h-[200px] text-dark-700">
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="absolute -top-10 right-0 p-3 bg-brand-black text-light-100 hover:bg-brand-red transition-colors shadow-sm group"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full pt-2">
                  <div>
                    <h3 className="text-[16px] font-bold text-dark-900">FAQs and Help</h3>
                    <div className="mt-3 space-y-2 text-sm text-dark-700">
                      <Link href="/services-events/contact-us" className="block hover:text-brand-red transition-colors">
                        Contact KOREVA
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute w-full bg-light-100 border-b border-light-300 transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
          }`}>
          <div className="px-4 py-4 space-y-2 shadow-xl bg-light-100">
            {navItems.map((item) => (
              <div key={item.title} className="border-b border-light-300 last:border-0 pb-2">
                <button
                  className="flex w-full items-center justify-between text-[16px] text-dark-900 font-bold py-3 focus:outline-none"
                  onClick={() => toggleDropdown(item.title)}
                >
                  <span>{item.title}</span>
                  {item.hasDropdown && (
                    <span className="p-1 relative w-6 h-6">
                      <Plus className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${activeDropdown === item.title ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                        }`} />
                      <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${activeDropdown === item.title ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                        }`} />
                    </span>
                  )}
                </button>

                {/* Mobile Animated Dropdown Content */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.title ? "max-h-[500px] opacity-100 mb-2 mt-1" : "max-h-0 opacity-0 mb-0 mt-0"
                  }`}>
                  <div className="pl-4 py-2 text-sm text-dark-700 space-y-3 border-l-2 border-brand-red bg-light-200/50 rounded-r-md">
                    {item.title === "Products" ? (
                      <div className="space-y-4 py-2 pr-2">
                        <div className="font-bold text-dark-900">Sawing and cutting</div>
                        <div className="pl-2 space-y-2">
                          <div className="cursor-pointer hover:text-brand-red">Chainsaws</div>
                          <div className="cursor-pointer hover:text-brand-red">Pole pruner</div>
                        </div>
                        <div className="font-bold text-dark-900 pt-2">Mowing and planting</div>
                        <div className="pl-2 space-y-2">
                          <div className="cursor-pointer hover:text-brand-red">Lawn mowers</div>
                          <div className="cursor-pointer hover:text-brand-red">Tillers</div>
                        </div>
                      </div>
                    ) : (
                      <p className="py-2 pr-2">Mega menu contents for {item.title}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-6 pb-4">
              <Link
                href="/join"
                className="group flex w-full items-center justify-center px-6 py-3.5 rounded-full bg-brand-black text-light-100 font-medium hover:bg-brand-red transition-colors shadow-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Us
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
