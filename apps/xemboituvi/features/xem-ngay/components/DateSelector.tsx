"use client";

import { useState } from "react";
import { CalendarDays, Search } from "lucide-react";
import { MysticDarkPanel } from "@/components/ui/client/mystic-page-shell";

interface Props {
  title: string;
  onSearch: (d: string, m: string, y: string) => void;
}

export default function DateSelector({ title, onSearch }: Props) {
  const [day, setDay] = useState("29");
  const [month, setMonth] = useState("12");
  const [year, setYear] = useState("2025");

  const inputFields = [
    { label: "Ngày", value: day, setter: setDay, placeholder: "DD" },
    { label: "Tháng", value: month, setter: setMonth, placeholder: "MM" },
    { label: "Năm", value: year, setter: setYear, placeholder: "YYYY" },
  ];

  return (
    <div className="mx-auto mb-8 w-full max-w-3xl px-4">
      <MysticDarkPanel className="p-5 md:p-6">
        <div className="mb-5 flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/15 text-[#F3E3BC]">
            <CalendarDays size={17} />
          </div>
          <h3 className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">{title}</h3>
          <p className="text-[13px] leading-6 text-white/65">Nhập ngày tháng theo dương lịch</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {inputFields.map((field) => (
            <label key={field.label} className="space-y-2 text-center">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">{field.label}</span>
              <input
                type="number"
                value={field.value}
                onChange={(event) => field.setter(event.target.value)}
                placeholder={field.placeholder}
                className="h-11 w-full rounded-lg border border-[#D4AF37]/25 bg-black/55 px-2 text-center text-[14px] font-semibold text-white outline-none transition focus:border-[#D4AF37]"
              />
            </label>
          ))}
        </div>

        <button
          onClick={() => onSearch(day, month, year)}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] px-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#F3E3BC]"
        >
          <Search size={16} />
          <span>Xem ngay</span>
        </button>
      </MysticDarkPanel>
    </div>
  );
}
