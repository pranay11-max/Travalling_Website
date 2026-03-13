"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 rounded-t-[2.5rem] mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

        {/* Logo & Vision */}
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-2xl font-black italic uppercase tracking-tighter">
            TRAVEL<span className="text-yellow-400">.IO</span>
          </Link>
          <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.2em] max-w-xs">
            Crafting core memories for the next-gen explorer.
          </p>
        </div>

        {/* Quick Links - Now in a single horizontal row */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/#packages" className="hover:text-blue-400 transition-colors">Packages</Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
        </nav>

        {/* Social Icons - Smaller and Sleek */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-all border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 cursor-pointer transition-all border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
        <p>© 2026 TRAVEL.IO • MADE IN MUMBAI</p>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}