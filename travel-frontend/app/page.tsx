"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [packages, setPackages] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/packages");
        const data = await res.json();
        setPackages(data);
        setLoading(false);
      } catch (err) {
        console.error("Database connection failed!", err);
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 overflow-x-hidden font-sans">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-[92vh] flex items-center justify-center mx-4 mt-4 rounded-[3.5rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-8 italic uppercase">
            Live the <br /> <span className="text-yellow-400">Moment.</span>
          </motion.h1>
          <p className="text-white/90 text-sm md:text-lg font-bold tracking-[0.4em] uppercase mb-12">Next-Gen Adventures • Core Memories</p>
          
          <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-3xl p-2.5 rounded-full border border-white/30 shadow-2xl flex flex-col md:flex-row gap-2">
            <input type="text" placeholder="Where's the vibe today?" className="flex-1 bg-transparent px-8 py-4 outline-none text-white font-bold text-lg placeholder:text-white/60" />
            <button className="bg-white text-black hover:bg-yellow-400 px-12 py-4 rounded-full font-black tracking-widest transition-all">GO EXPLORE</button>
          </div>
        </div>
      </section>

      {/* --- 2. DYNAMIC PACKAGES SECTION (Added ID for Scrolling) --- */}
      <section id="packages" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter italic uppercase">Choose your <span className="text-blue-600">Vibe</span></h2>
            <p className="text-slate-400 mt-4 font-bold tracking-widest text-xs uppercase">Directly from our database to your screen</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 font-black tracking-widest text-slate-300 animate-pulse uppercase">Searching for adventures...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {packages.slice(0, visibleCount).map((item: any) => (
                  <motion.div 
                    key={item.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8 }} 
                    className="group cursor-pointer"
                  >
                    <div className="relative h-[360px] rounded-[2.5rem] overflow-hidden shadow-xl mb-4">
                      
                      {/* --- IMAGE OR PLACEHOLDER LOGIC --- */}
                      {item.image_url && item.image_url.trim() !== "" ? (
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-4 transition-colors group-hover:bg-slate-200">
                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                          <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] text-center px-6">Awaiting <br/> Adventure Visuals</span>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl px-3 py-1 rounded-full border border-white/20">
                        <span className="text-white font-black text-[9px] tracking-widest uppercase">{item.vibe || "Explorer"}</span>
                      </div>

                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="text-xl font-black tracking-tighter italic mb-3 uppercase">{item.title}</h3>
                        <div className="flex justify-between items-center border-t border-white/10 pt-4">
                          <span className="text-sm font-bold">₹{item.price} <span className="text-[9px] opacity-60">/ TRIP</span></span>
                          <Link href={`/packages/${item.id}`} className="bg-white text-black p-2 rounded-full hover:bg-yellow-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {visibleCount < packages.length && (
              <div className="flex justify-center mt-16">
                <button 
                  onClick={handleShowMore}
                  className="bg-slate-900 text-white hover:bg-yellow-400 hover:text-black px-10 py-4 rounded-full font-black tracking-widest transition-all uppercase shadow-xl active:scale-95"
                >
                  Show More Adventures
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>  
  );
}