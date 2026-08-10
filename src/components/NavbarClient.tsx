"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  MapPin,
  Mail,
  Search,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ChevronRight,
  Phone,
  FileText,
  FileSpreadsheet,
  Factory,
} from "lucide-react";
import SearchComponent from "./Search";
import { useModalStore } from "@/store/useModalStore";
import { useRfqStore } from "@/store/useRfqStore";

// ─────────────────────────────────────────────────────────────────────────────
// Static data — defined here so it's tree-shaken from the Server Component.
// ─────────────────────────────────────────────────────────────────────────────
const navItems = [
  { title: "Products", hasDropdown: true },
  { title: "Resources", hasDropdown: true },
  { title: "Service & Support", hasDropdown: true },
  { title: "Company", hasDropdown: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// NavbarClient — handles ALL interactivity and scroll-driven animations.
// The parent Navbar.tsx is a Server Component and just renders this.
// ─────────────────────────────────────────────────────────────────────────────
export default function NavbarClient() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<
    string | null
  >("Products");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openJoinModal } = useModalStore();
  const { openModal: openRfqModal, totalItems: rfqTotalItems } = useRfqStore();

  const { scrollY } = useScroll();

  // Drive the isScrolled boolean with hysteresis to prevent scroll boundary oscillation
  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 60) {
      setIsScrolled(true);
    } else if (latest < 20) {
      setIsScrolled(false);
    }
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (title: string) =>
    setActiveDropdown((prev) => (prev === title ? null : title));

  const toggleMobileSection = (section: string) =>
    setExpandedMobileSection((prev) => (prev === section ? null : section));

  const handleLinkClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <SearchComponent
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* ── Top Contact Strip (Normal Flow) ────────────────────────── */}
      <div className="w-full bg-gradient-to-r from-brand-red via-red-700 to-brand-red text-white text-center text-xs font-bold uppercase tracking-widest shadow-inner">
        <div className="max-w-7xl mx-auto px-4 h-7 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-white/90 animate-pulse" />
          <span>Support Hotline: +91 7455 973 188</span>
        </div>
      </div>

      {/* ── Top Utility Bar (Normal Flow) ───────────────────────────── */}
      <div className="w-full bg-white/80 backdrop-blur-xl border-b border-light-200/80 font-jost">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex justify-between items-center text-xs text-dark-900 font-bold">
          <Link
            href="/dealers"
            className="flex items-center space-x-1.5 hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-red group-hover:scale-110 transition-transform" />
            <span className="tracking-tight uppercase">Find a Dealer</span>
          </Link>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link
              href="/services-events/contact-us"
              aria-label="Contact Us"
              className="flex items-center hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <Mail className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              className="flex items-center space-x-1.5 hover:text-brand-red transition-colors bg-transparent border-0 font-extrabold uppercase cursor-pointer focus-visible:outline-none"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-3.5 h-3.5 text-brand-red" />
              <span>Product search</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Sticky Main Navigation Header ───────────────────────────── */}
      <header
        ref={dropdownRef}
        onClick={handleLinkClick}
        className="sticky top-0 z-50 w-full font-jost"
      >
        {/* ── Main Navigation Floating Pill Wrapper ───────────────────── */}
        <div
          className={`w-full transition-all duration-300 ease-in-out ${
            isScrolled ? "px-2 sm:px-4 lg:px-6 pt-2" : "px-0 pt-0"
          }`}
        >
          {/* Inner pill wrapper */}
          <div
            className={`relative transition-all duration-300 ease-in-out ${
              isScrolled
                ? "rounded-2xl sm:rounded-3xl border border-light-300/90 bg-white/95 backdrop-blur-2xl shadow-xl"
                : "rounded-none border-b border-light-300/80 bg-white/92 backdrop-blur-xl shadow-xs"
            }`}
          >
            {/* Vertical padding wrapper */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto relative">
                {/* Nav Row */}
                <div
                  className={`flex justify-between items-center transition-all duration-300 ease-in-out ${
                    isScrolled ? "h-14 sm:h-15" : "h-16 sm:h-18"
                  }`}
                >
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                  <Link
                    href="/"
                    className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg"
                  >
                    <div className="p-1.5 rounded-xl bg-white border border-light-300/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/trademark.webp"
                        alt="KOREVA"
                        width={84}
                        height={22}
                        className="h-5.5 sm:h-6 w-auto object-contain"
                        priority
                      />
                    </div>
                  </Link>
                </div>

                {/* Desktop Nav Links */}
                <nav
                  aria-label="Main Navigation"
                  className="hidden md:flex items-center space-x-1 lg:space-x-2"
                >
                  {navItems.map((item) => (
                    <div key={item.title} className="relative">
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
                            activeDropdown === item.title
                              ? "rotate-180 text-brand-red"
                              : "opacity-60"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </nav>

                {/* Right: Search + RFQ Cart + Join */}
                <div className="hidden md:flex flex-shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={openRfqModal}
                    className="relative px-3.5 py-2 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red font-extrabold text-xs uppercase tracking-wider hover:bg-brand-red hover:text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    aria-label="Request for Quote Cart"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>RFQ Quote</span>
                    {rfqTotalItems() > 0 && (
                      <span className="w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-black flex items-center justify-center -mr-1">
                        {rfqTotalItems()}
                      </span>
                    )}
                  </button>

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
                    <span className="flex items-center gap-2">
                      Join Network
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>

                {/* Mobile: RFQ + Search + Hamburger */}
                <div className="flex items-center gap-2 md:hidden">
                  <button
                    type="button"
                    onClick={openRfqModal}
                    className="relative p-2 rounded-full text-brand-red bg-brand-red/10 hover:bg-brand-red hover:text-white transition-colors focus:outline-none w-9 h-9 flex items-center justify-center border border-brand-red/30 cursor-pointer"
                    aria-label="RFQ Cart"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    {rfqTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-red text-white text-[9px] font-black flex items-center justify-center">
                        {rfqTotalItems()}
                      </span>
                    )}
                  </button>
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
                    className="p-2 rounded-full text-dark-900 hover:bg-black/5 focus:outline-none w-10 h-10 flex items-center justify-center border border-light-300 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <Menu className="w-5 h-5 text-dark-900" />
                  </button>
                </div>
              </div>

              {/* Desktop Mega Menu Dropdown */}
              <AnimatePresence>
                {activeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden md:block absolute top-full left-0 right-0 w-full bg-white/98 backdrop-blur-3xl border border-light-300 shadow-2xl z-[100] py-7 px-6 sm:px-8 mt-3 rounded-3xl overflow-hidden"
                  >
                    <div className="max-w-7xl mx-auto relative pt-1">
                      <button
                        onClick={() => setActiveDropdown(null)}
                        className="absolute top-0 right-0 p-2 rounded-full bg-light-200 text-dark-900 hover:bg-brand-red hover:text-white transition-all duration-200 border border-light-300/80 shadow-xs group cursor-pointer"
                        aria-label="Close menu"
                      >
                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                      </button>

                      {/* PRODUCTS */}
                      {activeDropdown === "Products" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* 1. Tractor Attachments */}
                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                <Link href="/products/tractor-attachments" className="hover:underline">
                                  Tractor Attachments &gt;
                                </Link>
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/products/tractor-attachments?search=Harrow" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Disc Harrow
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Tractor-mounted heavy soil tillage</span>
                                </li>
                                <li>
                                  <Link href="/products/tractor-attachments?search=Rotavator" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Rotavator
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">KOBRA series seedbed rotators</span>
                                </li>
                              </ul>
                            </div>

                            {/* 2. Self Propelled Machinery */}
                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                <Link href="/products/self-propelled-machinery" className="hover:underline">
                                  Self Propelled Gear &gt;
                                </Link>
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/products/self-propelled-machinery?search=Power+Weeder" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Power Weeder
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">DHURANDHAR &amp; VIJAY 7HP/9HP models</span>
                                </li>
                                <li>
                                  <Link href="/products/self-propelled-machinery?search=Power+Reaper" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Power Reaper
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Crop harvesting &amp; field clearing</span>
                                </li>
                                <li>
                                  <Link href="/products/self-propelled-machinery?search=Brush+Cutter" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Brush Cutter Pro
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Heavy-duty grass &amp; brush control</span>
                                </li>
                              </ul>
                            </div>

                            {/* 3. Food Processing & Lubricants */}
                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                <Link href="/products/food-processing-units" className="hover:underline">
                                  Processing &amp; Fluids &gt;
                                </Link>
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/products/food-processing-units?search=Pulveriser" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Commercial Pulveriser
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Grain &amp; spice grinding mills</span>
                                </li>
                                <li>
                                  <Link href="/products/food-processing-units?search=MINI+Rice+Mill" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    MINI Rice Mill
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Compact paddy processing units</span>
                                </li>
                                <li>
                                  <Link href="/products/lubricants" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    STOU 15W-40 Lubricants
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">ISO 9001 universal tractor oils</span>
                                </li>
                              </ul>
                            </div>

                            {/* 4. Hand Tools */}
                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                <Link href="/products/hand-tools" className="hover:underline">
                                  Hand Tools &gt;
                                </Link>
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/products/hand-tools?search=Bypass+Secateur" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Bypass Secateurs
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Forged SK5 alloy pruning shears</span>
                                </li>
                                <li>
                                  <Link href="/products/hand-tools?search=Sickle" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Harvesting Sickles
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Micro-serrated steel harvesting tools</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-light-200 flex justify-between items-center">
                            <Link href="/products" className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-red uppercase tracking-wider hover:underline">
                              View Complete Product Catalog <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* RESOURCES */}
                      {activeDropdown === "Resources" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="p-2 rounded-xl bg-brand-red/10 text-brand-red">
                                  <FileText className="w-4 h-4" />
                                </span>
                                <h3 className="text-xs font-extrabold text-dark-900 uppercase tracking-widest">
                                  Knowledge Hub
                                </h3>
                              </div>
                              <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/guides" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Farming Guides &amp; Articles
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Modern agriculture techniques &amp; crop tips</span>
                                </li>
                                <li>
                                  <Link href="/compare" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Equipment Comparison Tool
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Compare weeders, harrows &amp; power tools</span>
                                </li>
                                <li>
                                  <Link href="/faq" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Frequently Asked Questions
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">E20 petrol safety, maintenance &amp; help</span>
                                </li>
                              </ul>
                            </div>

                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="p-2 rounded-xl bg-brand-red/10 text-brand-red">
                                  <Phone className="w-4 h-4" />
                                </span>
                                <h3 className="text-xs font-extrabold text-dark-900 uppercase tracking-widest">
                                  Downloads &amp; Manuals
                                </h3>
                              </div>
                              <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/downloads" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Master Product Catalogue 2026
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">PDF download (12.4 MB)</span>
                                </li>
                                <li>
                                  <Link href="/downloads" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    User Operating Manuals
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Power weeder &amp; rotavator specs</span>
                                </li>
                                <li>
                                  <Link href="/downloads" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Safety &amp; E20 Maintenance Care
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Carburetor safety instructions</span>
                                </li>
                              </ul>
                            </div>

                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="p-2 rounded-xl bg-brand-red/10 text-brand-red">
                                  <Sparkles className="w-4 h-4" />
                                </span>
                                <h3 className="text-xs font-extrabold text-dark-900 uppercase tracking-widest">
                                  News &amp; Media
                                </h3>
                              </div>
                              <ul className="space-y-2 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/news" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Corporate News &amp; Updates
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Product launches &amp; expo announcements</span>
                                </li>
                                <li>
                                  <Link href="/dealers" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Pan-India Network Expansion
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Authorized regional centers</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SERVICE & SUPPORT */}
                      {activeDropdown === "Service & Support" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                Genuine Spare Parts
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/spare-parts" className="hover:text-brand-red transition-colors block font-bold text-dark-900">
                                    Spare Parts Catalog &gt;
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Original blades, carburetor kits &amp; belts</span>
                                </li>
                                <li>
                                  <Link href="/products/lubricants" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    STOU 15W-40 &amp; Gear Fluids
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">ISO 9001 engine &amp; transmission oils</span>
                                </li>
                              </ul>
                            </div>

                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                Warranty &amp; Assurance
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/warranty" className="hover:text-brand-red transition-colors block font-bold text-dark-900">
                                    Warranty Policy &amp; Claims &gt;
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">1-Year OEM structure &amp; engine warranty</span>
                                </li>
                                <li>
                                  <Link href="/about" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    ISO 9001:2015 Standards
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Multi-point quality inspection process</span>
                                </li>
                              </ul>
                            </div>

                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                Dealer &amp; Field Assistance
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/dealers" className="hover:text-brand-red transition-colors block font-bold text-dark-900">
                                    Locate Service Center &gt;
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">500+ dealer hubs across India</span>
                                </li>
                                <li>
                                  <Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Contact Support Team
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Direct customer helpline &amp; support</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* COMPANY */}
                      {activeDropdown === "Company" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                Corporate Overview
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/about" className="hover:text-brand-red transition-colors block font-bold text-dark-900">
                                    About KOREVA Global LLP &gt;
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Agricultural machinery &amp; farm tools brand</span>
                                </li>
                                <li>
                                  <Link href="/manufacturing" className="hover:text-brand-red transition-colors block font-bold text-dark-900">
                                    Manufacturing &amp; OEM Services &gt;
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Custom assembly, OEM solutions &amp; plant hub</span>
                                </li>
                                <li>
                                  <Link href="/news" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Corporate News &amp; Events
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Latest updates &amp; trade announcements</span>
                                </li>
                              </ul>
                            </div>

                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                Partnership &amp; Network
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <button
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      openJoinModal();
                                    }}
                                    className="hover:text-brand-red transition-colors text-left font-bold text-dark-900 block cursor-pointer"
                                  >
                                    Join Dealer Network &gt;
                                  </button>
                                  <span className="text-[11px] text-dark-500 block">Become an authorized KOREVA dealer</span>
                                </li>
                                <li>
                                  <Link href="/dealers" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Find Authorized Dealer
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Map &amp; contact list of dealers</span>
                                </li>
                              </ul>
                            </div>

                            <div className="p-5 rounded-2xl bg-light-100/90 border border-light-300/80 shadow-xs hover:border-brand-red/30 transition-colors">
                              <h3 className="text-xs font-extrabold text-brand-red uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-red" />
                                Contact &amp; Legal
                              </h3>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-700 font-medium">
                                <li>
                                  <Link href="/services-events/contact-us" className="hover:text-brand-red transition-colors block font-bold text-dark-900">
                                    Get in Touch &gt;
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Uttarakhand manufacturing HQ &amp; office</span>
                                </li>
                                <li>
                                  <Link href="/privacy-policy" className="hover:text-brand-red transition-colors block font-semibold text-dark-900">
                                    Privacy Policy &amp; Terms
                                  </Link>
                                  <span className="text-[11px] text-dark-500 block">Legal &amp; privacy documentation</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>



      {/* ── Mobile Sidebar ──────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[90] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
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
                    <Image src="/trademark.webp" alt="KOREVA" width={80} height={20} className="h-5 w-auto object-contain" priority />
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

              {/* Sidebar Nav */}
              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                {/* Products */}
                <div className="rounded-2xl glass-card border border-light-300/80 overflow-hidden shadow-xs">
                  <button onClick={() => toggleMobileSection("Products")} className="w-full p-4 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-dark-900 bg-white/60 hover:bg-brand-red/5 transition-colors cursor-pointer">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-red" /><span>Products & Machinery</span></span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMobileSection === "Products" ? "rotate-180 text-brand-red" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {expandedMobileSection === "Products" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="px-4 pb-4 space-y-3 pt-2 text-xs font-medium border-t border-light-200">
                        <Link href="/products" className="block text-brand-red font-bold hover:underline" onClick={() => setIsMobileMenuOpen(false)}>All Products Catalog &gt;</Link>
                        <div className="space-y-1 pl-2 border-l-2 border-brand-red/20">
                          <Link href="/products/tractor-attachments" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Tractor Attachments</Link>
                          <Link href="/products/tractor-attachments?search=Harrow" className="block py-0.5 text-dark-700 hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>• Disc Harrow</Link>
                          <Link href="/products/tractor-attachments?search=Rotavator" className="block py-0.5 text-dark-700 hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>• Rotavator</Link>
                        </div>
                        <div className="space-y-1 pl-2 border-l-2 border-brand-red/20">
                          <Link href="/products/self-propelled-machinery" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Self Propelled Machinery</Link>
                          <Link href="/products/self-propelled-machinery?search=Power+Weeder" className="block py-0.5 text-dark-700 hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>• Power Weeder</Link>
                          <Link href="/products/self-propelled-machinery?search=Power+Reaper" className="block py-0.5 text-dark-700 hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>• Power Reaper</Link>
                        </div>
                        <div className="space-y-1 pl-2 border-l-2 border-brand-red/20">
                          <Link href="/products/food-processing-units" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Food Processing Units</Link>
                          <Link href="/products/lubricants" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Lubricants</Link>
                          <Link href="/products/hand-tools" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Hand Tools</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Resources */}
                <div className="rounded-2xl glass-card border border-light-300/80 overflow-hidden shadow-xs">
                  <button onClick={() => toggleMobileSection("Resources")} className="w-full p-4 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-dark-900 bg-white/60 hover:bg-brand-red/5 transition-colors cursor-pointer">
                    <span>Resources & Knowledge</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMobileSection === "Resources" ? "rotate-180 text-brand-red" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {expandedMobileSection === "Resources" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="px-4 pb-4 space-y-2 pt-2 text-xs font-medium border-t border-light-200">
                        <Link href="/guides" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Farming Guides & Articles</Link>
                        <Link href="/downloads" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Product Manuals & Downloads</Link>
                        <Link href="/faq" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Frequently Asked Questions</Link>
                        <Link href="/compare" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Equipment Comparison</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Service */}
                <div className="rounded-2xl glass-card border border-light-300/80 overflow-hidden shadow-xs">
                  <button onClick={() => toggleMobileSection("Service")} className="w-full p-4 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-dark-900 bg-white/60 hover:bg-brand-red/5 transition-colors cursor-pointer">
                    <span>Service & Support</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMobileSection === "Service" ? "rotate-180 text-brand-red" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {expandedMobileSection === "Service" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="px-4 pb-4 space-y-2 pt-2 text-xs font-medium border-t border-light-200">
                        <Link href="/spare-parts" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Genuine Spare Parts Inventory</Link>
                        <Link href="/warranty" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Warranty Terms & Claims</Link>
                        <Link href="/dealers" className="block py-1 text-dark-900 font-bold hover:text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>Locate Dealer / Service Center</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Company */}
                <div className="p-4 rounded-2xl glass-card border border-light-300/80 shadow-xs space-y-2 text-xs font-extrabold uppercase tracking-wider">
                  <Link href="/about" className="block py-1.5 text-dark-900 hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About KOREVA</Link>
                  <Link href="/manufacturing" className="block py-1.5 text-dark-900 hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Manufacturing &amp; OEM</Link>
                  <Link href="/news" className="block py-1.5 text-dark-900 hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Corporate News</Link>
                  <Link href="/services-events/contact-us" className="block py-1.5 text-dark-900 hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-5 border-t border-light-300 space-y-3 bg-light-100/90 backdrop-blur-md">
                <Link href="/dealers" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-full glass-panel border border-light-300 text-dark-900 font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-xs">
                  <MapPin className="w-4 h-4 text-brand-red" />
                  <span>Find Authorized Dealer</span>
                </Link>
                <button onClick={() => { setIsMobileMenuOpen(false); openJoinModal(); }} className="w-full py-3.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer">
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

      {/* ── Floating Dealer Button (scrolled state only) ───────────── */}
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
}
