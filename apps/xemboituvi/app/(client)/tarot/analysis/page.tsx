"use client";

import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import spreadsData from "@/features/tarot/data/spreads.json";
import { type DrawnCard, type Spread, getCardImageUrl } from "@/features/tarot/tarot";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<Spread | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedQuestion = sessionStorage.getItem("tarot_question");
    const savedSpreadId = sessionStorage.getItem("tarot_spread");
    const savedDrawnCards = sessionStorage.getItem("tarot_drawn_cards");

    if (!savedQuestion || !savedSpreadId || !savedDrawnCards) {
      router.push("/tarot");
      return;
    }

    const selectedSpread = (spreadsData.spreads as unknown as Spread[]).find((item) => item.id === savedSpreadId);
    if (!selectedSpread) {
      router.push("/tarot");
      return;
    }

    try {
      setQuestion(savedQuestion);
      setSpread(selectedSpread);
      setDrawnCards(JSON.parse(savedDrawnCards) as DrawnCard[]);
    } catch (error) {
      console.error("Error parsing tarot cards:", error);
      router.push("/tarot");
      return;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleNewReading = () => {
    sessionStorage.removeItem("tarot_question");
    sessionStorage.removeItem("tarot_spread");
    sessionStorage.removeItem("tarot_drawn_cards");
    router.push("/tarot");
  };

  if (isLoading || !spread) {
    return (
      <MysticPageShell contentClassName="mx-auto flex min-h-screen max-w-xl items-center px-4 py-20">
        <MysticDarkPanel className="w-full p-5 text-center">
          <p className="text-[14px] font-semibold text-[#F7E8B1]">Đang tải kết quả...</p>
        </MysticDarkPanel>
      </MysticPageShell>
    );
  }

  return (
    <MysticPageShell contentClassName="mx-auto max-w-5xl px-4 py-24">
      <MysticDarkPanel className="mb-5 p-5 text-center">
        <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
          Kết quả trải bài
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
          {spread.name}: "{question}"
        </p>
      </MysticDarkPanel>

      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {drawnCards.map((drawnCard) => (
          <MysticGoldFrame key={`${drawnCard.position.name}-${drawnCard.card.id}`} className="p-4 text-center">
            <img
              src={getCardImageUrl(drawnCard.card.id)}
              alt={drawnCard.card.name}
              className={`mx-auto mb-3 h-40 w-24 rounded-lg border border-[#D4AF37]/35 object-cover shadow-lg ${
                drawnCard.isReversed ? "rotate-180" : ""
              }`}
              draggable={false}
            />
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">
              {drawnCard.position.name}
            </p>
            <h2 className="mt-1 text-[14px] font-semibold text-[#F3E3BC]">{drawnCard.card.name}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/68">
              {(drawnCard.isReversed
                ? drawnCard.card.reversedKeywords
                : drawnCard.card.uprightKeywords
              ).join(", ")}
            </p>
          </MysticGoldFrame>
        ))}
      </div>

      <MysticGoldFrame className="p-5">
        <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
          Luận giải tổng quan
        </h2>
        <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-white/68">
          <p>
            Các lá bài phản hồi câu hỏi của bạn qua từng vị trí trong trải bài {spread.name}.
            Hãy đọc từng lá như một góc nhìn để soi lại tình huống hiện tại.
          </p>
          {drawnCards.map((card) => (
            <p key={`${card.position.name}-${card.card.id}-text`}>
              <strong className="text-[#F3E3BC]">{card.position.name} - {card.card.name}:</strong>{" "}
              {card.isReversed
                ? `Lá bài ngược gợi ý các điểm nghẽn hoặc điều cần nhìn lại: ${card.card.reversedKeywords.join(", ")}.`
                : `Lá bài xuôi gợi ý dòng năng lượng thuận: ${card.card.uprightKeywords.join(", ")}.`}
            </p>
          ))}
          <p>
            Tarot là công cụ phản chiếu, không phải định mệnh cố định. Quyết định cuối cùng vẫn nằm ở bạn.
          </p>
        </div>
      </MysticGoldFrame>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={handleNewReading}
          className="rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] transition hover:bg-[#F2D26B]"
        >
          Trải bài mới
        </button>
        <button
          onClick={() => router.push("/tarot")}
          className="rounded-lg border border-[#D4AF37]/35 bg-black/45 px-5 py-3 text-[14px] font-semibold text-[#F7E8B1] transition hover:bg-black/60"
        >
          Quay lại Tarot
        </button>
      </div>
    </MysticPageShell>
  );
}
