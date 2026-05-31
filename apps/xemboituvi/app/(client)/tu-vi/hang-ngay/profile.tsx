"use client";

import React from "react";
import { 
  CalendarDays, 
  Clock, 
  Compass, 
  Zap, 
  Lightbulb, 
  ShieldCheck, 
  Star,
  Flame
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function IntroTuViNgay() {
  const elements = [
    { icon: <Clock size={18} />, title: "Giờ Hoàng Đạo", desc: "Khung giờ vàng hội tụ linh khí." },
    { icon: <Compass size={18} />, title: "Hướng Xuất Hành", desc: "Đón đầu Hỷ Thần và Tài Thần." },
    { icon: <Zap size={18} />, title: "Việc Nên Làm", desc: "Thuận theo Trực ngày để hanh thông." },
    { icon: <ShieldCheck size={18} />, title: "Kiêng Kỵ", desc: "Phòng tránh xung khắc năng lượng." },
    { icon: <Star size={18} />, title: "Sao Tốt - Xấu", desc: "Phân tích hung cát của tinh tú." },
    { icon: <Lightbulb size={18} />, title: "Lời Khuyên", desc: "Tư duy tối ưu hóa vận may." },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 font-sans text-[#252525]">
      <FadeIn scale={0.98} direction="up">
        <div className="relative bg-[#FDFBF7] rounded-[2rem] border border-[#8A0000]/10 shadow-xl overflow-hidden">
          
          <CornerPattern position="top-left" />
          <CornerPattern position="top-right" />
          <CornerPattern position="bottom-left" />
          <CornerPattern position="bottom-right" />

          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

          <div className="relative z-10 p-8 md:p-16">
            
            {/* HEADER: Hiện ra trước */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 text-center md:text-left">
              <div className="max-w-2xl">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <CalendarDays className="text-[#8A0000]" size={22} />
                  <span className="text-[#8A0000]/50 font-black text-[10px] uppercase tracking-[0.4em]">Cẩm Nang Tu vi</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#8A0000] uppercase tracking-tighter mb-6 italic leading-none">
                  Tử Vi Hằng Ngày
                </h2>
                <p className="text-[#252525]/70 text-lg font-serif italic leading-relaxed">
                  Bản đồ năng lượng 24 giờ, giúp bạn nhận diện thiên thời - địa lợi để làm chủ mọi quyết định trong ngày.
                </p>
              </div>
              
              <div className="hidden md:flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-double border-[#8A0000]/20 bg-[#8A0000]/5 shrink-0 rotate-12">
                <span className="text-[#8A0000] font-black text-3xl">365</span>
                <span className="text-[#8A0000]/40 text-[9px] uppercase tracking-widest font-black mt-1">Chu kỳ</span>
              </div>
            </div>

            {/* GRID ELEMENTS: Hiện ra đuổi nhau (Stagger) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {elements.map((item, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.1} scale={0.95}>
                  <div className="group h-full p-6 bg-white/50 rounded-2xl border border-[#8A0000]/5 hover:border-[#8A0000]/20 transition-all duration-300">
                    <div className="flex flex-col gap-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#8A0000]/5 rounded-full text-[#8A0000] group-hover:bg-[#8A0000] group-hover:text-[#FDFBF7] transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-[#252525] font-black text-sm uppercase tracking-wider">{item.title}</h4>
                        <p className="text-[#8b4513]/60 text-xs mt-1 font-serif italic">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* PHILOSOPHY SECTION: Hiện ra cuối cùng */}
            <FadeIn direction="up" delay={0.6}>
              <div className="bg-[#8A0000] p-10 md:p-14 rounded-[2.5rem] text-[#FDFBF7] relative overflow-hidden mb-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-[#D4AF37] flex items-center gap-2">
                    <Flame size={14} fill="#D4AF37" stroke="none" /> Triết lý Cát Tường
                  </h3>
                  <p className="text-2xl md:text-4xl font-serif italic font-medium leading-tight mb-10">
                    "Biết ngày hôm nay <span className="text-[#D4AF37] underline decoration-double underline-offset-8">XUNG</span> để kiềm chế cái tôi. Biết ngày hôm nay <span className="text-[#D4AF37] underline decoration-double underline-offset-8">HỢP</span> để tự tin bung tỏa."
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/80">◆ Thấu mệnh • Trị mệnh • Làm chủ quẻ đời ◆</p>
                </div>
              </div>
            </FadeIn>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-[#8b4513]/40 uppercase tracking-[0.3em] font-black">
              <span>Thành Bại Tại Hành</span>
              <div className="hidden md:block w-1 h-1 rounded-full bg-[#8A0000]/20" />
              <span>Cát Hung Tại Tâm</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function CornerPattern({ position }: { position: string }) {
  const posClasses: Record<string, string> = {
    "top-left": "top-6 left-6 border-t-2 border-l-2",
    "top-right": "top-6 right-6 border-t-2 border-r-2",
    "bottom-left": "bottom-6 left-6 border-b-2 border-l-2",
    "bottom-right": "bottom-6 right-6 border-b-2 border-r-2",
  };
  return <div className={`absolute w-6 h-6 border-[#8A0000]/20 ${posClasses[position]} rounded-sm`} />;
}