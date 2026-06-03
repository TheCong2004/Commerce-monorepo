"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Calendar, Clock, Eye, Sparkles, User } from "lucide-react";
import { CustomSelect, GenderOption, Label } from "./TuViSubComponents";
import { tuviService } from "../services/tuvi-tron-doi";
import { MysticGoldFrame } from "@/components/ui/client/mystic-page-shell";

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
    }, 500);
  };

  return (
    <div className="relative mx-auto my-6 w-full max-w-4xl px-2 pt-10">
      <MysticGoldFrame className="overflow-hidden p-5 md:p-6">
        <div className="relative z-10 mb-6 text-center">
          <h3 className="papyrus flex items-center justify-center gap-3 text-[22px] font-semibold uppercase tracking-[0.12em] text-[#FFD700] md:text-[26px]">
            <span className="hidden h-px w-8 bg-[#D4AF37]/25 sm:block" />
            Lập lá số tử vi
            <span className="hidden h-px w-8 bg-[#D4AF37]/25 sm:block" />
          </h3>
          <p className="mt-3 flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3E3BC]/75">
            <Sparkles className="h-3 w-3 text-[#D4AF37]" />
            Luận giải vận hạn trọn đời
            <Sparkles className="h-3 w-3 text-[#D4AF37]" />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label text="Họ và tên" />
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/55" />
                <input
                  type="text"
                  value={hoTen}
                  onChange={(event) => {
                    setHoTen(event.target.value);
                    setError(null);
                  }}
                  placeholder="Nhập họ tên gia chủ"
                  className="block h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 pl-9 text-[14px] font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label text="Giới tính" />
              <div className="grid grid-cols-2 gap-3">
                <GenderOption label="Nam" value="Nam" current={gioiTinh} set={setGioiTinh} setError={setError} />
                <GenderOption label="Nữ" value="Nữ" current={gioiTinh} set={setGioiTinh} setError={setError} />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-[#D4AF37]/15" />

          <div className="space-y-2">
            <Label text="Ngày sinh dương lịch" icon={<Calendar className="h-4 w-4 text-[#D4AF37]" />} />
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <CustomSelect value={ngaySinh} onChange={setNgaySinh} options={options.days} label="Ngày" />
              <CustomSelect value={thangSinh} onChange={setThangSinh} options={options.months} label="Tháng" />
              <CustomSelect value={namSinh} onChange={setNamSinh} options={options.years} label="Năm" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label text="Giờ sinh" icon={<Clock className="h-4 w-4 text-[#D4AF37]" />} />
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <CustomSelect value={gioSinh} onChange={setGioSinh} options={options.hours} suffix="h" label="Giờ" />
                <CustomSelect value={phutSinh} onChange={setPhutSinh} options={options.minutes} suffix="p" label="Phút" />
              </div>
            </div>
            <div className="space-y-2">
              <Label text="Năm xem" icon={<Eye className="h-4 w-4 text-[#D4AF37]" />} />
              <CustomSelect value={namXem} onChange={setNamXem} options={options.viewYears} highlight label="Năm" />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-900/30 bg-red-950/20 p-3 text-[13px] font-semibold text-red-300"
              >
                <AlertCircle className="h-4 w-4" /> {error}
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
            {loading ? <Sparkles className="h-4 w-4 animate-spin text-black" /> : <>Lấy lá số tử vi <ArrowRight size={15} /></>}
          </motion.button>
        </form>
      </MysticGoldFrame>
    </div>
  );
}
