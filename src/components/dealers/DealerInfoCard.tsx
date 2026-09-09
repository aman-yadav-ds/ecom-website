import React from 'react';
import { Home, Phone, AtSign, ChevronRight, Navigation, ExternalLink, Check } from 'lucide-react';
import { Dealer } from '@/lib/types';

interface DealerInfoCardProps {
  dealer: Dealer;
  onClick?: () => void;
  isPopup?: boolean;
  distance?: number;
}

export default function DealerInfoCard({ dealer, onClick, isPopup = false, distance }: DealerInfoCardProps) {
  if (isPopup) {
    return (
      <div 
        className="flex flex-col bg-white p-3.5 sm:p-4 gap-2.5 font-jost w-[290px] sm:w-[320px] select-none text-left"
        onClick={onClick}
      >
        {/* Header */}
        <div className="flex justify-between items-start gap-2 pr-6">
          <h3 className="font-extrabold text-sm sm:text-base text-dark-900 uppercase leading-snug line-clamp-2">
            {dealer.name}
          </h3>
          {distance !== undefined && (
            <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-red/5 text-brand-red text-[10px] font-bold border border-brand-red/20">
               <Navigation size={10} />
               {distance.toFixed(1)} km
            </span>
          )}
        </div>

        {/* Address */}
        <div className="flex gap-2 items-start text-[11px] sm:text-xs text-dark-700 leading-tight">
          <Home size={14} className="shrink-0 text-brand-red mt-0.5" />
          <div className="flex flex-col">
            <span className="line-clamp-2">{[dealer.addressLine1, dealer.addressLine2, dealer.addressLine3].filter(Boolean).join(', ')}</span>
            <a 
              href={dealer.mapLink || `https://maps.google.com/?q=${dealer.coordinates.lat},${dealer.coordinates.lng}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-1 font-bold text-brand-red flex items-center gap-1 hover:underline text-[11px] uppercase tracking-wide"
              onClick={(e) => e.stopPropagation()}
            >
              Get directions <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Contact Row */}
        {(dealer.contactNo || dealer.email) && (
          <div className="flex flex-col gap-1 pt-2 border-t border-light-200 text-[11px] font-semibold text-dark-800">
            {dealer.contactNo && (
              <a
                href={`tel:${dealer.contactNo}`}
                className="flex items-center gap-2 hover:text-brand-red transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={12} className="shrink-0 text-brand-red" />
                <span>{dealer.contactNo}</span>
              </a>
            )}
            {dealer.email && (
              <a
                href={`mailto:${dealer.email}`}
                className="flex items-center gap-2 hover:text-brand-red transition-colors truncate"
                onClick={(e) => e.stopPropagation()}
              >
                <AtSign size={12} className="shrink-0 text-brand-red" />
                <span className="truncate">{dealer.email}</span>
              </a>
            )}
          </div>
        )}

        {/* Assortment Tags */}
        {dealer.assortment?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-light-200">
            {dealer.assortment.slice(0, 3).map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[10px] text-dark-600 bg-light-200 px-2 py-0.5 rounded font-medium">
                <Check size={10} className="text-brand-red shrink-0" />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col bg-white overflow-hidden w-full h-full glass-card border border-light-300/80 rounded-2xl hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="p-5 md:p-6 flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-jost text-base md:text-lg font-extrabold text-dark-900 uppercase leading-tight flex items-center gap-1 group">
            {dealer.name}
            <ChevronRight size={16} className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          {distance !== undefined && (
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-panel text-brand-red text-[11px] font-jost font-bold border border-brand-red/20 shadow-xs">
               <Navigation size={11} />
               {distance.toFixed(1)} km
            </span>
          )}
        </div>

        {/* Address & Button Row */}
        <div className={`flex flex-col ${!isPopup ? 'sm:flex-row' : ''} gap-3 items-start sm:items-stretch`}>
          <div className="flex-1 flex gap-2.5">
             <Home size={16} className="shrink-0 text-brand-red mt-0.5" />
             <div className="flex flex-col font-jost text-xs md:text-sm text-dark-700 font-medium uppercase leading-snug">
               <span>{dealer.addressLine1}</span>
               {dealer.addressLine2 && <span>{dealer.addressLine2}</span>}
               {dealer.addressLine3 && <span>{dealer.addressLine3}</span>}
               <a 
                 href={dealer.mapLink || `https://maps.google.com/?q=${dealer.coordinates.lat},${dealer.coordinates.lng}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mt-1.5 font-bold text-brand-red flex items-center gap-1 hover:underline text-xs tracking-wider uppercase"
                 onClick={(e) => e.stopPropagation()}
               >
                 Get directions <ExternalLink size={11} />
               </a>
             </div>
          </div>
          
          {!isPopup && (
            <div className="sm:w-[200px] shrink-0">
               <button className="w-full bg-brand-black text-white font-jost text-xs uppercase tracking-wider font-extrabold py-3 px-4 rounded-full hover:bg-brand-red transition-all shadow-xs active:scale-95">
                 Dealer Information
               </button>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-1.5 pt-1 border-t border-light-200">
          {dealer.contactNo && (
            <a
              href={`tel:${dealer.contactNo}`}
              className="flex items-center gap-2.5 text-[#1a1a1a] font-jost text-xs sm:text-sm font-semibold hover:text-brand-red transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone size={14} className="shrink-0 text-brand-red" />
              <span>{dealer.contactNo}</span>
            </a>
          )}

          {dealer.email && (
            <a
              href={`mailto:${dealer.email}`}
              className="flex items-center gap-2.5 text-[#1a1a1a] font-jost text-xs sm:text-sm font-semibold hover:text-brand-red transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <AtSign size={14} className="shrink-0 text-brand-red" />
              <span className="break-all">{dealer.email}</span>
            </a>
          )}
        </div>

        {/* Assortment */}
        {dealer.assortment?.length > 0 && (
          <div className="pt-1 border-t border-light-200 flex flex-col gap-1.5">
            <span className="font-jost text-xs font-bold text-dark-900 uppercase tracking-wider">Assortment</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {dealer.assortment.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-dark-600 font-jost text-xs">
                  <Check size={12} className="text-brand-red shrink-0" /> 
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
