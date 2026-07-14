"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Search, Plus, X, ArrowRight } from "lucide-react";
import SearchComponent from "./Search";
import { useModalStore } from "@/store/useModalStore";

type NavItem = {
  title: string;
  hasDropdown: boolean;
};

const navItems: NavItem[] = [
  { title: "Products", hasDropdown: true },
  { title: "Advice and projects", hasDropdown: true },
  { title: "Service and events", hasDropdown: true },
];

const ContactStrip = () => (
  <div className="w-full bg-brand-red text-light-100 py-2 text-center text-sm font-bold uppercase tracking-wider">
    Contact Us: +91 7455 973 188.
  </div>
);

const UtilityStrip = ({ onSearchClick }: { onSearchClick: () => void }) => (
  <div className="w-full bg-light-200 border-b border-light-300 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-2 text-sm text-dark-900 font-medium">
      <Link href="/dealers" className="flex items-center space-x-2 cursor-pointer hover:text-brand-red transition-colors">
        <MapPin className="w-4 h-4" />
        <span>Find a Dealer</span>
      </Link>
      <div className="flex items-center space-x-8">
        <Link href="/services-events/contact-us" className="flex items-center cursor-pointer hover:text-brand-red transition-colors">
          <Mail className="w-4 h-4" />
        </Link>
        <div
          className="flex items-center space-x-2 cursor-pointer hover:text-brand-red transition-colors"
          onClick={onSearchClick}
        >
          <Search className="w-4 h-4" />
          <span>Product search</span>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openJoinModal } = useModalStore();

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
      <SearchComponent isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <ContactStrip />
      <UtilityStrip onSearchClick={() => setIsSearchOpen(true)} />

      <header className="w-full flex flex-col relative z-40" onClick={handleLinkClick}>
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
                <button
                  onClick={openJoinModal}
                  className="group inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-black text-light-100 font-medium transition-all duration-300 hover:bg-brand-red hover:shadow-lg focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    Join Us
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10 pt-2 pb-8 border-b border-light-300">
                  {/* Column 1 */}
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Tractor Attachments</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700">
                      <li><Link href="/products?category=Tractor+Attachments" className="hover:text-brand-red transition-colors font-medium">All Tractor Attachments &gt;</Link></li>
                      <li><Link href="/products?search=Harrow" className="hover:text-brand-red transition-colors">Harrow</Link></li>
                      <li><Link href="/products?search=Rotavator" className="hover:text-brand-red transition-colors">Rotavator</Link></li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Self Propelled Machinery</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700">
                      <li><Link href="/products?category=Self+Propelled+Machinery" className="hover:text-brand-red transition-colors font-medium">All Self Propelled Machinery &gt;</Link></li>
                      <li><Link href="/products?search=Power+Weeder" className="hover:text-brand-red transition-colors">Power Weeder</Link></li>
                      <li><Link href="/products?search=Power+Reaper" className="hover:text-brand-red transition-colors">Power Reaper</Link></li>
                      <li><Link href="/products?search=Brush+Cutter" className="hover:text-brand-red transition-colors">Brush Cutter</Link></li>
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Food Processing Units</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700 mb-8">
                      <li><Link href="/products?category=Food+Processing+Units" className="hover:text-brand-red transition-colors font-medium">All Food Processing Units &gt;</Link></li>
                      <li><Link href="/products?search=Pulveriser" className="hover:text-brand-red transition-colors">Pulveriser</Link></li>
                      <li><Link href="/products?search=MINI+Rice+Mill" className="hover:text-brand-red transition-colors">MINI Rice Mill</Link></li>
                    </ul>

                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Lubricants</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700">
                      <li><Link href="/products?category=Lubricants" className="hover:text-brand-red transition-colors font-medium">All Lubricants &gt;</Link></li>
                    </ul>
                  </div>

                  {/* Column 4 */}
                  <div>
                    <Link href="/products" className="text-[15px] font-bold text-dark-900 hover:text-brand-red flex items-center mb-4 transition-colors tracking-wide uppercase">
                      Promotions and new arrivals &gt;
                    </Link>
                    <ul className="space-y-3 text-[15px] text-dark-700 mb-8">
                      <li><Link href="/products?sort=featured" className="hover:text-brand-red transition-colors">Current bestsellers</Link></li>
                      <li><Link href="/products?sort=new" className="hover:text-brand-red transition-colors">New products</Link></li>
                    </ul>

                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Hand Tools</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700">
                      <li><Link href="/products?category=Hand+Tools" className="hover:text-brand-red transition-colors font-medium">All Hand Tools &gt;</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <Link href="/products" className="text-[16px] font-bold text-dark-900 hover:text-brand-red flex items-center transition-colors">
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
                  <div>
                    <h3 className="text-[16px] font-bold text-dark-900">Dealer Network</h3>
                    <div className="mt-3 space-y-2 text-sm text-dark-700">
                      <Link href="/dealers" className="block hover:text-brand-red transition-colors">
                        Find a Dealer
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
                      <div className="py-2 pr-2">
                        <Link href="/products" className="font-bold text-dark-900 hover:text-brand-red transition-colors inline-block">
                          All products
                        </Link>
                      </div>
                    ) : item.title === "Service and events" ? (
                      <div className="py-2 pr-2 space-y-2">
                        <Link href="/services-events/contact-us" className="font-bold text-dark-900 hover:text-brand-red transition-colors block">
                          Contact KOREVA
                        </Link>
                        <Link href="/dealers" className="font-bold text-dark-900 hover:text-brand-red transition-colors block">
                          Find a Dealer
                        </Link>
                      </div>
                    ) : (
                      <p className="py-2 pr-2">Mega menu contents for {item.title}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-6 pb-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openJoinModal();
                }}
                className="group flex w-full items-center justify-center px-6 py-3.5 rounded-full bg-brand-black text-light-100 font-medium hover:bg-brand-red transition-colors shadow-md"
              >
                Join Us
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
