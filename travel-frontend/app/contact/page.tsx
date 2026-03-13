"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    message: "",
    packageId: null 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("https://travel-backend-api-vx7a.onrender.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("Success! We'll call you back soon. 🚀");
        setFormData({ name: "", email: "", phone: "", message: "", packageId: null });
      } else {
        setStatus("Error! Please try again.");
      }
    } catch (err) {
      setStatus("Backend is offline! 🛑");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20 px-4 md:px-6">
      
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl font-sans">
        
        <h2 className="text-3xl md:text-6xl font-black italic uppercase text-slate-900 mb-8 tracking-tighter">
          Book Your <span className="text-blue-600">Vibe.</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* 🚀 Added placeholder-slate-500 and text-slate-950 for visibility */}
          <input 
            type="text" placeholder="Full Name" required 
            className="bg-slate-100 p-5 md:p-6 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold text-sm md:text-base placeholder-slate-500 text-slate-950"
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email Address" required 
            className="bg-slate-100 p-5 md:p-6 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold text-sm md:text-base placeholder-slate-500 text-slate-950"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="tel" placeholder="Phone Number" required 
            className="bg-slate-100 p-5 md:p-6 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold md:col-span-2 text-sm md:text-base placeholder-slate-500 text-slate-950"
            value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <textarea 
            placeholder="Tell us about your travel plans..." 
            className="bg-slate-100 p-5 md:p-6 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold md:col-span-2 h-32 resize-none text-sm md:text-base placeholder-slate-500 text-slate-950"
            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          
          <button 
            type="submit" 
            disabled={status === "Sending..."}
            className={`bg-slate-900 text-white p-5 md:p-6 rounded-full font-black uppercase tracking-widest transition-all md:col-span-2 shadow-xl active:scale-95 flex items-center justify-center gap-3 text-xs md:text-sm ${status === "Sending..." ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-400 hover:text-black"}`}
          >
            {status === "Sending..." ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              "Confirm Interest"
            )}
          </button>
        </form>
        
        {status && status !== "Sending..." && (
          <p className="mt-6 text-center font-black uppercase text-[10px] md:text-xs tracking-widest text-blue-600 animate-pulse">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}