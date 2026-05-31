// features/phong-thuy/components/KitchenResultView.tsx
import React from 'react';
import { MoveRight, ShieldAlert, Flame } from "lucide-react";
import FadeIn from '@/components/ui/FadeIn';


interface KitchenResultViewProps {
  result: any;
  namSinh: number;
}

export const KitchenResultView = ({ result, namSinh }: KitchenResultViewProps) => {
  return (
    <div className="mt-20 md:mt-32 space-y-12 md:space-y-20 pb-20 md:pb-32 border-t border-white/5 pt-20">
      
      {/* 1. Phù Hiệu Cung Mệnh - Xuất hiện đầu tiên, hiệu ứng phóng to nhẹ */}
      <FadeIn direction="up" scale={0.9}>
        <div className="flex flex-col items-center">
          <div className="relative p-1.5 bg-gradient-to-tr from-[#D4AF37] to-[#8A0000] rounded-full shadow-xl">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-[#FDFBF7] border-4 border-double border-[#8A0000] flex flex-col items-center justify-center text-center p-6">
              <span className="text-[9px] text-[#8A0000]/60 uppercase tracking-[0.4em] mb-2 font-black">Phi Cung Mệnh</span>
              <span className="text-6xl md:text-7xl font-black text-[#8A0000] drop-shadow-sm leading-none">{result.cung}</span>
              <div className="mt-3 px-6 py-1.5 bg-[#8A0000] text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#D4AF37]/30 shadow-lg">Hành {result.hanh}</div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {/* 2. Tọa Hung - Trượt từ trái sang phải */}
        <FadeIn direction="right" delay={0.2}>
          <div className="bg-[#FDFBF7] border-l-[8px] border-[#cc0000] p-6 md:p-8 shadow-xl rounded-r-[2rem] border-y border-r border-[#8A0000]/10 relative overflow-hidden text-left h-full">
            <h3 className="text-[#cc0000] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-[#cc0000]/10 pb-4 text-base md:text-lg relative z-10">
              <ShieldAlert className="w-5 h-5" /> Vị Trí Đặt (Tọa Hung)
            </h3>
            <div className="space-y-6 relative z-10">
              {result.huongXau.map((h: any, idx: number) => (
                <div key={idx} className="border-b border-[#8A0000]/5 pb-4 group last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xl md:text-2xl font-black text-[#252525] group-hover:text-[#cc0000] transition-colors tracking-tighter">{h.t}</p>
                    <span className="bg-[#cc0000] text-[#FDFBF7] px-3 py-0.5 text-[9px] font-black rounded-sm uppercase tracking-tighter shadow-md">{h.c}</span>
                  </div>
                  <p className="text-[#252525]/60 italic text-xs md:text-sm leading-relaxed">Trấn áp năng lượng xấu từ cung {h.c.toLowerCase()}.</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 3. Hướng Cát - Trượt từ phải sang trái */}
        <FadeIn direction="left" delay={0.4}>
          <div className="bg-[#FDFBF7] border-l-[8px] border-[#2D6A4F] p-6 md:p-8 shadow-xl rounded-r-[2rem] border-y border-r border-[#8A0000]/10 relative overflow-hidden text-left h-full">
            <h3 className="text-[#2D6A4F] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-[#2D6A4F]/10 pb-4 text-base md:text-lg relative z-10">
              <MoveRight className="w-5 h-5" /> Hướng Nhìn (Hướng Cát)
            </h3>
            <div className="space-y-6 relative z-10">
              {result.huongTot.map((h: any, idx: number) => (
                <div key={idx} className="border-b border-[#8A0000]/5 pb-4 group last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xl md:text-2xl font-black text-[#252525] group-hover:text-[#2D6A4F] transition-colors tracking-tighter">{h.t}</p>
                    <span className="bg-[#2D6A4F] text-[#FDFBF7] px-3 py-0.5 text-[9px] font-black rounded-sm uppercase tracking-tighter shadow-md">{h.c}</span>
                  </div>
                  <p className="text-[#252525]/60 italic text-xs md:text-sm leading-relaxed">Giúp gia chủ {h.y.toLowerCase()}.</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 4. Bài Luận Sớ Táo Quân - Trượt lên trên cùng cuối cùng */}
      <FadeIn direction="up" delay={0.6}>
        <div className="max-w-4xl mx-auto bg-[#FDFBF7] p-8 md:p-12 shadow-2xl border-2 border-[#8A0000]/15 relative overflow-hidden rounded-[2rem] text-left">
          <div className="absolute -bottom-10 -right-10 opacity-[0.05] text-[#8A0000] rotate-12">
            <Flame className="w-[200px] h-[200px]" />
          </div>
          <div className="relative z-10 leading-[2.2] md:leading-[2.6] text-[#252525] text-lg md:text-xl text-justify font-serif">
            <p className="first-letter:text-7xl md:first-letter:text-[9rem] first-letter:font-black first-letter:text-[#8A0000] first-letter:mr-4 md:first-letter:mr-8 first-letter:float-left first-letter:leading-[0.8] drop-shadow-sm">
              Ngôi bếp là nơi giữ lửa hạnh phúc và sức khỏe của cả gia đình. Với chủ nhân tuổi {namSinh}, phi cung mệnh là <span className="font-black text-[#8A0000] underline decoration-double">{result.cung}</span>. Áp dụng bí pháp <span className="font-bold text-[#8A0000]">"Tọa Hung Hướng Cát"</span> sẽ giúp tài lộc hanh thông, vạn sự bình an, gia đạo hưng thịnh.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};