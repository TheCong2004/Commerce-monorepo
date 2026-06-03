"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticPageShell, MysticPanel } from "@/components/ui/client/mystic-page-shell";
import { Brain, Briefcase, RefreshCcw, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { MBTI_QUESTIONS } from "../data/mbtiData";
import { calculateMbtiResult } from "../utils/mbtiUtils";

export default function MbtiAssessment() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const result = useMemo(() => {
    if (!isFinished) return null;
    return calculateMbtiResult(answers);
  }, [isFinished, answers]);

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [MBTI_QUESTIONS[currentQIndex].id]: value }));
    setTimeout(() => {
      if (currentQIndex < MBTI_QUESTIONS.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 160);
  };

  const progress = ((currentQIndex + 1) / MBTI_QUESTIONS.length) * 100;

  if (isFinished && result) {
    const { code, profile, stats } = result;

    return (
      <MysticPageShell contentClassName="mx-auto max-w-4xl px-4 py-10">
        <FadeIn direction="up">
          <MysticDarkPanel className="mb-5 p-5 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D4AF37] text-[#1B140E]">
              <Brain size={24} />
            </div>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">
              Nhóm tính cách của bạn
            </p>
            <h1 className="mt-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              {code} - {profile.title}
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
              {profile.description}
            </p>
          </MysticDarkPanel>
        </FadeIn>

        <div className="space-y-5">
          <MysticDarkPanel className="p-5">
            <h2 className="mb-4 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              Phân tích 4 chiều hướng
            </h2>
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="mb-2 flex justify-between text-[13px] font-semibold text-slate-300">
                    <span>{stat.labelL}</span>
                    <span>{stat.labelR}</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-lg bg-white/10">
                    <div className="h-full bg-[#D4AF37]" style={{ width: `${stat.leftPercent}%` }} />
                    <div className="h-full bg-[#1b140e]/60" style={{ width: `${stat.rightPercent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </MysticDarkPanel>

          <div className="grid gap-5 md:grid-cols-2">
            <MysticDarkPanel className="p-5">
              <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
                <Star size={16} className="text-[#D4AF37]" /> Điểm mạnh
              </h3>
              <ul className="space-y-2">
                {profile.strengths.map((item) => (
                  <li key={item} className="text-[13px] leading-relaxed text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </MysticDarkPanel>

            <MysticDarkPanel className="p-5">
              <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
                <Briefcase size={16} className="text-[#D4AF37]" /> Nghề nghiệp gợi ý
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.careers.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-[#D4AF37]/25 bg-black/40 px-3 py-1.5 text-[13px] text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </MysticDarkPanel>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] transition hover:bg-[#F2D26B]"
          >
            <RefreshCcw size={16} /> Làm lại bài trắc nghiệm
          </button>
        </div>
      </MysticPageShell>
    );
  }

  const currentQ = MBTI_QUESTIONS[currentQIndex];

  return (
    <MysticPageShell contentClassName="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-5">
        <div className="mb-2 flex justify-between text-[13px] font-semibold text-white/70">
          <span>Tiến độ tra cứu</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-lg bg-white/10">
          <div className="h-2 rounded-lg bg-[#D4AF37]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <FadeIn key={currentQIndex} direction="up">
        <MysticDarkPanel className="p-5 md:p-6">
          <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">
            {currentQ.dimension === "EI"
              ? "Xu hướng năng lượng"
              : currentQ.dimension === "SN"
                ? "Cách tiếp nhận thông tin"
                : currentQ.dimension === "TF"
                  ? "Cách đưa ra quyết định"
                  : "Lối sống và hành động"}
          </p>
          <h1 className="mb-5 text-center text-[14px] font-semibold leading-relaxed text-[#F7E8B1]">
            {currentQ.question}
          </h1>
          <div className="grid gap-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="flex items-center gap-3 rounded-lg border border-[#D4AF37]/25 bg-black/30 p-4 text-left transition hover:border-[#D4AF37] hover:bg-white/10"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37] text-[13px] font-semibold text-[#1B140E]">
                  {idx === 0 ? "A" : "B"}
                </span>
                <span className="text-[13px] font-medium leading-relaxed text-slate-300">{opt.text}</span>
              </button>
            ))}
          </div>
        </MysticDarkPanel>
      </FadeIn>
    </MysticPageShell>
  );
}
