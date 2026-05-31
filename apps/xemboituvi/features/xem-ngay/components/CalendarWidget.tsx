"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { Solar, Lunar } from "lunar-javascript";
import GoldenFrame from "@/components/ui/GoldenGlowCard";

// --- BẢNG DỊCH TIẾNG VIỆT 100% ---
const GANS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHIS = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const ANIMALS = ["Chuột", "Trâu", "Hổ", "Mèo", "Rồng", "Rắn", "Ngựa", "Dê", "Khỉ", "Gà", "Chó", "Lợn"];
const GIO_TIENG_VIET = [
  "Tý (23:00-0:59)", "Sửu (1:00-2:59)", "Dần (3:00-4:59)", "Mão (5:00-6:59)",
  "Thìn (7:00-8:59)", "Tỵ (9:00-10:59)", "Ngọ (11:00-12:59)", "Mùi (13:00-14:59)",
  "Thân (15:00-16:59)", "Dậu (17:00-18:59)", "Tuất (19:00-20:59)", "Hợi (21:00-22:59)"
];

const MAP_HUONG: Record<string, string> = {
  "巽": "Đông Nam", "离": "Chính Nam", "坤": "Tây Nam", "兑": "Chính Tây",
  "乾": "Tây Bắc", "坎": "Chính Bắc", "艮": "Đông Bắc", "震": "Chính Đông",
  "东北": "Đông Bắc", "东南": "Đông Nam", "西北": "Tây Bắc", "西南": "Tây Nam",
  "正东": "Chính Đông", "正西": "Chính Tây", "正南": "Chính Nam", "正北": "Chính Bắc"
};

const getGioHoangDaoIdx = (chiIndex: number) => {
  const schedules: Record<number, number[]> = {
    0: [0, 1, 3, 5, 8, 10], 6: [0, 1, 3, 5, 8, 10],
    1: [2, 3, 5, 8, 10, 11], 7: [2, 3, 5, 8, 10, 11],
    2: [0, 1, 4, 5, 7, 10], 8: [0, 1, 4, 5, 7, 10],
    3: [0, 2, 3, 6, 7, 9], 9: [0, 2, 3, 6, 7, 9],
    4: [2, 4, 5, 8, 9, 11], 10: [2, 4, 5, 8, 9, 11],
    5: [1, 4, 6, 7, 10, 11], 11: [1, 4, 6, 7, 10, 11]
  };
  return schedules[chiIndex] || [];
};

export default function CalendarWidget() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-full max-w-2xl mx-auto mb-6 min-h-64 bg-[#0a0a0a] rounded-2xl border border-white/10" />;

  const changeDate = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const solar = Solar.fromDate(currentDate);
  const lunar = Lunar.fromSolar(solar);

  const year = solar.getYear();
  const yearGanIdx = (year - 4) % 10;
  const yearChiIdx = (year - 4) % 12;

  const chiNamesHán = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const dayChiChar = lunar.getDayInGanZhi().substring(1, 2);
  const dayChiIdx = chiNamesHán.indexOf(dayChiChar) !== -1 ? chiNamesHán.indexOf(dayChiChar) : 0;

  const translate = (text: string) => MAP_HUONG[text] || text;

  const displayData = {
    dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"][currentDate.getDay()],
    day: solar.getDay().toString().padStart(2, '0'),
    month: `Tháng ${solar.getMonth()}`,
    year: solar.getYear().toString(),
    lunarInfo: `Ngày ${lunar.getDay()} Tháng ${lunar.getMonth()}, Năm ${GANS[yearGanIdx]} ${CHIS[yearChiIdx]} (Tuổi ${ANIMALS[yearChiIdx]})`
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 px-2">
      {/* Container chính: Đổi sang viền vàng kim và nền tối */}
      <GoldenFrame>

        {/* Header điều hướng: Đổi nền sang đen xám và chữ sang vàng kim */}
        <div className="bg-black border-b border-[#D4AF37]/30 py-2 px-4 flex items-center justify-between">
          <button onClick={() => changeDate(-1)} className="p-1.5 hover:bg-white/5 rounded-full text-amber-500 transition-all flex items-center gap-1">
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-amber-500 font-semibold papyrus text-lg font-bold flex items-center gap-1.5">
            <CalendarIcon size={16} className="text-[#d4af37]" /> Lịch Vạn Niên
          </h2>
          <button onClick={() => changeDate(1)} className="p-1.5 hover:bg-white/5 rounded-full text-amber-500 transition-all flex items-center gap-1">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Nội dung chính: Đổi nền sang kính mờ tối (Glassmorphism dark) */}
        <div className="p-5 md:p-6 backdrop-blur-xl bg-white/10">
          <div className="flex flex-col items-center">

            {/* Thứ: Chuyển sang màu vàng kim nhạt */}
            <div className="text-amber-500/80 font-serif font-bold text-base uppercase tracking-wide mb-3">
              {displayData.dayOfWeek}
            </div>

            {/* Ngày Dương: Giữ nguyên class của bạn nhưng chỉnh shadow cho phù hợp nền tối */}
            <div className="flex items-center gap-4 mb-5">
              <span
                className="font-serif font-black text-4xl md:text-5xl leading-none
                           text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                {displayData.day}
              </span>
              <div className="flex flex-col items-start border-l-2 border-amber-500/20 pl-3 py-1">
                <span className="text-amber-200 font-serif font-bold text-base md:text-lg">{displayData.month}</span>
                <span className="text-white/40 font-serif text-sm italic">Năm {displayData.year}</span>
              </div>
            </div>

            {/* Âm lịch: Nền tối hơn, chữ vàng kim */}
            <div className="bg-white/[0.05] px-4 py-2 rounded-full border border-amber-500/20 mb-5 text-center">
              <p className="text-amber-500 font-sans text-base font-medium italic">
                {displayData.lunarInfo}
              </p>
            </div>

            {/* Bảng phong thủy: Nền đen sâu, viền mờ */}
            <div className="w-full max-w-md bg-black/40 rounded-2xl p-4 border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">

                <div>
                  <h3 className="font-sans font-bold text-amber-500 text-sm uppercase tracking-wider mb-2">◆ Giờ hoàng đạo</h3>
                  <div className="flex flex-wrap gap-1 text-white/70 font-sans text-sm">
                    {getGioHoangDaoIdx(dayChiIdx).map((idx) => (
                      <span key={idx} className="bg-white/5 px-2 py-1 rounded border border-white/10">
                        {GIO_TIENG_VIET[idx]}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-amber-500 text-xs uppercase tracking-wider mb-2">◆ Hướng xuất hành</h3>
                  <div className="text-white/70 text-xs font-sans leading-relaxed">
                    <p><span className="font-medium text-white/40">Hỷ thần:</span> {translate(lunar.getDayPositionXi())}</p>
                    <p><span className="font-medium text-white/40">Tài thần:</span> {translate(lunar.getDayPositionCai())}</p>
                  </div>
                </div>

              </div>
            </div>

            <button
              onClick={() => setCurrentDate(new Date())}
              className="mt-4 text-white/30 hover:text-amber-500 font-sans text-xs underline decoration-dotted underline-offset-2 transition-colors"
            >
              Về hôm nay
            </button>
          </div>
        </div>
        </GoldenFrame>
      </div>
      
  );
}