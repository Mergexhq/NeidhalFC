"use client";

import React, { useState } from "react";
import { MapPin, ArrowUpRight, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const MAP_MARKERS = [
  {
    id: "nandanam",
    name: "Nandanam Center",
    coords: { x: "42%", y: "25%" },
    address: "YMCA Grounds, Nandanam, Chennai",
    mapUrl: "https://maps.google.com/?q=YMCA+Nandanam+Chennai",
  },
  {
    id: "kottivakkam",
    name: "Kottivakkam Center",
    coords: { x: "55%", y: "60%" },
    address: "ECR, Near RTO Office, Kottivakkam, Chennai",
    mapUrl: "https://maps.google.com/?q=Kottivakkam+RTO+Office+Chennai",
  },
  {
    id: "injambakkam",
    name: "Injambakkam Center",
    coords: { x: "65%", y: "85%" },
    address: "ECR Coastal Road, Injambakkam, Chennai",
    mapUrl: "https://maps.google.com/?q=Injambakkam+Chennai",
  },
];

export const MapSection: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState(MAP_MARKERS[1]);

  return (
    <section className="py-24 relative overflow-hidden bg-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Block */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
              <span className="h-px w-6 bg-sand" />
              Interactive Map
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight mb-6">
              Chennai Location Hub
            </h2>
            
            <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed mb-8">
              Click on the map markers or the list below to view the address and open direct navigation routes via Google Maps.
            </p>

            <div className="space-y-4 mb-8">
              {MAP_MARKERS.map((marker) => (
                <button
                  key={marker.id}
                  onClick={() => setSelectedMarker(marker)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer",
                    selectedMarker.id === marker.id
                      ? "bg-sand/10 border-sand text-white"
                      : "bg-white/5 border-white/5 text-slate-300 hover:border-white/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <MapPin 
                      size={18} 
                      className={cn(
                        selectedMarker.id === marker.id ? "text-sand" : "text-slate-400"
                      )} 
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm">{marker.name}</h4>
                      <p className="text-xs text-slate-400 font-light mt-0.5">{marker.address}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500 shrink-0" />
                </button>
              ))}
            </div>

            <a
              href={selectedMarker.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider bg-sand hover:bg-sand-dark text-primary-dark shadow-lg transition-all cursor-pointer self-start"
            >
              Open Google Maps Route
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Styled Map Board */}
          <div className="lg:col-span-7">
            <div className="aspect-4/3 rounded-3xl overflow-hidden relative border border-white/10 bg-primary-dark/80 p-8 shadow-2xl flex flex-col justify-between">
              
              {/* Decorative Ocean Grid representing Bay of Bengal */}
              <div className="absolute top-0 bottom-0 right-0 w-[40%] bg-accent/5 border-l border-white/5 flex items-center justify-center pointer-events-none select-none">
                <span className="font-display text-[10px] tracking-widest text-slate-600 uppercase font-black rotate-90">
                  Bay of Bengal (Ocean)
                </span>
              </div>
              
              {/* Compass Indicator */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 text-slate-500 font-display text-[10px] tracking-widest uppercase">
                <Compass size={14} className="animate-spin-slow" />
                North Chennai Map
              </div>

              {/* Styled Coastline curve */}
              <div className="absolute top-0 bottom-0 right-[40%] w-[1px] bg-sand/15 pointer-events-none select-none" />

              {/* Map Coordinates Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Interactive Markers */}
              {MAP_MARKERS.map((marker) => {
                const isSelected = selectedMarker.id === marker.id;
                return (
                  <button
                    key={marker.id}
                    onClick={() => setSelectedMarker(marker)}
                    style={{ left: marker.coords.x, top: marker.coords.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                    aria-label={`Select ${marker.name}`}
                  >
                    <div className="relative">
                      {/* Pulse effect */}
                      <span 
                        className={cn(
                          "absolute -inset-2 rounded-full animate-ping opacity-60",
                          isSelected ? "bg-sand" : "bg-accent"
                        )} 
                      />
                      <div 
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 relative z-10 border",
                          isSelected 
                            ? "bg-sand border-white text-primary-dark scale-110" 
                            : "bg-primary-light border-white/10 text-white hover:scale-105"
                        )}
                      >
                        <MapPin size={14} />
                      </div>
                      
                      {/* Hover details badge */}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-primary-light text-white font-display font-semibold text-[10px] py-1 px-2.5 rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                        {marker.name}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Map Footer Details overlay */}
              <div className="mt-auto relative z-10 glass-panel rounded-2xl p-4 border border-white/10 max-w-sm self-start shadow-xl">
                <span className="text-[9px] uppercase tracking-widest font-semibold text-sand block mb-1">Selected Location Details</span>
                <h4 className="font-display font-black text-sm text-white">{selectedMarker.name}</h4>
                <p className="text-xs text-slate-400 font-light mt-1">{selectedMarker.address}</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MapSection;
