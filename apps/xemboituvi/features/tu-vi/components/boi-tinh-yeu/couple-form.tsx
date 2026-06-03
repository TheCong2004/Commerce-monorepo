"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, User, Users, ArrowLeft } from "lucide-react";

interface CoupleFormProps {
  onBack: () => void;
  onCalculate: (name1: string, date1: string, name2: string, date2: string) => void;
}

export default function CoupleForm({ onBack, onCalculate }: CoupleFormProps) {
  const [n1, setN1] = useState("");
  const [d1, setD1] = useState("");
  const [n2, setN2] = useState("");
  const [d2, setD2] = useState("");

  const handleSubmit = () => {
    if (!n1 || !d1 || !n2 || !d2) {
      alert("Cần đủ thông tin của cả hai để kết nối năng lượng!");
      return;
    }
    onCalculate(n1, d1, n2, d2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full space-y-5"
    >
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="rounded-lg border border-[#D4AF37]/25 p-2 text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-black">
          <ArrowLeft size={20} className="text-purple-600" />
        </button>
        <h4 className="font-bold text-purple-600 uppercase tracking-wider text-sm">Kết Nối Tình Duyên</h4>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-3 rounded-lg border border-[#D4AF37]/25 bg-black/35 p-4">
          <p className="text-[10px] font-bold text-pink-500 uppercase ml-1 flex items-center gap-1"><User size={12}/> Bạn</p>
          <input type="text" value={n1} onChange={(e) => setN1(e.target.value)} placeholder="Tên của bạn" className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 text-[14px] text-white outline-none focus:border-[#D4AF37]" />
          <input type="date" value={d1} onChange={(e) => setD1(e.target.value)} className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 text-[14px] text-white outline-none focus:border-[#D4AF37]" />
        </div>

        <div className="space-y-3 rounded-lg border border-[#D4AF37]/25 bg-black/35 p-4">
          <p className="text-[10px] font-bold text-purple-500 uppercase ml-1 flex items-center gap-1"><Users size={12}/> Người ấy</p>
          <input type="text" value={n2} onChange={(e) => setN2(e.target.value)} placeholder="Tên người ấy" className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 text-[14px] text-white outline-none focus:border-[#D4AF37]" />
          <input type="date" value={d2} onChange={(e) => setD2(e.target.value)} className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 text-[14px] text-white outline-none focus:border-[#D4AF37]" />
        </div>
      </div>
      
      <button 
        onClick={handleSubmit}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 uppercase tracking-widest"
      >
        KIỂM TRA ĐỘ HÒA HỢP <Heart size={18} fill="currentColor" />
      </button>
    </motion.div>
  );
}
