'use client';

import React from 'react';
import { Wind } from 'lucide-react';

interface HeroProps {
  title: string;
  subTitle: string;
  desc: string;
  imageSrc?: string;
}

export default function HeroPhongThuy({ 
  title, 
  subTitle, 
  desc, 
  imageSrc = "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767125826/image-Photoroom_n6gtyr.png" 
}: HeroProps) {
  return (
    <header className="relative  bg-[#191A1F] pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
      
      {/* NỀN ÁNH SÁNG NỔI */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,80,0.18),transparent_65%)]" />

      {/* KHỐI BÁT QUÁI 3D */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={imageSrc} 
            alt="Bat Quai 3D" 
            className="w-[85%] h-[85%] object-contain opacity-[0.35] animate-[spin_60s_linear_infinite]"
            style={{ 
              filter: 'drop-shadow(0 0 80px rgba(255, 160, 60, 0.8))' 
            }}
          />
        </div>
      </div>

      {/* LỚP PHỦ GIỮ TEXT RÕ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border-b border-t border-amber-500 text-amber-400 text-xs font-bold tracking-[0.3em] uppercase mb-8">
          <Wind size={14} className="animate-pulse" /> Thiên Thời - Địa Lợi - Nhân Hòa
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl papyrus font-bold text-amber-100 mb-8 leading-tight">
          {title} <span className="text-amber-400 italic">{subTitle}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-amber-200/80 max-w-2xl mx-auto mb-12 font-serif font-light leading-relaxed italic">
          {desc}
        </p>
      </div>
    </header>
  );
}
