"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, User, Users } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import SingleForm from "./single-form";
import CoupleForm from "./couple-form";
import { calculateLoveScore } from "../../services/love-logic";
import ResultView from "./ResultView";
import HeartTextBorder from "./heart-text-border";


export default function BoiTinhYeuCard() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"menu" | "single" | "couple" | "result">("menu");
  const [loveResult, setLoveResult] = useState({ score: 0, message: "" });

  useEffect(() => {
    setMounted(true);
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Hàm tính toán và hiển thị kết quả
  const handleCalculate = (name1: string, date1: string, name2: string = "", date2: string = "") => {
    // Nếu bói độc thân, name2 và date2 sẽ để trống trong logic
    const result = calculateLoveScore(name1, date1, name2, date2);
    setLoveResult(result);
    setView("result");
  };

  const hearts = useMemo(() => {
    return Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * (isMobile ? 12 : 20) + 10,
    }));
  }, [isMobile]);

  if (!mounted) return <div className="min-h-[500px]" />;

  return (
    <section className="relative flex items-center justify-center w-full py-16 px-4 overflow-hidden min-h-[600px]">
      <div className="absolute z-0 pointer-events-none flex items-center justify-center">
        <HeartTextBorder isMobile={isMobile} />
      </div>

      <div className={`relative w-full max-w-[480px] rounded-[2.5rem] shadow-2xl 
                      border border-white bg-gradient-to-br from-[#fff0f3] via-[#ffe3e8] to-[#fcc2d7] 
                      z-10 transition-all duration-500 ${!isMobile ? '-translate-y-6' : ''}`}>
        
        {/* Tim bay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "-10%", opacity: [0, 0.4, 0] }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: h.delay, ease: "linear" }}
              style={{ left: `${h.left}%` }}
              className="absolute text-pink-300/30"
            >
              <Heart fill="currentColor" size={h.size} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center p-8 md:p-10 text-center min-h-[420px] justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {view === "menu" ? (
              <motion.div 
                key="menu" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8 w-full"
              >
                <h3 className="font-semibold papyrus text-4xl md:text-5xl text-[#8a264a] leading-[1.1] drop-shadow-sm uppercase">
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 font-bold">Bói Tình Yêu $ <br/> Duyên Định</span>
                </h3>
                <div className="flex flex-row gap-3 md:gap-4 w-full justify-center">
                  <LoveButtonLarge onClick={() => setView("single")} icon={<User className="w-5 h-5" />} label="Độc Thân?" sub="Vận đào hoa" color="from-pink-400 to-rose-500" />
                  <LoveButtonLarge onClick={() => setView("couple")} icon={<Users className="w-5 h-5" />} label="Có Đôi?" sub="Hòa hợp" color="from-purple-400 to-fuchsia-500" />
                </div>
              </motion.div>
            ) : view === "single" ? (
              <SingleForm key="single" onBack={() => setView("menu")} onCalculate={handleCalculate} />
            ) : view === "couple" ? (
              <CoupleForm key="couple" onBack={() => setView("menu")} onCalculate={handleCalculate} />
            ) : (
              <ResultView 
                key="result" 
                score={loveResult.score} 
                message={loveResult.message} 
                onReset={() => setView("menu")} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Giữ nguyên các hàm HeartTextBorder và LoveButtonLarge cũ của bạn...
function LoveButtonLarge({ icon, label, sub, color, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-100 shadow-sm w-full transition-all hover:shadow-md group"
    >
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-sm group-hover:rotate-6 transition-transform`}>
        {icon}
      </div>
      <div className="text-left">
        <div className="font-bold text-[#5c3a45] text-lg leading-none">{label}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1.5 font-medium">{sub}</div>
      </div>
    </motion.button>
  );
}