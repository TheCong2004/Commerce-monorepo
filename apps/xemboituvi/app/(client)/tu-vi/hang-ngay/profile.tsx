"use client";

import React from "react";
import { CalendarDays, Clock, Compass, Flame, Lightbulb, ShieldCheck, Star, Zap } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { MysticGoldFrame } from "@/components/ui/client/mystic-page-shell";

export default function IntroTuViNgay() {
  const elements = [
    { icon: <Clock size={16} />, title: "Giờ hoàng đạo", desc: "Khung giờ thuận để bắt đầu việc quan trọng." },
    { icon: <Compass size={16} />, title: "Hướng xuất hành", desc: "Gợi ý hướng đi giúp giữ tinh thần chủ động." },
    { icon: <Zap size={16} />, title: "Việc nên làm", desc: "Các việc hợp nhịp năng lượng trong ngày." },
    { icon: <ShieldCheck size={16} />, title: "Kiêng kỵ", desc: "Những điểm nên tránh để giảm va chạm." },
    { icon: <Star size={16} />, title: "Sao tốt xấu", desc: "Tổng hợp hung cát theo hệ sao trong ngày." },
    { icon: <Lightbulb size={16} />, title: "Lời khuyên", desc: "Một gợi ý ngắn để dùng ngày hiệu quả hơn." },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 font-sans text-white">
      <FadeIn scale={0.98} direction="up">
        <MysticGoldFrame className="p-5 md:p-6">
          <div className="mb-6 flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
                <CalendarDays className="text-[#D4AF37]" size={16} />
                <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                  Cẩm nang tử vi
                </span>
              </div>
              <h2 className="mb-2 text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">
                Tử vi hằng ngày
              </h2>
              <p className="text-[13px] leading-6 text-white/68">
                Bản đồ năng lượng trong ngày, giúp bạn tham khảo thiên thời, hướng đi và các việc nên ưu tiên.
              </p>
            </div>

            <div className="mx-auto flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/10 md:mx-0">
              <span className="text-[14px] font-bold text-[#F3E3BC]">365</span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]/75">
                Chu kỳ
              </span>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {elements.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.05} scale={0.98}>
                <div className="h-full rounded-lg border border-[#D4AF37]/35 bg-black/35 p-4 transition hover:border-[#D4AF37]/75 hover:bg-black/50">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]">
                    {item.icon}
                  </div>
                  <h4 className="text-[14px] font-bold uppercase tracking-[0.08em] text-[#F3E3BC]">{item.title}</h4>
                  <p className="mt-2 text-[13px] leading-6 text-white/60">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={0.25}>
            <div className="mb-5 rounded-lg border border-[#D4AF37]/35 bg-black/35 p-5 text-white transition hover:border-[#D4AF37]/70">
              <h3 className="mb-3 flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] md:justify-start">
                <Flame size={14} fill="#D4AF37" stroke="none" /> Triết lý cát tường
              </h3>
              <p className="text-[14px] font-semibold leading-7 text-[#F3E3BC]">
                Biết ngày hôm nay xung để chậm lại đúng lúc. Biết ngày hôm nay hợp để tự tin bắt đầu việc cần làm.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col items-center justify-between gap-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D4AF37]/60 md:flex-row">
            <span>Thành bại tại hành</span>
            <div className="hidden h-1 w-1 rounded-full bg-[#D4AF37]/35 md:block" />
            <span>Cát hung tại tâm</span>
          </div>
        </MysticGoldFrame>
      </FadeIn>
    </div>
  );
}
