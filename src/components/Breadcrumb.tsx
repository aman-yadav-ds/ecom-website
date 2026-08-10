"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  // Generate the page name based on the pathname
  let pageName = "";
  
  // Special cases or manual mapping
  if (pathname === '/dealers') {
    pageName = "FIND YOUR LOCAL KOREVA DEALER";
  } else if (pathname === '/about') {
    pageName = "ABOUT KOREVA9";
  } else if (pathname === '/services-events') {
    pageName = "SERVICES AND EVENTS";
  } else if (pathname === '/services-events/contact-us') {
    pageName = "CONTACT US";
  } else if (pathname === '/compare') {
    pageName = "COMPARE PRODUCTS";
  } else if (pathname.startsWith('/products')) {
    if (pathname === '/products') {
      pageName = "PRODUCTS";
    } else {
      pageName = "PRODUCT DETAILS";
    }
  } else {
    // Fallback: capitalize the path parts
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length > 0) {
      pageName = parts[0].replace(/-/g, ' ').toUpperCase();
    }
  }

  return (
    <div className="bg-light-200 py-3 px-4 md:px-8 border-b border-light-300 text-sm font-jost text-dark-700">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <Link href="/" prefetch={false} className="hover:text-brand-red transition-colors">Koreva9</Link>
        <span>&gt;</span>
        <span className="font-[600] text-brand-dark uppercase">{pageName}</span>
      </div>
    </div>
  );
}
