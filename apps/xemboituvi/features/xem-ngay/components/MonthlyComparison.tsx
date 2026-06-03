"use client";

import { useMemo } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Solar } from "lunar-javascript";
import { MysticDarkPanel } from "@/components/ui/client/mystic-page-shell";

interface DayInfo {
  solar: string;
  lunar: string;
  event: string;
}

const Table = ({ isGood, days, month, year }: { isGood: boolean; days: DayInfo[]; month: number; year: number }) => {
  return (
    <MysticDarkPanel className="overflow-hidden p-0">
      <div className="border-b border-[#D4AF37]/20 px-5 py-4 text-center">
        <h4 className="flex items-center justify-center gap-2 text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">
          {isGood ? <CheckCircle2 size={17} className="text-[#D4AF37]" /> : <AlertTriangle size={17} className="text-[#D4AF37]" />}
          {isGood ? "Ngày đại cát" : "Ngày cần tránh"}
        </h4>
        <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-white/45">
          Tháng {month} - Năm {year}
        </p>
      </div>

      <div className="overflow-x-auto p-3 md:p-4">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#D4AF37]/15 text-[11px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
              <th className="px-2 py-3 text-center">Dương lịch</th>
              <th className="px-2 py-3 text-center">Âm lịch</th>
              <th className="px-2 py-3 text-right">{isGood ? "Việc tốt" : "Nên tránh"}</th>
            </tr>
          </thead>
          <tbody>
            {days.length > 0 ? (
              days.map((day, idx) => (
                <tr key={`${day.solar}-${idx}`} className="border-b border-[#D4AF37]/15 text-[13px] text-white/72 last:border-0 hover:bg-[#D4AF37]/10">
                  <td className="px-2 py-3 text-center font-bold text-[#F3E3BC]">{day.solar}</td>
                  <td className="px-2 py-3 text-center text-[#D4AF37]">{day.lunar}</td>
                  <td className="px-2 py-3 text-right">
                    <span className="inline-flex rounded-md border border-[#D4AF37]/25 bg-black/35 px-2 py-1 text-[12px] font-semibold text-white/75">
                      {day.event}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-2 py-8 text-center text-[13px] text-white/35">
                  Đang cập nhật...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MysticDarkPanel>
  );
};

export default function MonthlyComparison({ type }: { type: string }) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const calendarData = useMemo(() => {
    const good: DayInfo[] = [];
    const bad: DayInfo[] = [];
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    for (let d = 1; d <= daysInMonth; d += 1) {
      const solar = Solar.fromYmd(currentYear, currentMonth, d);
      const lunar = solar.getLunar();
      const dayData = {
        solar: `${d.toString().padStart(2, "0")}/${currentMonth.toString().padStart(2, "0")}`,
        lunar: `${lunar.getDay().toString().padStart(2, "0")}/${lunar.getMonth().toString().padStart(2, "0")}`,
        isAuspicious: (d + lunar.getDay()) % 7 === 0,
        isInauspicious: (d + lunar.getDay()) % 11 === 0,
        event: "",
      };

      if (dayData.isAuspicious) {
        dayData.event = type === "ket-hon" ? "Cưới hỏi" : "Khai trương";
        good.push(dayData);
      } else if (dayData.isInauspicious) {
        dayData.event = type === "dong-tho" ? "Động thổ" : "Việc lớn";
        bad.push(dayData);
      }
    }

    return { good, bad };
  }, [currentMonth, currentYear, type]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Table isGood days={calendarData.good.slice(0, 5)} month={currentMonth} year={currentYear} />
        <Table isGood={false} days={calendarData.bad.slice(0, 5)} month={currentMonth} year={currentYear} />
      </div>
    </div>
  );
}
