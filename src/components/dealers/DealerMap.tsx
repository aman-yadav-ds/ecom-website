"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Dealer } from '@/lib/types';
import DealerInfoCard from './DealerInfoCard';

const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY || "cb1_300b_1_118a399be5768f22fe70751b";
const CARTO_VOYAGER_VECTOR_STYLE = `https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json?key=${CARTO_API_KEY}`;

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface DealerMapProps {
  dealers: Dealer[];
  center: { lat: number; lng: number };
  zoom?: number;
  userLocation?: { lat: number; lng: number } | null;
}

function createMarkerElement(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'cursor-pointer select-none';
  el.style.width = '36px';
  el.style.height = '48px';
  el.innerHTML = `
    <div style="position: relative; width: 36px; height: 48px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
      <svg viewBox="0 0 384 512" style="width: 100%; height: 100%; fill: #080808;">
        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path>
      </svg>
      <span style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); color: white; font-weight: 800; font-family: sans-serif; font-size: 16px;">K</span>
    </div>
  `;
  return el;
}

export default function DealerMap({ dealers, center, zoom = 7, userLocation }: DealerMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const [activePopup, setActivePopup] = useState<{
    dealer: Dealer;
    container: HTMLElement;
    distance?: number;
  } | null>(null);

  // Initialize MapLibre vector map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: CARTO_VOYAGER_VECTOR_STYLE,
      center: [center.lng, center.lat],
      zoom: zoom,
      attributionControl: false,
    });

    map.on('load', () => {
      map.resize();
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(
      new maplibregl.AttributionControl({
        customAttribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
      }),
      'bottom-right'
    );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map viewport when center or zoom changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({
      center: [center.lng, center.lat],
      zoom: zoom,
      duration: 600,
    });
  }, [center.lat, center.lng, zoom]);

  // Update markers and popups
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    dealers.forEach((dealer) => {
      let distance: number | undefined;
      if (userLocation) {
        distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          dealer.coordinates.lat,
          dealer.coordinates.lng
        );
      }

      const el = createMarkerElement();
      const popupNode = document.createElement('div');
      popupNode.className = 'koreva-popup-node';

      const popup = new maplibregl.Popup({
        offset: [0, -42],
        closeButton: false,
        maxWidth: '380px',
        className: 'koreva-maplibre-popup',
      }).setDOMContent(popupNode);

      popup.on('open', () => {
        setActivePopup({
          dealer,
          container: popupNode,
          distance,
        });
      });

      popup.on('close', () => {
        setActivePopup((prev) => (prev?.container === popupNode ? null : prev));
      });

      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat([dealer.coordinates.lng, dealer.coordinates.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [dealers, userLocation]);

  return (
    <div className="w-full h-full relative z-0 min-h-[380px] sm:min-h-[480px] lg:min-h-[600px]">
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0" />

      {/* Render React DealerInfoCard inside the active MapLibre popup DOM node */}
      {activePopup &&
        createPortal(
          <DealerInfoCard
            dealer={activePopup.dealer}
            isPopup={true}
            distance={activePopup.distance}
          />,
          activePopup.container
        )}

      {/* MapLibre Popup Styling Overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .koreva-maplibre-popup .maplibregl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 0 !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
        }
        .koreva-maplibre-popup .maplibregl-popup-tip {
          display: none !important;
        }
      `,
        }}
      />
    </div>
  );
}
