"use client";

import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";

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

  const leftItems = [
    "Sim thăng quan tiến chức",
    "Sim phong thủy tài lộc",
    "Sim kích gia đạo tình duyên",
    "Sim hóa giải vận hạn",
    "Chấm điểm sim phong thủy",
  ];
  const rightItems = [
    "Sim hợp mệnh Kim",
    "Sim hợp mệnh Mộc",
    "Sim hợp mệnh Thủy",
    "Sim hợp mệnh Hỏa",
    "Sim hợp mệnh Thổ",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-12">
      <div className="flex flex-row gap-6 items-center justify-center">
        {/* Cột trái - Chỉ hiện trên máy tính */}
        <div className="hidden lg:flex flex-col gap-3 w-1/4">
          {leftItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] text-[#d4af37] px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-tighter border-l-4 border-[#d4af37] shadow-md transform hover:translate-x-2 transition-transform cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
        {/* Cột giữa - TỜ SỚ NÂNG CẤP */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative bg-[#f4e4bc] shadow-2xl border-x-[10px] border-[#e6d0a8] pt-12 pb-16 px-6 md:px-12 overflow-hidden">
            {/* Vân giấy chìm */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
            {/* Viền nội bộ (Inner Border) */}
            <div className="absolute inset-3 border-2 border-[#8b4513]/20 pointer-events-none rounded-sm"></div>
            <div className="relative z-10">
              <h2
                className="text-[#8b0000] font-semibold papyrus text-2xl md:text-4xl font-black text-center mb-8 uppercase tracking-tighter italic"
                style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.5)" }}
              >
                Chấm Điểm Phong Thủy
              </h2>

              <div className="relative group p-4">
                {/* Bốn hoa văn góc cho khung nhập liệu */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#8b4513]/40"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#8b4513]/40"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#8b4513]/40"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#8b4513]/40"></div>

                <p className="text-[10px] font-bold text-[#8b4513]/60 uppercase tracking-[0.2em] mb-2 text-center">
                  Nhập số điện thoại
                </p>
                <div className="flex items-center bg-white/40 border-b-2 border-[#8b4513]/30 focus-within:border-[#8b0000] transition-colors overflow-hidden px-4 shadow-inner">
                  <input
                    type="text"
                    value={formData.sim}
                    onChange={(e) =>
                      setFormData({ ...formData, sim: e.target.value })
                    }
                    className="w-full bg-transparent p-3 text-lg md:text-2xl font-sans font-bold text-center text-[#3e2723] outline-none tracking-widest"
                    placeholder="0XXX XXX XXX"
                  />
                </div>

                {/* Ngày sinh & Giờ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#8b4513]/60 uppercase tracking-[0.2em] mb-1">
                      Ngày sinh
                    </p>
                    <input
                      type="date"
                      value={formData.ngaySinh}
                      onChange={(e) =>
                        setFormData({ ...formData, ngaySinh: e.target.value })
                      }
                      className="w-full bg-white/40 border border-[#8b4513]/20 p-2 rounded outline-none focus:border-[#8b0000] font-bold text-[#3e2723]"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#8b4513]/60 uppercase tracking-[0.2em] mb-1">
                      Giờ sinh
                    </p>
                    <select className="w-full bg-white/40 border border-[#8b4513]/20 p-2 rounded outline-none font-bold text-[#3e2723]">
                      <option>Giờ Tý (23h-01h)</option>
                      <option>Giờ Sửu (01h-03h)</option>
                      {/* Thêm các giờ khác ở đây */}
                    </select>
                  </div>
                </div>

                {/* Giới tính */}
                <div className="flex justify-center gap-6 py-4">
                  {["Nam", "Nữ"].map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="gioiTinh"
                        checked={formData.gioiTinh === g}
                        onChange={() =>
                          setFormData({ ...formData, gioiTinh: g as any })
                        }
                        className="hidden"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.gioiTinh === g
                            ? "border-[#8b0000] bg-[#8b0000]"
                            : "border-[#8b4513]"
                        }`}
                      >
                        {formData.gioiTinh === g && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span
                        className={`font-sans font-bold ${
                          formData.gioiTinh === g
                            ? "text-[#8b0000]"
                            : "text-[#8b4513]/70"
                        }`}
                      >
                        {g}
                      </span>
                    </label>
                  ))}
                </div>

                {/* --- KHUNG CHO NÚT BẤM ĐỎ --- */}
                <div className="relative p-2 mt-6">
                  {/* Đường diềm bao quanh nút bấm tạo hiệu ứng đóng dấu */}
                  <div className="absolute inset-0 border border-[#8b4513]/20 scale-105 rounded-full pointer-events-none"></div>

                  <button
                    onClick={() => onSearch(formData)}
                    className="w-full group relative py-4 bg-gradient-to-b from-[#cc0000] to-[#8b0000] text-[#f1d382] rounded-full text-lg font-sans font-black uppercase shadow-[0_6px_0px_#5d0000] hover:shadow-[0_4px_0px_#5d0000] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all overflow-hidden"
                  >
                    {/* Hiệu ứng ánh sáng lướt qua khi hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

                    <span className="relative z-10 flex items-center justify-center gap-2 tracking-[0.1em]">
                      Khai Vận Chiêu Tài
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trục cuộn dưới (Trang trí) */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[105%] h-10 bg-gradient-to-t from-[#8b4513] via-[#d4af37] to-[#8b4513] rounded-full shadow-2xl z-10 border-x-8 border-[#5d2e0d]"></div>
        </div>

        {/* Cột phải - Chỉ hiện trên máy tính */}
        <div className="hidden lg:flex flex-col gap-3 w-1/4">
          {rightItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] text-[#d4af37] px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-tighter border-r-4 border-[#d4af37] shadow-md transform hover:-translate-x-2 transition-transform cursor-pointer text-right"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
