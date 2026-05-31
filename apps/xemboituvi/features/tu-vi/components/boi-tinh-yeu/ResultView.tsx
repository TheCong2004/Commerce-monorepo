"use client";

import { motion } from "framer-motion";
import { RefreshCcw, Sparkles, Heart } from "lucide-react";

interface ResultViewProps {
  score: number;
  message: string;
  onReset: () => void;
}

export default function ResultView({ score, message, onReset }: ResultViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center w-full space-y-6 py-4"
    >
      <div className="relative flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-rose-400 blur-3xl rounded-full opacity-30"
        />
        
        <div className="relative bg-white/90 backdrop-blur-xl w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-rose-100 flex flex-col items-center justify-center shadow-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-6xl font-black text-rose-600 font-sans"
          >
            {score}%
          </motion.span>
          <div className="flex items-center gap-1 text-rose-300 font-bold text-[10px] uppercase tracking-widest">
            <Heart size={10} fill="currentColor" /> Tương hợp
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/50 backdrop-blur-md p-5 rounded-[2rem] border border-white text-center shadow-sm"
        >
          <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-2 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Thông điệp vũ trụ
          </h4>
          <p className="text-[#8a264a] font-medium italic leading-relaxed text-sm md:text-base">
            "{message}"
          </p>
        </motion.div>

        <button 
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-rose-500 font-bold text-sm border border-rose-100 shadow-sm hover:bg-rose-50 transition-all active:scale-95"
        >
          <RefreshCcw size={18} /> Thử lại lần nữa
        </button>
      </div>
    </motion.div>
  );
}