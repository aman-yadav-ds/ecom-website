"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Dealer } from "@/lib/types";
import DealerInfoCard from "./DealerInfoCard";

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

// Koreva Red Branded Pin Marker
function createKorevaIcon(): L.DivIcon {
  return L.divIcon({
    className: "koreva-marker-wrapper",
    html: `
      <div style="position: relative; width: 38px; height: 50px; cursor: pointer; filter: drop-shadow(0 6px 12px rgba(196,0,0,0.35)); transition: transform 0.2s ease;">
        <svg viewBox="0 0 384 512" style="width: 100%; height: 100%; fill: #C40000; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
          <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path>
        </svg>
        <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 22px; height: 22px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
          <span style="color: #C40000; font-weight: 900; font-family: sans-serif; font-size: 13px; line-height: 1;">K</span>
        </div>
      </div>
    `,
    iconSize: [38, 50],
    iconAnchor: [19, 50],
    popupAnchor: [0, -48],
  });
}

// User Location Pulsing Beacon Marker
function createUserLocationIcon(): L.DivIcon {
  return L.divIcon({
    className: "koreva-user-marker-wrapper",
    html: `
      <div style="position: relative; width: 28px; height: 28px;">
        <div style="position: absolute; inset: -4px; background: #2563eb; border-radius: 50%; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: absolute; inset: 2px; background: #2563eb; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

export default function DealerMap({ dealers, center, zoom = 7, userLocation }: DealerMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [activePopup, setActivePopup] = useState<{
    dealer: Dealer;
    container: HTMLElement;
    distance?: number;
  } | null>(null);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: [center.lat, center.lng],
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
    });

    // Add Zoom Control at top right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Standard OpenStreetMap Tiles (100% Free, Open-Source, Zero Watermarks, Zero API Keys)
    const osmLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
        subdomains: ["a", "b", "c"],
        maxZoom: 19,
      }
    );

    // Alternative High-Contrast Street Tile Layer
    const esriStreetLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
      }
    );

    osmLayer.addTo(map);

    // Optional tile error fallback to Esri Streets
    osmLayer.on("tileerror", () => {
      if (!map.hasLayer(esriStreetLayer)) {
        esriStreetLayer.addTo(map);
      }
    });

    // Attribution control
    L.control
      .attribution({
        position: "bottomright",
        prefix: '<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>',
      })
      .addTo(map);

    // Layer group for dealer markers
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapRef.current = map;

    // Force tile recalculation on load/resize
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // 2. Pan/Fly when center or zoom changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo([center.lat, center.lng], zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [center.lat, center.lng, zoom]);

  // 3. Update User Location Marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: createUserLocationIcon(),
        zIndexOffset: 1000,
      })
        .bindTooltip("Your Location", { direction: "top", offset: [0, -14] })
        .addTo(map);

      userMarkerRef.current = userMarker;
    }
  }, [userLocation]);

  // 4. Update Dealer Markers & Popups
  useEffect(() => {
    const map = mapRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const bounds = L.latLngBounds([]);

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

      const popupNode = document.createElement("div");
      popupNode.className = "koreva-popup-portal-node";

      const popup = L.popup({
        offset: [0, -38],
        maxWidth: 340,
        minWidth: 260,
        className: "koreva-leaflet-popup",
        closeButton: true,
        autoPan: true,
        autoPanPadding: L.point(40, 40),
      }).setContent(popupNode);

      popup.on("add", () => {
        setActivePopup({
          dealer,
          container: popupNode,
          distance,
        });
      });

      popup.on("remove", () => {
        setActivePopup((prev) => (prev?.container === popupNode ? null : prev));
      });

      const marker = L.marker([dealer.coordinates.lat, dealer.coordinates.lng], {
        icon: createKorevaIcon(),
      })
        .bindPopup(popup)
        .addTo(markersLayer);

      bounds.extend([dealer.coordinates.lat, dealer.coordinates.lng]);
    });

    // If multiple dealers and no specific center override, fit bounds nicely
    if (dealers.length > 1 && !userLocation) {
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 12,
        animate: true,
      });
    }
  }, [dealers, userLocation]);

  return (
    <div className="w-full h-full relative z-0 min-h-[380px] sm:min-h-[480px] lg:min-h-[600px] font-jost">
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />

      {/* Render React DealerInfoCard inside the active Leaflet popup container */}
      {activePopup &&
        createPortal(
          <DealerInfoCard
            dealer={activePopup.dealer}
            isPopup={true}
            distance={activePopup.distance}
          />,
          activePopup.container
        )}

      {/* Leaflet Custom Styling Overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .koreva-marker-wrapper {
          background: transparent !important;
          border: none !important;
        }
        .koreva-marker-wrapper:hover > div {
          transform: scale(1.1) translateY(-4px);
        }
        .koreva-user-marker-wrapper {
          background: transparent !important;
          border: none !important;
        }
        .koreva-leaflet-popup .leaflet-popup-content-wrapper {
          background: white !important;
          padding: 0 !important;
          border-radius: 1.25rem !important;
          box-shadow: 0 16px 40px -8px rgba(0,0,0,0.22), 0 0 1px 1px rgba(0,0,0,0.06) !important;
          overflow: hidden !important;
        }
        .koreva-leaflet-popup .leaflet-popup-content {
          margin: 0 !important;
          line-height: normal !important;
          width: 360px !important;
          max-width: 85vw !important;
        }
        .koreva-leaflet-popup .leaflet-popup-tip-container {
          display: block !important;
          margin-top: -1px !important;
        }
        .koreva-leaflet-popup .leaflet-popup-tip {
          background: white !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        .koreva-leaflet-popup a.leaflet-popup-close-button {
          top: 14px !important;
          right: 14px !important;
          width: 24px !important;
          height: 24px !important;
          border-radius: 50% !important;
          background: rgba(0,0,0,0.06) !important;
          color: #444 !important;
          font-size: 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 20 !important;
          transition: all 0.2s ease !important;
        }
        .koreva-leaflet-popup a.leaflet-popup-close-button:hover {
          background: #C40000 !important;
          color: white !important;
        }
        .leaflet-control-zoom {
          border: 1px solid #E5E5E5 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          margin-top: 16px !important;
          margin-right: 16px !important;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #111 !important;
          font-weight: bold !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          transition: background 0.2s ease !important;
        }
        .leaflet-control-zoom a:hover {
          background: #F5F5F5 !important;
          color: #C40000 !important;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `,
        }}
      />
    </div>
  );
}
