import React from "react";
import Hero from "@/modules/home/Hero";
import Overview from "@/modules/home/Overview";
import Highlights from "@/modules/home/Highlights";
import FeaturedPrograms from "@/modules/home/FeaturedPrograms";
import UpcomingEvents from "@/modules/home/UpcomingEvents";
import InstagramFeed from "@/modules/home/InstagramFeed";
import Button from "@/components/common/Button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Overview />
      <Highlights />
      <FeaturedPrograms />
      <UpcomingEvents />
      <InstagramFeed />

      <section className="py-24 relative overflow-hidden bg-[#FAF7F2] border-t border-black/10">
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight">
            Ready to Begin Training?
          </h2>
          <p className="text-[#6F6F6F] text-sm md:text-base font-normal leading-relaxed max-w-xl">
            Book your free coached trial session at Kottivakkam, Injambakkam, or Nandanam today. Let your child experience the Neidhal difference.
          </p>
          <div className="pt-4">
            <Button href="/join" variant="primary" size="lg" className="shadow-xs flex items-center gap-2">
              Book Your Free Trial
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
