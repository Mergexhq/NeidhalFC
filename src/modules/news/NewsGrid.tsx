"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, User, ArrowRight, Trophy, Sun, Flame, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const NEWS_DATA = [
  {
    id: 1,
    category: "Tournament Updates",
    title: "Neidhal FC U12 Secures Semifinal Spot in Chennai Youth Cup",
    excerpt: "An outstanding displays of flair and individual creativity saw our U12 squad cruise past local academy rival...",
    date: "June 08, 2026",
    author: "Pradeep Ramesh",
    icon: <Trophy className="h-5 w-5 text-sand" />,
  },
  {
    id: 2,
    category: "Camp Announcements",
    title: "Annual Summer camp 2026 Concludes with Awards Night",
    excerpt: "Over 80 young players participated in our month-long sand and turf training schedule. Here are the highlight moments...",
    date: "June 05, 2026",
    author: "Vijay Balan",
    icon: <Sun className="h-5 w-5 text-accent" />,
  },
  {
    id: 3,
    category: "Match Results",
    title: "U16 Friendly Scrimmage Results: Neidhal FC vs Elite Academy",
    excerpt: "Focusing on transitions and small-sided positioning, our U16 squad demonstrated strong defensive composure...",
    date: "May 28, 2026",
    author: "Vijay Balan",
    icon: <Flame className="h-5 w-5 text-rose-500" />,
  },
  {
    id: 4,
    category: "Club News",
    title: "Developing the Football Homework Mobile App Concept",
    excerpt: "To support remote development, our founders outline the next expansion tier: a player app with training video metrics...",
    date: "May 15, 2026",
    author: "Pradeep Ramesh",
    icon: <Smartphone className="h-5 w-5 text-indigo-400" />,
  },
];

const CATEGORIES = ["All", "Tournament Updates", "Match Results", "Camp Announcements", "Club News"];

export const NewsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = NEWS_DATA.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16">
          {/* Filters */}
          <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer",
                  activeCategory === cat
                    ? "bg-sand border-sand text-primary-dark"
                    : "bg-transparent border-white/5 text-slate-400 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 focus:border-sand/30 rounded-full pl-11 pr-5 py-2.5 text-xs text-slate-300 focus:outline-none transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* News Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredNews.map((post) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                key={post.id}
                className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between group hover:border-sand/15 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="inline-block px-3 py-1 rounded bg-sand/10 border border-sand/20 text-sand text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="shrink-0">{post.icon}</span>
                  </div>

                  <h3 className="font-display font-black text-xl text-white mb-3 leading-tight group-hover:text-sand transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6 flex justify-between items-center text-xs text-slate-500 font-light">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Calendar size={12} className="text-accent" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={12} className="text-sand" /> {post.author}</span>
                  </div>
                  
                  <button className="flex items-center gap-1 text-[11px] font-display font-bold text-sand hover:text-white uppercase tracking-widest transition-colors cursor-pointer group">
                    Read More 
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-light">
            No news articles match your search parameters.
          </div>
        )}

      </div>
    </section>
  );
};

export default NewsGrid;
