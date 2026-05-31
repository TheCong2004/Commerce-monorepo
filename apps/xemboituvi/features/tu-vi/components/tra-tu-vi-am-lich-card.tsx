"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, User, Search, ChevronRight, AlertCircle, Star } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Sử dụng service để validate
    const validationError = tuviService.validateNamSinh(namSinh);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    // Sử dụng service để lấy slug
    const slug = tuviService.formatSlug(namSinh, gioiTinh);

    setTimeout(() => {
      router.push(`/${slug}`);
    }, 500);
  };

  return (
    <div className="relative group w-full max-w-[360px] mx-auto my-6">
      <div className="absolute -inset-1 bg-[#8A0000]/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-700"></div>

      {/* Padding giảm từ p-8 xuống p-5 để nhỏ gọn */}
      <div className="relative bg-[#FDFBF7] p-5 md:p-6 rounded-xl shadow-lg border-x-[8px] border-[#E6D0A8] overflow-hidden border-y border-[#8A0000]/10">
        
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>

        {/* Header thu nhỏ size chữ */}
        <div className="text-center mb-5 relative z-10">
          <div className="inline-flex items-center justify-center p-2 bg-[#8A0000]/5 rounded-full mb-2 border border-[#8A0000]/10">
            <CalendarDays className="w-5 h-5 text-[#8A0000]" />
          </div>
          <h3 className="font-black papyrus text-xl md:text-2xl text-[#8A0000] uppercase tracking-tighter italic leading-none">
            Tra Tử Vi 2025
          </h3>
          <p className="text-[#8b4513]/60 text-[10px] mt-1 font-bold italic">
            Luận giải chi tiết bản mệnh Ất Tỵ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          
          {/* Input Năm Sinh thu gọn padding */}
          <div className="space-y-1.5 text-left">
            <label className="flex items-center gap-1.5 text-[10px] font-black text-[#8A0000] uppercase tracking-wider ml-1">
              <Star size={10} fill="#8A0000" /> Năm sinh
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={14} className="text-[#8A0000]/30 group-focus-within/input:text-[#8A0000] transition-colors" />
              </div>
              <input
                type="number"
                value={namSinh}
                onChange={(e) => { setNamSinh(e.target.value); setError(null); }}
                className="block w-full pl-9 pr-3 py-2.5 bg-white/50 border border-[#8A0000]/10 rounded-xl text-lg font-black text-[#252525] outline-none focus:border-[#8A0000]/40 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Chọn Giới Tính thu nhỏ chiều cao button */}
          <div className="space-y-1.5 text-left">
            <label className="flex items-center gap-1.5 text-[10px] font-black text-[#8A0000] uppercase tracking-wider ml-1">
              <User size={10} /> Giới tính
            </label>
            <div className="grid grid-cols-2 gap-2">
              <GenderButton
                label="Nam"
                active={gioiTinh === "Nam"}
                onClick={() => { setGioiTinh("Nam"); setError(null); }}
                icon={<User size={14} />}
              />
              <GenderButton
                label="Nữ"
                active={gioiTinh === "Nữ"}
                onClick={() => { setGioiTinh("Nữ"); setError(null); }}
                icon={<User size={14} />}
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-700 text-[10px] font-bold bg-red-50 p-2 rounded-lg border border-red-100 justify-center"
              >
                <AlertCircle size={12} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="relative w-full py-3.5 bg-gradient-to-r from-[#8A0000] to-[#5D0000] text-[#FDFBF7] rounded-full shadow-md overflow-hidden group/btn border border-[#D4AF37]/30"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[11px]">
              {loading ? "Đang xử lý..." : "Xem Tử Vi"}
              {!loading && <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />}
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
          </motion.button>
        </form>

        <p className="text-center text-[8px] text-[#8b4513]/40 mt-5 uppercase tracking-widest font-black italic">
          Khai mở vận số • Cát lành
        </p>
      </div>
    </div>
  );
}

function GenderButton({ label, active, onClick, icon }: { label: string; active: boolean; onClick: () => void; icon: React.ReactNode; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all duration-300",
        active
          ? "border-[#8A0000] bg-white text-[#8A0000] shadow-sm scale-[1.02] z-10"
          : "border-[#8A0000]/10 bg-[#252525]/5 text-[#8b4513]/40 opacity-70"
      )}
    >
      {active && (
        <div className="absolute top-1 right-1 bg-[#8A0000] text-white rounded-full p-[2px]">
          <Star size={6} fill="currentColor" />
        </div>
      )}
      <span className={cn(active ? "text-[#8A0000]" : "text-[#8b4513]/20")}>
        {icon}
      </span>
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </button>
  );
}