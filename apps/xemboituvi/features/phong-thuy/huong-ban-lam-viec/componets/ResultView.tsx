// features/phong-thuy/components/ResultView.tsx
import React from 'react';
import { MoveRight, Sparkles, Flame } from "lucide-react";
import FadeIn from '@/components/ui/FadeIn';


interface ResultViewProps {
  result: any;
  namSinh: number;
}

export const ResultView = ({ result, namSinh }: ResultViewProps) => {
  return (
    <div className="mt-20 md:mt-32 space-y-12 md:space-y-20 pb-20 md:pb-32">
      
      {/* 1. Phù Hiệu Cung Mệnh - Hiện ra đầu tiên, phóng to nhẹ */}
      <FadeIn direction="up" scale={0.8}>
        <div className="flex flex-col items-center">
          <div className="relative p-1.5 bg-gradient-to-tr from-[#D4AF37] to-[#8A0000] rounded-full shadow-xl">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-[#FDFBF7] border-4 border-double border-[#8A0000] flex flex-col items-center justify-center text-center p-6">
              <span className="text-[9px] text-[#8A0000]/60 uppercase tracking-[0.4em] mb-2 font-black">Phi Cung Mệnh</span>
              <span className="text-6xl md:text-7xl font-black text-[#8A0000] drop-shadow-sm">{result.cung}</span>
              <div className="mt-3 px-6 py-1.5 bg-[#8A0000] text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#D4AF37]/30">
                Hành {result.hanh}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {/* 2. Thẻ Hướng Ngồi - Trượt từ trái sang */}
        <FadeIn direction="right" delay={0.2}>
          <div className="bg-[#FDFBF7] border-l-[10px] border-[#8A0000] p-6 md:p-8 shadow-xl rounded-r-[2rem] border-y border-r border-[#8A0000]/10 relative overflow-hidden h-full">
            <h3 className="text-[#8A0000] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-[#8A0000]/10 pb-4 text-base md:text-lg relative z-10">
              <MoveRight className="text-[#D4AF37]" size={20} /> Hướng Ngồi Đại Cát
            </h3>
            <div className="space-y-6 relative z-10">
              {result.huongTot.map((h: any, idx: number) => (
                <div key={idx} className="border-b border-[#8A0000]/5 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xl md:text-2xl font-black text-[#252525]">{h.t}</p>
                    <span className="bg-[#8A0000] text-[#D4AF37] px-3 py-0.5 text-[9px] font-black rounded-sm uppercase tracking-tighter shadow-md border border-[#D4AF37]/20">{h.c}</span>
                  </div>
                  <p className="text-[#252525]/70 italic text-sm font-light leading-relaxed">{h.y}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 3. Thẻ Bí Pháp - Trượt từ phải sang */}
        <FadeIn direction="left" delay={0.4}>
          <div className="bg-[#121212] border-t-[8px] border-[#D4AF37] p-6 md:p-8 shadow-xl rounded-b-[2rem] border-x border-b border-white/5 h-full">
            <h3 className="text-[#D4AF37] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3 text-base md:text-lg border-b border-white/10 pb-4">
              <Sparkles className="text-[#D4AF37]" size={22} fill="currentColor" /> Bí Pháp Bố Trí
            </h3>
            <div className="space-y-6">
              <div className="relative pl-8 border-l border-[#D4AF37]/30">
                <div className="absolute left-[-4.5px] top-0 w-2 h-2 bg-[#8A0000] rounded-full shadow-[0_0_10px_#8A0000]"></div>
                <h5 className="text-white font-black text-sm mb-2 uppercase tracking-wider">THẾ TỌA SƠN</h5>
                <p className="text-white/40 text-xs md:text-sm font-light italic">Phía sau lưng cần điểm tựa vững chãi như bức tường.</p>
              </div>
              <div className="relative pl-8 border-l border-[#D4AF37]/30">
                <div className="absolute left-[-4.5px] top-0 w-2 h-2 bg-[#8A0000] rounded-full shadow-[0_0_10px_#8A0000]"></div>
                <h5 className="text-white font-black text-sm mb-2 uppercase tracking-wider">KÍCH HOẠT TÀI LỘC</h5>
                <p className="text-white/40 text-xs md:text-sm font-light italic">Đặt thạch anh hoặc cây xanh hợp mệnh tại góc tài lộc.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 4. Bài Luận Chi Tiết - Trượt lên cuối cùng */}
      <FadeIn direction="up" delay={0.6}>
        <div className="max-w-4xl mx-auto bg-[#FDFBF7] p-8 md:p-12 shadow-2xl border border-[#8A0000]/10 relative overflow-hidden rounded-[2rem]">
          <div className="absolute -bottom-10 -right-10 opacity-[0.04] text-[#8A0000]">
            <Flame size={200} />
          </div>
          <div className="relative z-10 leading-[2.2] md:leading-[2.6] text-[#252525] text-lg md:text-xl text-justify font-serif">
            <p className="first-letter:text-7xl md:first-letter:text-[9rem] first-letter:font-black first-letter:text-[#8A0000] first-letter:mr-4 first-letter:float-left drop-shadow-sm">
              Gia chủ sinh năm {namSinh} mang linh khí cung <span className="font-black text-[#8A0000] underline decoration-double">{result.cung}</span>. Việc sắp đặt bàn làm việc tuân theo ngũ hành giúp sự nghiệp thăng tiến vạn sự hanh thông.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};