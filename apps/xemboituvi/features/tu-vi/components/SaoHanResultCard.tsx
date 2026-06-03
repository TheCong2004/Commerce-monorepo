"use client";

import { MysticDarkPanel } from "@/components/ui/client/mystic-page-shell";
import { Gem, ShieldAlert, Sparkles, Star } from "lucide-react";

interface SaoHanResultProps {
  result: any;
  namSinh: number;
}

export default function SaoHanResultCard({ result, namSinh }: SaoHanResultProps) {
  if (!result) return null;

  const isGoodStar = result.sao.tinhChat === "Cát";
  const starTone = isGoodStar ? "text-emerald-500" : "text-rose-500";

  return (
    <div className="mt-8 space-y-5">
      <MysticDarkPanel className="p-5 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">
          Sao Chiếu Mệnh
        </p>
        <h2 className={`mt-2 text-[14px] font-semibold uppercase tracking-wide ${starTone}`}>
          {result.sao.ten}
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-white/70">
          Tuổi mụ: {result.tuoiMu}
        </p>
      </MysticDarkPanel>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <MysticDarkPanel className="relative overflow-hidden p-5">
          <Star className="absolute right-4 top-4 text-[#D4AF37]/10" size={80} />
          <h3 className="relative z-10 mb-4 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
            <Star size={14} className="text-emerald-400" /> Chi tiết sao {result.sao.ten}
          </h3>
          <div className="relative z-10 space-y-3 text-[13px] leading-relaxed text-white/70">
            <div className="flex items-center justify-between rounded-lg border border-[#D4AF37]/20 bg-black/35 p-3">
              <span>Tính chất</span>
              <span className={`font-semibold uppercase ${starTone}`}>{result.sao.tinhChat}</span>
            </div>
            <p className="border-l-2 border-[#D4AF37]/45 pl-4">{result.sao.loiKhuyen}</p>
          </div>
        </MysticDarkPanel>

        <MysticDarkPanel className="relative overflow-hidden p-5">
          <ShieldAlert className="absolute right-4 top-4 text-[#D4AF37]/10" size={80} />
          <h3 className="relative z-10 mb-4 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
            <Sparkles size={14} className="text-rose-400" /> Chi tiết hạn {result.han.ten}
          </h3>
          <div className="relative z-10 space-y-3 text-[13px] leading-relaxed text-white/70">
            <div className="flex items-center justify-between rounded-lg border border-[#D4AF37]/20 bg-black/35 p-3">
              <span>Mức độ</span>
              <span className="font-semibold uppercase text-rose-400">{result.han.mucDo}</span>
            </div>
            <p>{result.han.chiTiet}</p>
          </div>
        </MysticDarkPanel>
      </div>

      <MysticDarkPanel className="relative overflow-hidden bg-black/38 p-5">
        <Gem className="absolute -bottom-8 -right-8 text-[#D4AF37]/10" size={160} />
        <h3 className="relative z-10 mb-3 text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
          Luận giải tổng quan
        </h3>
        <div className="relative z-10 space-y-3 text-[13px] leading-relaxed text-white/68">
          <p>
            Bước sang năm 2025, gia chủ tuổi {namSinh} bước vào tuổi {result.tuoiMu}.
            Năm nay bản mệnh gặp sao <strong className="text-[#D4AF37]">{result.sao.ten}</strong>{" "}
            chiếu mệnh và vướng hạn <strong className="text-[#D4AF37]">{result.han.ten}</strong>.
          </p>
          <p>
            Sao {result.sao.ten} thuộc hành {result.sao.hanh}. Gia chủ nên chọn màu sắc,
            vật phẩm và thời điểm phù hợp để tăng phần thuận lợi, giảm việc phải lo nghĩ.
          </p>
        </div>
      </MysticDarkPanel>
    </div>
  );
}
