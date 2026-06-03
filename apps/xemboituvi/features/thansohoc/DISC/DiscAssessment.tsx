"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticPageShell, MysticPanel } from "@/components/ui/client/mystic-page-shell";
import { CheckCircle, ChevronRight, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { DISC_QUESTIONS } from "../data/discQuestions";

type PersonalityType = "D" | "I" | "S" | "C";

const DiscRadarChart = ({ scores }: { scores: Record<PersonalityType, number> }) => {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const maxVal = Math.max(...Object.values(scores), 10);
  const chartData = [
    { label: "D", value: scores.D, angle: -90 },
    { label: "I", value: scores.I, angle: 0 },
    { label: "S", value: scores.S, angle: 90 },
    { label: "C", value: scores.C, angle: 180 },
  ];

  const getPoint = (angle: number, value: number) => {
    const r = radius * (value / maxVal);
    const rad = (angle * Math.PI) / 180;
    return { x: center + r * Math.cos(rad), y: center + r * Math.sin(rad) };
  };

  const points = chartData.map((item) => getPoint(item.angle, item.value));
  const polyPoints = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-[#D4AF37]/20 bg-[#F8F2E6] p-4">
      <svg width={size} height={size} className="overflow-visible">
        {[0.25, 0.5, 0.75, 1].map((scale) => {
          const r = radius * scale;
          const webPoints = chartData
            .map((item) => {
              const rad = (item.angle * Math.PI) / 180;
              return `${center + r * Math.cos(rad)},${center + r * Math.sin(rad)}`;
            })
            .join(" ");
          return <polygon key={scale} points={webPoints} fill="none" stroke="#D8C79E" strokeWidth="1" />;
        })}
        <polygon points={polyPoints} fill="rgba(212,175,55,0.28)" stroke="#9A5418" strokeWidth="2" />
        {chartData.map((item) => {
          const point = getPoint(item.angle, item.value);
          const label = getPoint(item.angle, maxVal * 1.22);
          return (
            <g key={item.label}>
              <circle cx={point.x} cy={point.y} r="4" fill="#9A5418" />
              <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle" className="fill-[#3B2A22] text-[11px] font-semibold">
                {item.label} ({item.value})
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-[13px] text-[#6F6258]">Biểu đồ năng lượng DISC</p>
    </div>
  );
};

export default function DiscAssessment() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, PersonalityType>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const result = useMemo(() => {
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    Object.values(answers).forEach((type) => {
      scores[type]++;
    });
    const maxScore = Math.max(...Object.values(scores));
    const dominantTypes = (Object.keys(scores) as PersonalityType[]).filter((type) => scores[type] === maxScore);
    return { scores, dominantTypes };
  }, [answers]);

  const handleSelect = (type: PersonalityType) => {
    setAnswers((prev) => ({ ...prev, [DISC_QUESTIONS[currentQIndex].id]: type }));
    setTimeout(() => {
      if (currentQIndex < DISC_QUESTIONS.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 160);
  };

  const handleSendEmail = async () => {
    if (!userEmail) return alert("Vui lòng nhập email.");
    setIsSending(true);
    setIsSending(false);
    alert("Tính năng gửi email đang được xử lý.");
  };

  if (isFinished) {
    return (
      <MysticPageShell contentClassName="mx-auto max-w-4xl px-4 py-10">
        <FadeIn direction="up">
          <MysticDarkPanel className="mb-5 p-5 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D4AF37] text-[#1B140E]">
              <CheckCircle size={24} />
            </div>
            <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              Kết quả DISC của bạn
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">
              Hồ sơ tính cách dựa trên câu trả lời của bạn.
            </p>
          </MysticDarkPanel>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-2">
          <MysticPanel className="p-5">
            <DiscRadarChart scores={result.scores} />
          </MysticPanel>
          <MysticPanel className="p-5">
            <h2 className="mb-3 text-[14px] font-semibold uppercase tracking-wide text-[#3B2A22]">
              Nhóm chủ đạo
            </h2>
            <div className="mb-4 flex flex-wrap gap-2">
              {result.dominantTypes.map((type) => (
                <span key={type} className="rounded-lg bg-[#D4AF37] px-3 py-2 text-[13px] font-semibold text-[#1B140E]">
                  Type {type}
                </span>
              ))}
            </div>
            <div className="space-y-2 text-[13px] text-[#6F6258]">
              {[
                ["D", "Thống trị"],
                ["I", "Ảnh hưởng"],
                ["S", "Kiên định"],
                ["C", "Tuân thủ"],
              ].map(([type, label]) => (
                <div key={type} className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                  <span>{type} - {label}</span>
                  <span className="font-semibold">{result.scores[type as PersonalityType]} câu</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#9A5418]"
            >
              <RefreshCcw size={14} /> Làm lại bài test
            </button>
          </MysticPanel>
        </div>

        <MysticPanel className="mt-5 p-5 text-center">
          <h3 className="mb-3 text-[14px] font-semibold uppercase tracking-wide text-[#3B2A22]">
            Nhận phân tích chi tiết
          </h3>
          <div className="mx-auto flex max-w-md gap-2">
            <input
              type="email"
              placeholder="email@gmail.com"
              className="flex-1 rounded-lg border border-[#D4AF37]/35 bg-white/80 px-3 py-3 text-[14px] outline-none"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className="rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] disabled:opacity-50"
            >
              {isSending ? "..." : "Gửi"}
            </button>
          </div>
        </MysticPanel>
      </MysticPageShell>
    );
  }

  const currentQuestion = DISC_QUESTIONS[currentQIndex];
  const progress = ((currentQIndex + 1) / DISC_QUESTIONS.length) * 100;

  return (
    <MysticPageShell contentClassName="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-5">
        <div className="mb-2 flex justify-between text-[13px] font-semibold text-white/70">
          <span>Câu hỏi {currentQIndex + 1} / {DISC_QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-lg bg-white/10">
          <div className="h-2 rounded-lg bg-[#D4AF37]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <FadeIn key={currentQIndex} direction="up">
        <MysticPanel className="p-5 md:p-6">
          <h1 className="mb-5 text-center text-[14px] font-semibold leading-relaxed text-[#3B2A22]">
            {currentQuestion.question}
          </h1>
          <div className="grid gap-3">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={`${opt.type}-${idx}`}
                onClick={() => handleSelect(opt.type as PersonalityType)}
                className="group flex items-center gap-3 rounded-lg border border-[#D4AF37]/25 bg-white/60 p-4 text-left transition hover:border-[#D4AF37] hover:bg-[#F8F2E6]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37] text-[13px] font-semibold text-[#1B140E]">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-[13px] font-medium leading-relaxed text-[#6F6258]">{opt.text}</span>
                <ChevronRight className="text-[#9A5418]" size={16} />
              </button>
            ))}
          </div>
        </MysticPanel>
      </FadeIn>
    </MysticPageShell>
  );
}
