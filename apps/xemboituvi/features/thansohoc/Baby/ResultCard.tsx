"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticPageShell, MysticPanel } from "@/components/ui/client/mystic-page-shell";
import { ArrowLeft, Award, Download, Lightbulb, ShieldCheck, Star } from "lucide-react";
import { KidProfile } from "./data/babyInterpretations";

interface ResultCardProps {
  result: {
    lifePath: number;
    expression: number;
    parentLifePath?: number;
    isCompatible?: boolean;
    data: KidProfile;
  };
  onReset: () => void;
  backgroundImage: string;
}

export default function ResultCard({ result, onReset }: ResultCardProps) {
  const { data, lifePath, expression } = result;

  return (
    <MysticPageShell contentClassName="mx-auto max-w-4xl px-4 py-10">
      <FadeIn direction="down">
        <MysticDarkPanel className="mb-5 p-5 text-center">
          <button
            onClick={onReset}
            className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/35 px-3 py-2 text-[13px] font-semibold text-[#F7E8B1] transition hover:bg-white/10 print:hidden"
          >
            <ArrowLeft size={14} /> Nhập lại
          </button>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] text-[#1B140E]">
            <Award size={24} />
          </div>
          <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
            {data?.title || "Hành trình khám phá bé"}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70">
            Mỗi đứa trẻ có một nhịp phát triển riêng, báo cáo này giúp ba mẹ quan sát con rõ hơn.
          </p>
        </MysticDarkPanel>
      </FadeIn>

      <FadeIn scale={0.98} delay={0.1}>
        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <MysticDarkPanel className="p-5 text-center">
            <div className="text-[24px] font-bold text-[#D4AF37]">{lifePath}</div>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
              Số chủ đạo
            </p>
          </MysticDarkPanel>
          <MysticDarkPanel className="p-5 text-center">
            <div className="text-[24px] font-bold text-[#D4AF37]">{expression}</div>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
              Số sứ mệnh
            </p>
          </MysticDarkPanel>
        </div>
      </FadeIn>

      <div className="space-y-5">
        <FadeIn direction="up" delay={0.2}>
          <MysticDarkPanel className="p-5">
            <div className="mb-3 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              <Lightbulb size={16} className="text-[#D4AF37]" /> Tính cách và tâm hồn
            </div>
            <p className="border-l-2 border-[#D4AF37]/45 pl-4 text-[13px] leading-relaxed text-slate-300">
              {data?.description || "Dữ liệu mô tả đang được cập nhật."}
            </p>
          </MysticDarkPanel>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <MysticDarkPanel className="p-5">
            <div className="mb-3 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              <Star size={16} className="text-[#D4AF37]" /> Thế mạnh bẩm sinh
            </div>
            <div className="space-y-3">
              {data?.strengths?.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-lg border border-[#D4AF37]/20 bg-black/40 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37] text-[13px] font-semibold text-[#1B140E]">
                    {index + 1}
                  </span>
                  <p className="text-[13px] leading-relaxed text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </MysticDarkPanel>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <MysticDarkPanel className="p-5">
            <div className="mb-3 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              <ShieldCheck size={16} className="text-[#D4AF37]" /> Lời khuyên và thử thách
            </div>
            <div className="space-y-3">
              {data?.challenges?.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-lg border border-[#D4AF37]/20 bg-black/40 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37] text-[13px] font-semibold text-[#1B140E]">
                    {index + 1}
                  </span>
                  <p className="text-[13px] leading-relaxed text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </MysticDarkPanel>
        </FadeIn>

        <FadeIn direction="up" delay={0.5}>
          <div className="print:hidden">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] transition hover:bg-[#F2D26B]"
            >
              <Download size={16} /> Tải báo cáo
            </button>
          </div>
        </FadeIn>
      </div>
    </MysticPageShell>
  );
}
