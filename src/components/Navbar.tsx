"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Search, Plus, X, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
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
  <div className="w-full bg-gradient-to-r from-brand-red via-red-700 to-brand-red text-white py-1.5 text-center text-xs sm:text-sm font-bold uppercase tracking-widest shadow-inner relative z-50">
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-white/90 animate-pulse" />
      <span>Contact Us: +91 7455 973 188</span>
    </div>
  </div>
);

const UtilityStrip = ({ onSearchClick }: { onSearchClick: () => void }) => (
  <div className="w-full bg-white/80 backdrop-blur-xl border-b border-light-300/80 sticky top-0 z-50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm text-dark-900 font-medium">
      <Link 
        href="/dealers" 
        className="flex items-center space-x-2 cursor-pointer hover:text-brand-red transition-colors min-h-[40px] py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group"
      >
        <MapPin className="w-3.5 h-3.5 text-brand-red group-hover:scale-110 transition-transform" />
        <span className="font-semibold tracking-tight">Find a Dealer</span>
      </Link>
      <div className="flex items-center space-x-4 sm:space-x-8">
        <Link 
          href="/services-events/contact-us" 
          aria-label="Contact Us" 
          className="flex items-center cursor-pointer hover:text-brand-red transition-colors min-h-[40px] min-w-[40px] justify-center py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
        >
          <Mail className="w-4 h-4" />
        </Link>
        <button
          type="button"
          className="flex items-center space-x-2 cursor-pointer hover:text-brand-red transition-colors min-h-[40px] py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red bg-transparent border-0 font-semibold"
          onClick={onSearchClick}
        >
          <Search className="w-3.5 h-3.5 text-brand-red" />
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
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openJoinModal } = useModalStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      <header className="w-full relative z-40 sticky top-[41px]" onClick={handleLinkClick}>
        {/* Main Floating Glass Navbar Container */}
        <div 
          className={`w-full transition-all duration-300 ${
            isScrolled 
              ? "bg-white/92 backdrop-blur-3xl border-b border-light-300 shadow-md" 
              : "bg-white/85 backdrop-blur-2xl border-b border-light-300/80"
          }`} 
          ref={dropdownRef}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
            <div className="flex justify-between items-center h-[72px] md:h-[80px]">
              {/* Left: Brand Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg">
                  <div className="p-1.5 rounded-xl bg-white border border-light-300/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/trademark.webp"
                      alt="KOREVA"
                      width={84}
                      height={22}
                      className="object-contain"
                      style={{ height: "auto", width: "auto" }}
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Center: Desktop Minimalist Light Navigation */}
              <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
                {navItems.map((item) => (
                  <div key={item.title} className="relative">
                    {item.hasDropdown ? (
                      <button
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                          activeDropdown === item.title
                            ? "bg-brand-red/10 text-brand-red border border-brand-red/30 shadow-xs"
                            : "text-dark-900 hover:bg-black/5 hover:text-brand-red"
                        }`}
                        onClick={() => toggleDropdown(item.title)}
                        aria-expanded={activeDropdown === item.title}
                      >
                        <span>{item.title}</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.title ? "rotate-180 text-brand-red" : "opacity-60"
                          }`}
                        />
                      </button>
                    ) : (
                      <Link 
                        href={item.href || "/"}
                        className="px-4 py-2.5 rounded-full text-sm font-bold text-dark-900 hover:bg-black/5 hover:text-brand-red transition-all duration-200"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right: Join Network Light Button */}
              <div className="hidden md:flex flex-shrink-0 items-center">
                <button
                  onClick={openJoinModal}
                  className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-black text-white font-semibold text-sm transition-all duration-300 hover:bg-brand-red shadow-md hover:shadow-brand-red/20 focus:outline-none focus:ring-2 focus:ring-brand-red active:scale-95"
                >
                  <span className="flex items-center gap-2 relative z-10">
                    Join Network
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>

              {/* Mobile menu toggle */}
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  aria-label="Toggle mobile navigation menu"
                  className="p-2 rounded-full text-dark-900 hover:bg-black/5 focus:outline-none relative w-11 h-11 flex items-center justify-center border border-light-300"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Plus className={`absolute w-5 h-5 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
                  <X className={`absolute w-5 h-5 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Mega Menu Elevated Light Glass Popups (High Z-Index & Blur) */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.99 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:block absolute top-full left-0 w-full bg-white/94 backdrop-blur-3xl border-t border-b border-light-300 shadow-2xl z-50 py-10 px-4 sm:px-6 lg:px-8"
              >
                <div className="max-w-7xl mx-auto relative pt-2">
                  {/* Clean Aligned Close Button */}
                  <button
                    onClick={() => setActiveDropdown(null)}
                    className="absolute top-0 right-0 p-2 rounded-full bg-light-200 text-dark-900 hover:bg-brand-red hover:text-white transition-all duration-200 border border-light-300/80 shadow-xs group"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  </button>

                  {/* PRODUCTS MEGA MENU */}
                  {activeDropdown === "Products" && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs">
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4 flex items-center gap-2">
                            Tractor Attachments
                          </h3>
                          <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                            <li><Link href="/products/tractor-attachments" className="hover:text-brand-red font-bold text-dark-900 flex items-center">All Tractor Attachments &gt;</Link></li>
                            <li><Link href="/products/tractor-attachments?search=Harrow" className="hover:text-brand-red transition-colors">Harrow</Link></li>
                            <li><Link href="/products/tractor-attachments?search=Rotavator" className="hover:text-brand-red transition-colors">Rotavator</Link></li>
                          </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs">
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4 flex items-center gap-2">
                            Self Propelled Machinery
                          </h3>
                          <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                            <li><Link href="/products/self-propelled-machinery" className="hover:text-brand-red font-bold text-dark-900 flex items-center">All Self Propelled &gt;</Link></li>
                            <li><Link href="/products/self-propelled-machinery?search=Power+Weeder" className="hover:text-brand-red transition-colors">Power Weeder</Link></li>
                            <li><Link href="/products/self-propelled-machinery?search=Power+Reaper" className="hover:text-brand-red transition-colors">Power Reaper</Link></li>
                            <li><Link href="/products/self-propelled-machinery?search=Brush+Cutter" className="hover:text-brand-red transition-colors">Brush Cutter</Link></li>
                          </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs">
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4 flex items-center gap-2">
                            Food Processing Units
                          </h3>
                          <ul className="space-y-2.5 text-sm text-dark-700 font-medium mb-4">
                            <li><Link href="/products/food-processing-units" className="hover:text-brand-red font-bold text-dark-900 flex items-center">All Food Processing &gt;</Link></li>
                            <li><Link href="/products/food-processing-units?search=Pulveriser" className="hover:text-brand-red transition-colors">Pulveriser</Link></li>
                            <li><Link href="/products/food-processing-units?search=MINI+Rice+Mill" className="hover:text-brand-red transition-colors">MINI Rice Mill</Link></li>
                          </ul>
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-2">Lubricants</h3>
                          <ul className="space-y-2 text-sm text-dark-700 font-medium">
                            <li><Link href="/products/lubricants" className="hover:text-brand-red font-bold text-dark-900 flex items-center">All Lubricants &gt;</Link></li>
                          </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs">
                          <Link href="/products" className="text-xs font-extrabold text-brand-red uppercase tracking-widest block mb-4 hover:underline">
                            Promotions & Arrivals &gt;
                          </Link>
                          <ul className="space-y-2.5 text-sm text-dark-700 font-medium mb-4">
                            <li><Link href="/products?sort=price_desc" className="hover:text-brand-red transition-colors">High Capacity Fleet</Link></li>
                          </ul>
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-2">Hand Tools</h3>
                          <ul className="space-y-2 text-sm text-dark-700 font-medium">
                            <li><Link href="/products/hand-tools" className="hover:text-brand-red font-bold text-dark-900 flex items-center">All Hand Tools &gt;</Link></li>
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-light-300 flex justify-between items-center">
                        <span className="text-xs text-dark-500 font-semibold">KOREVA GLOBAL LLP — Precision Agricultural Solutions</span>
                        <Link href="/products" className="text-sm font-bold text-dark-900 hover:text-brand-red inline-flex items-center gap-1 transition-colors">
                          Browse Complete Product Catalog <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* RESOURCES MEGA MENU */}
                  {activeDropdown === "Resources" && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Knowledge Base</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/guides" className="hover:text-brand-red transition-colors">Farming & Machinery Guides</Link></li>
                          <li><Link href="/guides" className="hover:text-brand-red transition-colors">Equipment Operation Tips</Link></li>
                          <li><Link href="/guides" className="hover:text-brand-red transition-colors">Soil & Harvesting Best Practices</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Updates & News</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/news" className="hover:text-brand-red transition-colors">Latest Company News</Link></li>
                          <li><Link href="/news" className="hover:text-brand-red transition-colors">New Product Announcements</Link></li>
                          <li><Link href="/news" className="hover:text-brand-red transition-colors">Agricultural Industry Insights</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Downloads & Assets</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/downloads" className="hover:text-brand-red transition-colors">Product Catalogues & Brochures</Link></li>
                          <li><Link href="/downloads" className="hover:text-brand-red transition-colors">Owner & User Manuals</Link></li>
                          <li><Link href="/downloads" className="hover:text-brand-red transition-colors">Technical Spec Sheets</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Interactive Tools</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/compare" className="hover:text-brand-red font-bold transition-colors">Compare Machinery</Link></li>
                          <li><Link href="/dealers" className="hover:text-brand-red font-bold transition-colors">Find Nearby Dealer</Link></li>
                          <li><Link href="/products" className="hover:text-brand-red font-bold transition-colors">Browse All Products</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* SERVICE & SUPPORT MEGA MENU */}
                  {activeDropdown === "Service & Support" && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">After-Sales Care</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/spare-parts" className="hover:text-brand-red transition-colors">Genuine Spare Parts</Link></li>
                          <li><Link href="/warranty" className="hover:text-brand-red transition-colors">Warranty Registration</Link></li>
                          <li><Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors">Equipment Maintenance Support</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Customer Help</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/faq" className="hover:text-brand-red transition-colors">Frequently Asked Questions (FAQ)</Link></li>
                          <li><Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors">Contact Support Team</Link></li>
                          <li><Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors">Technical Helpline</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Dealer Network</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/dealers" className="hover:text-brand-red transition-colors">Find Authorized Dealer</Link></li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveDropdown(null);
                                openJoinModal();
                              }}
                              className="text-left hover:text-brand-red transition-colors bg-transparent border-0 p-0 text-sm font-bold cursor-pointer text-brand-red"
                            >
                              Become a KOREVA Partner
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Quick Links</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors">Submit Product Inquiry</Link></li>
                          <li><Link href="/guides" className="hover:text-brand-red transition-colors">User Operation Guides</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* COMPANY MEGA MENU */}
                  {activeDropdown === "Company" && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Who We Are</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/about" className="hover:text-brand-red transition-colors">About KOREVA GLOBAL</Link></li>
                          <li><Link href="/about" className="hover:text-brand-red transition-colors">Mission, Vision & Legacy</Link></li>
                          <li><Link href="/about" className="hover:text-brand-red transition-colors">Manufacturing Excellence</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Legal & Compliance</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/legal-notice" className="hover:text-brand-red transition-colors">Legal Notice</Link></li>
                          <li><Link href="/privacy-policy" className="hover:text-brand-red transition-colors">Privacy Policy</Link></li>
                          <li><Link href="/cookies" className="hover:text-brand-red transition-colors">Cookie Policy & Settings</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Connect</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li><Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors">Contact Corporate Headquarters</Link></li>
                          <li><Link href="/dealers" className="hover:text-brand-red transition-colors">Authorized Dealer Locations</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-4">Partnership</h3>
                        <ul className="space-y-2.5 text-sm text-dark-700 font-medium">
                          <li>
                            <button
                              onClick={() => {
                                setActiveDropdown(null);
                                openJoinModal();
                              }}
                              className="text-left hover:text-brand-red transition-colors bg-transparent border-0 p-0 text-sm font-bold cursor-pointer text-brand-red"
                            >
                              Join Our Dealer Network
                            </button>
                          </li>
                          <li><Link href="/news" className="hover:text-brand-red transition-colors">Media & Press Room</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Glass Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden w-full bg-white/95 backdrop-blur-2xl border-b border-light-300 overflow-hidden shadow-2xl"
            >
              <div className="px-4 py-6 space-y-3">
                {navItems.map((item) => (
                  <div key={item.title} className="border-b border-light-300 pb-3 last:border-0">
                    {item.hasDropdown ? (
                      <>
                        <button
                          className="flex w-full items-center justify-between text-base font-bold text-dark-900 py-2 focus:outline-none min-h-[44px]"
                          onClick={() => toggleDropdown(item.title)}
                        >
                          <span>{item.title}</span>
                          <Plus className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === item.title ? "rotate-45 text-brand-red" : "text-dark-500"}`} />
                        </button>

                        {/* Mobile Accordion Dropdown */}
                        <AnimatePresence>
                          {activeDropdown === item.title && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-3 py-2 space-y-2 border-l-2 border-brand-red bg-light-200/60 rounded-r-xl mt-1 text-xs text-dark-700"
                            >
                              {item.title === "Products" && (
                                <div className="space-y-3 p-1">
                                  <div>
                                    <Link href="/products/tractor-attachments" className="font-bold text-brand-red text-xs uppercase block mb-1">Tractor Attachments &gt;</Link>
                                    <ul className="space-y-1.5 pl-2">
                                      <li><Link href="/products/tractor-attachments?search=Harrow" className="hover:text-brand-red block py-1 font-medium">Harrow</Link></li>
                                      <li><Link href="/products/tractor-attachments?search=Rotavator" className="hover:text-brand-red block py-1 font-medium">Rotavator</Link></li>
                                    </ul>
                                  </div>
                                  <div>
                                    <Link href="/products/self-propelled-machinery" className="font-bold text-brand-red text-xs uppercase block mb-1">Self Propelled &gt;</Link>
                                    <ul className="space-y-1.5 pl-2">
                                      <li><Link href="/products/self-propelled-machinery?search=Power+Weeder" className="hover:text-brand-red block py-1 font-medium">Power Weeder</Link></li>
                                      <li><Link href="/products/self-propelled-machinery?search=Power+Reaper" className="hover:text-brand-red block py-1 font-medium">Power Reaper</Link></li>
                                      <li><Link href="/products/self-propelled-machinery?search=Brush+Cutter" className="hover:text-brand-red block py-1 font-medium">Brush Cutter</Link></li>
                                    </ul>
                                  </div>
                                  <div>
                                    <Link href="/products/food-processing-units" className="font-bold text-brand-red text-xs uppercase block mb-1">Food Processing &gt;</Link>
                                    <ul className="space-y-1.5 pl-2">
                                      <li><Link href="/products/food-processing-units?search=Pulveriser" className="hover:text-brand-red block py-1 font-medium">Pulveriser</Link></li>
                                      <li><Link href="/products/food-processing-units?search=MINI+Rice+Mill" className="hover:text-brand-red block py-1 font-medium">MINI Rice Mill</Link></li>
                                    </ul>
                                  </div>
                                  <div className="pt-2 border-t border-light-300">
                                    <Link href="/products" className="font-bold text-dark-900 hover:text-brand-red flex items-center py-1">
                                      All Products <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                  </div>
                                </div>
                              )}
                              {item.title === "Resources" && (
                                <div className="space-y-2 p-1 font-medium">
                                  <Link href="/guides" className="block hover:text-brand-red py-1">Farming & Machinery Guides</Link>
                                  <Link href="/news" className="block hover:text-brand-red py-1">Latest News & Media</Link>
                                  <Link href="/downloads" className="block hover:text-brand-red py-1">Downloads & Catalogues</Link>
                                  <Link href="/compare" className="block hover:text-brand-red py-1">Compare Products</Link>
                                  <Link href="/dealers" className="block hover:text-brand-red py-1">Find a Dealer</Link>
                                </div>
                              )}
                              {item.title === "Service & Support" && (
                                <div className="space-y-2 p-1 font-medium">
                                  <Link href="/spare-parts" className="block hover:text-brand-red py-1">Genuine Spare Parts</Link>
                                  <Link href="/warranty" className="block hover:text-brand-red py-1">Warranty Information</Link>
                                  <Link href="/faq" className="block hover:text-brand-red py-1">Frequently Asked Questions</Link>
                                  <Link href="/services-events/contact-us" className="block hover:text-brand-red py-1">Contact Support Team</Link>
                                </div>
                              )}
                              {item.title === "Company" && (
                                <div className="space-y-2 p-1 font-medium">
                                  <Link href="/about" className="block hover:text-brand-red py-1">About KOREVA</Link>
                                  <Link href="/legal-notice" className="block hover:text-brand-red py-1">Legal Notice</Link>
                                  <Link href="/privacy-policy" className="block hover:text-brand-red py-1">Privacy Policy</Link>
                                  <Link href="/cookies" className="block hover:text-brand-red py-1">Cookie Policy</Link>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href || "/"}
                        className="block text-base font-bold text-dark-900 py-2 min-h-[44px]"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openJoinModal();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-red text-white font-bold text-sm shadow-lg min-h-[44px]"
                  >
                    Join Dealer Network
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;


