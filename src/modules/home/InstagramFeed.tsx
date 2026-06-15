"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Trophy, Waves, Activity, Flame } from "lucide-react";

const SIMULATED_POSTS = [
  {
    icon: <Activity className="h-16 w-16 text-sand" />,
    caption: "Morning drills on the beach sand. Nurturing the street-style touch. #neidhalfc #beachfootball",
    likes: 124,
    comments: 12,
  },
  {
    icon: <Waves className="h-16 w-16 text-accent" />,
    caption: "Spotted dolphin pods right off Kottivakkam shore during our U12 tactical session today!",
    likes: 245,
    comments: 32,
  },
  {
    icon: <Trophy className="h-16 w-16 text-sand" />,
    caption: "Team photos from our summer camp matches. Creative minds, fearless players. # चेन्नई",
    likes: 189,
    comments: 18,
  },
  {
    icon: <Flame className="h-16 w-16 text-rose-500" />,
    caption: "Double coach guidance in action. Ensuring individual focus for every young athlete.",
    likes: 142,
    comments: 9,
  },
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-accent font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-accent" />
            Social Hub
            <span className="h-px w-4 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight">
            Follow Our Journey
          </h2>
          <p className="text-[#6F6F6F] font-normal text-base md:text-lg mt-4">
            Get a glimpse of our beach training, turf matches, and life on the coast by following <a href="https://instagram.com/neidhalfc" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold font-display">@neidhalfc</a>.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIMULATED_POSTS.map((post, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/neidhalfc"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group aspect-square rounded-3xl overflow-hidden relative border border-sand/25 bg-white flex items-center justify-center cursor-pointer shadow-xs"
            >
              {/* Graphic Placeholder resembling high-quality beach/coach photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-500 text-white">
                {post.icon}
              </div>

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-20">
                <div className="flex justify-between items-start">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-sand shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <div className="flex gap-4 text-xs font-semibold text-white">
                    <span className="flex items-center gap-1"><Heart size={14} fill="currentColor" className="text-rose-500" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={14} fill="currentColor" className="text-slate-300" /> {post.comments}</span>
                  </div>
                </div>
                
                <p className="text-white text-xs leading-relaxed line-clamp-3 font-normal mb-1">
                  {post.caption}
                </p>
              </div>

              {/* Soft visual tint */}
              <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none z-10" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InstagramFeed;
