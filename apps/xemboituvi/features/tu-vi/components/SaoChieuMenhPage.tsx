"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getSaoHan } from "@/features/tu-vi/services/sao-logic";
import SaoHanResultCard from "./SaoHanResultCard";
import { MysticGoldFrame } from "@/components/ui/client/mystic-page-shell";

export default function SaoChieuMenh() {
  const [formData, setFormData] = useState({ namSinh: 1995, gioiTinh: "Nam" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(getSaoHan(formData.namSinh, formData.gioiTinh));
      setLoading(false);
    }, 500);
  };

  return (
    <main className="relative min-h-0 font-sans">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative mx-auto max-w-md">
          <MysticGoldFrame className="overflow-hidden p-5 md:p-6">
            <div className="relative z-10 mb-5 text-center">
              <h3 className="papyrus text-[22px] font-semibold uppercase tracking-[0.12em] text-[#FFD700] md:text-[26px]">
                Tra cứu sao hạn
              </h3>
              <div className="mx-auto mt-2 h-px w-20 bg-[#D4AF37]/35" />
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3E3BC]/75">
                Nhập thông tin bản mệnh 2025
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="space-y-2 text-left">
                <label className="ml-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
                  <Calendar size={13} /> Năm sinh dương lịch
                </label>
                <input
                  type="number"
                  value={formData.namSinh || ""}
                  onChange={(event) => setFormData({ ...formData, namSinh: parseInt(event.target.value, 10) || 0 })}
                  className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 text-center text-[14px] font-semibold text-white outline-none transition focus:border-[#D4AF37]"
                  placeholder="1995"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="ml-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
                  <User size={13} /> Giới tính mạng
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Nam", "Nữ"].map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => setFormData({ ...formData, gioiTinh: gender })}
                      className={`h-11 rounded-lg border text-[13px] font-bold uppercase tracking-[0.1em] transition ${
                        formData.gioiTinh === gender
                          ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                          : "border-[#D4AF37]/25 bg-black/35 text-white/70 hover:border-[#D4AF37]/55"
                      }`}
                    >
                      {gender} mạng
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                disabled={loading || !formData.namSinh}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] px-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#F3E3BC] disabled:cursor-wait disabled:opacity-40"
              >
                {loading ? "Đang bấm quẻ..." : "Tra cứu vận hạn"} {!loading && <ArrowRight size={15} />}
              </motion.button>
            </div>
          </MysticGoldFrame>
        </div>

        <SaoHanResultCard result={result} namSinh={formData.namSinh} />
      </div>
    </main>
  );
}
