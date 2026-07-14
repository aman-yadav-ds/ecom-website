"use client";

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (term: string) => void;
  onRadiusChange: (radius: number) => void;
  onLocationChange: (coords: { lat: number; lng: number } | null, locationName?: string) => void;
  activeRadius: number;
}

const RADIUS_OPTIONS = [10, 20, 50, 100];

export default function SearchFilters({
  onSearch,
  onRadiusChange,
  onLocationChange,
  activeRadius
}: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      onSearch('');
      onLocationChange(null);
      return;
    }
    
    setIsLocating(true);
    try {
      // Use Nominatim to geocode the input string
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        // Geocode successful: treat as location search
        onLocationChange({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        }, data[0].display_name);
        // Clear text match in parent so we only use radius logic
        onSearch('');
      } else {
        // Geocode failed: treat as a direct text search (Dealer Name)
        onLocationChange(null, searchTerm);
        onSearch(searchTerm);
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
      // Fallback to text search on error
      onLocationChange(null, searchTerm);
      onSearch(searchTerm);
    } finally {
      setIsLocating(false);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        onLocationChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, 'Your Location');
        onSearch(''); // Clear text search
        setSearchTerm(''); // Clear input box for clarity
      },
      (error) => {
        setIsLocating(false);
        console.error("Error getting location", error);
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full mb-8">
      {/* Search Header and Input */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <h2 className="font-jost text-xl lg:text-2xl font-[700] text-brand-dark uppercase tracking-wider shrink-0 w-full lg:w-auto text-center lg:text-left">
          Search for a dealer
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full flex items-center border-b-2 border-brand-dark">
            <input
              type="text"
              placeholder="TOWN / POSTCODE / DEALER NAME"
              className="w-full bg-transparent text-brand-dark placeholder-dark-500 font-jost text-lg lg:text-xl py-3 pl-2 pr-12 focus:outline-none uppercase font-[600]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 text-brand-dark hover:text-brand-red transition-colors" disabled={isLocating}>
              <Search size={28} strokeWidth={2.5} className={isLocating ? 'animate-pulse' : ''} />
            </button>
          </form>
          
          <button
            type="button"
            onClick={requestLocation}
            disabled={isLocating}
            className="flex items-center justify-center gap-2 shrink-0 text-brand-dark hover:text-brand-red transition-colors font-jost text-[16px] font-[600] disabled:opacity-50"
          >
            <MapPin size={20} strokeWidth={2.5} />
            {isLocating ? 'Locating...' : 'Use my location'}
          </button>
        </div>
      </div>

      {/* Filters & Distance */}
      <div className="flex flex-col gap-2">
        <label className="font-jost text-sm text-dark-700">Max. distance:</label>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={activeRadius}
              onChange={(e) => onRadiusChange(Number(e.target.value))}
              className="appearance-none bg-light-100 border border-light-300 text-brand-dark font-jost text-sm py-2 pl-4 pr-10 focus:outline-none cursor-pointer min-w-[150px] shadow-sm hover:border-dark-500 transition-colors"
            >
              {RADIUS_OPTIONS.map((radius) => (
                <option key={radius} value={radius}>{radius} km</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-dark">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
