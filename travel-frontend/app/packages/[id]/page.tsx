"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence ॲड केलं

export default function PackageDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- १. बुकिंगसाठी नवीन States ---
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/packages/${id}`);
        const data = await res.json();
        setPkg(data);
        setLoading(false);
        // पॅकेज मिळाल्यावर मेसेजमध्ये ऑटोमॅटिक नाव टाकण्यासाठी
        setBookingForm(prev => ({...prev, message: `I want to book the ${data.title} adventure!`}));
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    if (id) fetchPackage();
  }, [id]);

  // --- २. बुकिंग सबमिट फंक्शन ---
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("Sending...");
    try {
      const res = await fetch("http://localhost:4000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingForm,
          packageId: pkg.id // तुझ्या मॉडेलमधील packageId इथे जातोय
        })
      });

      if (res.ok) {
        setBookingStatus("Success! We'll call you. 🚀");
        setTimeout(() => {
          setIsBookingModalOpen(false);
          setBookingStatus("");
        }, 2000);
      } else {
        setBookingStatus("Error! Please try again.");
      }
    } catch (err) {
      setBookingStatus("Server is offline! 🛑");
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="text-2xl font-black uppercase tracking-[0.3em] animate-pulse text-slate-300">Loading Adventure...</div>
    </div>
  );

  if (!pkg) return <div className="h-screen flex items-center justify-center">Package not found!</div>;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 relative">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[65vh] md:h-[75vh] mx-4 mt-4 rounded-[3.5rem] overflow-hidden shadow-2xl">
        <img 
          src={pkg.image_url || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"} 
          className="w-full h-full object-cover grayscale-[20%]" 
          alt={pkg.title} 
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-16 left-8 md:left-20 right-8">
          <motion.button 
            whileHover={{ x: -5 }}
            onClick={() => router.back()}
            className="text-white/70 hover:text-white font-bold text-xs tracking-widest uppercase mb-6 flex items-center gap-2 transition-all"
          >
            ← Back to Explore
          </motion.button>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-none"
          >
            {pkg.title}
          </motion.h1>
          <p className="text-yellow-400 font-black tracking-[0.4em] uppercase mt-4 text-sm md:text-base">{pkg.location} • {pkg.days} Days</p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-black uppercase italic text-slate-900 mb-8 tracking-tight">The <span className="text-blue-600">Vibe.</span></h2>
          <p className="text-slate-500 text-lg md:text-2xl leading-relaxed font-medium mb-16">
            {pkg.description || "Adventure is calling!"}
          </p>

          <div className="mt-20">
            <h2 className="text-4xl font-black uppercase italic text-slate-900 mb-12 tracking-tight">
              Tour <span className="text-blue-600">Landmarks</span>
            </h2>
            
            <div className="relative border-l-4 border-slate-900 ml-4 md:ml-6 space-y-12 pb-8">
              {pkg.itinerary ? pkg.itinerary.split(',').map((place: string, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-10 group"
                >
                  <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-4 border-slate-900 group-hover:bg-yellow-400 transition-colors shadow-lg"></div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 block">Stop {index + 1}</span>
                    <h4 className="text-2xl font-black uppercase italic text-slate-900">{place.trim()}</h4>
                  </div>
                </motion.div>
              )) : (
                <p className="text-slate-400 italic pl-10 font-bold uppercase tracking-widest">Adventure path is being mapped...</p>
              )}
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR --- */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-white/50">Total Investment</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-black italic text-yellow-400">₹{pkg.price}</span>
              <span className="text-white/40 font-bold uppercase text-[9px] tracking-widest">/ Adventure</span>
            </div>
            
            {/* ३. बटनला onClick इव्हेंट दिला */}
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full bg-blue-600 text-white py-6 rounded-full font-black tracking-[0.2em] uppercase hover:bg-yellow-400 hover:text-black transition-all shadow-xl active:scale-95"
            >
              Book My Trip
            </button>
          </div>

          <div className="bg-emerald-50/60 p-8 rounded-[2.5rem] border border-emerald-100">
            <h3 className="text-emerald-700 font-black uppercase text-[10px] tracking-widest mb-6">Green Lights ✅</h3>
            <ul className="space-y-4">
              {pkg.good_points?.split('\n').map((point: string, i: number) => (
                <li key={i} className="text-emerald-900 font-bold text-sm">• {point}</li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50/60 p-8 rounded-[2.5rem] border border-red-100">
            <h3 className="text-red-700 font-black uppercase text-[10px] tracking-widest mb-6">Caution ⚠️</h3>
            <ul className="space-y-4">
              {pkg.bad_points?.split('\n').map((point: string, i: number) => (
                <li key={i} className="text-red-900 font-bold text-sm">• {point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- ४. QUICK BOOKING MODAL (Add this before final </div>) --- */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsBookingModalOpen(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <h2 className="text-3xl font-black italic uppercase mb-2">Book <span className="text-blue-600">Adventure</span></h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">Trip: {pkg.title}</p>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <input 
                  type="text" placeholder="Full Name" required 
                  className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold" 
                  value={bookingForm.name} onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                />
                <input 
                  type="email" placeholder="Email Address" required 
                  className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold" 
                  value={bookingForm.email} onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                />
                <input 
                  type="tel" placeholder="Mobile Number" required 
                  className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold" 
                  value={bookingForm.phone} onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                />
                <textarea 
                  placeholder="Any special requests?" 
                  className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold h-24 resize-none"
                  value={bookingForm.message} onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                ></textarea>
                
                <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-full font-black tracking-widest uppercase hover:bg-blue-600 transition-all shadow-xl">
                  Confirm Booking Request
                </button>
              </form>
              {bookingStatus && <p className="mt-4 text-center font-black text-blue-600 text-[10px] uppercase tracking-[0.2em] animate-pulse">{bookingStatus}</p>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}