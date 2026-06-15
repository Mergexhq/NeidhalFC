import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ProgramsList from "@/modules/programs/ProgramsList";
import TrainingStructure from "@/modules/programs/TrainingStructure";
import Schedule from "@/modules/programs/Schedule";
import Button from "@/components/common/Button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Training Programs",
  description: "Browse U6-U8, U9-U12, and U13-U16 structured curriculums, session blueprints, and training calendars.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero 
        title="Training Programs" 
        subtitle="Explore our age-based technical curriculums, session structures, and training slot schedules." 
      />
      <ProgramsList />
      <TrainingStructure />
      <Schedule />

      {/* Join CTA */}
      <section className="py-24 relative overflow-hidden bg-linear-to-t from-primary-dark to-primary border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Ready to Select a Program?
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-light max-w-xl leading-relaxed">
            Every child is entitled to a free trial class to check out our facilities and interact with our coaching team. 
          </p>
          <div className="pt-4">
            <Button href="/join" variant="sand" size="lg" className="flex items-center gap-2">
              Claim Free Trial Class
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
