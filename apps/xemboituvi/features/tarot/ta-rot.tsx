"use client";

import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import spreadsData from "@/features/tarot/data/spreads.json";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Spread {
  id: string;
  name: string;
  englishName: string;
  description: string;
  cardCount: number;
}

export default function Tarot() {
  const [question, setQuestion] = useState("");
  const [selectedSpread, setSelectedSpread] = useState<string>("");
  const router = useRouter();

  const handleStartReading = () => {
    if (!question.trim()) {
      alert("Vui lòng nhập câu hỏi.");
      return;
    }

    if (!selectedSpread) {
      alert("Vui lòng chọn kiểu trải bài.");
      return;
    }

    sessionStorage.setItem("tarot_question", question);
    sessionStorage.setItem("tarot_spread", selectedSpread);
    router.push("/tarot/draw");
  };

  const spreads = spreadsData.spreads as unknown as Spread[];

  return (
    <MysticPageShell contentClassName="mx-auto max-w-4xl px-4 py-24">
      <MysticDarkPanel className="mb-5 p-5 text-center">
        <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
          Trải bài Tarot
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
          Đặt một câu hỏi rõ ràng, chọn kiểu trải bài và dùng kết quả như một gợi ý chiêm nghiệm.
        </p>
      </MysticDarkPanel>

      <MysticGoldFrame className="p-5 md:p-6">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-[#D4AF37]">
            Câu hỏi của bạn
          </span>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Bạn muốn biết điều gì?"
            rows={4}
            className="w-full resize-none rounded-lg border border-[#D4AF37]/35 bg-black/45 p-3 text-[14px] text-[#F4EFE4] outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:bg-black/60"
          />
        </label>

        <div className="mt-5">
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">
            Chọn kiểu trải bài
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {spreads.map((spread) => {
              const selected = selectedSpread === spread.id;
              return (
                <button
                  key={spread.id}
                  onClick={() => setSelectedSpread(spread.id)}
                  className={`rounded-lg border p-4 text-left transition ${
                    selected
                      ? "border-[#D4AF37] bg-[#D4AF37]/14"
                      : "border-[#D4AF37]/25 bg-black/35 hover:border-[#D4AF37]"
                  }`}
                >
                  <h3 className="text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
                    {spread.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/68">
                    {spread.description}
                  </p>
                  <p className="mt-3 text-[13px] font-semibold text-[#D4AF37]">
                    {spread.cardCount} lá bài
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleStartReading}
          disabled={!question.trim() || !selectedSpread}
          className="mt-5 w-full rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] transition hover:bg-[#F2D26B] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Bắt đầu trải bài
        </button>
      </MysticGoldFrame>

      <MysticDarkPanel className="mt-5 px-5 py-4 text-center">
        <p className="text-[13px] leading-relaxed text-white/70">
          Tarot là công cụ chiêm nghiệm, không thay thế quyết định cá nhân của bạn.
        </p>
      </MysticDarkPanel>
    </MysticPageShell>
  );
}
