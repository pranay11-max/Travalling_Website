"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [packages, setPackages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: "", location: "", price: "", days: "", vibe: "", image_url: "", description: "", itinerary: ""
  });

  const [adminData, setAdminData] = useState({
    email: "", newPassword: "", confirmPassword: ""
  });

  const fetchPackages = async () => {
    try {
      const res = await fetch("https://travel-backend-api-vx7a.onrender.com/api/packages");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPackages(data);
      }
    } catch (err) {
      console.error("Failed to fetch packages", err);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure? This trip will be gone forever!")) return;
    try {
      const res = await fetch(`https://travel-backend-api-vx7a.onrender.com/api/packages/${id}`, {
        method: "DELETE",
        headers: { "role": "admin" }
      });
      if (res.ok) {
        alert("Trip Deleted Successfully! 🗑️");
        fetchPackages();
      }
    } catch (err) {
      alert("Server Error!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      
      const url = editingItem 
        ? `https://travel-backend-api-vx7a.onrender.com/api/packages/${editingItem.id}` 
        : "https://travel-backend-api-vx7a.onrender.com/api/packages";

      const res = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          "role": "admin" 
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(editingItem ? "Trip Updated! ✏️" : "New Trip Added! 🚀");
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({ title: "", location: "", price: "", days: "", vibe: "", image_url: "", description: "", itinerary: "" });
        fetchPackages();
      }
    } catch (err) {
      alert("Server Error!");
    }
  };

  const handleAdminUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if(adminData.newPassword !== adminData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    // इथे बॅकएंड API ला कॉल जाईल (भविष्यात)
    alert("Admin Credentials Updated! (Backend API needed)");
    setIsSettingsOpen(false);
  };

  // लोकल सिक्वेन्स बदलण्यासाठी
  const movePackage = (index: number, direction: 'up' | 'down') => {
    const newPackages = [...packages];
    if (direction === 'up' && index > 0) {
      [newPackages[index - 1], newPackages[index]] = [newPackages[index], newPackages[index - 1]];
    } else if (direction === 'down' && index < newPackages.length - 1) {
      [newPackages[index + 1], newPackages[index]] = [newPackages[index], newPackages[index + 1]];
    }
    setPackages(newPackages);
    // टीप: खरा क्रम बदलण्यासाठी इथे Backend API ला कॉल करावा लागेल
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-[110px] bg-slate-900 rounded-b-[2.5rem] shadow-md z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-[140px] pb-20 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-black italic uppercase text-slate-900 drop-shadow-sm">
            Admin <span className="text-blue-600">Control</span>
          </h1>
          
          <div className="flex gap-3">
             <button 
              onClick={() => setIsSettingsOpen(true)}
              className="bg-slate-200 text-slate-800 px-5 py-3.5 rounded-full font-black tracking-widest hover:bg-slate-300 transition-all text-[10px] md:text-xs uppercase"
            >
              ⚙️ SETTINGS
            </button>
            <button 
              onClick={() => { 
                setEditingItem(null); 
                setFormData({ title: "", location: "", price: "", days: "", vibe: "", image_url: "", description: "", itinerary: "" });
                setIsModalOpen(true); 
              }}
              className="bg-slate-900 text-white px-7 py-3.5 rounded-full font-black tracking-widest hover:bg-blue-600 transition-all shadow-xl text-[10px] md:text-xs uppercase"
            >
              + ADD NEW ADVENTURE
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-[0.2em]">
              <tr>
                <th className="px-6 py-5">Order</th>
                <th className="px-6 py-5">Trip</th>
                <th className="px-6 py-5">Vibe</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((pkg: any, index: number) => (
                <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 flex gap-2">
                     <button onClick={() => movePackage(index, 'up')} className="p-1 bg-slate-100 hover:bg-slate-200 rounded">↑</button>
                     <button onClick={() => movePackage(index, 'down')} className="p-1 bg-slate-100 hover:bg-slate-200 rounded">↓</button>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-800">{pkg.title}</td>
                  <td className="px-6 py-5 uppercase text-[10px] font-black text-slate-400 tracking-widest">{pkg.vibe || "General"}</td>
                  <td className="px-6 py-5 font-black text-blue-600 italic">₹{pkg.price}</td>
                  <td className="px-6 py-5 text-right space-x-3">
                    <button 
                      onClick={() => { 
                        setEditingItem(pkg); 
                        setFormData({
                          title: pkg.title || "", location: pkg.location || "", price: pkg.price || "",
                          days: pkg.days || "", vibe: pkg.vibe || "", image_url: pkg.image_url || "",
                          description: pkg.description || "", itinerary: pkg.itinerary || ""
                        });
                        setIsModalOpen(true); 
                      }}
                      className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-full transition-all"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(pkg.id)} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 px-3 py-2 rounded-full transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD / EDIT PACKAGE MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl md:text-3xl font-black italic uppercase mb-8">{editingItem ? "Edit" : "Add"} <span className="text-blue-600">Trip</span></h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" placeholder="Trip Title" required className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500" value={formData.title || ""} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <input type="text" placeholder="Location" required className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500" value={formData.location || ""} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                <input type="number" placeholder="Price (INR)" required className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500" value={formData.price || ""} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                <input type="number" placeholder="Days (e.g. 1)" required className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500" value={formData.days || ""} onChange={(e) => setFormData({...formData, days: e.target.value})} />
                <input type="text" placeholder="Vibe (e.g. Retro, Beach)" className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500 md:col-span-2" value={formData.vibe || ""} onChange={(e) => setFormData({...formData, vibe: e.target.value})} />
                <input type="text" placeholder="Image URL" className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500 md:col-span-2" value={formData.image_url || ""} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
                <textarea placeholder="Itinerary (Comma separated: London Eye, Big Ben)" className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500 md:col-span-2 h-24 resize-none" value={formData.itinerary || ""} onChange={(e) => setFormData({...formData, itinerary: e.target.value})} />
                <textarea placeholder="Description" required className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500 md:col-span-2 h-32 resize-none" value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                <div className="md:col-span-2 flex gap-4 mt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-200 text-slate-700 font-black py-4 rounded-xl hover:bg-slate-300 transition-all uppercase tracking-widest text-xs">Cancel</button>
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-slate-900 transition-all uppercase tracking-widest shadow-xl text-xs">Save Adventure</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADMIN SETTINGS MODAL (Password Change) --- */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
              <h2 className="text-2xl font-black italic uppercase mb-8">Admin <span className="text-blue-600">Settings</span></h2>
              <form onSubmit={handleAdminUpdate} className="flex flex-col gap-4">
                <input type="email" placeholder="New Admin Email (Optional)" className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500" value={adminData.email} onChange={(e) => setAdminData({...adminData, email: e.target.value})} />
                <input type="password" placeholder="New Password" required className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500" value={adminData.newPassword} onChange={(e) => setAdminData({...adminData, newPassword: e.target.value})} />
                <input type="password" placeholder="Confirm Password" required className="bg-slate-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500" value={adminData.confirmPassword} onChange={(e) => setAdminData({...adminData, confirmPassword: e.target.value})} />
                <div className="flex gap-4 mt-4">
                  <button type="button" onClick={() => setIsSettingsOpen(false)} className="flex-1 bg-slate-200 text-slate-700 font-black py-4 rounded-xl hover:bg-slate-300 transition-all uppercase tracking-widest text-[10px]">Cancel</button>
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-slate-900 transition-all uppercase tracking-widest shadow-xl text-[10px]">Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}