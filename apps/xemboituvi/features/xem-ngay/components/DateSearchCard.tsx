"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, MoveRight } from 'lucide-react';
import GoldenGlowCard from '@/components/ui/GoldenGlowCard';

interface Props { type: string; title?: string; subTitle: string; }

export default function DateSearchCard({ type, title, subTitle }: Props) {
  const router = useRouter();
  const today = new Date();
  const [day, setDay] = useState(today.getDate().toString().padStart(2, '0'));
  const [month, setMonth] = useState((today.getMonth() + 1).toString().padStart(2, '0'));
  const [year, setYear] = useState(today.getFullYear().toString());

  const handleRedirect = () => {
    const slug = `xem-ngay-tot-${type}-${day.padStart(2, "0")}-thang-${month.padStart(2, "0")}-nam-${year}`;
    router.push(`/xem-ngay/${type}/${slug}`);
  };

  return (
    <div className="flex justify-center my-8 md:my-16 px-4">
      <div >
        <GoldenGlowCard>
        {/* Viền nội bộ đơn giản */}
        <div className="absolute inset-2 md:inset-4 border border-[#8A0000]/10 pointer-events-none rounded-lg"></div>

        <div className="relative text-center mb-8 md:mb-10">
          <h2 className="text-[#d4af37] font-semibold papyrus text-2xl md:text-4xl uppercase tracking-normal md:tracking-tighter mb-2 italic">
            {title}
          </h2>
          <p className="text-[#d4af37] italic text-sm md:text-lg font-light px-2">
            {subTitle}
          </p>
        </div>

        <div className="relative z-10 p-4 md:p-8 rounded-xl ">
          <div className="flex flex-col gap-6 md:gap-8">
            
            {/* Input fields - Tối ưu grid cho mobile */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
              {[ 
                {label: 'Ngày', val: day, set: setDay}, 
                {label: 'Tháng', val: month, set: setMonth}, 
                {label: 'Năm', val: year, set: setYear} 
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 md:gap-2 text-center">
                  <label className="text-[9px] md:text-[11px] font-black uppercase text-white/70 tracking-wider">
                    {item.label}
                  </label>
                  <input
                    type="number" 
                    value={item.val} 
                    onChange={(e) => item.set(e.target.value)}
                    className="w-full bg-[#FDFBF7] rounded-lg py-3 md:py-4 text-center text-xl md:text-3xl font-bold text-[#252525] border-b-2 border-[#8A0000]/20 outline-none focus:border-[#8A0000] transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Nút bấm - Full width trên mobile */}
            <button
              onClick={handleRedirect}
              className="w-full bg-[#8A0000] text-[#F3E3BC] py-4 md:py-6 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest hover:bg-[#5D0000] transition-colors flex items-center justify-center gap-2 border border-[#D4AF37]/30"
            >
              <span>Xem ngay</span>
              <MoveRight size={16} />
            </button>
            
          </div>
        </div>
        </GoldenGlowCard>
      </div>
    </div>
    
  );
}