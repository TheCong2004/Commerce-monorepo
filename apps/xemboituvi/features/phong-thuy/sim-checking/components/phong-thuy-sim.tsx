"use client";

import React, { useState } from "react";
import SimInputForm from "@/features/phong-thuy/sim-checking/components/sim-checking/SimInputForm";
import ResultSummary from "@/features/phong-thuy/sim-checking/components/sim-checking/ResultSummary";
import SuggestionList from "@/features/phong-thuy/sim-checking/components/sim-checking/SuggestionList";
import { chamDiemSim } from "@/features/phong-thuy/sim-checking/logic/fengshui-engine";
import DetailedAnalysis from "@/features/phong-thuy/sim-checking/components/sim-checking/DetailedAnalysis";

export default function ChamDiemSim() {
  const [result, setResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleActionSearch = async (formData: any) => {
    setIsSearching(true);
    setResult(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      const scoringResult = chamDiemSim(formData.sim, formData);
      setResult(scoringResult);
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1020] pb-16 pt-24 font-sans text-[14px] text-white">
      <div className="mx-auto max-w-6xl px-4">
        <SimInputForm onSearch={handleActionSearch} />

        {isSearching && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#F4C76B]" />
            <p className="mt-4 font-semibold text-white">Đang phân tích số sim...</p>
            <p className="mt-1 text-[13px] text-white/60">Hệ thống đang tính điểm tổng, âm dương và quẻ dịch.</p>
          </div>
        )}

        {result && !isSearching && (
          <div className="mt-6 space-y-5">
            <ResultSummary result={result} />
            <DetailedAnalysis result={result} />
            <SuggestionList userNguHanh={result.nguHanh} />
            <div className="flex flex-col justify-center gap-3 pb-8 md:flex-row">
              <button
                onClick={() => window.print()}
                className="rounded-xl border border-white/15 px-5 py-3 text-[14px] font-semibold text-white hover:bg-white/5"
              >
                In bản luận giải
              </button>
              <button className="rounded-xl bg-[#F4C76B] px-5 py-3 text-[14px] font-bold text-[#0B1020] hover:bg-[#D9A441]">
                Chia sẻ kết quả
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
