"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role?: string } | null>(null);

  // १. नवीन डब्बा शोधण्यासाठी Ref
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // २. बाहेर क्लिक केल्यावर डब्बा बंद करण्याचे लॉजिक
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    // window.location.reload() ऐवजी आता थेट होम पेजवर रिडायरेक्ट होईल
    window.location.href = "/"; 
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 p-4 ${
      isScrolled ? "bg-slate-900/90 backdrop-blur-2xl py-3 shadow-2xl" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href="/" className="text-white font-black text-2xl tracking-tighter italic">
          TRAVEL<span className="text-yellow-500">.IO</span>
        </Link>

        {/* --- DYNAMIC LINKS --- */}
        <div className="flex items-center bg-black/30 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 space-x-6 md:space-x-10 text-white text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/#packages" className="hover:text-blue-400 transition-colors">Packages</Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
        </div>

        {/* User Profile Circle */}
        {/* ३. इथे ref लावला आहे */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-3 p-1.5 pl-4 rounded-full border transition-all ${
              isScrolled ? "bg-white/5 border-white/20" : "bg-black/20 border-white/30"
            }`}
          >
            <span className="text-white text-[10px] font-bold tracking-widest hidden sm:block uppercase">
              {user ? `HI, ${user.name.split(' ')[0]}` : "MENU"}
            </span>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-600 flex items-center justify-center text-white border-2 border-white/20 font-black text-sm uppercase">
              {user ? user.name[0] : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              )}
            </div>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-4 w-52 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden py-2 animate-in slide-in-from-top-2 duration-200">
              {user ? (
                <>
                  <Link href="/profile" className="block px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Profile</Link>
                  {user.role === "admin" && (
                    <Link href="/admin/dashboard" className="block px-6 py-3 text-sm font-black tracking-widest text-blue-600 hover:bg-blue-50">
                      DASHBOARD
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left block px-6 py-3 text-sm font-bold text-red-600 hover:bg-red-50">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Login</Link>
                  <Link href="/register" className="block px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}