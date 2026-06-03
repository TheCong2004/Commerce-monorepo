"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticPageShell } from "@/components/ui/client/mystic-page-shell";
import { type DrawnCard, type Spread, type TarotCard as TarotCardType, cardImageMap } from "@/features/tarot/tarot";
import spreadsData from "@/features/tarot/data/spreads.json";
import tarotCardsData from "@/features/tarot/data/tarot-cards.json";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ShuffledCard extends TarotCardType {
  isReversed: boolean;
}

export default function DrawPage() {
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<Spread | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState<ShuffledCard[]>([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedQuestion = sessionStorage.getItem("tarot_question");
    const savedSpreadId = sessionStorage.getItem("tarot_spread");
    if (!savedQuestion || !savedSpreadId) {
      router.push("/tarot");
      return;
    }

    setQuestion(savedQuestion);
    const selectedSpread = (spreadsData.spreads as unknown as Spread[]).find((item) => item.id === savedSpreadId);
    if (!selectedSpread) {
      router.push("/tarot");
      return;
    }

    setSpread(selectedSpread);
    const data = tarotCardsData as any;
    const allCards: TarotCardType[] = [...data.majorArcana];
    Object.values(data.minorArcana).forEach((suit: any) => allCards.push(...suit));
    const shuffled = allCards
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, isReversed: Math.random() > 0.5 }));
    setShuffledDeck(shuffled.slice(0, 22));
  }, [router]);

  const handleDrawCard = (card: ShuffledCard, index: number) => {
    if (!spread || currentPositionIndex >= spread.positions.length || isAnimating) return;

    setIsAnimating(true);
    const position = spread.positions[currentPositionIndex];
    const drawnCard: DrawnCard = {
      card: { ...card },
      isReversed: card.isReversed,
      position,
    };

    setTimeout(() => {
      setDrawnCards([...drawnCards, drawnCard]);
      setCurrentPositionIndex(currentPositionIndex + 1);
      setShuffledDeck((prev) => prev.filter((_, i) => i !== index));
      setIsAnimating(false);
    }, 350);
  };

  const handleFinish = () => {
    sessionStorage.setItem("tarot_drawn_cards", JSON.stringify(drawnCards));
    router.push("/tarot/analysis");
  };

  if (!spread) return null;

  const isComplete = currentPositionIndex >= spread.cardCount;

  return (
    <MysticPageShell contentClassName="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 py-24">
      <FadeIn direction="down">
        <MysticDarkPanel className="mb-8 p-5 text-center">
          <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
            {spread.name}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70">"{question}"</p>
          {!isComplete && (
            <p className="mt-2 text-[13px] font-semibold text-[#D4AF37]">
              Chọn lá bài cho vị trí: {spread.positions[currentPositionIndex].name}
            </p>
          )}
        </MysticDarkPanel>
      </FadeIn>

      <div className="relative flex min-h-[300px] w-full flex-1 flex-wrap items-center justify-center gap-4">
        <AnimatePresence>
          {drawnCards.map((drawn) => (
            <motion.div
              key={drawn.card.id}
              initial={{ scale: 0, opacity: 0, y: 80 }}
              animate={{ scale: 1, opacity: 1, y: -30 }}
              className="text-center"
            >
              <img
                src={cardImageMap[drawn.card.id] || cardImageMap.back}
                className={`h-40 w-24 rounded-lg border border-[#D4AF37]/60 object-cover shadow-xl md:h-52 md:w-32 ${
                  drawn.isReversed ? "rotate-180" : ""
                }`}
                alt={drawn.card.name}
              />
              <p className="mt-2 text-[13px] font-semibold uppercase text-[#D4AF37]">{drawn.position.name}</p>
              <p className="text-[13px] text-white/75">{drawn.card.name}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {isComplete && (
          <FadeIn direction="up" delay={0.2}>
            <button
              onClick={handleFinish}
              className="mt-8 rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] transition hover:bg-[#F2D26B]"
            >
              Xem luận giải chi tiết
            </button>
          </FadeIn>
        )}
      </div>

      {!isComplete && (
        <div className="fixed bottom-0 left-0 z-50 h-[260px] w-full overflow-visible md:h-[360px]">
          <div className="relative flex h-full w-full justify-center">
            {shuffledDeck.map((card, idx) => {
              const total = shuffledDeck.length;
              const angle = (idx - (total - 1) / 2) * (70 / total);
              const step = typeof window !== "undefined" && window.innerWidth < 768 ? 14 : 28;
              const xOffset = (idx - (total - 1) / 2) * step;

              return (
                <motion.div
                  key={card.id}
                  initial={{ y: 260, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, x: xOffset, rotate: angle }}
                  whileHover={{ y: -42, scale: 1.08, zIndex: 100 }}
                  onClick={() => handleDrawCard(card, idx)}
                  className="absolute bottom-10 cursor-pointer origin-bottom"
                  style={{ zIndex: idx }}
                >
                  <img
                    src={cardImageMap.back}
                    className="h-32 w-20 rounded-lg border border-[#D4AF37]/35 bg-[#1a1a1a] object-cover shadow-xl transition hover:border-[#D4AF37]/75 md:h-48 md:w-32"
                    alt="Tarot Back"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </MysticPageShell>
  );
}
