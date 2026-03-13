"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 max-w-6xl mx-auto font-sans">
      
      {/* --- HEADER SECTION --- */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-slate-900 mb-16"
      >
        Our <span className="text-blue-600">Story.</span>
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT: English Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <p className="text-slate-900 text-2xl md:text-4xl font-black italic uppercase tracking-tight leading-none">
            We don't just plan trips, <br />
            we craft <span className="text-yellow-500">Core Memories.</span>
          </p>
          
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
            Our mission is to immerse you in the world's most authentic vibes. We take you to the hidden corners of the globe where the atmosphere resonates with your next-gen spirit. 
            Whether it's the grainy nostalgia of a 90s adventure or a futuristic expedition, we ensure every moment is legendary.
          </p>

          <div className="flex gap-10 pt-4">
            <div>
              <h4 className="text-blue-600 font-black text-4xl italic uppercase">50+</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Destinations</p>
            </div>
            <div>
              <h4 className="text-blue-600 font-black text-4xl italic uppercase">12k</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Explorers</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Retro Aesthetic Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-blue-100 rounded-[3rem] -z-10 group-hover:bg-yellow-100 transition-colors"></div>
          <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* 90s Indian Cinema / Retro Vibe Image */}
            <img 
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000&auto=format&fit=crop" 
              alt="Retro Adventure Vibe" 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-white font-black uppercase text-[10px] tracking-[0.4em] bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Est. 2026 • Mumbai
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}