"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Dealer } from '@/lib/types';

// Dynamically import DealerMap with SSR disabled
const DealerMap = dynamic(() => import('./DealerMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[--color-dark-900] animate-pulse flex items-center justify-center font-jost text-[--color-dark-500] uppercase tracking-wider">Loading Map Interface...</div>
});

interface DealerMapWrapperProps {
  dealers: Dealer[];
  center: { lat: number; lng: number };
  zoom?: number;
  userLocation?: { lat: number; lng: number } | null;
}

export default function DealerMapWrapper(props: DealerMapWrapperProps) {
  return <DealerMap {...props} />;
}
