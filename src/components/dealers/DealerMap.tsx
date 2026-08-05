"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Dealer } from '@/lib/types';
import DealerInfoCard from './DealerInfoCard';

// Fix Leaflet default icon issues in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

const emptySubscribe = () => () => {};

// Map Updater Component to change center when active location changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
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

interface DealerMapProps {
  dealers: Dealer[];
  center: { lat: number; lng: number };
  zoom?: number;
  userLocation?: { lat: number; lng: number } | null;
}

export default function DealerMap({ dealers, center, zoom = 7, userLocation }: DealerMapProps) {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Custom Icon Creation - Black Teardrop with 'K'
  const createCustomIcon = () => {
    return L.divIcon({
      className: 'bg-transparent border-none',
      html: `
        <div style="position: relative; width: 36px; height: 48px;">
          <svg viewBox="0 0 384 512" style="width: 100%; height: 100%; fill: #080808;">
            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path>
          </svg>
          <span style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); color: white; font-weight: 800; font-family: sans-serif; font-size: 16px;">K</span>
        </div>
      `,
      iconSize: [36, 48],
      iconAnchor: [18, 48],
      popupAnchor: [0, -48],
    });
  };

  if (!mounted) return <div className="w-full h-[380px] sm:h-[480px] lg:h-[600px] bg-gray-100 animate-pulse" />;

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <MapUpdater center={[center.lat, center.lng]} />
        {/* Modern Map Tiles by CARTO */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {dealers.map((dealer) => {
          let distance: number | undefined = undefined;
          if (userLocation) {
             distance = calculateDistance(
               userLocation.lat, userLocation.lng,
               dealer.coordinates.lat, dealer.coordinates.lng
             );
          }
          return (
            <Marker 
              key={dealer.id} 
              position={[dealer.coordinates.lat, dealer.coordinates.lng]}
              icon={createCustomIcon()}
            >
              <Popup className="koreva-popup" closeButton={false}>
                <DealerInfoCard dealer={dealer} isPopup={true} distance={distance} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Global styles for the Leaflet popup override */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 0 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: 360px !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
        .koreva-popup {
           margin-bottom: 12px;
        }
      `}} />
    </div>
  );
}
