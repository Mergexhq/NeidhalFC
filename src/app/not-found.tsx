import React from "react";
import Link from "next/link";
import { MoveRight, Compass } from "lucide-react";
import PageHero from "@/components/common/PageHero";

export const metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <PageHero
        title="404 - Out of Play"
        subtitle="The page you are looking for has crossed the touchline."
      />
      
      <section className="py-24 relative overflow-hidden bg-[#FAF7F2] text-center">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center gap-6 relative z-10">
          <Compass className="h-16 w-16 text-accent animate-spin-slow mb-4" />
          
          <h2 className="text-3xl font-black text-primary font-display uppercase tracking-wide">
            Lost Your Bearings?
          </h2>
          
          <p className="text-[#6F6F6F] text-sm md:text-base font-normal leading-relaxed">
            The page you requested does not exist or has been retired. Return to the homepage or find one of our active coaching hubs.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary hover:bg-accent text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              Go to Home Page
              <MoveRight size={14} />
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-primary-dark font-sans font-bold text-xs uppercase tracking-wider border border-black/10 transition-all cursor-pointer"
            >
              Find Locations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
