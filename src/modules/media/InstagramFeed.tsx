"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Play, Video, Grid, Film } from "lucide-react";
import Image from "next/image";

const FEED_POSTS = [
  {
    id: 1,
    type: "image",
    category: "training",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    caption: "Barefoot beach conditioning. Instilling grit and street-style touch on the Kottivakkam shoreline. U12 squad. #neidhalfc #beachroots",
    likes: 184,
    comments: 24,
  },
  {
    id: 2,
    type: "video",
    category: "reels",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=600&q=80",
    caption: "POV: A Structured Technical session. 2:1 coaching ratio in action. Building individual decision-making under high pressure. #chennaifootball",
    likes: 312,
    comments: 48,
    duration: "0:45",
  },
  {
    id: 3,
    type: "image",
    category: "matches",
    image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=600&q=80",
    caption: "Fearless play leads to creative solutions. Weekly turf match snapshots. Chennai Coastline league matches. #roots",
    likes: 198,
    comments: 15,
  },
  {
    id: 4,
    type: "video",
    category: "videos",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80",
    caption: "Tactical breakdown: Managing playing space. Watch head coach actively guide defenders on spatial coverage.",
    likes: 245,
    comments: 19,
    duration: "1:20",
  },
  {
    id: 5,
    type: "image",
    category: "training",
    image: "https://images.unsplash.com/photo-1526232761682-d26e47ac1740?auto=format&fit=crop&w=600&q=80",
    caption: "Smiles, sweat, and community. Football belongs to the players, not the selectors. Building confidence daily.",
    likes: 164,
    comments: 11,
  },
  {
    id: 6,
    type: "video",
    category: "reels",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
    caption: "Double-Coach advantage: micro-diagnostic feedback for every young dribbler. No child gets left behind.",
    likes: 289,
    comments: 32,
    duration: "0:30",
  },
];

export const InstagramFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "videos" | "reels">("all");

  const filteredPosts = FEED_POSTS.filter((post) => {
    if (activeTab === "all") return true;
    if (activeTab === "videos") return post.type === "video" && post.category === "videos";
    if (activeTab === "reels") return post.type === "video" && post.category === "reels";
    return true;
  });

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Instagram Profile Block */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <div className="h-16 w-16 rounded-full bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white mb-6 shadow-lg">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-3 block">
            Instagram Feed Layer
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight uppercase">
            Social Proof Feed
          </h2>
          <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed mt-4 font-normal">
            Our daily updates, beach soccer drills, and training highlights are synced directly to our official profile. Follow <a href="https://instagram.com/neidhalfc" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold font-display">@neidhalfc</a> for live updates.
          </p>
        </div>

        {/* Tab Selection Layout */}
        <div className="flex justify-center border-b border-black/10 mb-12 max-w-md mx-auto">
          {[
            { id: "all", label: "All Posts", icon: <Grid size={14} /> },
            { id: "videos", label: "IGTV/Videos", icon: <Video size={14} /> },
            { id: "reels", label: "Reels", icon: <Film size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 pb-4 text-xs uppercase tracking-wider font-bold transition-all relative cursor-pointer ${
                activeTab === tab.id ? "text-primary" : "text-[#A0A0A0] hover:text-primary"
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeFeedTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.a
                key={post.id}
                href="https://instagram.com/neidhalfc"
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-square rounded-[2rem] overflow-hidden border border-sand/25 bg-white shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image background */}
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover"
                />

                {/* Video Play indicator if video/reel */}
                {post.type === "video" && (
                  <div className="absolute top-6 right-6 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-10">
                    <Play size={12} className="fill-current ml-0.5" />
                  </div>
                )}

                {/* Hover overlay with IG content */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-8 z-20">
                  <div className="flex justify-between items-center w-full">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-sand shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <div className="flex gap-4 text-xs font-semibold text-white">
                      <span className="flex items-center gap-1">
                        <Heart size={14} fill="currentColor" className="text-rose-500" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} fill="currentColor" className="text-slate-300" />
                        {post.comments}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#FAF7F2]/90 text-sm leading-relaxed line-clamp-4 font-normal text-left">
                    {post.caption}
                  </p>

                  <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-sand font-bold border-t border-white/10 pt-4 w-full">
                    <span>View on Instagram</span>
                    {post.duration && <span>{post.duration}</span>}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default InstagramFeed;
