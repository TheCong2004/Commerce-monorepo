"use client";

import { useState } from "react";
import { MysticPageShell } from "@/components/ui/client/mystic-page-shell";
import DetailedAnalysis from "@/features/phong-thuy/sim-checking/components/sim-checking/DetailedAnalysis";
import ResultSummary from "@/features/phong-thuy/sim-checking/components/sim-checking/ResultSummary";
import SimInputForm from "@/features/phong-thuy/sim-checking/components/sim-checking/SimInputForm";
import SuggestionList from "@/features/phong-thuy/sim-checking/components/sim-checking/SuggestionList";
import { chamDiemSim } from "@/features/phong-thuy/sim-checking/logic/fengshui-engine";

export default function ChamDiemSim() {
  const [result, setResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleActionSearch = async (formData: any) => {
    setIsSearching(true);
    setResult(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      setResult(chamDiemSim(formData.sim, formData));
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <MysticPageShell contentClassName="mx-auto max-w-3xl px-4 pb-10 pt-16 md:pt-28">
      <SimInputForm onSearch={handleActionSearch} />

      {isSearching && (
        <div className="mt-5 rounded-lg border border-[#D4AF37]/35 bg-black/45 p-8 text-center backdrop-blur-md">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
          <p className="mt-4 text-[14px] font-semibold text-white">Đang phân tích số sim...</p>
          <p className="mt-1 text-[13px] text-white/60">
            Hệ thống đang tính điểm tổng, âm dương và quẻ dịch.
          </p>
        </div>
      )}

      {result && !isSearching && (
        <div className="mt-5 space-y-5">
          <ResultSummary result={result} />
          <DetailedAnalysis result={result} />
          <SuggestionList userNguHanh={result.nguHanh} />
          <div className="flex flex-col justify-center gap-3 pb-8 md:flex-row">
            <button
              onClick={() => window.print()}
              className="rounded-lg border border-[#D4AF37]/35 px-5 py-3 text-[13px] font-semibold text-[#F3E3BC] hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10"
            >
              In bản luận giải
            </button>
            <button className="rounded-lg bg-[#D4AF37] px-5 py-3 text-[13px] font-bold text-black hover:bg-[#F3E3BC]">
              Chia sẻ kết quả
            </button>
          </div>
        </div>
      )}
    </MysticPageShell>
  );
}
