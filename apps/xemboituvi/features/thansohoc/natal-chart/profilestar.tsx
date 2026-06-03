"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticPanel } from "@/components/ui/client/mystic-page-shell";
import { Compass, Info, Moon, Star, Sun } from "lucide-react";

export default function IntroNatalChart() {
  const bigThree = [
    {
      icon: <Sun size={22} />,
      title: "Sun Sign",
      sub: "Cái tôi và mục tiêu sống",
      desc: "Đại diện cho cách bạn tỏa sáng và điều bạn đang hướng tới.",
    },
    {
      icon: <Moon size={22} />,
      title: "Moon Sign",
      sub: "Cảm xúc và nội tâm",
      desc: "Cho thấy nhu cầu an toàn, phản ứng cảm xúc và nhịp sống bên trong.",
    },
    {
      icon: <Compass size={22} />,
      title: "Ascendant",
      sub: "Ấn tượng đầu tiên",
      desc: "Cách thế giới nhìn thấy bạn và phong cách bạn bước vào đời sống.",
    },
  ];

  return (
    <section className="relative bg-[#050505] px-4 pb-20 pt-8 font-sans text-[14px] text-[#F4EFE4]">
      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn direction="up">
          <MysticDarkPanel className="mb-5 p-5 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37] text-[#1B140E]">
              <Star size={20} />
            </div>
            <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              Bản đồ sao là gì?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
              Bản đồ sao là vị trí các hành tinh tại thời điểm bạn sinh ra, giúp nhìn rõ hơn tính cách,
              cảm xúc và cách bạn tương tác với thế giới.
            </p>
          </MysticDarkPanel>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {bigThree.map((item, index) => (
            <FadeIn key={item.title} direction="up" delay={index * 0.08}>
              <MysticPanel className="h-full p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#F8F2E6] text-[#9A5418]">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-semibold uppercase tracking-wide text-[#3B2A22]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] font-semibold text-[#9A5418]">{item.sub}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6F6258]">{item.desc}</p>
              </MysticPanel>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={0.3}>
          <MysticDarkPanel className="mt-5 p-5">
            <div className="mb-2 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              <Info size={16} /> Vì sao giờ sinh quan trọng?
            </div>
            <p className="text-[13px] leading-relaxed text-white/70">
              Cung mọc và các nhà thay đổi theo giờ sinh. Thông tin càng đúng, bản đồ sao càng có giá trị tham khảo.
            </p>
          </MysticDarkPanel>
        </FadeIn>
      </div>
    </section>
  );
}
