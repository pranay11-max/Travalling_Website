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
    setStatus("Sending..."); // १. इथे लोडिंग सुरू होतं

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
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl font-sans">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-slate-900 mb-8 tracking-tighter">
          Book Your <span className="text-blue-600">Vibe.</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" placeholder="Full Name" required 
            className="bg-slate-100 p-6 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email Address" required 
            className="bg-slate-100 p-6 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="tel" placeholder="Phone Number" required 
            className="bg-slate-100 p-6 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold md:col-span-2"
            value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <textarea 
            placeholder="Tell us about your travel plans..." 
            className="bg-slate-100 p-6 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold md:col-span-2 h-32 resize-none"
            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          
          {/* २. बटण लोडिंग इफेक्टसह */}
          <button 
            type="submit" 
            disabled={status === "Sending..."} // लोडिंग सुरू असताना डबल क्लिक टाळण्यासाठी
            className={`bg-slate-900 text-white p-6 rounded-full font-black uppercase tracking-widest transition-all md:col-span-2 shadow-xl active:scale-95 flex items-center justify-center gap-3 ${status === "Sending..." ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-400 hover:text-black"}`}
          >
            {status === "Sending..." ? (
              <>
                <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              "Confirm Interest"
            )}
          </button>
        </form>
        
        {/* ३. स्टेटस मेसेज (Success/Error) */}
        {status && status !== "Sending..." && (
          <p className="mt-6 text-center font-black uppercase text-xs tracking-widest text-blue-600 animate-pulse">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}