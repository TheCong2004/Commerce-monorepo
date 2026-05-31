"use client";

import React, { useState } from "react";
import SimInputForm from "@/features/phong-thuy/sim-checking/components/sim-checking/SimInputForm";
import ResultSummary from "@/features/phong-thuy/sim-checking/components/sim-checking/ResultSummary";
import SuggestionList from "@/features/phong-thuy/sim-checking/components/sim-checking/SuggestionList";
import { chamDiemSim } from "@/features/phong-thuy/sim-checking/logic/fengshui-engine";
import DetailedAnalysis from "@/features/phong-thuy/sim-checking/components/sim-checking/DetailedAnalysis";
import FadeIn from "@/components/ui/FadeIn";

export default function ChamDiemSim() {
  const [result, setResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleActionSearch = async (formData: any) => {
    setIsSearching(true);
    setResult(null); 
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Tăng nhẹ để tạo độ sâu tâm linh
      const scoringResult = chamDiemSim(formData.sim, formData);
      setResult(scoringResult);
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0C0D0F] py-12 font-sans text-[#e5e5e5] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* --- KHU VỰC NHẬP LIỆU --- */}
        <FadeIn direction="down">
          <div className="w-full mt-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="relative z-10">
              <SimInputForm onSearch={handleActionSearch} />
            </div>
          </div>
        </FadeIn>

        {/* --- TRẠNG THÁI LOADING --- */}
        {isSearching && (
          <FadeIn>
            <div className="flex flex-col items-center justify-center py-24 space-y-6">
              <div className="w-20 h-20 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
              <p className="animate-pulse text-amber-500 font-light tracking-[0.5em] uppercase text-sm">
                Đang gieo quẻ Kinh Dịch...
              </p>
            </div>
          </FadeIn>
        )}

        {/* --- HIỂN THỊ KẾT QUẢ --- */}
        {result && !isSearching && (
          <div className="mt-16 space-y-20">
            
            {/* 1. Tổng quan kết quả */}
            <FadeIn direction="up" scale={0.95}>
              <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/5 blur-3xl pointer-events-none"></div>
                  <ResultSummary result={result} />
              </div>
            </FadeIn>

            {/* 2. Bảng phân tích chi tiết */}
            <FadeIn direction="up" delay={0.2}>
              <div className="grid grid-cols-1 gap-12 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-4 md:p-10 backdrop-blur-sm">
                <DetailedAnalysis result={result} />
              </div>
            </FadeIn>
            
            {/* 3. Danh sách gợi ý */}
            <FadeIn direction="up" delay={0.4}>
              <div className="relative">
                  <div className="text-center mb-10">
                      <h3 className="text-amber-500 font-bold uppercase text-xs tracking-[0.4em] mb-4">Gợi ý từ chuyên gia</h3>
                      <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                  </div>
                  <SuggestionList userNguHanh={result.nguHanh} />
              </div>
            </FadeIn>

            {/* 4. Nút In ấn và Hành động */}
            <FadeIn direction="up" delay={0.6}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pb-20">
                <button 
                  onClick={() => window.print()} 
                  className="group relative px-12 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-amber-500 transition-all duration-500 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]"></div>
                  <span className="relative">In bản luận giải</span>
                </button>
                
                <button className="px-12 py-4 bg-transparent border border-white/10 text-white/50 hover:text-white hover:border-white transition-all rounded-full text-sm uppercase tracking-widest">
                  Chia sẻ quẻ dịch
                </button>
              </div>
            </FadeIn>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          from { transform: translateX(-150%) skewX(-20deg); }
          to { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </main>
  );
}