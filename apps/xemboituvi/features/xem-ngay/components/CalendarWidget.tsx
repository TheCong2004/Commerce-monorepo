"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Lunar, Solar } from "lunar-javascript";
import { MysticDarkPanel } from "@/components/ui/client/mystic-page-shell";

const GANS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHIS = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const ANIMALS = ["Chuột", "Trâu", "Hổ", "Mèo", "Rồng", "Rắn", "Ngựa", "Dê", "Khỉ", "Gà", "Chó", "Lợn"];
const GIO_TIENG_VIET = [
  "Tý (23:00-0:59)",
  "Sửu (1:00-2:59)",
  "Dần (3:00-4:59)",
  "Mão (5:00-6:59)",
  "Thìn (7:00-8:59)",
  "Tỵ (9:00-10:59)",
  "Ngọ (11:00-12:59)",
  "Mùi (13:00-14:59)",
  "Thân (15:00-16:59)",
  "Dậu (17:00-18:59)",
  "Tuất (19:00-20:59)",
  "Hợi (21:00-22:59)",
];

const MAP_HUONG: Record<string, string> = {
  "巽": "Đông Nam",
  "离": "Chính Nam",
  "坤": "Tây Nam",
  "兑": "Chính Tây",
  "乾": "Tây Bắc",
  "坎": "Chính Bắc",
  "艮": "Đông Bắc",
  "震": "Chính Đông",
  "东北": "Đông Bắc",
  "东南": "Đông Nam",
  "西北": "Tây Bắc",
  "西南": "Tây Nam",
  "正东": "Chính Đông",
  "正西": "Chính Tây",
  "正南": "Chính Nam",
  "正北": "Chính Bắc",
};

const getGioHoangDaoIdx = (chiIndex: number) => {
  const schedules: Record<number, number[]> = {
    0: [0, 1, 3, 5, 8, 10],
    6: [0, 1, 3, 5, 8, 10],
    1: [2, 3, 5, 8, 10, 11],
    7: [2, 3, 5, 8, 10, 11],
    2: [0, 1, 4, 5, 7, 10],
    8: [0, 1, 4, 5, 7, 10],
    3: [0, 2, 3, 6, 7, 9],
    9: [0, 2, 3, 6, 7, 9],
    4: [2, 4, 5, 8, 9, 11],
    10: [2, 4, 5, 8, 9, 11],
    5: [1, 4, 6, 7, 10, 11],
    11: [1, 4, 6, 7, 10, 11],
  };
  return schedules[chiIndex] || [];
};

export default function CalendarWidget() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="mx-auto mb-6 min-h-64 w-full max-w-2xl rounded-lg border border-[#D4AF37]/20 bg-black/55" />;
  }

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
  const chiNamesHan = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const dayChiChar = lunar.getDayInGanZhi().substring(1, 2);
  const dayChiIdx = chiNamesHan.indexOf(dayChiChar) !== -1 ? chiNamesHan.indexOf(dayChiChar) : 0;
  const translate = (text: string) => MAP_HUONG[text] || text;

  const displayData = {
    dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"][currentDate.getDay()],
    day: solar.getDay().toString().padStart(2, "0"),
    month: `Tháng ${solar.getMonth()}`,
    year: solar.getYear().toString(),
    lunarInfo: `Ngày ${lunar.getDay()} Tháng ${lunar.getMonth()}, Năm ${GANS[yearGanIdx]} ${CHIS[yearChiIdx]} (Tuổi ${ANIMALS[yearChiIdx]})`,
  };

  return (
    <div className="mx-auto mb-6 w-full max-w-2xl px-2">
      <MysticDarkPanel className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 bg-black/45 px-4 py-3">
          <button onClick={() => changeDate(-1)} className="rounded-lg border border-[#D4AF37]/35 bg-black/35 p-2 text-[#D4AF37] transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10">
            <ChevronLeft size={17} />
          </button>
          <h2 className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">
            <CalendarIcon size={16} className="text-[#D4AF37]" />
            Lịch vạn niên
          </h2>
          <button onClick={() => changeDate(1)} className="rounded-lg border border-[#D4AF37]/35 bg-black/35 p-2 text-[#D4AF37] transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10">
            <ChevronRight size={17} />
          </button>
        </div>

        <div className="p-5 text-center md:p-6">
          <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">{displayData.dayOfWeek}</div>

          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="text-[34px] font-black leading-none text-[#F3E3BC] md:text-[38px]">{displayData.day}</span>
            <div className="border-l border-[#D4AF37]/25 pl-4 text-left">
              <p className="text-[14px] font-bold text-[#D4AF37]">{displayData.month}</p>
              <p className="mt-1 text-[13px] text-white/55">Năm {displayData.year}</p>
            </div>
          </div>

          <p className="mx-auto mb-5 max-w-md rounded-lg border border-[#D4AF37]/25 bg-black/35 px-3 py-2 text-[13px] leading-6 text-white/72">
            {displayData.lunarInfo}
          </p>

          <div className="grid gap-4 rounded-lg border border-[#D4AF37]/35 bg-black/35 p-4 text-left md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Giờ hoàng đạo</h3>
              <div className="flex flex-wrap gap-1.5 text-[12px] leading-5 text-white/70">
                {getGioHoangDaoIdx(dayChiIdx).map((idx) => (
                  <span key={idx} className="rounded border border-[#D4AF37]/25 bg-black/35 px-2 py-1">
                    {GIO_TIENG_VIET[idx]}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Hướng xuất hành</h3>
              <div className="space-y-1 text-[13px] leading-6 text-white/70">
                <p>
                  <span className="text-white/45">Hỷ thần:</span> {translate(lunar.getDayPositionXi())}
                </p>
                <p>
                  <span className="text-white/45">Tài thần:</span> {translate(lunar.getDayPositionCai())}
                </p>
              </div>
            </div>
          </div>

          <button onClick={() => setCurrentDate(new Date())} className="mt-4 text-[12px] font-semibold text-[#D4AF37] underline underline-offset-4 transition hover:text-[#F3E3BC]">
            Về hôm nay
          </button>
        </div>
      </MysticDarkPanel>
    </div>
  );
}
