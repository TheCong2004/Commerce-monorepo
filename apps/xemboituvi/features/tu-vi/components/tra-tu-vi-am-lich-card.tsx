"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CalendarDays, ChevronRight, Search, Star, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tuviService } from "../services/tuvi-hang-ngay";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TraTuViAmLichCard() {
  const router = useRouter();
  const [namSinh, setNamSinh] = useState("1993");
  const [gioiTinh, setGioiTinh] = useState<"Nam" | "Nữ">("Nam");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const validationError = tuviService.validateNamSinh(namSinh);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const slug = tuviService.formatSlug(namSinh, gioiTinh);

    setTimeout(() => {
      router.push(`/${slug}`);
    }, 500);
  };

  return (
    <div className="relative mx-auto my-5 w-full max-w-[380px]">
      <div className="relative overflow-hidden rounded-xl border border-[#D4AF37]/35 bg-black/45 p-5 shadow-[0_16px_32px_rgba(0,0,0,0.45)]">
        <div className="relative z-10 mb-5 text-center">
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
            <CalendarDays size={17} />
          </div>
          <h3 className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">Tra tử vi 2025</h3>
          <p className="mt-2 text-[13px] leading-5 text-white/65">Luận giải ngắn gọn theo năm sinh và giới tính.</p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
          <div className="space-y-2 text-left">
            <label className="ml-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
              <Star size={12} className="text-[#D4AF37]" fill="#D4AF37" /> Năm sinh
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={14} className="text-[#D4AF37]/60" />
              </div>
              <input
                type="number"
                value={namSinh}
                onChange={(event) => {
                  setNamSinh(event.target.value);
                  setError(null);
                }}
                className="block h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 pl-9 text-[14px] font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="ml-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
              <User size={12} className="text-[#D4AF37]" /> Giới tính
            </label>
            <div className="grid grid-cols-2 gap-3">
              <GenderButton
                label="Nam"
                active={gioiTinh === "Nam"}
                onClick={() => {
                  setGioiTinh("Nam");
                  setError(null);
                }}
                icon={<User size={14} />}
              />
              <GenderButton
                label="Nữ"
                active={gioiTinh === "Nữ"}
                onClick={() => {
                  setGioiTinh("Nữ");
                  setError(null);
                }}
                icon={<User size={14} />}
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-900/50 bg-red-950/30 p-2 text-[13px] font-semibold text-red-300"
              >
                <AlertCircle size={14} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] px-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#F3E3BC] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Đang xử lý..." : "Xem tử vi"}
            {!loading && <ChevronRight size={14} />}
          </motion.button>
        </form>

        <p className="mt-5 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]/50">
          Khai mở vận số
        </p>
      </div>
    </div>
  );
}

function GenderButton({ label, active, onClick, icon }: { label: string; active: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-11 items-center justify-center gap-2 rounded-lg border text-[13px] font-bold uppercase tracking-[0.1em] transition",
        active
          ? "border-[#D4AF37] bg-[#D4AF37] text-black"
          : "border-[#D4AF37]/25 bg-black/35 text-white/70 hover:border-[#D4AF37]/55"
      )}
    >
      <span className={active ? "text-black" : "text-[#D4AF37]"}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
