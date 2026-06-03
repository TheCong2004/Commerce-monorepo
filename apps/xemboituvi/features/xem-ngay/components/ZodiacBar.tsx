"use client";
import React, { useState } from 'react';

const ZODIACS = [
  { name: 'Tý', icon: '🐀' }, { name: 'Sửu', icon: '🐂' }, 
  { name: 'Dần', icon: '🐅' }, { name: 'Mão', icon: '🐈' }, 
  { name: 'Thìn', icon: '🐉' }, { name: 'Tỵ', icon: '🐍' },
  { name: 'Ngọ', icon: '🐎' }, { name: 'Mùi', icon: '🐐' }, 
  { name: 'Thân', icon: '🐒' }, { name: 'Dậu', icon: '🐓' }, 
  { name: 'Tuất', icon: '🐕' }, { name: 'Hợi', icon: '🐖' },
];

export default function ZodiacBar() {
  const [activeZodiac, setActiveZodiac] = useState<string>('Tý');

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="grid grid-cols-6 justify-items-center items-center gap-y-6 gap-x-2 md:gap-x-4">
        {ZODIACS.map((z, idx) => {
          const isActive = activeZodiac === z.name;
          return (
            <div 
              key={idx} 
              className="group flex flex-col items-center cursor-pointer"
              onClick={() => setActiveZodiac(z.name)}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 relative ${
                isActive 
                  ? "border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)] scale-110" 
                  : "border-[#D4AF37]/30 hover:border-[#FFD700] hover:shadow-[0_0_10px_rgba(255,215,0,0.3)] hover:scale-105"
              }`}>
                <span className="relative z-10 transition-transform duration-300">{z.icon}</span>
              </div>
              <span className={`font-bold text-[13px] md:text-[14px] uppercase mt-2.5 tracking-wider transition-all duration-300 ${
                isActive ? "text-[#FFD700]" : "text-[#F3E3BC]/80 group-hover:text-[#FFD700]"
              }`}>
                {z.name}
              </span>
              <div className={`h-[1.5px] bg-[#FFD700] mt-1.5 transition-all duration-300 ${
                isActive ? "w-8 opacity-100" : "w-0 opacity-0 group-hover:w-8 group-hover:opacity-100"
              }`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
