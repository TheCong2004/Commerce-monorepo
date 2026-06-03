"use client";

import FadeIn from "@/components/ui/FadeIn";
import { MysticDarkPanel, MysticPageShell, MysticPanel } from "@/components/ui/client/mystic-page-shell";
import confetti from "canvas-confetti";
import { Baby, Calculator, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { calculateExpression, calculateLifePath, checkCompatibility } from "../utils/numerologyUtils";
import { KID_NUMBERS, KidProfile } from "./data/babyInterpretations";
import ResultCard from "./ResultCard";

const BACKGROUND_IMG =
  "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482975mti/anh-mo-ta.png";

export default function BabyNumerology() {
  const [formData, setFormData] = useState({
    childName: "",
    day: "",
    month: "",
    year: "",
    parentDay: "",
    parentMonth: "",
    parentYear: "",
  });

  const [result, setResult] = useState<{
    lifePath: number;
    expression: number;
    parentLifePath?: number;
    isCompatible?: boolean;
    data: KidProfile;
  } | null>(null);

  useEffect(() => {
    if (result) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [result]);

  const simplifyNumber = (n: number): number => {
    if (n === 11 || n === 22 || n === 33) return n;
    return ((n - 1) % 9) + 1;
  };

  const handleCalculate = () => {
    if (!formData.childName.trim()) return toast.error("Vui lòng nhập tên bé.");
    if (!formData.day || !formData.month || !formData.year) {
      return toast.error("Vui lòng nhập đủ ngày sinh của bé.");
    }

    try {
      const rawLp = calculateLifePath(Number(formData.day), Number(formData.month), Number(formData.year));
      const simplifiedLp = simplifyNumber(rawLp);
      const exp = calculateExpression(formData.childName);

      let parentLp = undefined;
      let isMatch = undefined;
      if (formData.parentDay && formData.parentMonth && formData.parentYear) {
        const rawParentLp = calculateLifePath(
          Number(formData.parentDay),
          Number(formData.parentMonth),
          Number(formData.parentYear),
        );
        parentLp = simplifyNumber(rawParentLp);
        isMatch = checkCompatibility(parentLp, simplifiedLp);
      }

      let profile = KID_NUMBERS[simplifiedLp];
      if (!profile) {
        const fallbackKey = simplifiedLp > 9 && simplifiedLp !== 11 && simplifiedLp !== 22
          ? simplifyNumber(simplifiedLp)
          : 1;
        profile = KID_NUMBERS[fallbackKey] || KID_NUMBERS[1];
      }

      confetti({
        particleCount: 80,
        spread: 55,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F7E8B1", "#FFFFFF"],
      });

      setResult({
        lifePath: simplifiedLp,
        expression: exp,
        parentLifePath: parentLp,
        isCompatible: isMatch,
        data: profile,
      });

      toast.success("Đã tạo bản luận giải.");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi giải mã năng lượng.");
    }
  };

  if (result) {
    return (
      <FadeIn direction="up">
        <ResultCard result={result} onReset={() => setResult(null)} backgroundImage={BACKGROUND_IMG} />
      </FadeIn>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-[#D4AF37]/35 bg-white/80 px-3 py-3 text-[14px] font-medium text-[#3B2A22] outline-none transition placeholder:text-[#9A9188] focus:border-[#D4AF37] focus:bg-white";

  return (
    <MysticPageShell
      className="min-h-[calc(100vh-80px)]"
      contentClassName="mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl items-center px-4 py-10"
    >
      <div className="w-full">
        <FadeIn scale={0.98} direction="up">
          <MysticPanel className="p-5 md:p-6">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#F8F2E6] text-[#9A5418]">
                <Baby size={24} />
              </div>
              <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#3B2A22]">
                Thần Số Học Bé Yêu
              </h1>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6F6258]">
                Khám phá bản đồ định hướng của bé bằng một biểu mẫu ngắn gọn.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-[#3B2A22]">
                  Tên đầy đủ của bé
                </span>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Minh An"
                  className={inputClass}
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-[#3B2A22]">
                  Ngày sinh dương lịch
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="Ngày"
                    className={`${inputClass} text-center`}
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Tháng"
                    className={`${inputClass} text-center`}
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Năm"
                    className={`${inputClass} text-center`}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>
              </label>

              <div className="border-t border-[#D4AF37]/20 pt-4">
                <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-[#3B2A22]">
                  <Sparkles size={14} className="text-[#9A5418]" /> Năng lượng tương hợp
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="Ngày"
                    className={inputClass}
                    value={formData.parentDay}
                    onChange={(e) => setFormData({ ...formData, parentDay: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Tháng"
                    className={inputClass}
                    value={formData.parentMonth}
                    onChange={(e) => setFormData({ ...formData, parentMonth: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Năm"
                    className={inputClass}
                    value={formData.parentYear}
                    onChange={(e) => setFormData({ ...formData, parentYear: e.target.value })}
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] transition hover:bg-[#F2D26B]"
              >
                <Calculator size={16} /> Khám phá ngay
              </button>
            </div>
          </MysticPanel>
        </FadeIn>

        <MysticDarkPanel className="mt-5 px-5 py-4 text-center">
          <p className="text-[13px] leading-relaxed text-white/70">
            Thông tin của bé chỉ dùng để tạo bản luận giải, không chia sẻ cho bên thứ ba.
          </p>
        </MysticDarkPanel>
      </div>
    </MysticPageShell>
  );
}
