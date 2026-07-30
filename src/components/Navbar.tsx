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
  href?: string;
};

const navItems: NavItem[] = [
  { title: "Products", hasDropdown: true },
  { title: "Resources", hasDropdown: true },
  { title: "Service & Support", hasDropdown: true },
  { title: "Company", hasDropdown: true },
];

const ContactStrip = () => (
  <div className="w-full bg-brand-red text-light-100 py-2 text-center text-sm font-bold uppercase tracking-wider">
    Contact Us: +91 7455 973 188.
  </div>
);

const UtilityStrip = ({ onSearchClick }: { onSearchClick: () => void }) => (
  <div className="w-full bg-light-200 border-b border-light-300 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-dark-900 font-medium">
      <Link href="/dealers" className="flex items-center space-x-2 cursor-pointer hover:text-brand-red transition-colors min-h-[44px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red">
        <MapPin className="w-4 h-4 text-brand-red" />
        <span>Find a Dealer</span>
      </Link>
      <div className="flex items-center space-x-4 sm:space-x-8">
        <Link href="/services-events/contact-us" aria-label="Contact Us" className="flex items-center cursor-pointer hover:text-brand-red transition-colors min-h-[44px] min-w-[44px] justify-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red">
          <Mail className="w-4 h-4" />
        </Link>
        <button
          type="button"
          className="flex items-center space-x-2 cursor-pointer hover:text-brand-red transition-colors min-h-[44px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red bg-transparent border-0"
          onClick={onSearchClick}
        >
          <Search className="w-4 h-4" />
          <span>Product search</span>
        </button>
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
                    {item.hasDropdown ? (
                      <button
                        className={`flex items-center justify-between px-6 text-[16px] font-bold hover:bg-light-200 transition-colors text-dark-900 ${activeDropdown === item.title ? "bg-light-200" : ""}`}
                        onClick={() => toggleDropdown(item.title)}
                      >
                        <span>{item.title}</span>
                        <span className="ml-3 relative w-4 h-4 overflow-hidden">
                          {/* Animated Plus / Cross Icons */}
                          <Plus
                            className={`absolute inset-0 w-4 h-4 text-dark-900 transition-all duration-300 ${activeDropdown === item.title ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
                          />
                          <X
                            className={`absolute inset-0 w-4 h-4 text-dark-900 transition-all duration-300 ${activeDropdown === item.title ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
                          />
                        </span>
                      </button>
                    ) : (
                      <Link 
                        href={item.href || "/"}
                        className="flex items-center justify-between px-6 text-[16px] font-bold hover:bg-light-200 transition-colors text-dark-900"
                      >
                        <span>{item.title}</span>
                      </Link>
                    )}
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
                  aria-label="Toggle mobile navigation menu"
                  className="p-2 rounded-md text-dark-900 hover:bg-light-200 focus:outline-none relative w-11 h-11 min-w-[44px] min-h-[44px] overflow-hidden flex items-center justify-center"
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
                      <li><Link href="/products/tractor-attachments" className="hover:text-brand-red transition-colors font-bold text-brand-red flex items-center">All Tractor Attachments &gt;</Link></li>
                      <li><Link href="/products/tractor-attachments?search=Harrow" className="hover:text-brand-red transition-colors">Harrow</Link></li>
                      <li><Link href="/products/tractor-attachments?search=Rotavator" className="hover:text-brand-red transition-colors">Rotavator</Link></li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Self Propelled Machinery</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700">
                      <li><Link href="/products/self-propelled-machinery" className="hover:text-brand-red transition-colors font-bold text-brand-red flex items-center">All Self Propelled &gt;</Link></li>
                      <li><Link href="/products/self-propelled-machinery?search=Power+Weeder" className="hover:text-brand-red transition-colors">Power Weeder</Link></li>
                      <li><Link href="/products/self-propelled-machinery?search=Power+Reaper" className="hover:text-brand-red transition-colors">Power Reaper</Link></li>
                      <li><Link href="/products/self-propelled-machinery?search=Brush+Cutter" className="hover:text-brand-red transition-colors">Brush Cutter</Link></li>
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Food Processing Units</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700 mb-6">
                      <li><Link href="/products/food-processing-units" className="hover:text-brand-red transition-colors font-bold text-brand-red flex items-center">All Food Processing &gt;</Link></li>
                      <li><Link href="/products/food-processing-units?search=Pulveriser" className="hover:text-brand-red transition-colors">Pulveriser</Link></li>
                      <li><Link href="/products/food-processing-units?search=MINI+Rice+Mill" className="hover:text-brand-red transition-colors">MINI Rice Mill</Link></li>
                    </ul>

                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Lubricants</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700">
                      <li><Link href="/products/lubricants" className="hover:text-brand-red transition-colors font-bold text-brand-red flex items-center">All Lubricants &gt;</Link></li>
                    </ul>
                  </div>

                  {/* Column 4 */}
                  <div>
                    <Link href="/products" className="text-[15px] font-bold text-dark-900 hover:text-brand-red flex items-center mb-4 transition-colors tracking-wide uppercase">
                      Promotions & Arrivals &gt;
                    </Link>
                    <ul className="space-y-3 text-[15px] text-dark-700 mb-6">
                      <li><Link href="/products?sort=price_desc" className="hover:text-brand-red transition-colors">High Capacity Fleet</Link></li>
                    </ul>

                    <h3 className="text-[15px] font-bold text-dark-900 mb-4 tracking-wide uppercase">Hand Tools</h3>
                    <ul className="space-y-3 text-[15px] text-dark-700">
                      <li><Link href="/products/hand-tools" className="hover:text-brand-red transition-colors font-bold text-brand-red flex items-center">All Hand Tools &gt;</Link></li>
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

            {/* Resources Dropdown - Animated */}
            <div
              className={`absolute top-full left-0 w-full bg-light-100 border-b border-light-300 shadow-xl py-10 px-4 sm:px-6 lg:px-8 z-40 transform origin-top transition-all duration-300 ease-in-out ${activeDropdown === "Resources"
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-4 invisible pointer-events-none"
                }`}
            >
              <div className="max-w-7xl mx-auto relative flex flex-col items-start min-h-[150px] text-dark-700">
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="absolute -top-10 right-0 p-3 bg-brand-black text-light-100 hover:bg-brand-red transition-colors shadow-sm group"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full pt-2">
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Knowledge Base</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/guides" className="block hover:text-brand-red transition-colors">Farming & Machinery Guides</Link></li>
                      <li><Link href="/guides" className="block hover:text-brand-red transition-colors">Equipment Operation Tips</Link></li>
                      <li><Link href="/guides" className="block hover:text-brand-red transition-colors">Soil & Harvesting Best Practices</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Updates & News</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/news" className="block hover:text-brand-red transition-colors">Latest Company News</Link></li>
                      <li><Link href="/news" className="block hover:text-brand-red transition-colors">New Product Announcements</Link></li>
                      <li><Link href="/news" className="block hover:text-brand-red transition-colors">Agricultural Industry Insights</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Downloads & Assets</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/downloads" className="block hover:text-brand-red transition-colors">Product Catalogues & Brochures</Link></li>
                      <li><Link href="/downloads" className="block hover:text-brand-red transition-colors">Owner & User Manuals</Link></li>
                      <li><Link href="/downloads" className="block hover:text-brand-red transition-colors">Technical Specification Sheets</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Interactive Tools</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/compare" className="block hover:text-brand-red transition-colors font-medium">Compare Machinery</Link></li>
                      <li><Link href="/dealers" className="block hover:text-brand-red transition-colors font-medium">Find Nearby Dealer</Link></li>
                      <li><Link href="/products" className="block hover:text-brand-red transition-colors font-medium">Browse All Products</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Service & Support Dropdown - Animated */}
            <div
              className={`absolute top-full left-0 w-full bg-light-100 border-b border-light-300 shadow-xl py-10 px-4 sm:px-6 lg:px-8 z-40 transform origin-top transition-all duration-300 ease-in-out ${activeDropdown === "Service & Support"
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-4 invisible pointer-events-none"
                }`}
            >
              <div className="max-w-7xl mx-auto relative flex flex-col items-start min-h-[150px] text-dark-700">
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="absolute -top-10 right-0 p-3 bg-brand-black text-light-100 hover:bg-brand-red transition-colors shadow-sm group"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full pt-2">
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">After-Sales Care</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/spare-parts" className="block hover:text-brand-red transition-colors">Genuine Spare Parts</Link></li>
                      <li><Link href="/warranty" className="block hover:text-brand-red transition-colors">Warranty Info & Registration</Link></li>
                      <li><Link href="/services-events/contact-us" className="block hover:text-brand-red transition-colors">Equipment Maintenance Support</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Customer Help</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/faq" className="block hover:text-brand-red transition-colors">Frequently Asked Questions (FAQ)</Link></li>
                      <li><Link href="/services-events/contact-us" className="block hover:text-brand-red transition-colors">Contact Support Team</Link></li>
                      <li><Link href="/services-events/contact-us" className="block hover:text-brand-red transition-colors">Technical Helpline</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Dealer Network</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/dealers" className="block hover:text-brand-red transition-colors">Find Authorized Dealer</Link></li>
                      <li>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            openJoinModal();
                          }}
                          className="block text-left hover:text-brand-red transition-colors bg-transparent border-0 p-0 text-sm font-medium cursor-pointer"
                        >
                          Become a KOREVA Partner
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/services-events/contact-us" className="block hover:text-brand-red transition-colors">Submit Product Inquiry</Link></li>
                      <li><Link href="/guides" className="block hover:text-brand-red transition-colors">User Operation Guides</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Dropdown - Animated */}
            <div
              className={`absolute top-full left-0 w-full bg-light-100 border-b border-light-300 shadow-xl py-10 px-4 sm:px-6 lg:px-8 z-40 transform origin-top transition-all duration-300 ease-in-out ${activeDropdown === "Company"
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-4 invisible pointer-events-none"
                }`}
            >
              <div className="max-w-7xl mx-auto relative flex flex-col items-start min-h-[150px] text-dark-700">
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="absolute -top-10 right-0 p-3 bg-brand-black text-light-100 hover:bg-brand-red transition-colors shadow-sm group"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full pt-2">
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Who We Are</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/about" className="block hover:text-brand-red transition-colors">About KOREVA GLOBAL</Link></li>
                      <li><Link href="/about" className="block hover:text-brand-red transition-colors">Mission, Vision & Legacy</Link></li>
                      <li><Link href="/about" className="block hover:text-brand-red transition-colors">Manufacturing Excellence</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Legal & Compliance</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/legal-notice" className="block hover:text-brand-red transition-colors">Legal Notice</Link></li>
                      <li><Link href="/privacy-policy" className="block hover:text-brand-red transition-colors">Privacy Policy</Link></li>
                      <li><Link href="/cookies" className="block hover:text-brand-red transition-colors">Cookie Policy & Settings</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Connect</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li><Link href="/services-events/contact-us" className="block hover:text-brand-red transition-colors">Contact Corporate Headquarters</Link></li>
                      <li><Link href="/dealers" className="block hover:text-brand-red transition-colors">Authorized Dealer Locations</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-dark-900 uppercase tracking-wide mb-4">Partnership</h3>
                    <ul className="space-y-3 text-sm text-dark-700">
                      <li>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            openJoinModal();
                          }}
                          className="block text-left hover:text-brand-red transition-colors bg-transparent border-0 p-0 text-sm font-medium cursor-pointer"
                        >
                          Join Our Dealer Network
                        </button>
                      </li>
                      <li><Link href="/news" className="block hover:text-brand-red transition-colors">Media & Press Room</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-light-100 border-b border-light-300 transition-all duration-300 ease-in-out origin-top z-30 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
          }`}>
          <div className="px-4 py-4 space-y-2 shadow-xl bg-light-100">
            {navItems.map((item) => (
              <div key={item.title} className="border-b border-light-300 last:border-0 pb-2">
                {item.hasDropdown ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between text-[16px] text-dark-900 font-bold py-3 focus:outline-none min-h-[44px]"
                      onClick={() => toggleDropdown(item.title)}
                    >
                      <span>{item.title}</span>
                      <span className="p-1 relative w-6 h-6">
                        <Plus className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${activeDropdown === item.title ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
                        <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${activeDropdown === item.title ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
                      </span>
                    </button>
                    {/* Mobile Animated Dropdown Content */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.title ? "max-h-[1000px] opacity-100 mb-2 mt-1" : "max-h-0 opacity-0 mb-0 mt-0"}`}>
                      <div className="pl-4 py-2 text-sm text-dark-700 space-y-3 border-l-2 border-brand-red bg-light-200/50 rounded-r-md">
                        {item.title === "Products" && (
                          <div className="py-2 pr-2 space-y-4">
                            <div>
                              <Link href="/products/tractor-attachments" className="font-bold text-brand-red text-[12px] uppercase mb-1.5 block hover:underline">Tractor Attachments &gt;</Link>
                              <ul className="space-y-2 text-xs">
                                <li><Link href="/products/tractor-attachments?search=Harrow" className="text-dark-900 hover:text-brand-red block py-1">Harrow</Link></li>
                                <li><Link href="/products/tractor-attachments?search=Rotavator" className="text-dark-900 hover:text-brand-red block py-1">Rotavator</Link></li>
                              </ul>
                            </div>
                            <div>
                              <Link href="/products/self-propelled-machinery" className="font-bold text-brand-red text-[12px] uppercase mb-1.5 block hover:underline">Self Propelled Machinery &gt;</Link>
                              <ul className="space-y-2 text-xs">
                                <li><Link href="/products/self-propelled-machinery?search=Power+Weeder" className="text-dark-900 hover:text-brand-red block py-1">Power Weeder</Link></li>
                                <li><Link href="/products/self-propelled-machinery?search=Power+Reaper" className="text-dark-900 hover:text-brand-red block py-1">Power Reaper</Link></li>
                                <li><Link href="/products/self-propelled-machinery?search=Brush+Cutter" className="text-dark-900 hover:text-brand-red block py-1">Brush Cutter</Link></li>
                              </ul>
                            </div>
                            <div>
                              <Link href="/products/food-processing-units" className="font-bold text-brand-red text-[12px] uppercase mb-1.5 block hover:underline">Food Processing &gt;</Link>
                              <ul className="space-y-2 text-xs">
                                <li><Link href="/products/food-processing-units?search=Pulveriser" className="text-dark-900 hover:text-brand-red block py-1">Pulveriser</Link></li>
                                <li><Link href="/products/food-processing-units?search=MINI+Rice+Mill" className="text-dark-900 hover:text-brand-red block py-1">MINI Rice Mill</Link></li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-brand-red text-[12px] uppercase mb-1.5">Supplies & Tools</h4>
                              <ul className="space-y-2 text-xs">
                                <li><Link href="/products/hand-tools" className="text-dark-900 hover:text-brand-red font-medium block py-1">Hand Tools &gt;</Link></li>
                                <li><Link href="/products/lubricants" className="text-dark-900 hover:text-brand-red font-medium block py-1">Lubricants &gt;</Link></li>
                              </ul>
                            </div>
                            <div className="pt-2 border-t border-brand-red/20">
                              <Link href="/products" className="font-bold text-dark-900 hover:text-brand-red flex items-center min-h-[44px]">
                                All products <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </div>
                          </div>
                        )}
                        {item.title === "Resources" && (
                          <div className="py-2 pr-2 space-y-2.5 text-xs">
                            <Link href="/guides" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Farming & Machinery Guides</Link>
                            <Link href="/news" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Latest News & Media</Link>
                            <Link href="/downloads" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Downloads & Brochures</Link>
                            <Link href="/compare" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Compare Products</Link>
                            <Link href="/dealers" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Find a Dealer</Link>
                          </div>
                        )}
                        {item.title === "Service & Support" && (
                          <div className="py-2 pr-2 space-y-2.5 text-xs">
                            <Link href="/spare-parts" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Genuine Spare Parts</Link>
                            <Link href="/warranty" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Warranty Information</Link>
                            <Link href="/faq" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Frequently Asked Questions</Link>
                            <Link href="/services-events/contact-us" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Contact Support Team</Link>
                            <Link href="/dealers" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Dealer Network</Link>
                          </div>
                        )}
                        {item.title === "Company" && (
                          <div className="py-2 pr-2 space-y-2.5 text-xs">
                            <Link href="/about" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">About KOREVA</Link>
                            <Link href="/legal-notice" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Legal Notice</Link>
                            <Link href="/privacy-policy" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Privacy Policy</Link>
                            <Link href="/cookies" className="font-semibold text-dark-900 hover:text-brand-red transition-colors block py-1">Cookie Policy</Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="flex w-full items-center justify-between text-[16px] text-dark-900 font-bold py-3 focus:outline-none min-h-[44px]"
                  >
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-6 pb-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openJoinModal();
                }}
                className="group flex w-full items-center justify-center px-6 py-3.5 rounded-full bg-brand-black text-light-100 font-medium hover:bg-brand-red transition-colors shadow-md min-h-[44px]"
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
