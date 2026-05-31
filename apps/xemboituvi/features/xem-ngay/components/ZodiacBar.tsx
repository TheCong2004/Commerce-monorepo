"use client";
import GoldenFrame from '@/components/ui/GoldenGlowCard';
import React from 'react';

const ZODIACS = [
  { name: 'Tý', icon: '🐀' }, { name: 'Sửu', icon: '🐂' }, 
  { name: 'Dần', icon: '🐅' }, { name: 'Mão', icon: '🐈' }, 
  { name: 'Thìn', icon: '🐉' }, { name: 'Tỵ', icon: '🐍' },
  { name: 'Ngọ', icon: '🐎' }, { name: 'Mùi', icon: '🐐' }, 
  { name: 'Thân', icon: '🐒' }, { name: 'Dậu', icon: '🐓' }, 
  { name: 'Tuất', icon: '🐕' }, { name: 'Hợi', icon: '🐖' },
];

export default function ZodiacBar() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <GoldenFrame>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:flex lg:flex-nowrap lg:justify-between items-center gap-y-6 gap-x-2">
          {ZODIACS.map((z, idx) => (
            <div key={idx} className="group flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-gray-400/30 flex items-center justify-center text-xl sm:text-2xl lg:text-3xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-[#FFD700] group-hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] relative">
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">{z.icon}</span>
              </div>
              <span className="text-gray-400 font-bold text-[10px] sm:text-xs uppercase mt-3 tracking-widest transition-all duration-500 group-hover:text-[#FFD700]">
                {z.name}
              </span>
              <div className="w-0 h-[1.5px] bg-[#FFD700] mt-1.5 transition-all duration-500 group-hover:w-8 opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </GoldenFrame>
    </div>
  );
}