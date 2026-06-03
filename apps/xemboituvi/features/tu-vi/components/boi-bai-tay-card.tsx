"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Spade, Sparkles, Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MysticGoldFrame } from "@/components/ui/client/mystic-page-shell";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BoiBaiTayCard() {
  const router = useRouter();
  const [gioiTinh, setGioiTinh] = useState<"Nam" | "Nữ" | "">("Nam");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!gioiTinh) return;

    setLoading(true);
    const slug = gioiTinh === "Nam" ? "xem-boi-bai-hang-ngay-nam.html" : "xem-boi-bai-hang-ngay-nu.html";

    setTimeout(() => {
      router.push(`/${slug}`);
    }, 500);
  };

  return (
    <div className="relative mx-auto my-6 w-full max-w-md">
      <MysticGoldFrame className="overflow-hidden p-5">
        <div className="relative z-10 mb-5 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <Spade className="h-5 w-5 text-[#D4AF37]" />
            <h3 className="papyrus text-[22px] font-semibold uppercase tracking-[0.12em] text-[#FFD700] md:text-[26px]">
              Bói bài tây
            </h3>
            <Heart className="h-5 w-5 text-[#D4AF37]" />
          </div>
          <div className="mx-auto h-px w-24 bg-[#D4AF37]/30" />
          <p className="mt-3 flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3E3BC]/65">
            <Sparkles className="h-3 w-3 text-[#D4AF37]" />
            Thấu thị tương lai
            <Sparkles className="h-3 w-3 text-[#D4AF37]" />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <SelectionCard label="Nam" subLabel="Xáo 7 lần" icon={<Spade className="h-7 w-7" />} selected={gioiTinh === "Nam"} onClick={() => setGioiTinh("Nam")} />
            <SelectionCard label="Nữ" subLabel="Xáo 9 lần" icon={<Heart className="h-7 w-7" />} selected={gioiTinh === "Nữ"} onClick={() => setGioiTinh("Nữ")} />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!gioiTinh || loading}
            className={cn(
              "flex h-11 w-full items-center justify-center gap-2 rounded-lg border text-[13px] font-bold uppercase tracking-[0.14em] transition",
              !gioiTinh
                ? "cursor-not-allowed border-transparent bg-gray-100 text-gray-300"
                : "border-[#D4AF37]/40 bg-[#D4AF37] text-black hover:bg-[#F3E3BC]"
            )}
          >
            {loading ? "Đang tráo bài..." : "Xem quẻ ngay"} {!loading && <ArrowRight className="h-4 w-4" />}
          </motion.button>
        </form>

        <p className="mt-5 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]/55">
          Tĩnh tâm cầu quẻ
        </p>
      </MysticGoldFrame>
    </div>
  );
}

function SelectionCard({ label, subLabel, icon, selected, onClick }: { label: string; subLabel: string; icon: React.ReactNode; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border p-4 transition",
        selected ? "border-[#D4AF37] bg-[#D4AF37] text-black shadow-md" : "border-[#D4AF37]/25 bg-black/35 text-white/60 hover:border-[#D4AF37]/50"
      )}
    >
      {selected && (
        <div className="absolute right-2 top-2 rounded-full bg-black/35 p-0.5 text-[#D4AF37]">
          <Star size={9} fill="currentColor" />
        </div>
      )}
      <div className={selected ? "text-black" : "text-[#D4AF37]/45"}>{icon}</div>
      <span className="mt-3 text-[13px] font-bold uppercase tracking-[0.12em]">{label}</span>
      <span className={cn("mt-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em]", selected ? "bg-black/15 text-black" : "border border-[#D4AF37]/20 bg-black/25 text-white/45")}>
        {subLabel}
      </span>
    </motion.button>
  );
}
