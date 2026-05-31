"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Heart,
  Phone,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Star,
} from "lucide-react";
import { NgayThangNam } from "./uingay-thang-nam";
import { GioiTinhSelect } from "./GioiTinhSelect";

// --- 1. CONFIG & HELPER ---
const RANGE_MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const getDaysInMonth = (month: number | "", year: number | "") => {
  if (!month) return 31;
  const y = year ? Number(year) : 2024;
  return new Date(y, Number(month), 0).getDate();
};

export default function NumerologyCard() {
  const router = useRouter();

  // --- STATE ---
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("nam");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [checkLove, setCheckLove] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [error, setError] = useState("");

  // --- LOGIC ---
  const daysInSelectedMonth = useMemo(() => {
    const maxDays = getDaysInMonth(
      month === "" ? "" : Number(month),
      year === "" ? "" : Number(year)
    );
    return Array.from({ length: maxDays }, (_, i) => i + 1);
  }, [month, year]);

  React.useEffect(() => {
    if (day && month) {
      const maxDay = getDaysInMonth(
        month === "" ? "" : Number(month),
        year === "" ? "" : Number(year)
      );
      if (Number(day) > maxDay) setDay("");
    }
  }, [month, year, day]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !day || !month || !year) {
      setError("Vui lòng nhập đầy đủ Họ tên và Ngày sinh!");
      return;
    }

    const currentYear = new Date().getFullYear();
    if (Number(year) < 1900 || Number(year) > currentYear) {
      setError(`Năm sinh không hợp lệ (1900 - ${currentYear})`);
      return;
    }

    const formattedDob = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    const params = new URLSearchParams({
      fullName: fullName.trim(),
      nickname: nickname.trim(),
      gender,
      dob: formattedDob,
      checkLove: checkLove.toString(),
      checkPhone: checkPhone.toString(),
    });

    router.push(`/numerology-result?${params.toString()}`);
  };

  // --- STYLES ---
  const inputWrapperClass = "relative group";
  const inputClass = `
    w-full bg-[#1e293b]/50 border border-slate-600 text-white 
    placeholder-slate-400 rounded-lg px-3 py-1.5 pl-9 text-sm
    focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
    transition-all duration-200 hover:border-slate-500
  `;
  const iconClass =
    "absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition-colors";

  return (
    <div className="w-full flex items-center justify-center p-3 sm:p-4 font-sans">
      {/* CARD CONTAINER */}
      <div className="relative w-full max-w-6xl group">
        {/* Glow Effect Background */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-15 group-hover:opacity-30 transition duration-700"></div>

        <div className="relative bg-[#0F172A] p-5 rounded-xl border border-slate-700/50 shadow-lg">
          {/* HEADER */}
          <div className="text-center mb-3">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200">
              Tra Cứu Thần Số Học
            </h2>
            <p className="text-slate-400 mt-1 text-xs">
              Khám phá bản đồ định mệnh qua Họ tên & Ngày sinh
            </p>
          </div>

          <form onSubmit={handleCalc} className="space-y-1.5">
            {/* ROW 1: Họ tên */}
            <div className={inputWrapperClass}>
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide mb-1 ml-1">
                Họ và tên khai sinh
              </label>
              <div className="relative">
                <User className={iconClass} size={14} />
                <input
                  type="text"
                  placeholder="VD: NGUYEN VAN A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value.toUpperCase())}
                  className={`${inputClass} uppercase`}
                />
              </div>
            </div>

            {/* ROW 2: Nickname + Giới tính */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={inputWrapperClass}>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide mb-1 ml-1">
                  Tên thường gọi (Optional)
                </label>
                <div className="relative">
                  <Star className={iconClass} size={14} />
                  <input
                    type="text"
                    placeholder="VD: Bin, Bon..."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
                {/* Ô GIỚI TÍNH MỚI */}
                <GioiTinhSelect gender={gender} setGender={setGender} />
              </div>


            {/* ROW 3: Ngày sinh */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide mb-1 ml-1 flex items-center gap-1">
                <Calendar size={12} /> Ngày sinh dương lịch
              </label>

              <div className="flex gap-2">
                <NgayThangNam
                  placeholder="Ngày"
                  value={day}
                  onChange={setDay}
                  options={daysInSelectedMonth}
                />

                <NgayThangNam
                  placeholder="Tháng"
                  value={month}
                  onChange={setMonth}
                  options={RANGE_MONTHS}
                />

                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Năm"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#1e293b]/50 border border-slate-600 text-white rounded-lg px-3 py-1.5 text-sm text-center focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ROW 4: Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label
                className={`
                  flex items-center gap-2 p-2 rounded-lg border border-slate-700/50 bg-slate-800/30 cursor-pointer transition-all text-xs
                  ${
                    checkLove
                      ? "border-pink-500/50 bg-pink-500/10"
                      : "hover:bg-slate-800"
                  }
               `}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    checkLove
                      ? "bg-pink-500 border-pink-500"
                      : "border-slate-500"
                  }`}
                >
                  {checkLove && (
                    <span className="text-white text-[8px]">✓</span>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checkLove}
                  onChange={(e) => setCheckLove(e.target.checked)}
                />
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Heart
                    size={12}
                    className={
                      checkLove
                        ? "text-pink-400 fill-pink-400"
                        : "text-slate-500"
                    }
                  />
                  Tương hợp tình duyên
                </div>
              </label>

              <label
                className={`
                  flex items-center gap-2 p-2 rounded-lg border border-slate-700/50 bg-slate-800/30 cursor-pointer transition-all text-xs
                  ${
                    checkPhone
                      ? "border-indigo-500/50 bg-indigo-500/10"
                      : "hover:bg-slate-800"
                  }
               `}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    checkPhone
                      ? "bg-indigo-500 border-indigo-500"
                      : "border-slate-500"
                  }`}
                >
                  {checkPhone && (
                    <span className="text-white text-[8px]">✓</span>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checkPhone}
                  onChange={(e) => setCheckPhone(e.target.checked)}
                />
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Phone
                    size={12}
                    className={
                      checkPhone
                        ? "text-indigo-400 fill-indigo-400"
                        : "text-slate-500"
                    }
                  />
                  Sim phong thủy
                </div>
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="group relative w-full py-2.5 rounded-lg font-bold text-white text-sm overflow-hidden shadow transition-all hover:scale-[1.01] hover:shadow-purple-500/30"
            >
              <div className="absolute inset-0 bg-pink-500  group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-1.5">
                Xem Kết Quả Chi Tiết <ArrowRight size={16} />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
