"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import spreadsData from "@/features/tarot/data/spreads.json";
import TarotCard from "@/features/tarot/tarot-card";
import type { DrawnCard, Spread } from "@/features/tarot/tarot";

export default function AnalysisPage() {
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<Spread | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  // Tải dữ liệu từ session
  useEffect(() => {
    const savedQuestion = sessionStorage.getItem("tarot_question");
    const savedSpreadId = sessionStorage.getItem("tarot_spread");
    const savedDrawnCards = sessionStorage.getItem("tarot_drawn_cards");

    if (!savedQuestion || !savedSpreadId || !savedDrawnCards) {
      router.push("/tarot");
      return;
    }

    setQuestion(savedQuestion);

    // Tìm trải bài
    const selectedSpread = (spreadsData.spreads as unknown as Spread[]).find(
      (s) => s.id === savedSpreadId
    );
    if (!selectedSpread) {
      router.push("/tarot");
      return;
    }

    setSpread(selectedSpread);

    try {
      const cards = JSON.parse(savedDrawnCards) as DrawnCard[];
      setDrawnCards(cards);
    } catch (error) {
      console.error("Lỗi khi phân tích các lá bài đã rút:", error);
      router.push("/tarot");
      return;
    }

    // Tạo phân tích
    generateAnalysis(savedQuestion, selectedSpread, JSON.parse(savedDrawnCards));
    setIsLoading(false);
  }, [router]);

  // Tạo phân tích AI
  const generateAnalysis = async (
    question: string,
    selectedSpread: Spread,
    cards: DrawnCard[]
  ) => {
    try {
      setIsLoading(true);

      // Hiện tại, tạo một phân tích cơ bản
      // Trong thực tế, phần này sẽ gọi một API AI
      const basicAnalysis = generateBasicAnalysis(
        question,
        selectedSpread,
        cards
      );
      setAnalysis(basicAnalysis);
    } catch (error) {
      console.error("Lỗi khi tạo phân tích:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Tạo phân tích cơ bản (không có API)
  const generateBasicAnalysis = (
    question: string,
    selectedSpread: Spread,
    cards: DrawnCard[]
  ): string => {
    const cardDescriptions = cards
      .map(
        (card) =>
          `**${card.position.name}**: ${card.card.name} (${
            card.isReversed ? "Nghịch biến (Ngược)" : "Chính biến (Xuôi)"
          })\n${card.isReversed ? "Từ khóa ngược: " : "Từ khóa xuôi: "}${
            card.isReversed
              ? card.card.reversedKeywords.join(", ")
              : card.card.uprightKeywords.join(", ")
          }`
      )
      .join("\n\n");

    return `# Phân Tích Trải Bài Tarot

## Câu Hỏi Của Bạn
"${question}"

## Trải Bài Đã Sử Dụng
${selectedSpread.name} - ${selectedSpread.description}

## Các Lá Bài Đã Rút

${cardDescriptions}

## Luận Giải

Các lá bài đã xuất hiện để phản hồi lại câu hỏi của bạn. Mỗi lá bài trong trải bài ${selectedSpread.name} này đều mang một ý nghĩa quan trọng:

${cards
  .map(
    (card) =>
      `**${card.position.name} - ${card.card.name}**\n\n${
        card.isReversed
          ? `Ở vị trí ngược, lá bài này gợi ý: ${card.card.reversedKeywords.join(", ")}. Điều này có thể chỉ ra những thách thức, năng lượng bị tắc nghẽn, hoặc nhu cầu cần nhìn nhận lại nội tâm.`
          : `Ở vị trí xuôi, lá bài này gợi ý: ${card.card.uprightKeywords.join(", ")}. Điều này cho thấy dòng chảy tích cực và năng lượng đang được căn chỉnh phù hợp.`
      }`
  )
  .join("\n\n")}

## Thông Điệp Kết Thúc

Hãy nhớ rằng, Tarot là một công cụ để phản chiếu và hướng dẫn, không phải là định mệnh bất biến. Hãy sử dụng những hiểu biết này để tiếp thêm sức mạnh cho bản thân và đưa ra những lựa chọn tỉnh táo. Các lá bài soi sáng những khả năng, nhưng chính bạn mới là người nắm giữ sức mạnh để định hình con đường của mình.

✨ *Chúc những lá bài này soi sáng con đường phía trước của bạn.* ✨`;
  };

  const handleNewReading = () => {
    sessionStorage.removeItem("tarot_question");
    sessionStorage.removeItem("tarot_spread");
    sessionStorage.removeItem("tarot_drawn_cards");
    router.push("/tarot");
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f7edd6] to-[#f3e2c2]">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🔮</div>
          <p className="text-[#8B4513] font-bold text-lg">
            Đang kết nối với trí tuệ vũ trụ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen padding-x padding-y bg-gradient-to-b from-[#f7edd6] to-[#f3e2c2]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#c7a743]"></div>
            <span className="text-[#bf7e26] text-3xl">🔮</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#c7a743]"></div>
          </div>
          <h1 className="papyrus text-5xl font-bold text-[#3a2a14] uppercase tracking-wider mb-3">
            Kết Quả Trải Bài
          </h1>
        </div>

        {/* Main Container */}
        <div className="bg-gradient-to-b from-[#f9f4e8] to-[#f5e8d8] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#bf7e26] mb-8">
          {/* Drawn Cards */}
          {drawnCards.length > 0 && (
            <div className="mb-12">
              <h2 className="papyrus text-3xl font-bold text-[#8B4513] text-center mb-8 uppercase">
                Các Lá Bài Bạn Đã Rút
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mb-8">
                {drawnCards.map((drawnCard, idx) => {
                  // Lấy url ảnh lá bài
                  const imageUrl = require("@/features/tarot/tarot").getCardImageUrl(drawnCard.card.id);
                  return (
                    <div
                      key={idx}
                      className="text-center p-4 bg-white/80 rounded-xl border-2 border-[#d4c5a9] hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={imageUrl}
                        alt={drawnCard.card.name}
                        className={`mx-auto mb-3 w-20 h-32 md:w-24 md:h-40 object-cover rounded shadow-lg ${drawnCard.isReversed ? 'rotate-180' : ''}`}
                        draggable={false}
                      />
                      <p className="text-[11px] font-bold text-[#8B4513] uppercase tracking-wide mb-2">
                        {drawnCard.position.name}
                      </p>
                      <div className="space-y-1">
                        <p
                          className={`text-[9px] font-semibold px-2 py-1 rounded ${
                            drawnCard.isReversed
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {drawnCard.isReversed ? "NGƯỢC" : "XUÔI"}
                        </p>
                        <p className="text-[8px] text-[#5c4033] italic">
                          {drawnCard.isReversed
                            ? drawnCard.card.reversedKeywords[0]
                            : drawnCard.card.uprightKeywords[0]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Analysis */}
          {!hasError && analysis && (
            <div className="mb-12 prose prose-sm max-w-none">
              <div className="prose-headings:text-[#8B4513] prose-headings:font-bold prose-headings:papyrus prose-p:text-[#3a2a14] prose-strong:text-[#bf7e26]">
                <div className="whitespace-pre-wrap text-[#3a2a14] leading-relaxed">
                  {analysis.split("\n").map((line, idx) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1
                          key={idx}
                          className="papyrus text-3xl font-bold text-[#8B4513] mt-6 mb-4 uppercase"
                        >
                          {line.replace("# ", "")}
                        </h1>
                      );
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={idx}
                          className="papyrus text-2xl font-bold text-[#8B4513] mt-5 mb-3 uppercase"
                        >
                          {line.replace("## ", "")}
                        </h2>
                      );
                    } else if (line.startsWith("**")) {
                      return (
                        <p
                          key={idx}
                          className="text-[#3a2a14] font-semibold my-2"
                        >
                          {line}
                        </p>
                      );
                    } else if (line.trim() === "") {
                      return <div key={idx} className="h-2" />;
                    } else {
                      return (
                        <p key={idx} className="text-[#3a2a14] leading-relaxed my-2">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          )}

          {hasError && (
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 text-center mb-8">
              <p className="text-orange-800 font-semibold">
                Không thể tạo phân tích vào lúc này.
              </p>
              <p className="text-orange-700 text-sm mt-2">
                Vui lòng thử lại sau hoặc thực hiện một lần trải bài khác.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleNewReading}
              className="papyrus px-8 py-3 bg-white border-2 border-[#bf7e26] text-[#bf7e26] hover:bg-[#bf7e26] hover:text-white font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Trải bài mới
            </button>
            <button
              onClick={() => router.push("/tarot")}
              className="papyrus px-8 py-3 bg-gradient-to-r from-[#bf7e26] to-[#c7a743] hover:from-[#a66a1d] hover:to-[#b5931f] text-white font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#8B4513]"
            >
              Quay lại Trang chủ
            </button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <p className="text-[#8B4513] italic text-sm font-medium">
            ✦ Mong rằng những hiểu biết này sẽ dẫn bước hành trình của bạn. Hãy tin tưởng vào trực giác của chính mình. ✦
          </p>
        </div>
      </div>
    </section>
  );
}