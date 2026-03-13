"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Admin sathi default Dark Mode changla disto
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://travel-backend-api-vx7a.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (data.role === "admin") {
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userName", data.name);
        router.push("/admin/dashboard");
      } else {
        setError("Access Denied: Admin only area.");
      }
    } catch (err) {
      setError("Server error!");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-1000 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
      
      {/* Background Abstract Shapes - Admin Style */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-200/40'}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-200/40'}`}></div>
      </div>

      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 z-50 p-3 rounded-2xl backdrop-blur-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-white border-slate-200 text-slate-800'}`}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      {/* Admin Card */}
      <div 
        className={`relative z-10 w-full max-w-md p-10 md:p-12 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-1000 ease-out transform ${
          isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-12"
        } ${isDarkMode ? 'bg-slate-900/60 border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]' : 'bg-white/80 border-white shadow-[0_30px_100px_rgba(0,0,0,0.1)]'}`}
      >
        {/* Admin Header */}
        <div className="text-center mb-12">
          <div className={`inline-block p-4 rounded-3xl mb-6 transition-colors ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
             <span className="text-3xl">🔐</span>
          </div>
          <h1 className={`text-2xl font-black tracking-tighter uppercase mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Admin Portal</h1>
          <div className="h-1 w-10 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-8">
          {/* Email */}
          <div className="relative group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className={`block w-full px-2 py-3 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0 transition-colors font-medium peer ${isDarkMode ? 'border-slate-700 text-white focus:border-blue-400' : 'border-slate-300 text-slate-900 focus:border-blue-600'}`}
            />
            <label className={`absolute font-bold duration-300 transform -translate-y-6 scale-75 top-3 z-[-1] origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 tracking-wide text-xs uppercase opacity-50 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              System Email
            </label>
          </div>

          {/* Password */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className={`block w-full px-2 py-3 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0 transition-colors font-medium peer ${isDarkMode ? 'border-slate-700 text-white focus:border-blue-400' : 'border-slate-300 text-slate-900 focus:border-blue-600'}`}
            />
            <label className={`absolute font-bold duration-300 transform -translate-y-6 scale-75 top-3 z-[-1] origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 tracking-wide text-xs uppercase opacity-50 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Master Password
            </label>
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-3 transition-opacity opacity-50 hover:opacity-100"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-500 text-xs font-bold text-center animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-black tracking-widest py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 uppercase text-sm"
          >
            Authorize Access
          </button>
        </form>

        <div className="text-center mt-10">
          <Link href="/login" className={`text-[10px] font-black tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ← Return to User Login
          </Link>
        </div>
      </div>
    </div>
  );
}