"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticPageShell, MysticPanel } from "@/components/ui/client/mystic-page-shell";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NatalChart() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    birthDate: "",
    birthTime: "12:00",
    lat: 16.0471,
    lng: 108.2068,
  });
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    if (!formData.birthDate) return toast.error("Vui lòng chọn ngày sinh.");
    setLoading(true);

    const params = new URLSearchParams({
      date: formData.birthDate,
      time: formData.birthTime,
      lat: formData.lat.toString(),
      lng: formData.lng.toString(),
    });

    setTimeout(() => {
      router.push(`/thansohoc/natal-star/result?${params.toString()}`);
    }, 500);
  };

  const inputClass =
    "w-full rounded-lg border border-[#D4AF37]/35 bg-white/80 py-3 pl-10 pr-3 text-[14px] text-[#3B2A22] outline-none transition focus:border-[#D4AF37] focus:bg-white";

  return (
    <MysticPageShell contentClassName="mx-auto max-w-3xl px-4 py-10">
      <FadeIn direction="down">
        <MysticDarkPanel className="mb-5 p-5 text-center">
          <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
            Bản Đồ Sao
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70">
            Nhập ngày và giờ sinh để lập bản đồ sao cá nhân theo dữ liệu thiên văn.
          </p>
        </MysticDarkPanel>
      </FadeIn>

      <FadeIn scale={0.98} delay={0.1}>
        <MysticPanel className="p-5 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#3B2A22]">Ngày sinh</span>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 text-[#9A5418]" size={16} />
                <input
                  type="date"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#3B2A22]">Giờ sinh</span>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 text-[#9A5418]" size={16} />
                <input
                  type="time"
                  className={inputClass}
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                />
              </div>
            </label>
          </div>

          <button
            onClick={handleCalculate}
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] transition hover:bg-[#F2D26B] disabled:opacity-50"
          >
            {loading ? "Đang kết nối..." : <>Giải mã ngay <ArrowRight size={16} /></>}
          </button>

          <p className="mt-3 text-center text-[13px] leading-relaxed text-[#6F6258]">
            Dữ liệu được tính toán dựa trên tọa độ mặc định và thời điểm bạn cung cấp.
          </p>
        </MysticPanel>
      </FadeIn>
    </MysticPageShell>
  );
}
