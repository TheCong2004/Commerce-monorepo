"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface WoodenFrameProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export default function WoodenFrame({ children, className = "", maxWidth = "max-w-4xl" }: WoodenFrameProps) {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`relative px-8 py-6 md:px-17 md:py-17 w-full ${maxWidth} rounded-xl shadow-2xl border-[4px] md:border-[6px] border-[#2A1810] 
        bg-[url('https://images.unsplash.com/photo-1546514714-df0b0ca94d6a?q=80&w=2500&auto=format&fit=crop')] 
        bg-cover bg-center overflow-hidden z-10 ${className}`}
    >
      {/* Lớp phủ tối để nội dung dễ đọc */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      
      {/* Bóng đổ bên trong (Inset Shadow) tạo chiều sâu */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded-lg"></div>
      
      {/* 4 Con ốc trang trí ở góc */}
      <div className="absolute top-3 left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1a0f0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] z-20"></div>
      <div className="absolute top-3 right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1a0f0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] z-20"></div>
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1a0f0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] z-20"></div>
      <div className="absolute bottom-3 right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1a0f0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] z-20"></div>

      {/* Nội dung bên trong */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}