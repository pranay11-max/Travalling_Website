"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // तुझ्या MVC बॅकएंडला रिक्वेस्ट पाठवणे
      const res = await fetch("https://travel-backend-api-vx7a.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      // जर लॉगिन यशस्वी झालं आणि रोल 'admin' असेल तरच
      if (res.ok && data.role === "admin") {
        localStorage.setItem("user", JSON.stringify({ name: data.name, role: data.role }));
        localStorage.setItem("userRole", data.role);
        
        // थेट डॅशबोर्डवर रिडायरेक्ट
        router.push("/admin/dashboard");
        
        // नॅव्हबार अपडेटसाठी छोटा रिफ्रेश
        setTimeout(() => window.location.reload(), 100);
      } else {
        setError("UNAUTHORIZED: Admin access only.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Server error! Please check backend.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans selection:bg-blue-500">
      {/* Background Grain Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase italic">
            ADMIN.<span className="text-blue-600">PORTAL</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase mt-4">
            Secure Terminal • Travel.IO
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleAdminLogin} className="space-y-8">
            <div>
              <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-3 block">
                Admin Identifier
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@travel.io"
                className="w-full bg-black/50 border-b-2 border-slate-800 focus:border-blue-600 outline-none px-0 py-3 text-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-3 block">
                Security Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/50 border-b-2 border-slate-800 focus:border-blue-600 outline-none px-0 py-3 text-white transition-all font-medium"
              />
            </div>

            {error && (
              <p className="text-red-500 text-[10px] font-black tracking-widest uppercase text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-black tracking-[0.2em] py-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 disabled:opacity-50 uppercase text-xs shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {isLoading ? "Authenticating..." : "Establish Connection"}
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <button 
            onClick={() => router.push("/")}
            className="text-slate-600 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors"
          >
            ← Back to Public Site
          </button>
        </div>
      </div>
    </div>
  );
}