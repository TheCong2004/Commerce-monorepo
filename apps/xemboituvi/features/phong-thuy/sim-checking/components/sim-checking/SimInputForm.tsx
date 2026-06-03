"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { MysticDarkPanel } from "@/components/ui/client/mystic-page-shell";

export default function SimInputForm({ onSearch }: { onSearch: (data: any) => void }) {
  const [formData, setFormData] = useState({
    sim: "",
    ngaySinh: "",
    gioSinh: "Tý",
    gioiTinh: "Nam",
  });

  return (
    <div className="grid gap-4">
      <MysticDarkPanel className="bg-black/35 p-5 md:p-6">
        <div className="mb-5 text-center">
          <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">Phong thủy sim</p>
          <h1 className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">Chấm điểm sim phong thủy</h1>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-6 text-white/65">
            Nhập số điện thoại và ngày sinh để xem điểm tổng, ngũ hành, âm dương, tổng nút và quẻ Kinh Dịch.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">Số điện thoại</span>
            <div className="flex h-11 items-center rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 focus-within:border-[#D4AF37]">
              <Search className="h-4 w-4 text-[#D4AF37]" />
              <input
                type="text"
                value={formData.sim}
                onChange={(event) => setFormData({ ...formData, sim: event.target.value })}
                className="w-full bg-transparent px-3 text-[14px] font-semibold tracking-wide text-white outline-none placeholder:text-white/35"
                placeholder="0702 180 388"
              />
            </div>
          </label>

          <div className="grid gap-3 md:grid-cols-3">
            <FieldLabel label="Ngày sinh">
              <input type="date" value={formData.ngaySinh} onChange={(event) => setFormData({ ...formData, ngaySinh: event.target.value })} className="field-input" />
            </FieldLabel>

            <FieldLabel label="Giờ sinh">
              <select value={formData.gioSinh} onChange={(event) => setFormData({ ...formData, gioSinh: event.target.value })} className="field-input">
                {["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"].map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>
            </FieldLabel>

            <FieldLabel label="Giới tính">
              <select value={formData.gioiTinh} onChange={(event) => setFormData({ ...formData, gioiTinh: event.target.value })} className="field-input">
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </FieldLabel>
          </div>

          <button onClick={() => onSearch(formData)} className="h-11 w-full rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] text-[13px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#F3E3BC]">
            Xem luận giải sim
          </button>
        </div>

        <style jsx>{`
          .field-input {
            margin-top: 0.5rem;
            height: 2.75rem;
            width: 100%;
            border-radius: 0.5rem;
            border: 1px solid rgba(212, 175, 55, 0.3);
            background: rgba(0, 0, 0, 0.45);
            padding: 0 0.75rem;
            color: white;
            font-size: 14px;
            font-weight: 600;
            outline: none;
          }
          .field-input:focus {
            border-color: #d4af37;
          }
        `}</style>
      </MysticDarkPanel>

      <MysticDarkPanel className="bg-black/35 p-5">
        <h2 className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">Kết quả gồm</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <GuideItem title="Điểm tổng" text="Tổng hợp từ quẻ dịch, tổng nút và âm dương." />
          <GuideItem title="Ngũ hành" text="Tính mệnh theo năm sinh để gợi ý sim phù hợp." />
          <GuideItem title="Quẻ Kinh Dịch" text="Giải thích ý nghĩa và lời khuyên ngắn gọn." />
          <GuideItem title="Sim gợi ý" text="Danh sách sim hợp mệnh, có giá và điểm rõ ràng." />
        </div>
      </MysticDarkPanel>
    </div>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">{label}</span>
      {children}
    </label>
  );
}

function GuideItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-[#D4AF37]/20 bg-black/25 p-3">
      <p className="text-[14px] font-bold text-[#F3E3BC]">{title}</p>
      <p className="mt-1 text-[13px] leading-5 text-white/60">{text}</p>
    </div>
  );
}
