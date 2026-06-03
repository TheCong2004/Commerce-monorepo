"use client";

import { MysticDarkPanel, MysticPageShell } from "@/components/ui/client/mystic-page-shell";
import { Wind } from "lucide-react";

interface HeroProps {
  title: string;
  subTitle: string;
  desc: string;
  imageSrc?: string;
}

export default function HeroPhongThuy({
  title,
  subTitle,
  desc,
  imageSrc = "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767125826/image-Photoroom_n6gtyr.png",
}: HeroProps) {
  return (
    <MysticPageShell contentClassName="mx-auto max-w-6xl px-4 pb-10 pt-24">
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
          <img
            src={imageSrc}
            alt=""
            className="h-[360px] w-[360px] object-contain"
            style={{ filter: "drop-shadow(0 0 40px rgba(212,175,55,0.45))" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-black/45 px-3 py-1.5 text-[13px] font-semibold text-[#D4AF37] backdrop-blur">
            <Wind size={14} /> Thiên Thời - Địa Lợi - Nhân Hòa
          </div>

          <MysticDarkPanel className="px-5 py-4">
            <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              {title} {subTitle}
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">{desc}</p>
          </MysticDarkPanel>
        </div>
      </header>
    </MysticPageShell>
  );
}
