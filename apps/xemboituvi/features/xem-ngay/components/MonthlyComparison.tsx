"use client";

import React, { useMemo } from 'react';
import { CheckCircle2, AlertTriangle, CalendarDays } from 'lucide-react';
import { Solar, Lunar } from 'lunar-javascript';
import GoldenFrame from '@/components/ui/GoldenGlowCard';

interface DayInfo {
  solar: string;
  lunar: string;
  event: string;
}

const Table = ({ isGood, days, month, year }: { isGood: boolean; days: DayInfo[]; month: number; year: number }) => {
  return (
    <GoldenFrame>
      {/* Header của bảng: Bỏ nền đặc, dùng text và icon để phân biệt */}
      <div className="py-6 text-center border-b border-[#D4AF37]/20 relative overflow-hidden">
        <h4 className={`
          font-black tracking-[0.2em] text-xl flex items-center justify-center gap-3 uppercase papyrus
          ${isGood ? "text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" : "text-[#f87171] drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]"}
        `}>
          {isGood ? <CheckCircle2 size={28} /> : <AlertTriangle size={28} />}
          {isGood ? "Ngày Đại Cát" : "Ngày Đại Hung"}
        </h4>
        <p className="text-[11px] text-[#D4AF37]/60 uppercase tracking-[0.3em] mt-2">
          Tháng {month} — Năm {year}
        </p>
      </div>

      <div className="p-4 md:p-6">
        <table className="w-full text-left bg-black border-collapse ">
          <thead>
            <tr className="text-[#D4AF37] papyrus text-[10px] font-bold uppercase tracking-widest">
              <th className="py-4 px-2 text-center">Dương Lịch</th>
              <th className="py-4 px-2 text-center">Âm Lịch</th>
              <th className="py-4 px-2 text-right">{isGood ? "Sự Kiện Tốt" : "Nên Tránh"}</th>
            </tr>
          </thead>
        <tbody className="">
  {days.length > 0 ? (
    days.map((day, idx) => (
      <tr 
        key={idx} 
        className={`
          transition-all duration-300 group/row 
          /* Dòng chẵn có nền mờ nhẹ để tạo chiều sâu (Zebra effect) */
          ${idx % 2 === 0 ? "bg-white/[0.08]" : "bg-white/[0.08]"}
          /* Khi hover: Dòng đó sẽ sáng bừng lên và nổi bật hơn */
          hover:bg-white/[0.08] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]
        `}
      >
        {/* Dương Lịch: Font chữ trắng sáng, font dày để nổi bật */}
        <td className="py-5 px-2 font-black text-xl text-center text-white drop-shadow-sm group-hover/row:text-[#D4AF37] transition-colors">
          {day.solar}
        </td>

        {/* Âm Lịch: Làm mờ đi một chút để tôn ngày Dương lên */}
        <td className="py-5 px-2 text-sm text-[#D4AF37] italic font-medium text-center group-hover/row:text-[#D4AF37]/80">
          {day.lunar}
        </td>

        {/* Sự kiện: Badge có nền mờ rực rỡ */}
        <td className="py-5 px-4 text-right">
          <span className={`
            inline-block px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider border
            transition-all duration-500
            ${isGood 
              ? "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30 shadow-[0_0_10px_rgba(74,222,128,0.1)] group-hover/row:shadow-[0_0_15px_rgba(74,222,128,0.3)]" 
              : "bg-[#f87171]/10 text-[#f87171] border-[#f87171]/30 shadow-[0_0_10px_rgba(248,113,113,0.1)] group-hover/row:shadow-[0_0_15px_rgba(248,113,113,0.3)]"}
          `}>
            {day.event}
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={3} className="py-10 text-center text-white/20 italic">Đang cập nhật...</td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </GoldenFrame>
  );
};

export default function MonthlyComparison({ type }: { type: string }) {
  // Lấy thời gian thực từ máy chủ/máy khách
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 0-11
  const currentYear = now.getFullYear();

  // Công thức: Tự động tạo danh sách ngày dựa trên thuật toán Lunar
  const calendarData = useMemo(() => {
    const good: DayInfo[] = [];
    const bad: DayInfo[] = [];

    // Lấy số ngày trong tháng hiện tại
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const solar = Solar.fromYmd(currentYear, currentMonth, d);
      const lunar = solar.getLunar();
      
      const dayData = {
        solar: `${d.toString().padStart(2, '0')}/${currentMonth.toString().padStart(2, '0')}`,
        lunar: `${lunar.getDay().toString().padStart(2, '0')}/${lunar.getMonth().toString().padStart(2, '0')}`,
        // Ở đây bạn sẽ thay thế logic này bằng công thức xem ngày của bạn
        // Ví dụ: Ngày có trực tốt, sao tốt...
        isAuspicious: (d + lunar.getDay()) % 7 === 0, // Mock logic công thức
        isInauspicious: (d + lunar.getDay()) % 11 === 0, // Mock logic công thức
        event: "" 
      };

      if (dayData.isAuspicious) {
        dayData.event = "🏢 Khai Trương"; // Có thể gán động theo "type"
        good.push(dayData);
      } else if (dayData.isInauspicious) {
        dayData.event = "🛠️ Xây Dựng";
        bad.push(dayData);
      }
    }
    return { good, bad };
  }, [currentMonth, currentYear, type]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Table isGood={true} days={calendarData.good.slice(0, 5)} month={currentMonth} year={currentYear} />
        <Table isGood={false} days={calendarData.bad.slice(0, 5)} month={currentMonth} year={currentYear} />
      </div>
    </div>
  );
}