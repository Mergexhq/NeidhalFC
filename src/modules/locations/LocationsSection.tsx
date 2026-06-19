"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LOCATIONS = [
  {
    chapter: "Chapter 2: Kottivakkam",
    id: "kottivakkam",
    title: "Kottivakkam Hub",
    personality: "Our home base. Just steps from the sea breeze where sand conditioning meets turf execution.",
    address: "Near RTO Office, ECR Coastal Road, Kottivakkam, Chennai",
    days: "Tuesday, Thursday & Saturday",
    times: "Morning: 6:00 AM - 7:30 AM (Sat)\nEvening: 4:30 PM - 6:00 PM (Weekdays)",
    coach: "Pradeep Ramesh",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.665977934442!2d80.2543!3d12.9612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d625d9962a7%3A0xe9f70cd56b009e4f!2sKottivakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
  },
  {
    chapter: "Chapter 3: Injambakkam",
    id: "injambakkam",
    title: "Injambakkam Hub",
    personality: "Where the play is fast and fluid. Highly technical ECR coastal turf training for our junior squads.",
    address: "ECR Coastal Play-turf, Injambakkam, Chennai",
    days: "Monday, Wednesday & Friday",
    times: "Evening: 4:30 PM - 5:45 PM (U6-U8) / 4:30 PM - 6:00 PM (U9-U12)",
    coach: "Vijay Balan",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.378901234567!2d80.2505!3d12.9152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c38ffffffef%3A0xabcdefabcdef!2sInjambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000001!5m2!1sen!2sin",
  },
  {
    chapter: "Chapter 4: Nandanam",
    id: "nandanam",
    title: "Nandanam Hub",
    personality: "Our central hub. Professional turf facility in the heart of Chennai, designed for spatial tactics and high-intensity match dynamics.",
    address: "Central Coaching Turf Facility, YMCA Ground, Nandanam, Chennai",
    days: "Wednesday, Friday & Sunday",
    times: "Morning: 6:30 AM - 8:00 AM (Sun)\nEvening: 5:00 PM - 6:30 PM (Weekdays)",
    coach: "Vijay Balan",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.234567890123!2d80.2378!3d13.0298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d32512d7bf%3A0x63c3d52d9a3b68!2sYMCA%20Grounds%2C%20Nandanam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000002!5m2!1sen!2sin",
    moreLocationsNotice: true,
  },
];

export const LocationsSection: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2]">
      {LOCATIONS.map((loc, idx) => (
        <section
          key={loc.id}
          id={loc.id}
          className={`py-24 md:py-32 border-b border-black/10 relative overflow-hidden ${
            idx % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              
              {/* Column 1: Details & Personality (lg:col-span-6) */}
              <div className="lg:col-span-6 text-left flex flex-col items-start order-1 lg:order-none">
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-4 block">
                  {loc.chapter}
                </span>
                
                <h3 className="text-4xl md:text-5xl font-semibold font-display tracking-wide text-primary mb-4">
                  {loc.title}
                </h3>
                
                <p className="text-accent font-medium text-sm md:text-base leading-relaxed mb-8 max-w-xl italic">
                  "{loc.personality}"
                </p>

                {/* Logistics grid */}
                <div className="space-y-6 w-full text-slate-700 text-sm md:text-base font-normal mb-10">
                  <div className="flex gap-4 items-start">
                    <MapPin size={18} className="text-sand-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-primary block">Address</span>
                      <span className="text-[#6F6F6F] text-xs md:text-sm block mt-0.5">{loc.address}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Calendar size={18} className="text-sand-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-primary block">Schedules</span>
                      <span className="text-[#6F6F6F] text-xs md:text-sm block mt-0.5">{loc.days}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Clock size={18} className="text-sand-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-primary block">Timings</span>
                      <span className="text-[#6F6F6F] text-xs md:text-sm block mt-0.5 whitespace-pre-line leading-relaxed">{loc.times}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <User size={18} className="text-sand-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-primary block">Head Coach</span>
                      <span className="text-[#6F6F6F] text-xs md:text-sm block mt-0.5">{loc.coach}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/book-trial?center=${loc.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-accent text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                >
                  Book a Trial Here
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Column 2: Photo & Inline Map Embed (lg:col-span-6) */}
              <div className="lg:col-span-6 flex flex-col gap-6 w-full">
                {/* Visual Image */}
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-black/5 shadow-lg bg-slate-100">
                  <Image
                    src={loc.image}
                    alt={loc.title}
                    fill
                    sizes="(max-w-768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                
                {/* Inline Google Map Frame */}
                <div className="relative h-64 rounded-3xl overflow-hidden border border-black/10 bg-slate-200 shadow-md">
                  <iframe
                    src={loc.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title={`${loc.title} Google Maps Embed`}
                    className="w-full h-full"
                  />
                </div>
              </div>

            </div>

            {/* Bottom notice for Nandanam */}
            {loc.moreLocationsNotice && (
              <div className="mt-24 border border-dashed border-black/10 rounded-[2rem] p-8 bg-[#FAF7F2] text-center max-w-3xl mx-auto">
                <span className="font-display font-semibold text-lg text-primary tracking-wide block">More Locations Coming</span>
                <span className="text-xs text-[#6F6F6F] font-normal block mt-1">We are actively scouting coastal turf structures along South Chennai ECR. Stay tuned.</span>
              </div>
            )}

          </div>
        </section>
      ))}
    </div>
  );
};

export default LocationsSection;
