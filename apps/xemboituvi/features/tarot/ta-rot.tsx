"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import spreadsData from "@/features/tarot/data/spreads.json";
import { Navbar } from "@/components/ui/client";

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
      alert("Please enter your question");
      return;
    }

    if (!selectedSpread) {
      alert("Please select a spread");
      return;
    }

    sessionStorage.setItem("tarot_question", question);
    sessionStorage.setItem("tarot_spread", selectedSpread);
    router.push("/tarot/draw");
  };

  const spreads = spreadsData.spreads as unknown as Spread[];

  return (
    /* Thay đổi: bg-gradient từ đen huyền bí */
    <section className="w-full min-h-screen padding-x padding-y bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#000000] relative overflow-hidden">
      
      {/* Thêm hiệu ứng bụi sao mờ ảo trên nền đen */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="max-w-4xl mx-auto relative z-10"> 
        {/* Header */}
        <div className="text-center mb-16">
          
          {/* Thay đổi: Tiêu đề màu Vàng Kim (Gold) */}
          <h1 className="papyrus text-5xl font-bold text-[#D4AF37] uppercase tracking-wider mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
            Trải bài Tarot
          </h1>
          <p className="text-[#a89260] text-lg italic">Hãy đặt câu hỏi, các lá bài sẽ dẫn lối cho bạn</p>
        </div>

        {/* Main Container: Giữ nguyên card không thay đổi gì */}
        <div className="bg-gradient-to-b from-[#f9f4e8] to-[#f5e8d8] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#bf7e26]">
          {/* Question Input */}
          <div className="mb-10">
            <label className="block papyrus text-2xl font-bold text-[#8B4513] mb-4 uppercase tracking-wide">
              Câu hỏi của bạn
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Bạn muốn biết điều gì?"
              rows={4}
              className="w-full bg-white/80 border-2 border-[#d4c5a9] rounded-xl p-4 text-[#3a2a14] placeholder:text-[#b0a090] focus:outline-none focus:border-[#bf7e26] focus:ring-2 focus:ring-[#bf7e26]/20 transition-all resize-none"
            />
          </div>

          {/* Spread Selection */}
          <div className="mb-10">
            <label className="block papyrus text-2xl font-bold text-[#8B4513] mb-6 uppercase tracking-wide">
              🃏 Chọn kiểu trải bài
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {spreads.map((spread) => (
                <button
                  key={spread.id}
                  onClick={() => setSelectedSpread(spread.id)}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 text-left group ${
                    selectedSpread === spread.id
                      ? "bg-[#bf7e26] border-[#8B4513] shadow-lg"
                      : "bg-white border-[#d4c5a9] hover:border-[#bf7e26] hover:shadow-md"
                  }`}
                >
                  <h3
                    className={`papyrus text-lg font-bold uppercase tracking-wider mb-2 ${
                      selectedSpread === spread.id ? "text-white" : "text-[#8B4513]"
                    }`}
                  >
                    {spread.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      selectedSpread === spread.id
                        ? "text-white/90"
                        : "text-[#5c4033]"
                    }`}
                  >
                    {spread.description}
                  </p>
                  <div
                    className={`text-xs font-bold uppercase tracking-wide mt-3 ${
                      selectedSpread === spread.id
                        ? "text-white/80"
                        : "text-[#bf7e26]"
                    }`}
                  >
                    {spread.cardCount} lá bài
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartReading}
              disabled={!question.trim() || !selectedSpread}
              className="papyrus px-10 py-4 bg-gradient-to-r from-[#bf7e26] to-[#c7a743] hover:from-[#a66a1d] hover:to-[#b5931f] disabled:from-[#d0d0d0] disabled:to-[#e0e0e0] text-white font-bold text-lg uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 border-2 border-[#8B4513] disabled:border-[#b0b0b0]"
            >
              Bắt đầu trải bài 🔮
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12">
          {/* Thay đổi: Màu chữ footer sáng lên để nổi bật trên nền đen */}
          <p className="text-[#D4AF37] italic text-sm font-medium opacity-80">
            ✦ Lưu ý: Tarot là công cụ chiêm nghiệm, không phải định mệnh. Quyết định của bạn sẽ tạo nên tương lai. ✦
          </p>
        </div>
      </div>
    </section>
  );
}