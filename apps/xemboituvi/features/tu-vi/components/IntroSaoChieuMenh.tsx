"use client";

import { Gem, HelpCircle, Info, ShieldCheck, Sparkles } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { MysticGoldFrame } from "@/components/ui/client/mystic-page-shell";

export default function IntroSaoChieuMenh() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <FadeIn scale={0.98} direction="up">
        <MysticGoldFrame className="overflow-hidden text-white">
          <div className="border-b border-[#D4AF37]/25 bg-[#D4AF37]/10 px-5 py-5 text-center">
            <h2 className="papyrus text-[20px] font-semibold uppercase tracking-[0.12em] text-[#FFD700] md:text-[24px]">
              Cửu diệu tinh quân
            </h2>
            <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]/80">
              Kiến thức tử vi bản mệnh 2025
            </p>
          </div>

          <div className="space-y-6 p-5 md:p-6">
            <FadeIn direction="up" delay={0.1}>
              <section className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-center">
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Info size={16} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.14em]">Khái niệm</span>
                  </div>
                  <h3 className="text-[14px] font-bold uppercase tracking-wide text-[#F3E3BC]">Sao chiếu mệnh là gì?</h3>
                  <p className="text-[13px] leading-6 text-white/70">
                    Mỗi năm bản mệnh chịu ảnh hưởng bởi một sao trong hệ Cửu Diệu. Thông tin này dùng để tham khảo thời điểm thuận lợi, điểm cần thận trọng và cách giữ tâm thế cân bằng.
                  </p>
                </div>
                <MysticGoldFrame className="p-5">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <Metric value="9" label="Vì sao" />
                    <Metric value="1" label="Chu kỳ năm" />
                  </div>
                </MysticGoldFrame>
              </section>
            </FadeIn>

            <section className="space-y-4">
              <div className="h-px w-full bg-[#D4AF37]/30" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <StarType icon={<Gem className="text-[#D4AF37]" size={18} />} title="Cát tinh" list="Thái Dương, Thái Âm, Mộc Đức" desc="Tượng trưng cho ánh sáng và tài lộc." />
                <StarType icon={<Sparkles className="text-[#D4AF37]" size={18} />} title="Trung tinh" list="Thủy Diệu, Thổ Tú, Vân Hớn" desc="Cân bằng giữa thử thách và cơ hội." />
                <StarType icon={<ShieldCheck className="text-[#D4AF37]" size={18} />} title="Hung tinh" list="La Hầu, Kế Đô, Thái Bạch" desc="Nhắc bạn giữ tâm vững trước biến động." />
              </div>
            </section>

            <FadeIn direction="up" delay={0.2}>
              <MysticGoldFrame className="p-5 text-left">
                <h4 className="mb-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <HelpCircle size={15} /> Góc giải đáp
                </h4>
                <p className="text-[14px] font-semibold leading-6 text-[#F3E3BC]">Gặp sao xấu có cần quá lo lắng?</p>
                <p className="mt-2 max-w-2xl text-[13px] leading-6 text-white/70">
                  Sao xấu là lời nhắc để sống chậm, cẩn trọng và bao dung hơn. Khi tâm an ổn, vận hạn cũng dễ chuyển hóa thành bài học.
                </p>
              </MysticGoldFrame>
            </FadeIn>
          </div>
        </MysticGoldFrame>
      </FadeIn>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[14px] font-bold text-[#FFD700]">{value}</p>
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]/70">{label}</p>
    </div>
  );
}

function StarType({ icon, title, list, desc }: { icon: React.ReactNode; title: string; list: string; desc: string }) {
  return (
    <MysticGoldFrame className="h-full p-4 text-left">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h4 className="text-[13px] font-bold uppercase tracking-wide text-[#F3E3BC]">{title}</h4>
      </div>
      <p className="text-[13px] font-semibold text-[#FFD700]">{list}</p>
      <p className="mt-2 text-[13px] leading-6 text-white/60">{desc}</p>
    </MysticGoldFrame>
  );
}
