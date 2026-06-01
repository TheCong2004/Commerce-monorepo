"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SimInputForm({
  onSearch,
}: {
  onSearch: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    sim: "",
    ngaySinh: "",
    gioSinh: "Tý",
    gioiTinh: "Nam",
  });

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-[#F4C76B]">Phong thủy sim</p>
          <h1 className="mt-2 text-[24px] font-bold leading-tight text-white md:text-[30px]">
            Chấm điểm sim phong thủy
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/65">
            Nhập số điện thoại và ngày sinh để xem điểm tổng, ngũ hành, âm dương, tổng nút và quẻ Kinh Dịch.
          </p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-[13px] font-semibold text-white/75">Số điện thoại</span>
              <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#0B1020] px-3 focus-within:border-[#F4C76B]">
                <Search className="h-4 w-4 text-[#F4C76B]" />
                <input
                  type="text"
                  value={formData.sim}
                  onChange={(event) => setFormData({ ...formData, sim: event.target.value })}
                  className="w-full bg-transparent px-3 py-3 text-[18px] font-bold tracking-wide text-white outline-none placeholder:text-white/25"
                  placeholder="0702 180 388"
                />
              </div>
            </label>

            <div className="grid gap-3 md:grid-cols-3">
              <FieldLabel label="Ngày sinh">
                <input
                  type="date"
                  value={formData.ngaySinh}
                  onChange={(event) => setFormData({ ...formData, ngaySinh: event.target.value })}
                  className="field-input"
                />
              </FieldLabel>

              <FieldLabel label="Giờ sinh">
                <select
                  value={formData.gioSinh}
                  onChange={(event) => setFormData({ ...formData, gioSinh: event.target.value })}
                  className="field-input"
                >
                  {["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"].map((hour) => (
                    <option key={hour}>{hour}</option>
                  ))}
                </select>
              </FieldLabel>

              <FieldLabel label="Giới tính">
                <select
                  value={formData.gioiTinh}
                  onChange={(event) => setFormData({ ...formData, gioiTinh: event.target.value })}
                  className="field-input"
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                </select>
              </FieldLabel>
            </div>

            <button
              onClick={() => onSearch(formData)}
              className="w-full rounded-xl bg-[#F4C76B] px-5 py-3 text-[14px] font-bold text-[#0B1020] hover:bg-[#D9A441]"
            >
              Xem luận giải sim
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
          <h2 className="text-[18px] font-bold text-white">Kết quả gồm</h2>
          <div className="mt-4 space-y-3">
            <GuideItem title="Điểm tổng" text="Tổng hợp từ quẻ dịch, tổng nút và âm dương." />
            <GuideItem title="Ngũ hành" text="Tính mệnh theo năm sinh để gợi ý sim phù hợp." />
            <GuideItem title="Quẻ Kinh Dịch" text="Giải thích ý nghĩa và lời khuyên ngắn gọn." />
            <GuideItem title="Sim gợi ý" text="Danh sách sim hợp mệnh, có giá và điểm rõ ràng." />
          </div>
        </aside>
      </div>

      <style jsx>{`
        .field-input {
          margin-top: 0.5rem;
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #0b1020;
          padding: 0.75rem;
          color: white;
          font-size: 14px;
          outline: none;
        }
        .field-input:focus {
          border-color: #f4c76b;
        }
      `}</style>
    </section>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-white/75">{label}</span>
      {children}
    </label>
  );
}

function GuideItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-[14px] font-semibold text-white">{title}</p>
      <p className="mt-1 text-[13px] leading-5 text-white/60">{text}</p>
    </div>
  );
}
