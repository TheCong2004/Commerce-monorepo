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
        <button onClick={onBack} className="p-2 hover:bg-pink-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-rose-500" />
        </button>
        <h4 className="font-bold text-rose-600 uppercase tracking-wider text-sm">Tìm Vận Đào Hoa</h4>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Họ và tên của bạn..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-rose-400 outline-none bg-white/50"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-rose-400 outline-none bg-white/50 text-gray-600"
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