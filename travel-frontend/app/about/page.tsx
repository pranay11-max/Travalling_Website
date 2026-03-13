"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    // Background color 'bg-[#fafafa]' (light grey) kela ahe 
    // ani top la ek subtle gradient dila ahe nav disnyasathi
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden font-sans">
      
      {/* Navbar visibility sathi top shadow gradient */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

      <div className="pt-24 md:pt-40 pb-20 px-6 max-w-6xl mx-auto relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-9xl font-black italic uppercase tracking-tighter text-slate-900 mb-10 md:mb-16"
        >
          Our <span className="text-blue-600">Story.</span>
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* LEFT: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <p className="text-slate-900 text-2xl md:text-4xl font-black italic uppercase tracking-tight leading-tight md:leading-none">
              We don't just plan trips, <br />
              we craft <span className="text-yellow-500">Core Memories.</span>
            </p>
            
            <p className="text-slate-500 text-base md:text-xl leading-relaxed font-medium">
              Our mission is to immerse you in the world's most authentic vibes. We take you to the hidden corners of the globe where the atmosphere resonates with your next-gen spirit. 
            </p>

            <div className="flex gap-10 pt-4">
              <div>
                <h4 className="text-blue-600 font-black text-3xl md:text-4xl italic uppercase">50+</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Destinations</p>
              </div>
              <div>
                <h4 className="text-blue-600 font-black text-3xl md:text-4xl italic uppercase">12k</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Explorers</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative group mt-6 lg:mt-0"
          >
            <div className="absolute -inset-2 md:-inset-4 bg-blue-100 rounded-[2rem] md:rounded-[3rem] -z-10 group-hover:bg-yellow-100 transition-colors"></div>
            <div className="relative h-[350px] md:h-[500px] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000&auto=format&fit=crop" 
                alt="Retro Adventure" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}