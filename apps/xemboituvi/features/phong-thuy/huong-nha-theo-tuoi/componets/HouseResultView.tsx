// features/phong-thuy/components/HouseResultView.tsx
import React from 'react';
import { MoveRight, ShieldAlert, Compass } from "lucide-react";
import FadeIn from '@/components/ui/FadeIn';


interface HouseResultViewProps {
  result: any;
  namSinh: number;
}

export const HouseResultView = ({ result, namSinh }: HouseResultViewProps) => {
  return (
    <div className="mt-20 md:mt-32 space-y-12 md:space-y-20 pb-20 md:pb-32">
      
      {/* 1. Phù Hiệu Cung Mệnh - Hiện ra đầu tiên, hiệu ứng nở rộng */}
      <FadeIn direction="up" scale={0.9}>
        <div className="flex flex-col items-center">
          <div className="relative p-1.5 bg-gradient-to-tr from-[#D4AF37] to-[#8A0000] rounded-full shadow-2xl">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-[#FDFBF7] border-4 border-double border-[#8A0000] flex flex-col items-center justify-center text-center p-6">
              <span className="text-[10px] text-[#8A0000]/60 uppercase tracking-[0.5em] mb-2 font-black">Phi Cung Mệnh</span>
              <span className="text-6xl md:text-7xl font-black text-[#8A0000]">{result.cung}</span>
              <div className="mt-3 px-6 py-1.5 bg-[#8A0000] text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#D4AF37]/30">Hành {result.hanh}</div>
            </div>
          </div>
          <p className="mt-6 text-amber-500 font-black uppercase text-xs md:text-sm tracking-[0.5em] drop-shadow-md">Màu sắc đại cát: {result.mauSac}</p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto px-4 md:px-0 text-left">
        
        {/* 2. Thẻ Hướng Tốt - Trượt từ trái sang phải */}
        <FadeIn direction="right" delay={0.2}>
          <div className="bg-[#FDFBF7] border-l-[8px] md:border-l-[12px] border-[#2D6A4F] p-6 md:p-8 shadow-xl rounded-r-[2rem] border-y border-r border-[#8A0000]/10 relative overflow-hidden h-full">
            <div className="absolute top-[-10%] right-[-10%] opacity-[0.03] text-[#2D6A4F]"><Compass size={300} /></div>
            <h3 className="text-[#2D6A4F] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-4 border-b border-[#2D6A4F]/10 pb-4 text-lg md:text-xl relative z-10">
              <MoveRight className="text-[#D4AF37]" /> Hướng Tốt (Đại Cát)
            </h3>
            <div className="space-y-6 relative z-10">
              {result.huongTot.map((h: any, idx: number) => (
                <div key={idx} className="border-b border-[#8A0000]/5 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xl md:text-2xl font-black text-[#252525]">{h.t}</p>
                    <span className="bg-[#2D6A4F] text-[#FDFBF7] px-3 py-0.5 text-[9px] font-black rounded-sm uppercase shadow-md">{h.c}</span>
                  </div>
                  <p className="text-[#252525]/70 italic text-sm md:text-base leading-relaxed">{h.y}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 3. Thẻ Hướng Xấu - Trượt từ phải sang trái */}
        <FadeIn direction="left" delay={0.4}>
          <div className="bg-[#FDFBF7] border-l-[8px] md:border-l-[12px] border-[#8A0000] p-6 md:p-8 shadow-xl rounded-r-[2rem] border-y border-r border-[#8A0000]/10 relative overflow-hidden text-left h-full">
            <div className="absolute top-[-10%] right-[-10%] opacity-[0.03] text-[#8A0000]"><ShieldAlert size={300} /></div>
            <h3 className="text-[#8A0000] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4 border-b border-[#8A0000]/10 pb-4 text-lg md:text-xl relative z-10">
              <ShieldAlert className="text-[#D4AF37]" /> Hướng Xấu (Đại Hung)
            </h3>
            <div className="space-y-6 relative z-10">
              {result.huongXau.map((h: any, idx: number) => (
                <div key={idx} className="border-b border-[#8A0000]/5 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-1 text-left">
                    <p className="text-xl md:text-2xl font-black text-[#252525]">{h.t}</p>
                    <span className="bg-[#8A0000] text-[#FDFBF7] px-3 py-0.5 text-[9px] font-black rounded-sm shadow-md">{h.c}</span>
                  </div>
                  <p className="text-[#252525]/70 italic text-sm md:text-base leading-relaxed">{h.y}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 4. Bài Luận Sớ - Trượt lên trên sau cùng */}
      <FadeIn direction="up" delay={0.6}>
        <div className="max-w-4xl mx-auto bg-[#FDFBF7] p-8 md:p-12 shadow-2xl border-2 border-[#8A0000]/15 relative overflow-hidden rounded-[2rem] text-left">
          <div className="relative z-10 leading-[2.4] md:leading-[2.8] text-[#252525] text-lg md:text-xl text-justify font-serif">
            <p className="first-letter:text-7xl md:first-letter:text-[9rem] first-letter:font-black first-letter:text-[#8A0000] first-letter:mr-4 md:first-letter:mr-8 first-letter:float-left first-letter:leading-none drop-shadow-sm">
              Gia chủ tuổi {namSinh} mang phi cung bản mệnh là <span className="font-black text-[#8A0000] underline decoration-double">{result.cung}</span>, thuộc nhóm <span className="font-black text-[#8A0000]">{result.nhom}</span>. Để xây dựng một không gian sống thịnh vượng, việc chọn hướng nhà chính cần tuyệt đối tuân theo các cung <span className="font-black text-[#2D6A4F]">Sinh Khí</span> và <span className="font-black text-[#2D6A4F]">Thiên Y</span> để nạp cát khí vạn năng.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};