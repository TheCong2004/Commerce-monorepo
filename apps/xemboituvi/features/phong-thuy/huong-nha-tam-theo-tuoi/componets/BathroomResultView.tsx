// features/phong-thuy/components/BathroomResultView.tsx
import React from 'react';
import { MoveRight, ShieldAlert, Bath, Compass } from "lucide-react";
import FadeIn from '@/components/ui/FadeIn';


interface BathroomResultViewProps {
  result: any;
  namSinh: number;
}

export const BathroomResultView = ({ result, namSinh }: BathroomResultViewProps) => {
  return (
    <div className="mt-20 md:mt-32 space-y-12 md:space-y-20 pb-20 md:pb-32">
      
      {/* 1. Phù Hiệu Cung Mệnh - Hiện ra đầu tiên, phóng to nhẹ */}
      <FadeIn direction="up" scale={0.9}>
        <div className="flex flex-col items-center">
          <div className="relative p-1.5 bg-gradient-to-tr from-[#D4AF37] to-[#8A0000] rounded-full shadow-2xl">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-[#FDFBF7] border-4 border-double border-[#8A0000] flex flex-col items-center justify-center text-center p-6 text-left">
              <span className="text-[10px] text-[#8A0000]/60 uppercase tracking-[0.4em] mb-2 font-black">Phi Cung Mệnh</span>
              <span className="text-6xl md:text-7xl font-black text-[#8A0000]">{result.cung}</span>
              <div className="mt-4 px-6 py-1.5 bg-[#1E3A8A] text-[#FDFBF7] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#D4AF37]/30">Hành {result.hanh}</div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
        {/* 2. Thẻ Tọa Hung - Trượt từ trái sang */}
        <FadeIn direction="right" delay={0.2}>
          <div className="bg-[#FDFBF7] border-2 border-[#8A0000] border-l-[12px] p-6 md:p-8 shadow-xl rounded-r-[2.5rem] relative overflow-hidden text-left h-full">
            <div className="absolute top-[-10%] right-[-10%] opacity-[0.03] text-[#8A0000]"><ShieldAlert size={250} /></div>
            <h3 className="text-[#8A0000] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-4 border-b border-[#8A0000]/10 pb-6 text-lg md:text-xl relative z-10">
              <ShieldAlert className="w-5 h-5 md:w-6 md:h-6" /> Vị Trí Đặt (Tọa Hung)
            </h3>
            <div className="space-y-6 relative z-10">
              {result.huongXau.map((h: any, idx: number) => (
                <div key={idx} className="border-b border-[#8A0000]/10 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xl md:text-2xl font-black text-[#252525] tracking-tighter">{h.t}</p>
                    <span className="bg-[#8A0000] text-[#FDFBF7] px-3 py-1 text-[9px] font-black rounded-sm uppercase tracking-widest shadow-md">{h.c}</span>
                  </div>
                  <p className="text-[#252525]/60 italic text-sm md:text-base leading-relaxed">Dùng uế khí để trấn áp {h.c.toLowerCase()}.</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 3. Thẻ Hướng Cát - Trượt từ phải sang */}
        <FadeIn direction="left" delay={0.4}>
          <div className="bg-[#FDFBF7] border-2 border-[#8A0000] border-l-[12px] p-6 md:p-8 shadow-xl rounded-r-[2.5rem] relative overflow-hidden text-left h-full">
            <div className="absolute top-[-10%] right-[-10%] opacity-[0.03] text-[#2D6A4F]"><Compass size={250} /></div>
            <h3 className="text-[#2D6A4F] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-4 border-b border-[#2D6A4F]/10 pb-6 text-lg md:text-xl relative z-10">
              <MoveRight className="w-5 h-5 md:w-6 md:h-6" /> Hướng Nhìn (Hướng Cát)
            </h3>
            <div className="space-y-6 relative z-10">
              {result.huongTot.slice(0, 2).map((h: any, idx: number) => (
                <div key={idx} className="border-b border-[#2D6A4F]/10 pb-4 last:border-0 text-[#252525]">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xl md:text-2xl font-black text-[#252525] tracking-tighter">{h.t}</p>
                    <span className="bg-[#2D6A4F] text-[#FDFBF7] px-3 py-1 text-[9px] font-black rounded-sm uppercase tracking-widest shadow-md">{h.c}</span>
                  </div>
                  <p className="text-[#252525]/60 italic text-sm md:text-base leading-relaxed">Mặt bồn cầu hoặc cửa nhìn về {h.t}.</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 4. Bài Luận - Trượt lên trên cùng sau cùng */}
      <FadeIn direction="up" delay={0.6}>
        <div className="max-w-4xl mx-auto bg-[#FDFBF7] p-8 md:p-14 shadow-2xl border-2 border-[#8A0000] relative overflow-hidden rounded-[2rem] text-left">
          <div className="absolute -bottom-10 -right-10 opacity-[0.05] text-[#8A0000] rotate-12"><Bath size={300} /></div>
          <div className="relative z-10 leading-[2.4] md:leading-[2.8] text-[#252525] text-lg md:text-xl text-justify font-serif">
            <p className="first-letter:text-8xl md:first-letter:text-[10rem] first-letter:font-black first-letter:text-[#8A0000] first-letter:mr-4 md:first-letter:mr-8 first-letter:float-left first-letter:leading-none drop-shadow-sm">
              Nhà tắm là nơi tập trung uế khí nhưng cũng là mạch Thủy lưu động. Với gia chủ tuổi {namSinh}, phi cung mệnh <span className="font-black text-[#8A0000] underline decoration-double">{result.cung}</span>. Áp dụng bí pháp <span className="font-bold">"Tọa Hung Hướng Cát"</span> giúp lấy độc trị độc, đưa nhà tắm vào cung xấu để cuốn trôi điềm rủi, giữ vững sinh khí gia trạch.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};