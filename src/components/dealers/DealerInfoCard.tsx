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
  return (
    <div 
      className={`flex flex-col bg-white overflow-hidden w-full h-full ${!isPopup ? 'glass-card border border-light-300/80 rounded-2xl hover:shadow-md transition-all cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="p-5 md:p-6 flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="font-jost text-lg font-extrabold text-dark-900 uppercase leading-tight flex items-center gap-1 group">
            {dealer.name}
            <ChevronRight size={18} className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          {distance !== undefined && (
            <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel text-brand-red text-xs font-jost font-bold border border-brand-red/20 shadow-xs">
               <Navigation size={12} />
               {distance.toFixed(1)} km
            </span>
          )}
        </div>

        {/* Address & Button Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-stretch">
          <div className="flex-1 flex gap-3">
             <Home size={18} className="shrink-0 text-brand-red mt-0.5" />
             <div className="flex flex-col font-jost text-xs md:text-sm text-dark-700 font-medium uppercase">
               <span>{dealer.addressLine1}</span>
               <span>{dealer.addressLine2}</span>
               <span>{dealer.addressLine3}</span>
               <a 
                 href={dealer.mapLink || `https://maps.google.com/?q=${dealer.coordinates.lat},${dealer.coordinates.lng}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mt-2 font-bold text-brand-red flex items-center gap-1 hover:underline text-xs tracking-wider uppercase"
                 onClick={(e) => e.stopPropagation()}
               >
                 Get directions <ExternalLink size={12} />
               </a>
             </div>
          </div>
          
          <div className="sm:w-[200px] shrink-0">
             <button className="w-full bg-brand-black text-white font-jost text-xs uppercase tracking-wider font-extrabold py-3 px-4 rounded-full hover:bg-brand-red transition-all shadow-xs active:scale-95">
               Dealer Information
             </button>
          </div>
        </div>


        {/* Contact Info */}
        <div className="flex flex-col gap-3 mt-2">
          {dealer.contactNo && (
            <div className="flex items-center gap-3 text-[#1a1a1a] font-jost text-[14px] font-[600]">
              <Phone size={18} className="shrink-0" />
              <span>{dealer.contactNo}</span>
            </div>
          )}

          {dealer.email && (
            <div className="flex items-center gap-3 text-[#1a1a1a] font-jost text-[14px] font-[600]">
              <AtSign size={18} className="shrink-0" />
              <span className="break-all">{dealer.email}</span>
            </div>
          )}
        </div>

        {/* Assortment */}
        <div className="mt-4 flex flex-col gap-2 flex-1">
          <span className="font-jost text-sm font-[700] text-brand-dark">Assortment</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {dealer.assortment.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-dark-700 font-jost text-sm">
                <Check size={14} className="text-brand-red shrink-0" /> 
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
