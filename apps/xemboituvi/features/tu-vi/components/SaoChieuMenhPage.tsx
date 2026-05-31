"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Star } from "lucide-react";
import { Navbar } from "@/components/ui/client";
import { getSaoHan } from "@/features/tu-vi/services/sao-logic";
import PatternHeader from "@/features/xem-ngay/components/PatternHeader";
import SaoHanResultCard from "./SaoHanResultCard"; 
import TuVisticStars from "./MysticStars";

export default function SaoChieuMenh() {
  const [formData, setFormData] = useState({ namSinh: 1995, gioiTinh: "Nam" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const data = getSaoHan(formData.namSinh, formData.gioiTinh);
      setResult(data);
      setLoading(false);
    }, 600);
  };

  return (
    // Nền trang bạn có thể để bg-white hoặc bg-[#FDFBF7] tùy ý
    <main className="relative min-h-screen overflow-hidden font-sans">
     
        <div className="max-w-6xl mx-auto px-4 ">
          {/* --- FORM NHẬP LIỆU: TRẮNG NGÀ, PHẲNG, TINH TẾ --- */}
          <div className="max-w-md mx-auto relative">
            {/* Card chính: Bỏ nẹp gỗ, dùng viền đỏ sẫm cực mảnh */}
            <div className="relative bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(138,0,0,0.08)] border border-[#8A0000]/10 overflow-hidden">
              
              {/* Texture giấy lụa ẩn nhẹ */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>

              <div className="text-center mb-8 relative z-10">
                <h3 className="text-[#8A0000] text-3xl font-black uppercase tracking-tighter papyrus italic">
                  Tra Cứu Sao Hạn
                </h3>
                <div className="h-px w-16 bg-[#8A0000]/20 mx-auto mt-2"></div>
                <p className="text-[#8b4513]/50 text-[10px] mt-4 uppercase tracking-widest font-bold">
                   Nhập thông tin bản mệnh 2025
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Mục 1: Năm sinh */}
                <div className="space-y-2 text-left">
                  <label className="text-[#8A0000]/60 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Calendar size={12} /> 1. Năm sinh (Dương lịch)
                  </label>
                  <input 
                    type="number" 
                    value={formData.namSinh || ""}
                    onChange={(e) => setFormData({...formData, namSinh: parseInt(e.target.value) || 0})}
                    className="w-full bg-[#FDFBF7] border-2 border-[#8A0000]/5 rounded-xl py-4 text-center text-3xl font-black text-[#252525] outline-none focus:border-[#8A0000]/20 focus:bg-white transition-all shadow-inner placeholder:text-gray-200"
                    placeholder="1995"
                  />
                </div>

                {/* Mục 2: Giới tính */}
                <div className="space-y-2 text-left">
                  <label className="text-[#8A0000]/60 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                    <User size={12} /> 2. Giới tính mạng
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Nam", "Nữ"].map(g => (
                      <button 
                        key={g} 
                        onClick={() => setFormData({...formData, gioiTinh: g as any})}
                        className={`py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                          formData.gioiTinh === g 
                          ? 'bg-white border-[#8A0000] text-[#8A0000] shadow-md' 
                          : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-[#8A0000]/20'
                        }`}
                      > 
                        {g} Mạng 
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nút Submit Đỏ Sẫm */}
                <div className="pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                    disabled={loading || !formData.namSinh}
                    className="relative w-full py-5 bg-[#8A0000] text-white font-black uppercase tracking-[0.2em] text-sm rounded-full shadow-lg overflow-hidden group/btn disabled:opacity-30 transition-all"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? "Đang bấm quẻ..." : <>Tra Cứu Vận Hạn <ArrowRight size={18} /></>}
                    </span>
                    {/* Hiệu ứng ánh sáng lướt qua nút */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* --- HIỂN THỊ KẾT QUẢ --- */}
          <SaoHanResultCard result={result} namSinh={formData.namSinh} />
          
        </div>
    </main>
  );
}