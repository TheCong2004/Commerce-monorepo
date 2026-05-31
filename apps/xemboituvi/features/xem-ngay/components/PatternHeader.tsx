"use client";
import React from 'react';

export default function PatternHeader({ title }: { title: string }) {
  return (
    <div className="w-full max-w-6xl mx-auto my-6 md:my-10 px-4">
      {/* Container chính: Bỏ group-hover, đưa hiệu ứng vào trạng thái mặc định */}
      <div className={`
        relative min-h-[60px] md:min-h-[80px] py-4 flex items-center justify-center 
        rounded-lg md:rounded-2xl overflow-hidden
       bg-[#FFD700]/5 backdrop-blur-md
        /* Luôn giữ viền vàng và đổ bóng phát sáng */
        border border-[#FFD700] 
        shadow-[0_0_30px_rgba(255,215,0,0.25)]
      `}>
        
        {/* Viền chỉ mảnh bên trong */}
        <div className="absolute inset-1.5 md:inset-2 border border-[#FFD700]/30 rounded-md md:rounded-xl pointer-events-none"></div>

        {/* Các họa tiết góc: Luôn ở trạng thái sáng */}
        <CornerPattern position="top-left" />
        <CornerPattern position="top-right" />
        <CornerPattern position="bottom-left" />
        <CornerPattern position="bottom-right" />

        {/* Tiêu đề: Giữ màu đỏ sẫm hoặc trắng tùy bạn chọn, ở đây tôi để đỏ sẫm cho nổi bật */}
        <h2 className="relative z-10 papyrus text-[#d4af37] font-bold tracking-[0.1em] md:tracking-[0.25em] text-sm sm:text-base md:text-2xl lg:text-3xl text-center px-6 md:px-12 leading-snug uppercase">
          {title}
        </h2>

        {/* Tia sáng kim loại: Luôn chạy liên tục (infinite) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FFD700]/15 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite]"></div>
      </div>
      
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
}

function CornerPattern({ position }: { position: string }) {
  const posClasses: Record<string, string> = {
    "top-left": "top-2 left-2 md:top-3 md:left-3 border-t-2 border-l-2",
    "top-right": "top-2 right-2 md:top-3 md:right-3 border-t-2 border-r-2",
    "bottom-left": "bottom-2 left-2 md:bottom-3 md:left-3 border-b-2 border-l-2",
    "bottom-right": "bottom-2 right-2 md:bottom-3 md:right-3 border-b-2 border-r-2",
  };
  
  return (
    <div className={`
      absolute w-2 h-2 md:w-4 md:h-4 
      /* Luôn rực rỡ màu vàng và có bóng đổ */
      border-[#FFD700] 
      drop-shadow-[0_0_5px_#FFD700]
      ${posClasses[position]}
    `}></div>
  );
}