"use client";

import { useRouter } from "next/navigation";
import { useState } from "react"; // Giữ nguyên useState
import { motion } from "framer-motion";
import { Spade, Heart, Sparkles, ArrowRight, Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BoiBaiTayCard() {
  const router = useRouter();
  
  // --- THAY ĐỔI TẠI ĐÂY: Khởi tạo giá trị mặc định là "Nam" ---
  const [gioiTinh, setGioiTinh] = useState<"Nam" | "Nữ" | "">("Nam");
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gioiTinh) return;

    setLoading(true);
    const slug = gioiTinh === "Nam" ? "xem-boi-bai-hang-ngay-nam.html" : "xem-boi-bai-hang-ngay-nu.html";

    setTimeout(() => {
      router.push(`/${slug}`);
    }, 500);
  };

  return (
    <div className="relative group w-full max-w-md mx-auto my-8">
      <div className="absolute -inset-1 bg-[#8A0000]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>

      <div className="relative bg-[#FDFBF7] p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-x-[12px] border-[#E6D0A8] overflow-hidden border-y border-[#8A0000]/10">
        
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Spade className="w-5 h-5 text-[#8A0000]" />
              <h3 className="font-black text-3xl text-[#8A0000] uppercase tracking-tighter italic papyrus drop-shadow-sm">
                Bói Bài Tây
              </h3>
            <Heart className="w-5 h-5 text-[#8A0000]" />
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#8A0000]/30 to-transparent mx-auto"></div>
          <p className="text-[#8b4513]/60 text-[10px] mt-3 uppercase tracking-[0.2em] font-bold flex justify-center items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Thấu thị tương lai
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          </p>
        </div>          

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <SelectionCard
              label="Nam"
              subLabel="Xáo 7 lần"
              icon={<Spade className="w-8 h-8" />}
              selected={gioiTinh === "Nam"}
              onClick={() => setGioiTinh("Nam")}
            />

            <SelectionCard
              label="Nữ"
              subLabel="Xáo 9 lần"
              icon={<Heart className="w-8 h-8" />}
              selected={gioiTinh === "Nữ"}
              onClick={() => setGioiTinh("Nữ")}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!gioiTinh || loading}
            className={cn(
              "relative w-full py-5 px-6 rounded-full overflow-hidden font-black uppercase tracking-[0.2em] text-sm transition-all duration-500 shadow-xl border border-[#D4AF37]/30",
              !gioiTinh
                ? "bg-gray-100 text-gray-300 cursor-not-allowed border-none"
                : "bg-gradient-to-r from-[#8A0000] to-[#5D0000] text-[#FDFBF7] shadow-[0_10px_25px_rgba(138,0,0,0.3)]"
            )}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? "Đang tráo bài..." : <>Xem Quẻ Ngay <ArrowRight className="w-4 h-4" /></>}
            </span>
            
            {gioiTinh && !loading && (
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            )}
          </motion.button>
        </form>

        <p className="text-center text-[9px] text-[#8b4513]/40 mt-6 uppercase tracking-[0.3em] font-black italic">
          Tĩnh tâm cầu quẻ - Linh ứng tại tâm
        </p>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-gradient-to-t from-[#E6D0A8] to-transparent opacity-40 blur-sm pointer-events-none"></div>
      </div>
    </div>
  );
}
function SelectionCard({ label, subLabel, icon, selected, onClick }: { label: string; subLabel: string; icon: React.ReactNode; selected: boolean; onClick: () => void; }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "cursor-pointer relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-500",
        selected
          ? "border-[#8A0000] bg-white shadow-xl scale-[1.05] z-10"
          : "border-[#8A0000]/10 bg-[#252525]/5 opacity-60 hover:opacity-100 hover:border-[#8A0000]/30"
      )}
    >
      {/* Icon check mark khi được chọn */}
      {selected && (
        <div className="absolute top-2 right-2 bg-[#8A0000] text-white rounded-full p-0.5 shadow-md">
          <Star size={10} fill="currentColor" />
        </div>
      )}

      <div className={cn("transition-all duration-700", selected ? "text-[#8A0000] drop-shadow-sm" : "text-[#8b4513]/30")}>
        {icon}
      </div>
      <span className={cn("font-black text-sm mt-3 uppercase tracking-widest", selected ? "text-[#252525]" : "text-[#8b4513]/40")}>
        {label}
      </span>
      <span className={cn("text-[9px] uppercase tracking-tighter font-black mt-2 px-3 py-1 rounded-full transition-all", 
        selected ? "bg-[#8A0000] text-[#FDFBF7]" : "bg-gray-200 text-gray-400")}>
        {subLabel}
      </span>
    </motion.div>
  );
}