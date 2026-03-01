"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  center: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title?: string;
    icon?: L.Icon | L.DivIcon;
  }>;
  className?: string;
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

const MapView = ({ center, zoom = 13, markers = [], className }: MapViewProps) => {
  return (
    <div className={`${className} relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl`}>
      {/* Futuristic Map Overlay */}
      <div className="absolute inset-0 z-[400] pointer-events-none border-[12px] border-[#02040a]/20 rounded-[2rem]" />
      
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', background: '#02040a' }}
        zoomControl={false}
        scrollWheelZoom={false}
        className="futuristic-map"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <ChangeView center={center} zoom={zoom} />
        {markers.map((marker, idx) => (
          <Marker 
            key={`${idx}-${marker.position[0]}-${marker.position[1]}`} 
            position={marker.position} 
            icon={marker.icon || DefaultIcon}
          >
            {marker.title && (
              <Popup className="futuristic-popup">
                <div className="text-xs font-bold text-slate-800 p-1">
                  {marker.title}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        .futuristic-map .leaflet-tile-pane {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(170deg) brightness(0.3) invert(1);
        }
        .futuristic-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(20, 184, 166, 0.3);
        }
        .futuristic-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
};

export default MapView;