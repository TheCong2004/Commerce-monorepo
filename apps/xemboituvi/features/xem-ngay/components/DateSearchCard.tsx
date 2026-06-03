"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MoveRight } from "lucide-react";
import { MysticDarkPanel } from "@/components/ui/client/mystic-page-shell";

interface Props {
  type: string;
  title?: string;
  subTitle: string;
}

export default function DateSearchCard({ type, title, subTitle }: Props) {
  const router = useRouter();
  const today = new Date();
  const [day, setDay] = useState(today.getDate().toString().padStart(2, "0"));
  const [month, setMonth] = useState((today.getMonth() + 1).toString().padStart(2, "0"));
  const [year, setYear] = useState(today.getFullYear().toString());

  const handleRedirect = () => {
    const slug = `xem-ngay-tot-${type}-${day.padStart(2, "0")}-thang-${month.padStart(2, "0")}-nam-${year}`;
    router.push(`/xem-ngay/${type}/${slug}`);
  };

  return (
    <div className="mx-auto my-6 w-full max-w-3xl px-4">
      <MysticDarkPanel className="p-5 md:p-6">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/15 text-[#F3E3BC]">
            <CalendarDays size={18} />
          </div>
          <h2 className="text-[14px] font-bold uppercase leading-6 tracking-[0.14em] text-[#F3E3BC]">{title}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-6 text-white/68">{subTitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Ngày", val: day, set: setDay },
            { label: "Tháng", val: month, set: setMonth },
            { label: "Năm", val: year, set: setYear },
          ].map((item) => (
            <label key={item.label} className="space-y-2 text-center">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">{item.label}</span>
              <input
                type="number"
                value={item.val}
                onChange={(event) => item.set(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#D4AF37]/25 bg-black/55 px-2 text-center text-[14px] font-semibold text-white outline-none transition focus:border-[#D4AF37]"
              />
            </label>
          ))}
        </div>

        <button
          onClick={handleRedirect}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] px-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#F3E3BC]"
        >
          <span>Xem ngay</span>
          <MoveRight size={16} />
        </button>
      </MysticDarkPanel>
    </div>
  );
}
