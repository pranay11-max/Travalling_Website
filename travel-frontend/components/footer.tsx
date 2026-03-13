"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState("");

  // 🚀 पेज लोड झाल्यावर चेक करेल की युझर लॉगिन आहे की नाही
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setStatus("Sending...");
    try {
      const res = await fetch("https://travel-backend-api-vx7a.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: user.name, 
          email: user.email || "No Email", 
          message: feedbackMsg,
          status: "pending" // Default status
        })
      });

      if (res.ok) {
        setStatus("Feedback Sent! 🚀");
        setFeedbackMsg("");
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("Failed!");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (err) {
      setStatus("Error!");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12 px-6 rounded-t-[2rem] md:rounded-t-[2.5rem] mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-center gap-10 text-center md:text-left">

        {/* Logo & Vision */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <Link href="/" className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">
            TRAVEL<span className="text-yellow-400">.IO</span>
          </Link>
          <p className="text-slate-400 font-bold uppercase text-[8px] md:text-[9px] tracking-[0.2em] max-w-xs">
            Crafting core memories for the next-gen explorer.
          </p>
        </div>

        {/* Quick Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 md:gap-x-8 gap-y-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/#packages" className="hover:text-blue-400 transition-colors">Packages</Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-5">
          <div className="w-9 h-9 md:w-8 md:h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-all border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          <div className="w-9 h-9 md:w-8 md:h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 cursor-pointer transition-all border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </div>
        </div>
      </div>

      {/* 🚀 NEW: FEEDBACK SECTION */}
      <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
        <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-yellow-400">Your Feedback Matters</h4>
        {!user ? (
          <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest text-center">
            Please <Link href="/login" className="text-blue-400 hover:text-white underline transition-colors">Login</Link> to share your experience with us.
          </p>
        ) : (
          <form onSubmit={handleFeedback} className="w-full flex flex-col sm:flex-row gap-3 px-4">
            <input 
              type="text" 
              placeholder={`Hi ${user.name.split(' ')[0]}, tell us what you loved...`} 
              value={feedbackMsg}
              onChange={(e) => setFeedbackMsg(e.target.value)}
              required
              className="flex-1 bg-white/5 border border-white/10 p-3 md:p-4 rounded-xl text-xs md:text-sm font-bold outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-white placeholder-white/40"
            />
            <button 
              type="submit" 
              disabled={status === "Sending..."}
              className="bg-blue-600 hover:bg-yellow-400 hover:text-black text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all shadow-xl disabled:opacity-50"
            >
              {status || "Submit"}
            </button>
          </form>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-500 text-center">
        <p>© 2026 TRAVEL.IO • MADE IN MUMBAI</p>
        <div className="flex gap-4 md:gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}