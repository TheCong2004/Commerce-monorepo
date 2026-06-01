"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Calendar,
  Clock,
  Sparkles,
  AlertCircle,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Label, GenderOption, CustomSelect } from "./TuViSubComponents";
import { tuviService } from "../services/tuvi-tron-doi";

export default function TuVi2025Card() {
  const router = useRouter();
  const options = useMemo(() => tuviService.generateOptions(), []);

  const [hoTen, setHoTen] = useState("");
  const [gioiTinh, setGioiTinh] = useState<"Nam" | "Nữ" | "">("Nam");
  const [ngaySinh, setNgaySinh] = useState("1");
  const [thangSinh, setThangSinh] = useState("1");
  const [namSinh, setNamSinh] = useState("1995");
  const [gioSinh, setGioSinh] = useState("0");
  const [phutSinh, setPhutSinh] = useState("0");
  const [namXem, setNamXem] = useState("2025");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!hoTen.trim()) {
      setError("Vui lòng nhập họ tên.");
      return;
    }
    if (!gioiTinh) {
      setError("Vui lòng chọn giới tính.");
      return;
    }

    setLoading(true);
    const params = new URLSearchParams({
      name: hoTen.trim(),
      gender: gioiTinh,
      day: ngaySinh,
      month: thangSinh,
      year: namSinh,
      hour: gioSinh,
      minute: phutSinh,
      viewYear: namXem,
    });

    setTimeout(() => {
      router.push(`/tu-vi/tron-doi/la-so?${params.toString()}`);
    }, 600);
  };

  return (
    <div className="relative group w-full lg:col-span-2 mx-auto my-8 px-2 pt-14">
      <div className="absolute -inset-1 bg-[#8A0000]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>

      <div className="relative bg-[#FDFBF7] p-6 md:p-10 rounded-2xl shadow-xl border-x-[12px] md:border-x-[16px] border-[#E6D0A8] overflow-hidden border-y border-[#8A0000]/10">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>

        <div className="text-center mb-10 relative z-10">
          <h3 className="font-papyrus text-4xl md:text-5xl font-semibold papyrus text-[#8A0000] uppercase tracking-widest drop-shadow-sm flex items-center justify-center gap-4 leading-tight">
            <span className="h-px w-8 bg-[#8A0000]/20 hidden sm:block"></span>
            Lập Lá Số Tử Vi
            <span className="h-px w-8 bg-[#8A0000]/20 hidden sm:block"></span>
          </h3>
          <p className="text-[#8b4513]/60 text-sm mt-3 uppercase tracking-[0.3em] italic flex justify-center items-center gap-2 font-sans font-bold">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            Luận giải vận hạn trọn đời
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label text="Họ và tên" />
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A0000]/40 transition-transform group-focus-within/input:scale-110 group-focus-within/input:text-[#8A0000]" />
                <input
                  type="text"
                  value={hoTen}
                  onChange={(e) => {
                    setHoTen(e.target.value);
                    setError(null);
                  }}
                  placeholder="Nhập họ tên gia chủ..."
                  className="block w-full pl-12 pr-4 py-4 border-2 border-[#8A0000]/10 rounded-xl bg-white/50 text-[#252525] shadow-inner focus:border-[#8A0000]/40 focus:bg-white transition-all font-bold placeholder:text-[#8A0000]/20 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label text="Giới tính" />
              {/* Chia làm 2 cột bằng grid-cols-2 */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <GenderOption
                  label="Nam"
                  value="Nam"
                  current={gioiTinh}
                  set={setGioiTinh}
                  setError={setError}
                />
                <GenderOption
                  label="Nữ"
                  value="Nữ"
                  current={gioiTinh}
                  set={setGioiTinh}
                  setError={setError}
                />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8A0000]/10 to-transparent"></div>

          <div className="space-y-2">
            <Label
              text="Ngày sinh (Dương lịch)"
              icon={<Calendar className="w-4 h-4 text-[#8A0000]" />}
            />
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <CustomSelect
                value={ngaySinh}
                onChange={setNgaySinh}
                options={options.days}
                label="Ngày"
              />
              <CustomSelect
                value={thangSinh}
                onChange={setThangSinh}
                options={options.months}
                label="Tháng"
              />
              <CustomSelect
                value={namSinh}
                onChange={setNamSinh}
                options={options.years}
                label="Năm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                text="Giờ sinh"
                icon={<Clock className="w-4 h-4 text-[#8A0000]" />}
              />
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <CustomSelect
                  value={gioSinh}
                  onChange={setGioSinh}
                  options={options.hours}
                  suffix="h"
                  label="Giờ"
                />
                <CustomSelect
                  value={phutSinh}
                  onChange={setPhutSinh}
                  options={options.minutes}
                  suffix="p"
                  label="Phút"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                text="Năm xem"
                icon={<Eye className="w-4 h-4 text-[#8A0000]" />}
              />
              <CustomSelect
                value={namXem}
                onChange={setNamXem}
                options={options.viewYears}
                highlight
                label="Năm"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-700 text-sm font-bold bg-red-100 p-4 rounded-xl border border-red-200 justify-center"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-2">
            <motion.button
              whileHover={{
                scale: 1.01,
                boxShadow: "0 10px 30px rgba(138,0,0,0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="relative w-full py-5 bg-gradient-to-r from-[#8A0000] to-[#5D0000] text-[#FDFBF7] rounded-xl font-black uppercase tracking-[0.2em] text-base shadow-xl border border-[#D4AF37]/30 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <Sparkles className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Lấy Lá Số Tử Vi <ArrowRight size={20} />
                  </>
                )}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
