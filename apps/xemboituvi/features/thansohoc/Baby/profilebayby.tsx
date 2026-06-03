"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticPanel } from "@/components/ui/client/mystic-page-shell";
import { Baby, BookOpen, ShieldCheck, Sparkles } from "lucide-react";

export default function KidsNumerologyIntro() {
  const benefits = [
    {
      icon: <Baby size={22} />,
      title: "Hiểu tính cách bẩm sinh",
      desc: "Nhìn nhanh xu hướng hướng nội, hướng ngoại, nhạy cảm hay mạnh mẽ để giao tiếp với con phù hợp hơn.",
    },
    {
      icon: <Sparkles size={22} />,
      title: "Nhận diện điểm mạnh",
      desc: "Gợi ý năng khiếu nổi bật để ba mẹ quan sát, khuyến khích và đầu tư đúng nhịp.",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Chuẩn bị cho thử thách",
      desc: "Biết trước vài khuynh hướng dễ vấp để đồng hành với con bình tĩnh hơn.",
    },
  ];

  const reportItems = [
    "Số chủ đạo và xu hướng phát triển chính.",
    "Số sứ mệnh qua họ tên đầy đủ.",
    "Gợi ý giao tiếp, nuôi dưỡng và cân bằng năng lượng.",
  ];

  return (
    <section className="relative bg-[#050505] px-4 pb-20 pt-8 font-sans text-[14px] text-[#F4EFE4]">
      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn direction="up">
          <MysticDarkPanel className="mb-5 px-5 py-4 text-center">
            <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              Vì sao ba mẹ nên tra cứu?
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">
              Không dùng để áp đặt tương lai của con, mà để hiểu con sớm hơn và đồng hành mềm hơn.
            </p>
          </MysticDarkPanel>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {benefits.map((item, index) => (
            <FadeIn key={item.title} direction="up" delay={index * 0.08}>
              <MysticDarkPanel className="h-full p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{item.desc}</p>
              </MysticDarkPanel>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={0.25}>
          <MysticDarkPanel className="mt-5 p-5">
            <div className="mb-4 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              <BookOpen size={16} /> Báo cáo gồm những gì?
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {reportItems.map((item, index) => (
                <div
                  key={item}
                  className="rounded-lg border border-[#D4AF37]/25 bg-black/30 p-4 text-[13px] leading-relaxed text-white/70"
                >
                  <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4AF37] text-[13px] font-semibold text-[#1B140E]">
                    {index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </MysticDarkPanel>
        </FadeIn>
      </div>
    </section>
  );
}
