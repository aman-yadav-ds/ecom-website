"use client";

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (term: string) => void;
  onRadiusChange: (radius: number) => void;
  onLocationChange: (coords: { lat: number; lng: number } | null, locationName?: string) => void;
  activeRadius: number;
}

const RADIUS_OPTIONS = [10, 20, 50, 100, 200, 500];

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
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        onLocationChange({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        }, data[0].display_name);
        onSearch('');
      } else {
        onLocationChange(null, searchTerm);
        onSearch(searchTerm);
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
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
        onSearch('');
        setSearchTerm('');
      },
      (error) => {
        setIsLocating(false);
        console.error("Error getting location", error);
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full mb-8 font-jost">
      {/* Search Header and Input */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <h2 className="text-lg lg:text-xl font-extrabold text-dark-900 uppercase tracking-wider shrink-0 w-full lg:w-auto text-center lg:text-left">
          Search Dealers
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full flex items-center glass-panel-elevated border border-light-300 rounded-full px-4 py-1.5 shadow-xs focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red transition-all">
            <input
              type="text"
              placeholder="Enter Town, Postcode, or Dealer Name..."
              className="w-full bg-transparent text-dark-900 placeholder-dark-400 font-jost text-sm md:text-base py-2.5 pl-2 pr-10 focus:outline-none uppercase font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-3 text-brand-red hover:text-brand-red-accent transition-colors p-1" disabled={isLocating}>
              <Search size={22} className={isLocating ? 'animate-pulse' : ''} />
            </button>
          </form>
          
          <button
            type="button"
            onClick={requestLocation}
            disabled={isLocating}
            className="flex items-center justify-center gap-2 shrink-0 glass-panel border border-light-300 hover:border-brand-red text-dark-900 hover:text-brand-red transition-all font-jost text-xs uppercase tracking-wider font-extrabold px-6 py-3.5 rounded-full shadow-xs disabled:opacity-50 active:scale-95 cursor-pointer"
          >
            <MapPin size={18} className="text-brand-red" />
            <span>{isLocating ? 'Locating...' : 'Use My Location'}</span>
          </button>
        </div>
      </div>

      {/* Filters & Distance */}
      <div className="flex items-center gap-3">
        <label className="font-jost text-xs font-extrabold text-dark-600 uppercase tracking-wider">Max Distance:</label>
        <div className="relative">
          <select
            value={activeRadius}
            onChange={(e) => onRadiusChange(Number(e.target.value))}
            className="appearance-none bg-white border border-light-300 text-dark-900 font-jost text-xs font-extrabold uppercase py-2 pl-4 pr-10 rounded-full focus:outline-none cursor-pointer min-w-[130px] shadow-xs hover:border-brand-red transition-colors"
          >
            {RADIUS_OPTIONS.map((radius) => (
              <option key={radius} value={radius}>{radius} km Radius</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-dark-600">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
