"use client";

import { Crosshair, FileSearch, Flame, Gem, Milestone, ScrollText, Star, Zap } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function IntroTuViTronDoi() {
  const palaces = [
    { title: "Mệnh & Thân", desc: "Tư chất, tính cách và định hướng cốt lõi của bản thân." },
    { title: "Phúc Đức", desc: "Dòng tộc, phước báu và đời sống tinh thần." },
    { title: "Quan Lộc", desc: "Con đường sự nghiệp, công danh và quyền lực xã hội." },
    { title: "Tài Bạch", desc: "Khả năng tài chính, cách kiếm tiền và tích lũy." },
    { title: "Phu Thê", desc: "Duyên nợ, hôn nhân và người bạn đời." },
    { title: "Thiên Di", desc: "Vận may khi ra ngoài và môi trường xã hội." },
    { title: "Tử Tức", desc: "Đường con cái, sinh dưỡng và hậu vận." },
    { title: "Phụ Mẫu", desc: "Quan hệ với cha mẹ và ân đức dòng họ." },
  ];

  const steps = [
    { step: "Bước 1", title: "Cung cấp dữ liệu", desc: "Nhập chính xác ngày, giờ sinh và năm cần xem." },
    { step: "Bước 2", title: "Thiết lập thiên bàn", desc: "Hệ thống an vị các sao vào cung chức tương ứng." },
    { step: "Bước 3", title: "Luận giải tổng quan", desc: "Phân tích âm dương, ngũ hành, cục và mệnh." },
    { step: "Bước 4", title: "Chi tiết vận hạn", desc: "Gợi ý từng giai đoạn để đón cát, tránh hung." },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 font-sans text-white">
      <div className="space-y-10">
        <SectionTitle icon={<ScrollText size={18} />} title="Lá số tử vi là gì?" />
        <FadeIn direction="up">
          <div className="rounded-xl border border-[#D4AF37]/25 bg-black/45 p-5 shadow-[0_16px_32px_rgba(0,0,0,0.45)] md:p-6">
            <p className="text-[13px] leading-6 text-white/70">
              Lá số tử vi là bản đồ tham khảo được lập từ giờ, ngày, tháng, năm sinh. Các sao được an vào 12 cung để nhìn tổng quan về mệnh, tài, quan, tình cảm, gia đạo và vận hạn.
            </p>
          </div>
        </FadeIn>

        <section>
          <div className="mb-5 text-center">
            <Star className="mx-auto mb-3 text-[#D4AF37]" fill="#D4AF37" size={18} />
            <h2 className="papyrus text-[20px] font-semibold uppercase tracking-[0.12em] text-[#FFD700] md:text-[24px]">Cấu trúc 12 cung chức</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {palaces.map((item, index) => (
              <FadeIn key={item.title} direction="up" delay={index * 0.04}>
                <div className="h-full rounded-lg border border-[#D4AF37]/35 bg-black/35 p-4 transition hover:border-[#D4AF37]/70">
                  <h3 className="mb-2 flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-[#F3E3BC]">
                    <Flame size={13} fill="#D4AF37" stroke="none" /> {item.title}
                  </h3>
                  <p className="text-[13px] leading-6 text-white/60">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <SectionTitle icon={<Zap size={18} />} title="Giá trị luận giải trọn đời" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ValueCard icon={<Crosshair size={20} />} title="Định vị bản thân" desc="Hiểu ưu khuyết điểm bẩm sinh để chọn môi trường phát triển phù hợp." />
          <ValueCard icon={<Milestone size={20} />} title="Dự báo đại vận" desc="Nắm chu kỳ vận hạn để biết khi nào nên tiến, khi nào nên chậm lại." />
        </div>

        <FadeIn scale={0.98}>
          <div className="rounded-lg border border-[#D4AF37]/25 bg-black/35 p-5">
            <h4 className="mb-3 text-[13px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">Triết lý tử vi hiện đại</h4>
            <p className="text-[14px] font-semibold leading-7 text-[#F3E3BC]">
              Tử vi không phải định mệnh bất biến, mà là bản hướng dẫn để hiểu mình và tối ưu lựa chọn trong đời sống.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">Biết mệnh để làm chủ vận mệnh</p>
            </div>
          </div>
        </FadeIn>

        <SectionTitle icon={<FileSearch size={18} />} title="Quy trình lập lá số chuẩn" />
        <FadeIn scale={0.98}>
          <div className="rounded-xl border border-[#D4AF37]/25 bg-black/45 p-5 md:p-6">
            <div className="space-y-4 border-l border-[#D4AF37]/25 pl-5">
              {steps.map((item, index) => (
                <FadeIn key={item.step} direction="up" delay={index * 0.05}>
                  <div className="relative">
                    <div className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border border-[#D4AF37] bg-black" />
                    <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/12 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
                      {item.step}
                    </span>
                    <h4 className="mt-3 text-[14px] font-bold uppercase tracking-wide text-[#F3E3BC]">{item.title}</h4>
                    <p className="mt-2 max-w-2xl text-[13px] leading-6 text-white/60">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <FadeIn direction="up">
      <div className="mb-5 flex items-center justify-center gap-3 md:justify-start">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">{icon}</div>
        <h2 className="papyrus text-[20px] font-semibold uppercase tracking-[0.12em] text-[#FFD700] md:text-[24px]">{title}</h2>
      </div>
    </FadeIn>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <FadeIn direction="up">
      <div className="flex h-full gap-4 rounded-lg border border-[#D4AF37]/20 bg-black/35 p-5">
        <div className="text-[#D4AF37]">{icon}</div>
        <div>
          <h4 className="text-[14px] font-bold uppercase tracking-wide text-[#F3E3BC]">{title}</h4>
          <p className="mt-2 text-[13px] leading-6 text-white/60">{desc}</p>
        </div>
      </div>
    </FadeIn>
  );
}
