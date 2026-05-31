"use client";
import React from 'react';

interface GoldenFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function GoldenFrame({ children, className = "" }: GoldenFrameProps) {
  return (
    <div className={`relative w-full py-4 ${className}`}>
      <div className="relative z-10 w-full">
        <div className={`
          relative
          rounded-xl 
          /* 1. Nền kính mờ tối (Glassmorphism) */
          bg-black/30 backdrop-blur-[10px] 
          
          /* 2. Viền vàng đồng mảnh */
          border border-[#D4AF37]/50 
          
          /* 3. Hiệu ứng tỏa sáng y như ảnh (Shadow tỏa 2 chiều) */
          /* Shadow ngoài: tạo quầng sáng bao quanh */
          /* Shadow inset: tạo đường sáng chạy dọc viền bên trong */
          shadow-[0_0_15px_rgba(212,175,55,0.3),inset_0_0_10px_rgba(212,175,55,0.2)]
          
          /* 4. Padding và nội dung */
          p-6 
          
          /* Hiệu ứng mượt mà khi hiển thị */
          transition-all duration-500 shadow-glass-inset
         hover:shadow-glass-sm 

        `}>
          {/* Lớp phủ Gradient nhẹ để tạo độ sâu cho nền (tùy chọn) */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


        //  rounded-lg bg-background/20 border border-accent/30 boder-solid backdrop-blur-[6px] shadow-glass-inset
        // hover:shadow-glass-sm 
