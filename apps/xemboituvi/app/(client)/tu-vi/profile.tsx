"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticGoldFrame, MysticPageShell } from "@/components/ui/client/mystic-page-shell";
import { Activity, ArrowRight, Book, CalendarDays, Heart, Scroll, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";

export default function IntroTuVi() {
  const tools = [
    { title: "Tử vi trọn đời", desc: "Lập lá số, xem mệnh cục, cung số và các giai đoạn quan trọng.", href: "/tu-vi/tron-doi", icon: <Scroll size={20} /> },
    { title: "Tử vi hằng ngày", desc: "Tra vận khí theo ngày để chọn việc nên làm và nên tránh.", href: "/tu-vi/hang-ngay", icon: <CalendarDays size={20} /> },
    { title: "Sao chiếu mệnh", desc: "Xem sao hạn năm, hạn tốt xấu và gợi ý hóa giải nhẹ nhàng.", href: "/tu-vi/sao-chieu-menh", icon: <Star size={20} /> },
    { title: "Bói tình yêu", desc: "Xem mức độ hòa hợp và điểm cần cân bằng trong tình cảm.", href: "/tu-vi/boi-tinh-yeu", icon: <Heart size={20} /> },
  ];

  const palaceItems = [
    { title: "Cung Mệnh", desc: "Tính cách, khí chất và định hướng đời sống.", icon: <Activity size={20} /> },
    { title: "Cung Quan Lộc", desc: "Sự nghiệp, công danh và nhịp thăng tiến.", icon: <Book size={20} /> },
    { title: "Cung Tài Bạch", desc: "Tiền bạc, cách kiếm tiền và giữ tiền.", icon: <Sparkles size={20} /> },
    { title: "Cung Phu Thê", desc: "Hôn nhân, người đồng hành và sự hòa hợp.", icon: <Users size={20} /> },
  ];

  return (
    <MysticPageShell contentClassName="mx-auto max-w-6xl px-4 pb-20 pt-20">
      <header className="mb-8 text-center">
        <FadeIn direction="down">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/35 bg-black/45 px-3 py-1.5 text-[13px] font-semibold text-[#D4AF37] backdrop-blur">
            <ShieldCheck size={15} /> Mệnh do trời, vận do người
          </div>
          <MysticDarkPanel className="mx-auto max-w-3xl px-5 py-4">
            <h1 className="papyrus text-[20px] font-semibold uppercase tracking-[0.12em] text-[#FFD700] md:text-[24px]">
              Giải mã lá số tử vi
            </h1>
            <p className="mt-2 text-[13px] leading-6 text-white/70">
              Luận giải vận mệnh phương Đông dựa trên giờ, ngày, tháng, năm sinh và hệ thống 12 cung.
            </p>
          </MysticDarkPanel>
        </FadeIn>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((item, index) => (
          <FadeIn key={item.href} direction="up" delay={index * 0.08} scale={0.98}>
            <Link href={item.href} className="group block h-full">
              <MysticGoldFrame className="flex h-full flex-col p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#D4AF37]">
                  {item.icon}
                </div>
                <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">{item.title}</h2>
                <p className="mt-2 flex-1 text-[13px] leading-6 text-white/65">{item.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#D4AF37]">
                  Xem ngay <ArrowRight size={14} />
                </div>
              </MysticGoldFrame>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn direction="up">
          <MysticGoldFrame className="p-5">
            <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              Tử vi đẩu số là gì?
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-white/70">
              Tử vi dùng lá số an theo thời điểm sinh để nhìn các mặt chính của đời sống: mệnh, tài, quan, tình cảm, gia đạo và vận hạn.
            </p>
          </MysticGoldFrame>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {palaceItems.map((item, index) => (
            <FadeIn key={item.title} direction="up" delay={index * 0.08}>
              <MysticGoldFrame className="p-5">
                <div className="mb-3 text-[#D4AF37]">{item.icon}</div>
                <h3 className="text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-white/65">{item.desc}</p>
              </MysticGoldFrame>
            </FadeIn>
          ))}
        </div>
      </div>
    </MysticPageShell>
  );
}
