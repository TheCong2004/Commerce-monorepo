"use client";

import { MoveRight, ShieldAlert } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticGoldFrame } from "@/components/ui/client/mystic-page-shell";

type DirectionItem = {
  t: string;
  c: string;
  y?: string;
};

type Props = {
  result: {
    cung: string;
    hanh: string;
    nhom?: string;
    mauSac?: string;
    huongTot: DirectionItem[];
    huongXau: DirectionItem[];
  };
  namSinh: number;
  title: string;
  goodTitle?: string;
  badTitle?: string;
  note: string;
};

export default function FengShuiResultView({
  result,
  namSinh,
  title,
  goodTitle = "Hướng tốt",
  badTitle = "Hướng cần tránh",
  note,
}: Props) {
  return (
    <div className="mt-8 space-y-5 pb-8">
      <FadeIn direction="up" scale={0.98}>
        <MysticDarkPanel className="p-5 text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">{title}</p>
          <div className="mx-auto mt-4 flex h-24 w-24 flex-col items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-black/35">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">
              Phi cung
            </span>
            <span className="mt-1 text-[28px] font-black leading-none text-[#F3E3BC]">
              {result.cung}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-[13px] text-white/65">
            <span className="rounded-lg border border-[#D4AF37]/25 bg-black/30 px-3 py-1">
              Hành {result.hanh}
            </span>
            {result.nhom && (
              <span className="rounded-lg border border-[#D4AF37]/25 bg-black/30 px-3 py-1">
                {result.nhom}
              </span>
            )}
            {result.mauSac && (
              <span className="rounded-lg border border-[#D4AF37]/25 bg-black/30 px-3 py-1">
                Màu hợp: {result.mauSac}
              </span>
            )}
          </div>
        </MysticDarkPanel>
      </FadeIn>

      <div className="grid gap-4 lg:grid-cols-2">
        <DirectionList icon="good" title={goodTitle} items={result.huongTot} />
        <DirectionList icon="bad" title={badTitle} items={result.huongXau} />
      </div>

      <FadeIn direction="up" delay={0.2}>
        <MysticGoldFrame className="p-5">
          <h3 className="mb-3 text-[14px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC]">
            Luận giải ngắn
          </h3>
          <p className="text-[13px] leading-6 text-white/70">
            Gia chủ sinh năm {namSinh}, phi cung {result.cung}, hành {result.hanh}. {note}
          </p>
        </MysticGoldFrame>
      </FadeIn>
    </div>
  );
}

function DirectionList({ icon, title, items }: { icon: "good" | "bad"; title: string; items: DirectionItem[] }) {
  const Icon = icon === "good" ? MoveRight : ShieldAlert;

  return (
    <FadeIn direction={icon === "good" ? "right" : "left"} delay={0.1}>
      <MysticGoldFrame className="h-full p-5">
        <div className="mb-4 flex items-center gap-3 border-b border-[#D4AF37]/20 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#D4AF37]">
            <Icon size={16} />
          </div>
          <h3 className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC]">{title}</h3>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${item.t}-${index}`} className="rounded-lg border border-[#D4AF37]/25 bg-black/35 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[14px] font-bold text-[#F3E3BC]">{item.t}</p>
                <span className="shrink-0 rounded border border-[#D4AF37]/25 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#D4AF37]">
                  {item.c}
                </span>
              </div>
              {item.y && <p className="mt-2 text-[13px] leading-5 text-white/68">{item.y}</p>}
            </div>
          ))}
        </div>
      </MysticGoldFrame>
    </FadeIn>
  );
}
