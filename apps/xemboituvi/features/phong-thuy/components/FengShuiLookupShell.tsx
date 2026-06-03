"use client";

import { ReactNode } from "react";
import { Compass, MoveRight, Star, User } from "lucide-react";
import { MysticGoldFrame, MysticPageShell } from "@/components/ui/client/mystic-page-shell";

interface FormData {
  namSinh: number;
  gioiTinh: string;
}

interface Props {
  title: string;
  subtitle: string;
  menuItems: string[];
  formData: FormData;
  setFormData: (value: FormData) => void;
  onSearch: () => void;
  result?: ReactNode;
}

export default function FengShuiLookupShell({
  title,
  subtitle,
  menuItems,
  formData,
  setFormData,
  onSearch,
  result,
}: Props) {
  return (
    <MysticPageShell contentClassName="mx-auto max-w-3xl px-4 pb-10 pt-14 md:pt-16">
      <MysticGoldFrame className="bg-black/40 p-5 md:p-6">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/15 text-[#D4AF37]">
            <Compass size={17} />
          </div>
          <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
            Phong thủy ứng dụng
          </p>
          <h1 className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">{title}</h1>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-6 text-white/65">{subtitle}</p>
        </div>

        <div className="mb-5 grid gap-2 md:grid-cols-2">
          {menuItems.slice(0, 4).map((item) => (
            <div
              key={item}
              className="rounded-lg border border-[#D4AF37]/35 bg-black/35 px-3 py-2 transition hover:border-[#D4AF37]/70"
            >
              <span className="flex items-center gap-2 text-[12px] font-semibold leading-5 text-white/72">
                <Star size={12} className="text-[#D4AF37]" fill="currentColor" /> {item}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-md space-y-4">
          <label className="block space-y-2">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
              <Star size={12} fill="currentColor" /> Năm sinh dương lịch
            </span>
            <input
              type="number"
              value={formData.namSinh || ""}
              onChange={(event) => setFormData({ ...formData, namSinh: parseInt(event.target.value, 10) || 0 })}
              className="h-11 w-full rounded-lg border border-[#D4AF37]/35 bg-black/45 px-3 text-[14px] font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37]"
              placeholder="Ví dụ: 1990"
            />
          </label>

          <div className="space-y-2">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
              <User size={13} /> Giới tính
            </span>
            <div className="grid grid-cols-2 gap-3">
              {["Nam", "Nữ"].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFormData({ ...formData, gioiTinh: gender })}
                  className={`h-11 rounded-lg border text-[13px] font-bold uppercase tracking-[0.12em] transition ${
                    formData.gioiTinh === gender
                      ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                      : "border-[#D4AF37]/35 bg-black/35 text-white/70 hover:border-[#D4AF37]/70"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onSearch}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] px-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#F3E3BC]"
          >
            Bắt đầu tra cứu <MoveRight size={16} />
          </button>
        </div>
      </MysticGoldFrame>

      {result && <div className="mt-5">{result}</div>}
    </MysticPageShell>
  );
}
