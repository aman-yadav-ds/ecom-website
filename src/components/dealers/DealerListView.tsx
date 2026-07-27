"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Dealer } from '@/lib/types';
import SearchFilters from './SearchFilters';
import DealerInfoCard from './DealerInfoCard';
import { AlertCircle, MapPin, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/useModalStore';

// Dynamically import DealerMap with SSR disabled
const DealerMap = dynamic(() => import('./DealerMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[380px] sm:h-[480px] lg:h-[600px] bg-gray-100 animate-pulse flex items-center justify-center font-jost text-gray-400 uppercase tracking-wider text-xs sm:text-sm">Loading Map Interface...</div>
});

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; 
}

interface DealerListViewProps {
  initialDealers: Dealer[];
  defaultCenter: { lat: number; lng: number };
}

export default function DealerListView({ initialDealers, defaultCenter }: DealerListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRadius, setActiveRadius] = useState(50);
  const [activeLocation, setActiveLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeLocationName, setActiveLocationName] = useState<string>('');
  const router = useRouter();
  const { openJoinModal } = useModalStore();
  
  // View toggle
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');

  const resetCriteria = () => {
    setSearchTerm('');
    setActiveRadius(50);
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
    <div className="flex flex-col w-full">
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
      <div className="flex items-end mb-4 border-b border-gray-200">
        <div className="flex border border-gray-200 border-b-0 overflow-hidden">
          <button 
            onClick={() => setActiveView('map')}
            className={`py-3 px-8 font-jost text-sm font-[600] transition-colors ${activeView === 'map' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a1a] hover:bg-gray-50'}`}
          >
            Map
          </button>
          <button 
            onClick={() => setActiveView('list')}
            className={`py-3 px-8 font-jost text-sm font-[600] transition-colors border-l border-gray-200 ${activeView === 'list' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a1a] hover:bg-gray-50'}`}
          >
            List
          </button>
        </div>
        <div className="ml-6 pb-2 text-sm font-jost text-gray-500 hidden sm:block">
          {filteredDealers.length} Search result{filteredDealers.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="w-full">
        {filteredDealers.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-24 px-4 text-center gap-6 bg-light-100 rounded-sm border border-light-300 shadow-sm mt-4">
            <div className="bg-light-200 p-5 rounded-full mb-2">
              <MapPin className="text-dark-500 w-12 h-12" />
            </div>
            <p className="font-jost text-xl md:text-2xl text-brand-dark font-[600] max-w-2xl leading-relaxed">
              Sorry, Our network currently hasn't been extended to <br />
              <span className="text-brand-red">'{activeLocationName || searchTerm || "this area"}'</span>.
            </p>
            
            <div className="w-16 h-1 bg-light-300 my-4"></div>

            <div className="flex flex-col items-center gap-4">
              <p className="font-jost text-lg text-dark-700 font-[500]">
                Looking to Join Our Network?
              </p>
              <button 
                onClick={openJoinModal}
                className="px-8 py-3.5 rounded-full bg-brand-black text-light-100 font-medium hover:bg-brand-red transition-all shadow-md group flex items-center gap-2 uppercase tracking-wider text-sm"
              >
                Join Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <button 
              onClick={resetCriteria}
              className="mt-6 font-jost text-sm text-dark-500 hover:text-brand-dark font-[600] underline transition-all"
            >
              Clear Search Filters
            </button>
          </div>
        ) : activeView === 'map' ? (
          <div className="w-full h-[380px] sm:h-[480px] lg:h-[600px] border border-gray-200 relative z-0 bg-gray-100 mt-4 rounded-sm overflow-hidden">
             <DealerMap 
              dealers={filteredDealers} 
              center={currentCenter}
              userLocation={activeLocation}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
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
