"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Download, Share2, Sparkles } from "lucide-react";
import { MysticDarkPanel, MysticPageShell } from "@/components/ui/client/mystic-page-shell";
import NatalResultList from "@/features/thansohoc/natal-chart/natal/NatalResultList";
import { calculateNatalChart, PlanetPosition } from "@/features/thansohoc/utils/astrologyUtils";

export const dynamic = "force-dynamic";

function ResultContent() {
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState<PlanetPosition[] | null>(null);

  useEffect(() => {
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const lat = parseFloat(searchParams.get("lat") || "16.0471");
    const lng = parseFloat(searchParams.get("lng") || "108.2068");

    if (date && time) {
      setChartData(calculateNatalChart(new Date(`${date}T${time}`), lat, lng));
    }
  }, [searchParams]);

  return (
    <MysticPageShell>
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-5 flex items-center justify-between rounded-lg border border-[#D4AF37]/25 bg-black/60 px-4 py-3">
          <Link href="/thansohoc/natal-star" className="flex items-center gap-2 text-[13px] font-semibold text-[#F3E3BC] transition hover:text-[#D4AF37]">
            <ArrowLeft size={16} /> Nhập lại
          </Link>
          <div className="flex gap-2">
            <button className="rounded-lg border border-white/10 p-2 text-white/70 transition hover:border-[#D4AF37]/45 hover:text-[#D4AF37]" aria-label="Chia sẻ">
              <Share2 size={16} />
            </button>
            <button className="rounded-lg border border-white/10 p-2 text-white/70 transition hover:border-[#D4AF37]/45 hover:text-[#D4AF37]" aria-label="Tải xuống">
              <Download size={16} />
            </button>
          </div>
        </div>

        <header className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/12 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
            <Sparkles size={13} /> Báo cáo chi tiết
          </div>
          <h1 className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">Bản đồ sao cá nhân</h1>
          <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-white/65">
            Các vị trí hành tinh được tính theo thời điểm và tọa độ bạn đã nhập.
          </p>
        </header>

        {chartData ? (
          <NatalResultList data={chartData} />
        ) : (
          <MysticDarkPanel className="py-10 text-center">
            <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37]" />
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">Đang giải mã bầu trời...</p>
          </MysticDarkPanel>
        )}
      </div>
    </MysticPageShell>
  );
}

export default function NatalResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ResultContent />
    </Suspense>
  );
}
