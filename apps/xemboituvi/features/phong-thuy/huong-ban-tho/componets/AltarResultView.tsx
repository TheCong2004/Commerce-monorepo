// features/phong-thuy/components/AltarResultView.tsx
import React from 'react';
import { MoveRight, Compass, ShieldCheck, Flame } from "lucide-react";
import FadeIn from '@/components/ui/FadeIn';


interface AltarResultViewProps {
  result: any;
  namSinh: number;
}

export const AltarResultView = ({ result, namSinh }: AltarResultViewProps) => {
  return (
    <div className="mt-20 md:mt-40 space-y-16 md:space-y-24 pb-20 md:pb-32">
      
      {/* 1. Phù Hiệu Cung Mệnh - Hiện ra đầu tiên với hiệu ứng phóng to nhẹ */}
      <FadeIn direction="up" scale={0.9}>
        <div className="flex flex-col items-center">
          <div className="relative p-1.5 bg-gradient-to-tr from-[#D4AF37] to-[#8A0000] rounded-full shadow-2xl">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-[#FDFBF7] border-4 border-double border-[#8A0000] flex flex-col items-center justify-center text-center p-8">
              <span className="text-[11px] text-[#8A0000]/60 uppercase tracking-[0.5em] mb-3 font-black">Phi Cung Mệnh</span>
              <span className="text-7xl md:text-8xl font-black text-[#8A0000] drop-shadow-sm">{result.cung}</span>
              <div className="mt-4 px-8 py-2 bg-[#8A0000] text-[#D4AF37] text-xs font-black uppercase tracking-widest rounded-full border border-[#D4AF37]/30 shadow-lg">
                Hành {result.hanh}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Grid Thông Tin Chi Tiết */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
        
        {/* 2. Thẻ Hướng Tốt - Trượt từ trái sang phải */}
        <FadeIn direction="right" delay={0.2}>
          <div className="bg-[#FDFBF7] border-l-[8px] md:border-l-[12px] border-[#8A0000] p-8 md:p-10 shadow-xl rounded-r-[2.5rem] border-y border-r border-[#8A0000]/10 relative overflow-hidden text-left h-full">
            <div className="absolute top-[-10%] right-[-10%] opacity-[0.03] text-[#8A0000]">
              <Compass size={300} />
            </div>
            <h3 className="text-[#8A0000] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-4 border-b border-[#8A0000]/10 pb-6 text-lg md:text-xl relative z-10">
              <MoveRight className="text-[#D4AF37]" /> Tọa Cát Hướng Cát
            </h3>
            <div className="space-y-8 relative z-10">
              {result.huongTot.map((h: any, idx: number) => (
                <div key={idx} className="border-b border-[#8A0000]/10 pb-4 group last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-2xl md:text-3xl font-black text-[#252525] group-hover:text-[#8A0000] transition-colors">{h.t}</p>
                    <span className="bg-[#8A0000] text-[#D4AF37] px-4 py-1 text-[10px] font-black rounded-sm uppercase tracking-widest shadow-md border border-[#D4AF37]/20">{h.c}</span>
                  </div>
                  <p className="text-[#252525]/70 italic text-sm md:text-base leading-relaxed">{h.y}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 3. Thẻ Pháp Bảo - Trượt từ phải sang trái */}
        <FadeIn direction="left" delay={0.4}>
          <div className="bg-[#121212] border-t-[10px] border-[#D4AF37] p-8 md:p-10 shadow-2xl rounded-b-[2.5rem] border-x border-b border-white/5 text-left h-full">
            <h3 className="text-[#D4AF37] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-4 text-lg md:text-xl border-b border-white/10 pb-6">
              <ShieldCheck className="text-[#D4AF37]" /> Pháp Bảo An Vị
            </h3>
            <div className="space-y-8">
              {[
                { t: "TỰA SƠN VỮNG CHÃI", d: "Bàn thờ cần đặt ở nơi có điểm tựa vững chắc (tường), tránh cửa sổ hoặc lối đi xộc thẳng vào." },
                { t: "TỤ KHÍ TÀNG PHONG", d: "Tránh luồng gió mạnh trực diện làm tán khí, nhưng cần đủ thoáng đãng để không khí lưu thông." },
                { t: "THẮP SÁNG BẢN MỆNH", d: "Ánh sáng nên dùng tông vàng ấm, tạo cảm giác ấm cúng, tránh dùng ánh sáng lạnh lẽo." }
              ].map((item, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-[#D4AF37]/20 group">
                  <div className="absolute left-[-6px] top-0 w-2.5 h-2.5 bg-[#8A0000] rounded-full shadow-[0_0_10px_#8A0000]"></div>
                  <h5 className="text-white font-black text-sm md:text-base mb-2 group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider">{item.t}</h5>
                  <p className="text-white/40 text-xs md:text-sm italic font-light leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 4. Tờ Sớ Bài Luận - Trượt lên trên cuối cùng */}
      <FadeIn direction="up" delay={0.6}>
        <div className="max-w-4xl mx-auto bg-[#FDFBF7] p-8 md:p-14 shadow-2xl border-2 border-[#8A0000]/15 relative overflow-hidden rounded-[2rem] text-left">
          <div className="absolute -bottom-10 -right-10 opacity-[0.05] text-[#8A0000] rotate-12">
            <Flame size={300} />
          </div>
          <div className="relative z-10 leading-[2.4] md:leading-[2.8] text-[#252525] text-lg md:text-2xl text-justify font-serif">
            <p className="first-letter:text-8xl md:first-letter:text-[10rem] first-letter:font-black first-letter:text-[#8A0000] first-letter:mr-6 md:first-letter:mr-8 first-letter:float-left drop-shadow-sm leading-[0.8]">
              Trong dòng chảy tâm linh Việt, bàn thờ chính là "trái tim" ngôi nhà. Đối với gia chủ tuổi {namSinh}, phi cung mệnh <span className="font-black text-[#8A0000] underline decoration-double">{result.cung}</span>. Việc an vị bàn thờ tọa hướng cát mặt nhìn về hướng <span className="font-black text-[#8A0000] px-2">{result.huongTot[0].t}</span> giúp kích hoạt dòng năng lượng Phục Vị, mang lại bình an và phước báu vô cùng.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};