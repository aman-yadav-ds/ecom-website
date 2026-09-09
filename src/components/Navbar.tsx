"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Phone,
  FileText,
  Tractor,
  Cog,
  Factory,
  Scissors,
  BookOpen,
  Download,
  Newspaper,
  LifeBuoy,
  MapPin,
  Building2,
  Handshake,
  Store,
} from "lucide-react";
import SearchComponent from "./Search";
import { TopContactStrip } from "./home/TopContactStrip";
import { useModalStore } from "@/store/useModalStore";
import { useRfqStore } from "@/store/useRfqStore";

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Items configuration
// ─────────────────────────────────────────────────────────────────────────────
const navItems = [
  { title: "PRODUCTS", key: "Products" },
  { title: "RESOURCES", key: "Resources" },
  { title: "SERVICE & SUPPORT", key: "Service & Support" },
  { title: "COMPANY", key: "Company" },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>("Products");
  const [isScrolled, setIsScrolled] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { openJoinModal } = useModalStore();
  const { openModal: openRfqModal, totalItems: rfqTotalItems } = useRfqStore();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Track page scroll to elevate sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavMouseEnter = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleNavMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection((prev) => (prev === section ? null : section));
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ── Global Search Modal ────────────────────────────────────────── */}
      <SearchComponent
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* ── Top Contact Strip ───────────────────────────────────────── */}
      <TopContactStrip />

      {/* ── Sticky Main Navigation Bar ───────────────────────────────── */}
      <div
        ref={navContainerRef}
        onMouseLeave={handleNavMouseLeave}
        className="sticky top-0 z-50 w-full font-manrope select-none"
      >
        <header
          className={`w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
            isScrolled
              ? "shadow-md border-neutral-200/90"
              : "shadow-2xs border-neutral-200/80"
          }`}
        >
          <div className="max-w-345 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-18 sm:h-20">
              {/* Logo */}
              <div className="shrink-0 flex items-center">
                <Link
                  href="/"
                  prefetch={false}
                  onClick={handleLinkClick}
                  className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg py-1"
                >
                  <Image
                    src="/trademark.webp"
                    alt="Koreva 9"
                    width={155}
                    height={32}
                    style={{ width: "auto" }}
                    className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    priority
                  />
                </Link>
              </div>

              {/* Desktop Nav Items */}
              <nav
                aria-label="Main Navigation"
                className="hidden md:flex items-center h-full space-x-1 lg:space-x-3"
              >
                {navItems.map((item) => {
                  const isActive = activeDropdown === item.key;
                  return (
                    <div
                      key={item.key}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => handleNavMouseEnter(item.key)}
                    >
                      <button
                        type="button"
                        onClick={() => toggleDropdown(item.key)}
                        aria-expanded={isActive}
                        className={`h-full flex items-center gap-1.5 px-3 lg:px-4 text-xs lg:text-[13px] font-extrabold tracking-wider uppercase transition-colors cursor-pointer relative ${
                          isActive
                            ? "text-brand-red"
                            : "text-neutral-900 hover:text-brand-red"
                        }`}
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isActive ? "rotate-180 text-brand-red" : "text-neutral-400"
                          }`}
                        />

                        {/* Red Active Indicator Line at bottom edge */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-2 right-2 h-0.75 bg-brand-red rounded-t-sm"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                      </button>
                    </div>
                  );
                })}
              </nav>

              {/* Right Side Desktop Actions */}
              <div className="hidden md:flex shrink-0 items-center gap-3">
                {/* Search Bar / Trigger */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search products"
                  className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-100/80 hover:bg-neutral-100 border border-neutral-200/80 text-neutral-400 hover:text-neutral-700 transition-all text-xs font-medium w-40 xl:w-48 cursor-pointer shadow-2xs group"
                >
                  <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-red transition-colors shrink-0" />
                  <span className="truncate">Search products...</span>
                </button>

                {/* Search Icon button for smaller md-only screens */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Product Search"
                  className="lg:hidden w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/80 text-neutral-700 hover:text-brand-red flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* RFQ Quote Outline Button */}
                <button
                  type="button"
                  onClick={openRfqModal}
                  className="relative px-4 py-2 rounded-full border border-neutral-300 hover:border-brand-red bg-white hover:bg-neutral-50 text-neutral-800 hover:text-brand-red font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-2xs group"
                  aria-label="Request for Quote Cart"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-red group-hover:scale-110 transition-transform" />
                  <span>RFQ QUOTE</span>
                  {rfqTotalItems() > 0 && (
                    <span className="w-4 h-4 rounded-full bg-brand-red text-white text-[10px] font-black flex items-center justify-center -mr-1">
                      {rfqTotalItems()}
                    </span>
                  )}
                </button>

                {/* Join Network Koreva Red Pill Button */}
                <button
                  type="button"
                  onClick={openJoinModal}
                  className="px-5 py-2.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-xs hover:shadow-md active:scale-95 cursor-pointer group"
                >
                  <span>JOIN NETWORK</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  onClick={openRfqModal}
                  className="relative p-2 rounded-full text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors w-9 h-9 flex items-center justify-center border border-neutral-200 cursor-pointer"
                  aria-label="RFQ Cart"
                >
                  <FileText className="w-4 h-4 text-brand-red" />
                  {rfqTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-red text-white text-[9px] font-black flex items-center justify-center">
                      {rfqTotalItems()}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  aria-label="Product Search"
                  className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100 w-9 h-9 flex items-center justify-center border border-neutral-200 cursor-pointer"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  aria-label="Toggle mobile navigation menu"
                  className="p-2 rounded-full text-neutral-900 hover:bg-neutral-100 w-10 h-10 flex items-center justify-center border border-neutral-200 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Desktop Mega Menu Dropdown Panel ────────────────────────── */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }
                }}
                style={{ backgroundColor: "#ffffff" }}
                className="hidden md:block absolute top-full left-0 right-0 w-full bg-white border-b border-neutral-200 shadow-2xl z-50"
              >
                <div className="max-w-345 mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-9 relative">
                  {/* Close Cross */}
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(null)}
                    className="absolute top-4 right-6 p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* ── STATE 01: PRODUCTS ─────────────────────────────── */}
                  {activeDropdown === "Products" && (
                    <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10">
                      {/* Left Column: Intro */}
                      <div className="w-full lg:w-60 shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-100 pb-6 lg:pb-0 lg:pr-8">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-extrabold text-brand-red uppercase tracking-wider mb-2.5">
                            <span className="w-3 h-0.5 bg-brand-red" />
                            <span>OUR PRODUCTS</span>
                          </div>
                          <h3 className="text-2xl lg:text-[28px] font-black text-neutral-950 uppercase tracking-tight leading-none mb-3 font-manrope">
                            BUILT FOR<br />REAL FIELDS
                          </h3>
                          <p className="text-xs text-neutral-500 leading-relaxed max-w-55 font-medium">
                            From soil preparation to crop care, Koreva delivers high-performance agricultural implements and tools for every stage of farming.
                          </p>
                        </div>
                        <div className="pt-6">
                          <Link
                            href="/products"
                            prefetch={false}
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-red-700 uppercase tracking-wider group transition-colors"
                          >
                            <span>VIEW COMPLETE CATALOG</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Middle: 4 Category Columns */}
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-7">
                        {/* 1. Tractor Attachments */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Tractor className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Tractor Attachments
                            </h4>
                          </div>
                          <ul className="space-y-1.5">
                            {[
                              { label: "Disc Harrow", href: "/products/tractor-attachments?search=Disc+Harrow" },
                              { label: "Rotavator", href: "/products/tractor-attachments?search=Rotavator" },
                              { label: "Power Weeder", href: "/products/tractor-attachments?search=Power+Weeder" },
                              { label: "Rotary Tiller", href: "/products/tractor-attachments?search=Rotary+Tiller" },
                              { label: "Cultivator", href: "/products/tractor-attachments?search=Cultivator" },
                              { label: "Other Attachments", href: "/products/tractor-attachments" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 2. Self Propelled Gear */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Cog className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Self Propelled Gear
                            </h4>
                          </div>
                          <ul className="space-y-1.5">
                            {[
                              { label: "Power Weeder", href: "/products/self-propelled-machinery?search=Power+Weeder" },
                              { label: "Power Reaper", href: "/products/self-propelled-machinery?search=Power+Reaper" },
                              { label: "Brush Cutter Pro", href: "/products/self-propelled-machinery?search=Brush+Cutter" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 3. Processing & Fluids */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Factory className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Processing &amp; Fluids
                            </h4>
                          </div>
                          <ul className="space-y-1.5">
                            {[
                              { label: "Commercial Pulveriser", href: "/products/food-processing-units?search=Pulveriser" },
                              { label: "Mini Rice Mill", href: "/products/food-processing-units?search=Rice+Mill" },
                              { label: "STOU 15W-40 Lubricants", href: "/products/lubricants" },
                              { label: "Spare Parts", href: "/spare-parts" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 4. Hand Tools */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Scissors className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Hand Tools
                            </h4>
                          </div>
                          <ul className="space-y-1.5">
                            {[
                              { label: "Bypass Secateurs", href: "/products/hand-tools?search=Secateur" },
                              { label: "Harvesting Sickles", href: "/products/hand-tools?search=Sickle" },
                              { label: "Hand Tools Set", href: "/products/hand-tools?search=Set" },
                              { label: "Tool Kits", href: "/products/hand-tools" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Spotlight Card */}
                      <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
                        <Link
                          href="/products/tractor-attachments"
                          prefetch={false}
                          onClick={handleLinkClick}
                          className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-md border border-neutral-200 group bg-neutral-950 block"
                        >
                          <Image
                            src="/images/mega-menu/tractor_heavy_duty.jpg"
                            alt="High-Efficiency Power Implements"
                            fill
                            sizes="320px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-4">
                            <span className="inline-block self-start px-2.5 py-0.5 rounded-full bg-brand-red text-white text-[9px] font-extrabold uppercase tracking-wider mb-1.5 shadow-xs">
                              HEAVY DUTY LINE
                            </span>
                            <h4 className="text-white font-bold text-sm leading-snug drop-shadow-sm">
                              High-Efficiency Power Implements
                            </h4>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* ── STATE 02: RESOURCES ────────────────────────────── */}
                  {activeDropdown === "Resources" && (
                    <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10">
                      {/* Left Column: Intro */}
                      <div className="w-full lg:w-60 shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-100 pb-6 lg:pb-0 lg:pr-8">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-extrabold text-brand-red uppercase tracking-wider mb-2.5">
                            <span className="w-3 h-0.5 bg-brand-red" />
                            <span>KNOWLEDGE HUB</span>
                          </div>
                          <h3 className="text-2xl lg:text-[28px] font-black text-neutral-950 uppercase tracking-tight leading-none mb-3 font-manrope">
                            INFORMATION<br />THAT EMPOWERS
                          </h3>
                          <p className="text-xs text-neutral-500 leading-relaxed max-w-55 font-medium">
                            Technical guides, manuals, and industry insights to help you get the best from your equipment.
                          </p>
                        </div>
                        <div className="pt-6">
                          <Link
                            href="/guides"
                            prefetch={false}
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-red-700 uppercase tracking-wider group transition-colors"
                          >
                            <span>EXPLORE ALL RESOURCES</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Middle: 3 Category Columns */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                        {/* 1. Knowledge Hub */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <BookOpen className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Knowledge Hub
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {[
                              { label: "Farm Guides & Articles", href: "/guides" },
                              { label: "Equipment Comparison Tool", href: "/compare" },
                              { label: "Frequently Asked Questions", href: "/faq" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 2. Downloads & Manuals */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Download className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Downloads &amp; Manuals
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {[
                              { label: "Product Catalogue", href: "/downloads" },
                              { label: "User Manuals", href: "/downloads" },
                              { label: "Safety & Maintenance", href: "/downloads" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 3. News & Media */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Newspaper className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              News &amp; Media
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {[
                              { label: "Corporate News", href: "/news" },
                              { label: "Press Releases", href: "/news" },
                              { label: "Expansion & Events", href: "/dealers" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Spotlight Card */}
                      <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
                        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 flex flex-col justify-between h-full min-h-47.5">
                          <div>
                            <span className="inline-block text-[10px] font-extrabold text-brand-red uppercase tracking-widest mb-2">
                              FEATURED DOWNLOAD
                            </span>
                            <h4 className="text-sm font-bold text-neutral-900 leading-snug mb-1.5 font-manrope">
                              2025 Comprehensive Product &amp; Specification Handbook
                            </h4>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                              Complete technical blueprints &amp; compatibility charts.
                            </p>
                          </div>
                          <Link
                            href="/downloads"
                            prefetch={false}
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-red-700 pt-4 group transition-colors"
                          >
                            <span>Direct PDF</span>
                            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STATE 03: SERVICE & SUPPORT ────────────────────── */}
                  {activeDropdown === "Service & Support" && (
                    <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10">
                      {/* Left Column: Intro */}
                      <div className="w-full lg:w-60 shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-100 pb-6 lg:pb-0 lg:pr-8">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-extrabold text-brand-red uppercase tracking-wider mb-2.5">
                            <span className="w-3 h-0.5 bg-brand-red" />
                            <span>YOUR PARTNER</span>
                          </div>
                          <h3 className="text-2xl lg:text-[28px] font-black text-neutral-950 uppercase tracking-tight leading-none mb-3 font-manrope">
                            YOUR PARTNER<br />IN THE FIELD
                          </h3>
                          <p className="text-xs text-neutral-500 leading-relaxed max-w-55 font-medium">
                            Reliable support, genuine parts and expert assistance — whenever you need us.
                          </p>
                        </div>
                        <div className="pt-6">
                          <Link
                            href="/services-events/contact-us"
                            prefetch={false}
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-red-700 uppercase tracking-wider group transition-colors"
                          >
                            <span>GET SUPPORT</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Middle: 2 Category Columns */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                        {/* 1. Support */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <LifeBuoy className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Support
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {[
                              { label: "Dealer Locator", href: "/dealers" },
                              { label: "Spare Parts", href: "/spare-parts" },
                              { label: "Warranty Claims", href: "/warranty" },
                              { label: "Farming Guides", href: "/guides" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 2. Service Network */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Service Network
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {[
                              { label: "500+ Dealer Centers", href: "/dealers" },
                              { label: "Locate Service Center", href: "/dealers" },
                              { label: "Contact Support Team", href: "/services-events/contact-us" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Spotlight Card */}
                      <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
                        <Link
                          href="/services-events/contact-us"
                          prefetch={false}
                          onClick={handleLinkClick}
                          className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-md border border-neutral-200 group bg-neutral-950 block"
                        >
                          <Image
                            src="/images/mega-menu/field_technician.jpg"
                            alt="Professional Technician Services"
                            fill
                            sizes="320px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                            <div className="text-[10px] font-black uppercase tracking-wider text-neutral-200 mb-1">
                              PROFESSIONAL TECHNICIAN SERVICES
                            </div>
                            <span className="inline-block self-start px-2 py-0.5 rounded-full bg-brand-red text-white text-[9px] font-extrabold uppercase tracking-wider mb-1 shadow-xs">
                              GENUINE CARE
                            </span>
                            <h4 className="text-white font-bold text-xs sm:text-sm leading-snug drop-shadow-sm">
                              Field-Ready Mechanics Nationwide
                            </h4>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* ── STATE 04: COMPANY ──────────────────────────────── */}
                  {activeDropdown === "Company" && (
                    <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10">
                      {/* Left Column: Intro */}
                      <div className="w-full lg:w-60 shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-100 pb-6 lg:pb-0 lg:pr-8">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-extrabold text-brand-red uppercase tracking-wider mb-2.5">
                            <span className="w-3 h-0.5 bg-brand-red" />
                            <span>KOREVA GLOBAL</span>
                          </div>
                          <h3 className="text-2xl lg:text-[28px] font-black text-neutral-950 uppercase tracking-tight leading-none mb-3 font-manrope">
                            GROWING<br />TOGETHER
                          </h3>
                          <p className="text-xs text-neutral-500 leading-relaxed max-w-55 font-medium">
                            Learn about our journey, values, manufacturing strength and commitment to a sustainable future.
                          </p>
                        </div>
                        <div className="pt-6">
                          <Link
                            href="/about"
                            prefetch={false}
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-red-700 uppercase tracking-wider group transition-colors"
                          >
                            <span>ABOUT US</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Middle: 2 Category Columns */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                        {/* 1. About Koreva */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Building2 className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              About Koreva
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {[
                              { label: "Our Story", href: "/about" },
                              { label: "Manufacturing Strength", href: "/manufacturing" },
                              { label: "Sustainability", href: "/about#sustainability" },
                              { label: "Careers", href: "/services-events/contact-us" },
                            ].map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={handleLinkClick}
                                  className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 2. Partnership */}
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Handshake className="w-4 h-4 text-brand-red shrink-0" />
                            <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                              Partnership
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            <li>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  openJoinModal();
                                }}
                                className="w-full flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium cursor-pointer text-left"
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">Be a Dealer</span>
                                <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  openJoinModal();
                                }}
                                className="w-full flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium cursor-pointer text-left"
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">Join Network</span>
                                <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                              </button>
                            </li>
                            <li>
                              <Link
                                href="/services-events/contact-us"
                                prefetch={false}
                                onClick={handleLinkClick}
                                className="flex items-center justify-between text-xs text-neutral-600 hover:text-brand-red py-1 transition-colors group font-medium"
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">Contact Us</span>
                                <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Right Spotlight Card */}
                      <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
                        <Link
                          href="/manufacturing"
                          prefetch={false}
                          onClick={handleLinkClick}
                          className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-md border border-neutral-200 group bg-neutral-950 block"
                        >
                          <Image
                            src="/images/mega-menu/robotic_factory.jpg"
                            alt="High-Precision Robotic Assembly"
                            fill
                            sizes="320px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-4">
                            <span className="inline-block self-start px-2.5 py-0.5 rounded-full bg-brand-red text-white text-[9px] font-extrabold uppercase tracking-wider mb-1.5 shadow-xs">
                              PLANT &amp; FACILITY
                            </span>
                            <h4 className="text-white font-bold text-sm leading-snug drop-shadow-sm">
                              High-Precision Robotic Assembly
                            </h4>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* ── Mobile Navigation Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-90 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-100 w-[88vw] max-w-sm h-full bg-white border-l border-neutral-200 shadow-2xl flex flex-col justify-between md:hidden font-manrope"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <Link
                  href="/"
                  prefetch={false}
                  onClick={handleLinkClick}
                  className="flex items-center"
                >
                  <Image
                    src="/trademark.webp"
                    alt="Koreva 9"
                    width={116}
                    height={24}
                    style={{ width: "auto" }}
                    className="h-6 w-auto object-contain"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 overflow-y-auto">
                {/* 1. Products Section */}
                <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/50">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("Products")}
                    className="w-full p-3.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-100/80 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Tractor className="w-3.5 h-3.5 text-brand-red" />
                      <span>Products</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedMobileSection === "Products" ? "rotate-180 text-brand-red" : "text-neutral-400"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedMobileSection === "Products" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-3.5 space-y-2.5 pt-1 text-xs font-medium border-t border-neutral-200 bg-white"
                      >
                        <Link
                          href="/products"
                          prefetch={false}
                          className="block text-brand-red font-bold hover:underline py-1"
                          onClick={handleLinkClick}
                        >
                          View Complete Catalog &gt;
                        </Link>
                        <div className="space-y-1 pl-2 border-l-2 border-neutral-200">
                          <Link
                            href="/products/tractor-attachments"
                            prefetch={false}
                            className="block py-1 text-neutral-900 font-semibold hover:text-brand-red"
                            onClick={handleLinkClick}
                          >
                            Tractor Attachments
                          </Link>
                          <Link
                            href="/products/self-propelled-machinery"
                            prefetch={false}
                            className="block py-1 text-neutral-900 font-semibold hover:text-brand-red"
                            onClick={handleLinkClick}
                          >
                            Self Propelled Gear
                          </Link>
                          <Link
                            href="/products/food-processing-units"
                            prefetch={false}
                            className="block py-1 text-neutral-900 font-semibold hover:text-brand-red"
                            onClick={handleLinkClick}
                          >
                            Processing Units
                          </Link>
                          <Link
                            href="/products/lubricants"
                            prefetch={false}
                            className="block py-1 text-neutral-900 font-semibold hover:text-brand-red"
                            onClick={handleLinkClick}
                          >
                            STOU Lubricants
                          </Link>
                          <Link
                            href="/products/hand-tools"
                            prefetch={false}
                            className="block py-1 text-neutral-900 font-semibold hover:text-brand-red"
                            onClick={handleLinkClick}
                          >
                            Hand Tools
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Resources Section */}
                <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/50">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("Resources")}
                    className="w-full p-3.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-100/80 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-brand-red" />
                      <span>Resources</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedMobileSection === "Resources" ? "rotate-180 text-brand-red" : "text-neutral-400"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedMobileSection === "Resources" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-3.5 space-y-1.5 pt-1 text-xs font-medium border-t border-neutral-200 bg-white"
                      >
                        <Link href="/guides" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Farm Guides &amp; Articles
                        </Link>
                        <Link href="/compare" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Equipment Comparison Tool
                        </Link>
                        <Link href="/downloads" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Product Catalogue &amp; Manuals
                        </Link>
                        <Link href="/faq" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Frequently Asked Questions
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Service & Support Section */}
                <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/50">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("Service")}
                    className="w-full p-3.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-100/80 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <LifeBuoy className="w-3.5 h-3.5 text-brand-red" />
                      <span>Service &amp; Support</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedMobileSection === "Service" ? "rotate-180 text-brand-red" : "text-neutral-400"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedMobileSection === "Service" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-3.5 space-y-1.5 pt-1 text-xs font-medium border-t border-neutral-200 bg-white"
                      >
                        <Link href="/dealers" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Dealer Locator (500+ Centers)
                        </Link>
                        <Link href="/spare-parts" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Spare Parts Inventory
                        </Link>
                        <Link href="/warranty" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Warranty Claims &amp; Policy
                        </Link>
                        <Link href="/services-events/contact-us" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Contact Support Team
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Company Section */}
                <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/50">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("Company")}
                    className="w-full p-3.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-100/80 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-brand-red" />
                      <span>Company</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedMobileSection === "Company" ? "rotate-180 text-brand-red" : "text-neutral-400"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedMobileSection === "Company" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-3.5 space-y-1.5 pt-1 text-xs font-medium border-t border-neutral-200 bg-white"
                      >
                        <Link href="/about" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          About Koreva
                        </Link>
                        <Link href="/manufacturing" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Manufacturing Strength
                        </Link>
                        <Link href="/news" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Corporate News &amp; Events
                        </Link>
                        <Link href="/services-events/contact-us" prefetch={false} className="block py-1 text-neutral-800 hover:text-brand-red" onClick={handleLinkClick}>
                          Careers &amp; Contact
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-neutral-200 space-y-2.5 bg-neutral-50">
                <Link
                  href="/dealers"
                  prefetch={false}
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-neutral-300 bg-white text-neutral-900 font-bold text-xs uppercase tracking-wider hover:bg-neutral-100 transition-colors shadow-2xs"
                >
                  <Store className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Find a Dealer</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    openJoinModal();
                  }}
                  className="w-full py-3 rounded-full bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Join Network</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="pt-2 text-center text-[11px] text-neutral-500 font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Phone className="w-3 h-3 text-brand-red" />
                  <a href="tel:+917455973188" className="hover:text-neutral-900">
                    Hotline: +91 7455 973 188
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
