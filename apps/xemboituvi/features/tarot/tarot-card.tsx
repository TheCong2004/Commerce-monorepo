"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { getCardImageUrl } from "./tarot";


interface TarotCardProps {
  cardId?: string | number;
  cardName?: string;
  image?: string; // Thêm prop hình ảnh nếu có
  isReversed?: boolean;
  isRevealed?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function TarotCard({
  cardId,
  cardName,
  isReversed = false,
  isRevealed = true,
  className = "",
  onClick,
}: TarotCardProps) {
  // Lấy URL ảnh dựa trên ID, nếu chưa lật thì dùng ảnh mặt sau (id là "back")
  const imageUrl = isRevealed ? getCardImageUrl(cardId?.toString() || "") : getCardImageUrl("back");

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative w-32 h-52 md:w-36 md:h-56 cursor-pointer perspective-1000 group ${className}`}
    >
      {/* Container 3D xoay lật */}
      <div
        className={`relative w-full h-full transition-all duration-700 preserve-3d shadow-[0_20px_40px_rgba(0,0,0,0.7)] rounded-xl ${
          isRevealed ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]"
        }`}
      >
        {/* MẶT TRƯỚC (REVEALED) */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-xl bg-[#0a0a0a] border-2 border-[#D4AF37] flex flex-col p-2 overflow-hidden ${
            isReversed ? "rotate-180" : ""
          }`}
        >
          {/* Viền nội khu mảnh */}
          <div className="absolute inset-1 border border-[#D4AF37]/20 rounded-lg pointer-events-none"></div>

          {/* Khu vực hình ảnh minh họa bài */}
          <div className="relative flex-1 w-full bg-gradient-to-b from-[#1a1a1a] to-black rounded-t-lg overflow-hidden flex items-center justify-center border-b border-[#D4AF37]/30">
            {/* Ảnh lá bài tarot */}
            <img 
              src={imageUrl} 
              alt={cardName || "Tarot Card"} 
              className={`w-20 h-32 md:w-24 md:h-40 object-cover rounded shadow-lg ${isReversed && isRevealed ? 'rotate-180' : ''}`} 
              draggable={false}
            />
            {/* Hiệu ứng tia sáng quét ngang khi hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Phần tên lá bài (Label Tab) */}
          <div className="h-14 flex flex-col items-center justify-center bg-black relative">
            <p className="text-[#F9F1D1] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] papyrus text-center px-1 leading-tight">
              {cardName || "Vận Mệnh"}
            </p>
            {isReversed && (
              <div className="mt-1 flex items-center gap-1">
                <div className="h-[1px] w-3 bg-rose-500/50"></div>
                <span className="text-[7px] text-rose-500 font-bold uppercase tracking-tighter italic">Nghịch Biến</span>
                <div className="h-[1px] w-3 bg-rose-500/50"></div>
              </div>
            )}
          </div>

          {/* Chốt góc kim loại trang trí */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]"></div>
        </div>

        {/* MẶT SAU (HIDDEN) */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-xl bg-[#050505] border-2 border-[#D4AF37] flex items-center justify-center overflow-hidden shadow-inner">
          {/* Họa tiết hoa văn huyền học */}
          <div className="absolute inset-3 border border-[#D4AF37]/10 rounded-lg"></div>
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full border-2 border-double border-[#D4AF37]/30 flex items-center justify-center bg-amber-500/5 animate-pulse">
              {/* Icon mặt sau */}
              <img src={getCardImageUrl("back")} alt="Back" className="w-8 h-8 object-contain" draggable={false} />
            </div>
            <div className="text-[8px] text-[#D4AF37]/40 font-black uppercase tracking-[0.4em]">Mystic Tarot</div>
          </div>
          {/* Texture bụi sao đêm */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          {/* Lớp phủ bóng gương */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20" />
        </div>
      </div>
      {/* Hiệu ứng bóng đổ lơ lửng bên dưới */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/60 blur-2xl rounded-full scale-x-110 group-hover:scale-x-125 group-hover:bg-black/80 transition-all duration-500"></div>
    </motion.div>
  );
}