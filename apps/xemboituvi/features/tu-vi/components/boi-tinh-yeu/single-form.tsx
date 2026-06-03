"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User, Calendar, ArrowLeft, Sparkles } from "lucide-react";

// ĐỊNH NGHĨA PROPS CHUẨN ĐỂ FIX LỖI TYPESCRIPT
interface SingleFormProps {
  onBack: () => void;
  onCalculate: (name1: string, date1: string) => void;
}

export default function SingleForm({ onBack, onCalculate }: SingleFormProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!name || !date) {
      alert("Vui lòng nhập đầy đủ thông tin để vũ trụ giải mã!");
      return;
    }
    onCalculate(name, date);
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
          <ArrowLeft size={18} />
        </button>
        <h4 className="text-[14px] font-bold uppercase tracking-wider text-[#F3E3BC]">Tìm Vận Đào Hoa</h4>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Họ và tên của bạn..."
            className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 pl-10 pr-4 text-[14px] text-white outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 pl-10 pr-4 text-[14px] text-white outline-none focus:border-[#D4AF37]"
          />
        </div>
        
        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 uppercase tracking-widest"
        >
          XEM KẾT QUẢ <Sparkles size={18} />
        </button>
      </div>
    </motion.div>
  );
}
