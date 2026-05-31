"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import tarotCardsData from "@/features/tarot/data/tarot-cards.json";
import spreadsData from "@/features/tarot/data/spreads.json";

import { type TarotCard as TarotCardType, type DrawnCard, type Spread, cardImageMap } from "@/features/tarot/tarot";
import FadeIn from "@/components/ui/FadeIn";
import WoodenFrame from "@/features/home/container/WoodenFrame";

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

  // Khởi tạo deck và spread
  useEffect(() => {
    const savedQuestion = sessionStorage.getItem("tarot_question");
    const savedSpreadId = sessionStorage.getItem("tarot_spread");
    if (!savedQuestion || !savedSpreadId) { router.push("/tarot"); return; }
    setQuestion(savedQuestion);

    const selectedSpread = (spreadsData.spreads as unknown as Spread[]).find(s => s.id === savedSpreadId);
    if (!selectedSpread) { router.push("/tarot"); return; }
    setSpread(selectedSpread);

    const data = tarotCardsData as any;
    const allCards: TarotCardType[] = [...data.majorArcana];
    Object.values(data.minorArcana).forEach((suit: any) => allCards.push(...suit));
    
    // Xáo bài
    const shuffled = allCards
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, isReversed: Math.random() > 0.5 }));
    setShuffledDeck(shuffled.slice(0, 22)); // Lấy 22 lá để xòe bài cho đẹp
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

    // Hiệu ứng delay rút bài
    setTimeout(() => {
      setDrawnCards([...drawnCards, drawnCard]);
      setCurrentPositionIndex(currentPositionIndex + 1);
      // Loại bỏ lá bài đã rút khỏi deck hiển thị
      setShuffledDeck(prev => prev.filter((_, i) => i !== index));
      setIsAnimating(false);
    }, 500);
  };

  const handleFinish = () => {
    sessionStorage.setItem("tarot_drawn_cards", JSON.stringify(drawnCards));
    router.push("/tarot/analysis");
  };

  if (!spread) return null;

  const isComplete = currentPositionIndex >= spread.cardCount;

  return (
    <main className="min-h-screen pt-16 bg-[#0a0a0a] text-white p-4 md:p-8 flex flex-col items-center">
      {/* Background Star Effect (Nếu bạn đã có component StarBackground thì bọc ngoài) */}
      
      <FadeIn direction="down">
        <WoodenFrame className="mb-8">
          <div className="text-center px-4">
            <h1 className="papyrus text-2xl md:text-4xl font-bold text-[#D4AF37] uppercase tracking-widest mb-2">
              {spread.name}
            </h1>
            <p className="text-[#E0E0E0] text-xs italic opacity-70 mb-2">"{question}"</p>
            {!isComplete && (
              <p className="text-[#D4AF37] font-bold text-sm animate-pulse">
                Hãy CLICK vào lá bài bên dưới: {spread.positions[currentPositionIndex].name.toUpperCase()}
              </p>
            )}
          </div>
        </WoodenFrame>
      </FadeIn>

      {/* KHU VỰC HIỂN THỊ CÁC LÁ ĐÃ RÚT (KẾT QUẢ) */}
      <div className="relative flex-1 w-full flex items-center justify-center gap-4 flex-wrap min-h-[300px]">
        <AnimatePresence>
          {drawnCards.map((drawn, idx) => (
            <motion.div
              key={drawn.card.id}
              initial={{ scale: 0, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: -40 }}
              className="text-center"
            >
              <div className="relative">
                <motion.div 
                   animate={{ opacity: [0.2, 0.5, 0.2] }} 
                   transition={{ duration: 3, repeat: Infinity }}
                   className="absolute -inset-4 bg-[#D4AF37]/20 blur-2xl rounded-full"
                />
                <img
                  src={cardImageMap[drawn.card.id] || cardImageMap["back"]}
                  className={`w-24 h-40 md:w-32 md:h-52 rounded-xl border-2 border-[#D4AF37] shadow-2xl ${drawn.isReversed ? 'rotate-180' : ''}`}
                  alt={drawn.card.name}
                />
              </div>
              <p className="mt-2 text-[#D4AF37] text-[10px] font-bold papyrus uppercase">{drawn.position.name}</p>
              <p className="text-white text-[11px] font-medium">{drawn.card.name}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {isComplete && (
          <FadeIn direction="up" delay={0.5}>
            <button
              onClick={handleFinish}
              className="mt-8 px-10 py-4 bg-gradient-to-r from-[#bf7e26] to-[#c7a743] text-white font-bold rounded-full papyrus shadow-[0_0_20px_rgba(191,126,38,0.5)] hover:scale-105 transition-transform"
            >
              XEM LUẬN GIẢI CHI TIẾT 🔮
            </button>
          </FadeIn>
        )}
      </div>

      {/* --- KHU VỰC CHỌN BÀI (XÒE BÀI HÌNH CÁNH QUẠT) --- */}
{!isComplete && (
  <div className="fixed bottom-0 left-0 w-full h-[300px] md:h-[400px] overflow-visible z-50">
    <div className="relative w-full h-full flex justify-center">
      {shuffledDeck.map((card, idx) => {
        const total = shuffledDeck.length;
        
        // Điều chỉnh góc xòe: nhỏ hơn để bài không bị lật ngang quá nhiều
        const angle = (idx - (total - 1) / 2) * (80 / total); 
        
        // Điều chỉnh khoảng cách dãn bài: 
        // Mobile: ~15px, Desktop: ~30px để các lá bài xếp chồng lên nhau tự nhiên
        const step = typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 30;
        const xOffset = (idx - (total - 1) / 2) * step;

        return (
          <motion.div
            key={card.id}
            initial={{ y: 300, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              x: xOffset,
              rotate: angle
            }}
            whileHover={{ 
              y: -50, 
              scale: 1.1, 
              zIndex: 100,
              transition: { duration: 0.2 } 
            }}
            onClick={() => handleDrawCard(card, idx)}
            className="absolute bottom-10 cursor-pointer origin-bottom"
            style={{
              zIndex: idx,
            }}
          >
            <div className="relative group">
              {/* Hiệu ứng viền sáng khi hover */}
              <div className="absolute -inset-1 bg-yellow-400/0 group-hover:bg-yellow-400/20 blur rounded-lg transition-all" />
              
              <img
                src={cardImageMap["back"]}
                className="w-20 h-32 md:w-32 md:h-48 rounded-lg border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#1a1a1a] object-cover"
                alt="Tarot Back"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
)}
    </main>
  );
}