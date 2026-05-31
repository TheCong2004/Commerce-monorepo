'use client';

import React from "react";
import { Compass, Star, MoveRight, User, Flame } from "lucide-react";
import { useKitchenFengShui } from "../logic/useKitchenFengShui";
import { KitchenResultView } from "./KitchenResultView";
import FadeIn from "@/components/ui/FadeIn";


export default function HuongBepTheoTuoi() {
  const { formData, setFormData, result, handleSearch } = useKitchenFengShui();

  const menuItems = [
    "Vị Trí Đặt Bếp (Tọa)",
    "Hướng Nhìn Của Bếp",
    "Quy Tắc Tọa Hung Cát",
    "Đại Kỵ Thủy Hỏa",
    "Màu Sắc Nhà Bếp"
  ];

  return (
    <main className="min-h-screen bg-[#0C0D0F] py-8 md:py-12 relative overflow-hidden font-sans">
      {/* Hiệu ứng hào quang nền đỏ (Hỏa khí) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#cc0000]/[0.05] blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 mt-12 md:mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          
          {/* CỘT TRÁI - MENU (Hiệu ứng trượt từ trái sang) */}
          <div className="hidden lg:flex flex-col gap-4 w-1/4">
            {menuItems.map((item, index) => (
              <FadeIn key={index} direction="right" delay={index * 0.1}>
                <div className="bg-[#FDFBF7] text-[#8A0000] px-6 py-4 rounded-sm text-xs font-black uppercase tracking-widest border-l-[6px] border-[#cc0000] shadow-lg transform hover:translate-x-2 transition-all cursor-pointer group">
                  <span className="group-hover:text-[#cc0000] flex items-center gap-3 transition-colors">
                    <Flame size={14} fill="#cc0000" stroke="none" /> {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CỘT GIỮA - TỜ SỚ NHẬP LIỆU (Hiệu ứng nở scale nhẹ) */}
          <div className="flex-1 max-w-2xl w-full relative">
            <FadeIn scale={0.95} direction="up">
              <div className="relative bg-[#F3E3BC] shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-x-[10px] md:border-x-[14px] border-[#E6D0A8] pt-12 pb-16 md:pt-16 md:pb-24 px-6 md:px-16 overflow-hidden border-y border-[#8A0000]/10 rounded-sm">
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
                <div className="absolute inset-3 md:inset-4 border border-[#8A0000]/10 pointer-events-none rounded-sm"></div>

                <div className="relative z-10 text-center">
                  <h1 className="text-[#8A0000] font-bold text-3xl md:text-5xl uppercase tracking-tighter mb-4 italic leading-tight">
                    Thông Tin Gia Chủ
                  </h1>
                  <p className="text-[#252525]/60 text-sm md:text-base italic mb-10 px-4 leading-relaxed">
                    Để bắt đầu hành trình khai hỏa, vui lòng cung cấp năm sinh và giới tính.
                  </p>

                  <div className="space-y-10">
                    <div className="relative text-left max-w-md mx-auto">
                      <label className="flex items-center gap-2 text-[11px] font-black text-[#8A0000] uppercase tracking-[0.2em] mb-3 ml-2">
                        <Star size={12} fill="#8A0000" /> Năm sinh (Dương lịch)
                      </label>
                      <input 
                        type="number" 
                        value={formData.namSinh || ""}
                        onChange={(e) => setFormData({...formData, namSinh: parseInt(e.target.value) || 0})}
                        className="w-full bg-[#252525]/5 border-2 border-[#8A0000]/10 rounded-2xl py-5 px-6 text-2xl font-black text-[#252525] outline-none focus:bg-white focus:border-[#8A0000] transition-all shadow-inner"
                        placeholder="Ví dụ: 1985"
                      />
                    </div>

                    <div className="max-w-md mx-auto text-left">
                      <label className="flex items-center gap-2 text-[11px] font-black text-[#8A0000] uppercase tracking-[0.2em] mb-3 ml-2">
                        <User size={14} /> Giới tính
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Nam", "Nữ"].map((g) => (
                          <button
                            key={g}
                            onClick={() => setFormData({ ...formData, gioiTinh: g })}
                            className={`flex flex-col items-center justify-center py-6 rounded-2xl border-2 transition-all font-black uppercase tracking-widest active:scale-95 ${
                              formData.gioiTinh === g ? "bg-white border-[#8A0000] text-[#8A0000] shadow-xl" : "bg-gray-100/50 border-transparent text-gray-400"
                            }`}
                          >
                            <User className="w-8 h-8 md:w-10 md:h-10 mb-2" /> {g} Mạng
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={handleSearch}
                      className="w-full py-6 bg-gradient-to-r from-[#8A0000] to-[#5D0000] text-[#FDFBF7] rounded-full text-lg font-black uppercase shadow-xl hover:translate-y-[-2px] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                      Bắt Đầu Tra Cứu <MoveRight size={20} />
                    </button>
                  </div>
                </div>
                {/* Đế cuộn tờ sớ */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[106%] h-10 md:h-14 bg-[#8A0000] rounded-full border-x-[12px] border-[#252525] shadow-2xl"></div>
              </div>
            </FadeIn>
          </div>

          {/* CỘT PHẢI - LA BÀN (Hiệu ứng hiện tại chỗ) */}
          <div className="hidden lg:flex flex-col gap-8 w-1/4 items-center">
            <FadeIn direction="left" delay={0.3}>
              <div className="w-56 h-56 border-4 border-double border-[#8A0000]/40 rounded-full flex items-center justify-center relative bg-[#FDFBF7] shadow-2xl">
                <Compass className="text-[#8A0000]/60 w-[120px] h-[120px] animate-[spin_60s_linear_infinite]" strokeWidth={0.8} />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(138,0,0,0.1)]"></div>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.5}>
              <p className="text-[#D4AF37] font-black uppercase text-[11px] tracking-[0.6em] text-center leading-[2.5]">
                TỌA HUNG HƯỚNG CÁT<br/>GIA ĐẠO HƯNG LONG
              </p>
            </FadeIn>
          </div>
        </div>

        {/* PHẦN KẾT QUẢ */}
        {result && (
          <FadeIn direction="up">
            <div className="mt-20">
              <KitchenResultView result={result} namSinh={formData.namSinh} />
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  );
}