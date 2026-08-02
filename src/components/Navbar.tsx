"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Search, Menu, X, ArrowRight, ChevronDown, Sparkles, ChevronRight, Phone } from "lucide-react";
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
  <div className="w-full bg-gradient-to-r from-brand-red via-red-700 to-brand-red text-white py-1 text-center text-xs font-bold uppercase tracking-widest shadow-inner">
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-white/90 animate-pulse" />
      <span>Support Hotline: +91 7455 973 188</span>
    </div>
  </div>
);

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>("Products");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openJoinModal } = useModalStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
    }
  };

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection(expandedMobileSection === section ? null : section);
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

      {/* Top Banner Contact Strip */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ContactStrip />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Utility Bar (Unscrolled Header View) */}
      {!isScrolled && (
        <div className="w-full bg-white/80 backdrop-blur-xl border-b border-light-200/80 py-1 font-jost">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-dark-900 font-bold">
            <Link 
              href="/dealers" 
              className="flex items-center space-x-1.5 cursor-pointer hover:text-brand-red transition-colors min-h-[32px] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-red group-hover:scale-110 transition-transform" />
              <span className="tracking-tight uppercase">Find a Dealer</span>
            </Link>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link 
                href="/services-events/contact-us" 
                aria-label="Contact Us" 
                className="flex items-center cursor-pointer hover:text-brand-red transition-colors min-h-[32px] min-w-[32px] justify-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              >
                <Mail className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                className="flex items-center space-x-1.5 cursor-pointer hover:text-brand-red transition-colors min-h-[32px] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red bg-transparent border-0 font-extrabold uppercase"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-3.5 h-3.5 text-brand-red" />
                <span>Product search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar Element */}
      <header 
        className={`sticky z-50 w-full font-jost transition-all duration-500 ease-out ${
          isScrolled 
            ? "top-0 md:top-3 w-full md:max-w-7xl md:mx-auto md:px-6" 
            : "top-0 w-full"
        }`}
        ref={dropdownRef}
        onClick={handleLinkClick}
      >
        <div 
          className={`transition-all duration-500 ease-out ${
            isScrolled
              ? "w-full md:max-w-6xl md:mx-auto md:rounded-full bg-white/95 md:bg-white/92 backdrop-blur-3xl border-b md:border border-light-300/90 shadow-md md:shadow-2xl px-4 sm:px-6 lg:px-8 py-1.5"
              : "w-full bg-white/85 backdrop-blur-2xl border-b border-light-300/80 px-4 sm:px-6 lg:px-8 py-0"
          }`}
        >
          <div className="max-w-7xl mx-auto relative z-50">
            <div className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? "h-[58px] md:h-[60px]" : "h-[68px] md:h-[76px]"
            }`}>
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

              {/* Center: Desktop Navigation */}
              <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
                {navItems.map((item) => (
                  <div key={item.title} className="relative">
                    {item.hasDropdown ? (
                      <button
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs lg:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                          activeDropdown === item.title
                            ? "bg-brand-red/10 text-brand-red border border-brand-red/30 shadow-xs"
                            : "text-dark-900 hover:bg-black/5 hover:text-brand-red"
                        }`}
                        onClick={() => toggleDropdown(item.title)}
                        aria-expanded={activeDropdown === item.title}
                      >
                        <span>{item.title}</span>
                        <ChevronDown 
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            activeDropdown === item.title ? "rotate-180 text-brand-red" : "opacity-60"
                          }`}
                        />
                      </button>
                    ) : (
                      <Link 
                        href={item.href || "/"}
                        className="px-4 py-2 rounded-full text-xs lg:text-sm font-extrabold text-dark-900 hover:bg-black/5 hover:text-brand-red transition-all duration-200"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right: Search & Join Network CTA (Desktop) */}
              <div className="hidden md:flex flex-shrink-0 items-center gap-3">
                {isScrolled && (
                  <button
                    type="button"
                    aria-label="Product Search"
                    className="p-2 rounded-full bg-light-100/80 border border-light-300/80 text-dark-900 hover:text-brand-red hover:bg-white transition-all shadow-xs cursor-pointer"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="w-4 h-4 text-brand-red" />
                  </button>
                )}
                <button
                  onClick={openJoinModal}
                  className="group relative inline-flex items-center justify-center px-6 py-2 rounded-full bg-brand-black text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-brand-red shadow-md hover:shadow-brand-red/20 focus:outline-none focus:ring-2 focus:ring-brand-red active:scale-95 cursor-pointer"
                >
                  <span className="flex items-center gap-2 relative z-10">
                    Join Network
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>

              {/* Mobile Right Controls: Search + Triple Line Hamburger Menu Button */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  aria-label="Product Search"
                  className="p-2 rounded-full text-dark-900 hover:bg-black/5 focus:outline-none w-9 h-9 flex items-center justify-center border border-light-300 cursor-pointer"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-4 h-4 text-brand-red" />
                </button>

                <button
                  type="button"
                  aria-label="Toggle mobile navigation menu"
                  className="p-2 rounded-full text-dark-900 hover:bg-black/5 focus:outline-none relative w-10 h-10 flex items-center justify-center border border-light-300 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="w-5 h-5 text-dark-900" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Mega Menu Glass Popups */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.99 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={`hidden md:block absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border-t border-b border-light-300 shadow-2xl z-50 py-8 px-4 sm:px-6 lg:px-8 ${
                  isScrolled ? "rounded-3xl mt-2" : ""
                }`}
              >
                <div className="max-w-7xl mx-auto relative pt-2">
                  <button
                    onClick={() => setActiveDropdown(null)}
                    className="absolute top-0 right-0 p-2 rounded-full bg-light-200 text-dark-900 hover:bg-brand-red hover:text-white transition-all duration-200 border border-light-300/80 shadow-xs group cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  </button>

                  {/* PRODUCTS MEGA MENU */}
                  {activeDropdown === "Products" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs">
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                            <Link href="/products/tractor-attachments" className="hover:underline inline-flex items-center gap-1">
                              <span>Tractor Attachments</span>
                              <span className="text-brand-red">&gt;</span>
                            </Link>
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                            <li><Link href="/products/tractor-attachments?search=Harrow" className="hover:text-brand-red transition-colors">Harrow</Link></li>
                            <li><Link href="/products/tractor-attachments?search=Rotavator" className="hover:text-brand-red transition-colors">Rotavator</Link></li>
                          </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs">
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                            <Link href="/products/self-propelled-machinery" className="hover:underline inline-flex items-center gap-1">
                              <span>Self Propelled Machinery</span>
                              <span className="text-brand-red">&gt;</span>
                            </Link>
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                            <li><Link href="/products/self-propelled-machinery?search=Power+Weeder" className="hover:text-brand-red transition-colors">Power Weeder</Link></li>
                            <li><Link href="/products/self-propelled-machinery?search=Power+Reaper" className="hover:text-brand-red transition-colors">Power Reaper</Link></li>
                            <li><Link href="/products/self-propelled-machinery?search=Brush+Cutter" className="hover:text-brand-red transition-colors">Brush Cutter</Link></li>
                          </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs">
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                            <Link href="/products/food-processing-units" className="hover:underline inline-flex items-center gap-1">
                              <span>Food Processing Units</span>
                              <span className="text-brand-red">&gt;</span>
                            </Link>
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium mb-4">
                            <li><Link href="/products/food-processing-units?search=Pulveriser" className="hover:text-brand-red transition-colors">Pulveriser</Link></li>
                            <li><Link href="/products/food-processing-units?search=MINI+Rice+Mill" className="hover:text-brand-red transition-colors">MINI Rice Mill</Link></li>
                          </ul>
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-2">
                            <Link href="/products/lubricants" className="hover:underline inline-flex items-center gap-1">
                              <span>Lubricants</span>
                              <span className="text-brand-red">&gt;</span>
                            </Link>
                          </h3>
                        </div>

                        <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs">
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                            <Link href="/products" className="hover:underline inline-flex items-center gap-1">
                              <span>Promotions & Arrivals</span>
                              <span className="text-brand-red">&gt;</span>
                            </Link>
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium mb-4">
                            <li><Link href="/products?sort=price_desc" className="hover:text-brand-red transition-colors">High Capacity Fleet</Link></li>
                          </ul>
                          <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-2">
                            <Link href="/products/hand-tools" className="hover:underline inline-flex items-center gap-1">
                              <span>Hand Tools</span>
                              <span className="text-brand-red">&gt;</span>
                            </Link>
                          </h3>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-light-300 flex justify-between items-center">
                        <span className="text-xs text-dark-600 font-bold uppercase tracking-wider">KOREVA GLOBAL LLP — Precision Agricultural Solutions</span>
                        <Link href="/products" className="text-xs font-extrabold text-dark-900 hover:text-brand-red inline-flex items-center gap-1 transition-colors uppercase tracking-wider">
                          <span>Browse Complete Product Catalog</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* RESOURCES MEGA MENU */}
                  {activeDropdown === "Resources" && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/guides" className="hover:underline inline-flex items-center gap-1">
                            <span>Knowledge Base</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/guides/e20-petrol" className="hover:text-brand-red transition-colors">E20 Petrol Care</Link></li>
                          <li><Link href="/guides/maintenance-checklist" className="hover:text-brand-red transition-colors">Maintenance Checklist</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/downloads" className="hover:underline inline-flex items-center gap-1">
                            <span>Downloads</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/downloads" className="hover:text-brand-red transition-colors">Product Manuals & Specs</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/faq" className="hover:underline inline-flex items-center gap-1">
                            <span>Help Center</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/faq" className="hover:text-brand-red transition-colors">Frequently Asked Questions</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/compare" className="hover:underline inline-flex items-center gap-1">
                            <span>Comparison</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/compare" className="hover:text-brand-red transition-colors">Compare Equipment</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* SERVICE & SUPPORT MEGA MENU */}
                  {activeDropdown === "Service & Support" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/spare-parts" className="hover:underline inline-flex items-center gap-1">
                            <span>Spare Parts</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/spare-parts" className="hover:text-brand-red transition-colors">Genuine Spare Parts Inventory</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/warranty" className="hover:underline inline-flex items-center gap-1">
                            <span>Warranty</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/warranty" className="hover:text-brand-red transition-colors">Warranty Conditions & Claims</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/dealers" className="hover:underline inline-flex items-center gap-1">
                            <span>Dealer Support</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/dealers" className="hover:text-brand-red transition-colors">Locate Service Center</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* COMPANY MEGA MENU */}
                  {activeDropdown === "Company" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/about" className="hover:underline inline-flex items-center gap-1">
                            <span>About KOREVA</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/about" className="hover:text-brand-red transition-colors">Our Legacy & Mission</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/news" className="hover:underline inline-flex items-center gap-1">
                            <span>Corporate News</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/news" className="hover:text-brand-red transition-colors">Press Releases & Announcements</Link></li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80">
                        <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3">
                          <Link href="/services-events/contact-us" className="hover:underline inline-flex items-center gap-1">
                            <span>Contact Us</span>
                            <span className="text-brand-red">&gt;</span>
                          </Link>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                          <li><Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors">Get in Touch</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Detailed Mobile Right-Side Glass Sidebar Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[90] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Right Slide-In Mobile Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-[100] w-[88vw] max-w-sm h-full bg-white/96 backdrop-blur-3xl border-l border-light-300 shadow-2xl flex flex-col justify-between md:hidden font-jost"
            >
              {/* Sidebar Header */}
              <div className="p-5 border-b border-light-300 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-white border border-light-300 shadow-xs">
                    <Image src="/trademark.webp" alt="KOREVA" width={80} height={20} className="object-contain" priority />
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-light-200 text-dark-900 hover:bg-brand-red hover:text-white transition-colors border border-light-300/80 shadow-xs group cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Sidebar Navigation Accordions & Links */}
              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                {/* 1. Products Section Accordion */}
                <div className="rounded-2xl glass-card border border-light-300/80 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleMobileSection("Products")}
                    className="w-full p-4 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-dark-900 bg-white/60 hover:bg-brand-red/5 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-red" />
                      <span>Products & Machinery</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMobileSection === "Products" ? "rotate-180 text-brand-red" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {expandedMobileSection === "Products" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 space-y-3 pt-2 text-xs font-medium border-t border-light-200"
                      >
                        <Link href="/products" className="block text-brand-red font-bold hover:underline" onClick={() => setIsMobileMenuOpen(false)}>
                          All Products Catalog &gt;
                        </Link>
                        <div className="space-y-1 pl-2 border-l-2 border-brand-red/20">
                          <Link href="/products/tractor-attachments" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            Tractor Attachments
                          </Link>
                          <Link href="/products/tractor-attachments?search=Harrow" className="block py-0.5 text-dark-700 hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            • Disc Harrow
                          </Link>
                          <Link href="/products/tractor-attachments?search=Rotavator" className="block py-0.5 text-dark-700 hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            • Rotavator
                          </Link>
                        </div>

                        <div className="space-y-1 pl-2 border-l-2 border-brand-red/20">
                          <Link href="/products/self-propelled-machinery" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            Self Propelled Machinery
                          </Link>
                          <Link href="/products/self-propelled-machinery?search=Power+Weeder" className="block py-0.5 text-dark-700 hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            • Power Weeder
                          </Link>
                          <Link href="/products/self-propelled-machinery?search=Power+Reaper" className="block py-0.5 text-dark-700 hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            • Power Reaper
                          </Link>
                        </div>

                        <div className="space-y-1 pl-2 border-l-2 border-brand-red/20">
                          <Link href="/products/food-processing-units" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            Food Processing Units
                          </Link>
                          <Link href="/products/lubricants" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            Lubricants
                          </Link>
                          <Link href="/products/hand-tools" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                            Hand Tools
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Resources Accordion */}
                <div className="rounded-2xl glass-card border border-light-300/80 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleMobileSection("Resources")}
                    className="w-full p-4 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-dark-900 bg-white/60 hover:bg-brand-red/5 transition-colors cursor-pointer"
                  >
                    <span>Resources & Knowledge</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMobileSection === "Resources" ? "rotate-180 text-brand-red" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {expandedMobileSection === "Resources" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 space-y-2 pt-2 text-xs font-medium border-t border-light-200"
                      >
                        <Link href="/guides" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                          Farming Guides & Articles
                        </Link>
                        <Link href="/downloads" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                          Product Manuals & Downloads
                        </Link>
                        <Link href="/faq" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                          Frequently Asked Questions
                        </Link>
                        <Link href="/compare" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                          Equipment Comparison
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Service & Support Accordion */}
                <div className="rounded-2xl glass-card border border-light-300/80 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleMobileSection("Service")}
                    className="w-full p-4 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-dark-900 bg-white/60 hover:bg-brand-red/5 transition-colors cursor-pointer"
                  >
                    <span>Service & Support</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMobileSection === "Service" ? "rotate-180 text-brand-red" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {expandedMobileSection === "Service" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 space-y-2 pt-2 text-xs font-medium border-t border-light-200"
                      >
                        <Link href="/spare-parts" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                          Genuine Spare Parts Inventory
                        </Link>
                        <Link href="/warranty" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                          Warranty Terms & Claims
                        </Link>
                        <Link href="/dealers" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>
                          Locate Dealer / Service Center
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Company Direct Links */}
                <div className="p-4 rounded-2xl glass-card border border-light-300/80 shadow-xs space-y-2 text-xs font-extrabold uppercase tracking-wider">
                  <Link href="/about" className="block py-1.5 text-dark-900 hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    About KOREVA
                  </Link>
                  <Link href="/news" className="block py-1.5 text-dark-900 hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Corporate News
                  </Link>
                  <Link href="/services-events/contact-us" className="block py-1.5 text-dark-900 hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Sidebar Footer Actions */}
              <div className="p-5 border-t border-light-300 space-y-3 bg-light-100/90 backdrop-blur-md">
                <Link
                  href="/dealers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full glass-panel border border-light-300 text-dark-900 font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-xs"
                >
                  <MapPin className="w-4 h-4 text-brand-red" />
                  <span>Find Authorized Dealer</span>
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openJoinModal();
                  }}
                  className="w-full py-3.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join Dealer Network</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center text-[10px] text-dark-500 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Phone className="w-3 h-3 text-brand-red" />
                  <span>Hotline: +91 7455 973 188</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Bottom-Right "Find a Dealer" Button (Active when scrolled) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
          >
            <Link
              href="/dealers"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/95 backdrop-blur-2xl border border-brand-red/30 text-dark-900 font-extrabold text-xs uppercase tracking-wider shadow-2xl hover:bg-brand-red hover:text-white transition-all duration-300 group active:scale-95 cursor-pointer"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-red/10 group-hover:bg-white/20 text-brand-red group-hover:text-white flex items-center justify-center transition-colors">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="tracking-tight text-[11px] sm:text-xs">Find a Dealer</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
