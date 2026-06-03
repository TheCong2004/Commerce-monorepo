"use client";

import { motion } from "framer-motion";
import { Heart, RefreshCcw, Sparkles } from "lucide-react";

interface ResultViewProps {
  score: number;
  message: string;
  onReset: () => void;
}

export default function ResultView({ score, message, onReset }: ResultViewProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex w-full flex-col items-center space-y-5 py-4">
      <div className="rounded-xl border border-[#D4AF37]/30 bg-black/45 px-6 py-5 text-center shadow-sm">
        <div className="mb-2 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
          <Heart size={12} fill="currentColor" /> Tương hợp
        </div>
        <div className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC]">{score}%</div>
      </div>

      <div className="w-full space-y-4">
        <div className="rounded-xl border border-[#D4AF37]/25 bg-black/35 p-5 text-center shadow-sm">
          <h4 className="mb-2 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
            <Sparkles size={12} /> Thông điệp
          </h4>
          <p className="text-[13px] font-medium leading-6 text-white/68">{message}</p>
        </div>

        <button onClick={onReset} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/35 bg-black/35 text-[13px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC] shadow-sm transition hover:bg-[#D4AF37] hover:text-black">
          <RefreshCcw size={15} /> Thử lại lần nữa
        </button>
      </div>
    </motion.div>
  );
}
