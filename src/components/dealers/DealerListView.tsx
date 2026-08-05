"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Dealer } from '@/lib/types';
import SearchFilters from './SearchFilters';
import DealerInfoCard from './DealerInfoCard';
import { MapPin, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/useModalStore';

// Dynamically import DealerMap with SSR disabled
const DealerMap = dynamic(() => import('./DealerMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[380px] sm:h-[480px] lg:h-[600px] glass-panel border border-light-300 rounded-3xl animate-pulse flex items-center justify-center font-jost text-dark-500 uppercase tracking-wider text-xs sm:text-sm font-extrabold">Loading Map Interface...</div>
});

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface DealerListViewProps {
  initialDealers: Dealer[];
  defaultCenter: { lat: number; lng: number };
}

export default function DealerListView({ initialDealers, defaultCenter }: DealerListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRadius, setActiveRadius] = useState(140);
  const [activeLocation, setActiveLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeLocationName, setActiveLocationName] = useState<string>('');
  const router = useRouter();
  const { openJoinModal } = useModalStore();

  // View toggle
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');

  const resetCriteria = () => {
    setSearchTerm('');
    setActiveRadius(500);
    setActiveLocation(null);
    setActiveLocationName('');
  };

  const filteredDealers = useMemo(() => {
    return initialDealers.filter(dealer => {
      // Text Search
      const searchMatch = !searchTerm ||
        dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dealer.addressLine1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dealer.addressLine2.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dealer.addressLine3.toLowerCase().includes(searchTerm.toLowerCase());

      if (!searchMatch) return false;

      // Radius Search
      if (activeLocation) {
        const distance = calculateDistance(
          activeLocation.lat, activeLocation.lng,
          dealer.coordinates.lat, dealer.coordinates.lng
        );
        if (distance > activeRadius) return false;
      }

      return true;
    });
  }, [initialDealers, searchTerm, activeRadius, activeLocation]);

  const currentCenter = activeLocation || defaultCenter;

  return (
    <div className="flex flex-col w-full font-jost">
      <SearchFilters
        onSearch={setSearchTerm}
        onRadiusChange={setActiveRadius}
        onLocationChange={(coords, locName) => {
          setActiveLocation(coords);
          if (locName) setActiveLocationName(locName);
        }}
        activeRadius={activeRadius}
      />

      {/* Tabs */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-light-300">
        <div className="flex items-center gap-2 p-1 glass-panel border border-light-300 rounded-full shadow-xs">
          <button
            onClick={() => setActiveView('map')}
            className={`py-2 px-6 rounded-full font-jost text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeView === 'map' ? 'bg-brand-red text-white shadow-xs' : 'text-dark-700 hover:text-dark-900'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`py-2 px-6 rounded-full font-jost text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeView === 'list' ? 'bg-brand-red text-white shadow-xs' : 'text-dark-700 hover:text-dark-900'
            }`}
          >
            List View
          </button>
        </div>
        <div className="text-xs font-extrabold uppercase tracking-widest text-dark-500 hidden sm:block">
          {filteredDealers.length} Authorized Dealer{filteredDealers.length !== 1 ? 's' : ''} Found
        </div>
      </div>

      <div className="w-full">
        {filteredDealers.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center gap-6 glass-panel border border-light-300 rounded-3xl shadow-xs mt-2">
            <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center shadow-xs">
              <MapPin className="w-8 h-8" />
            </div>
            <p className="font-jost text-lg md:text-xl text-dark-900 font-extrabold max-w-2xl leading-relaxed uppercase">
              Our dealer network currently hasn&apos;t extended to <br />
              <span className="text-brand-red">&apos;{activeLocationName || searchTerm || "this area"}&apos;</span>.
            </p>

            <div className="w-16 h-1 bg-light-300 rounded-full my-2"></div>

            <div className="flex flex-col items-center gap-4">
              <p className="font-jost text-sm text-dark-600 font-bold">
                Looking to Join Our Network as a Regional Dealer?
              </p>
              <button
                onClick={openJoinModal}
                className="px-8 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold transition-all shadow-md group flex items-center gap-2 uppercase tracking-wider text-xs active:scale-95 cursor-pointer"
              >
                <span>Apply for Dealership</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <button
              onClick={resetCriteria}
              className="mt-4 font-jost text-xs text-dark-500 hover:text-brand-red font-bold uppercase tracking-wider underline transition-all cursor-pointer"
            >
              Clear Search Filters
            </button>
          </div>
        ) : activeView === 'map' ? (
          <div className="w-full h-[400px] sm:h-[500px] lg:h-[620px] border border-light-300 relative z-0 bg-white rounded-3xl overflow-hidden shadow-md">
            <DealerMap
              dealers={filteredDealers}
              center={currentCenter}
              userLocation={activeLocation}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map(dealer => {
              let distance: number | undefined = undefined;
              if (activeLocation) {
                distance = calculateDistance(
                  activeLocation.lat, activeLocation.lng,
                  dealer.coordinates.lat, dealer.coordinates.lng
                );
              }
              return (
                <div key={dealer.id} className="block h-full">
                  <DealerInfoCard
                    dealer={dealer}
                    distance={distance}
                    onClick={() => router.push(`/dealers/${dealer.id}`)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
