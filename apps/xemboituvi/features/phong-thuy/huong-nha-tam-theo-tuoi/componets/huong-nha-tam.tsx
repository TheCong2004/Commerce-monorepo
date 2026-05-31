'use client';

import React from "react";
import { Compass, Star, MoveRight, User, Flame } from "lucide-react";
import { useBathroomFengShui } from "../logic/useBathroomFengShui";
import { BathroomResultView } from "./BathroomResultView";
import FadeIn from "@/components/ui/FadeIn";


export default function HuongNhaTamTheoTuoi() {
  const { formData, setFormData, result, handleSearch } = useBathroomFengShui();

  const menuItems = [
    "Vị Trí Đặt (Tọa Hung)", 
    "Hướng Nhìn (Hướng Cát)", 
    "Hóa Giải Uế Khí", 
    "Màu Sắc Hành Thủy", 
    "Đại Kỵ Nhà Vệ Sinh"
  ];

  return (
    <main className="min-h-screen bg-[#0C0D0F] py-8 md:py-12 relative overflow-hidden font-sans">
      {/* Hiệu ứng hào quang nền xanh (Thủy khí) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#1E3A8A]/[0.08] blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 mt-12 md:mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          
          {/* MENU TRÁI - Hiệu ứng trượt lần lượt */}
          <div className="hidden lg:flex flex-col gap-4 w-1/4">
            {menuItems.map((item, idx) => (
              <FadeIn key={idx} direction="right" delay={idx * 0.1}>
                <div className="bg-[#FDFBF7] text-[#8A0000] px-6 py-4 rounded-sm text-xs font-black uppercase tracking-widest border-l-[6px] border-[#8A0000] shadow-lg hover:translate-x-2 transition-all cursor-pointer group">
                  <span className="flex items-center gap-3 group-hover:text-[#1E3A8A] transition-colors">
                    <Star size={12} fill="#8A0000" stroke="none" /> {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* FORM TRUNG TÂM (TỜ SỚ) - Hiệu ứng mở scale nhẹ */}
          <div className="flex-1 max-w-2xl w-full">
            <FadeIn scale={0.96} direction="up">
              <div className="relative bg-[#F3E3BC] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-x-[10px] md:border-x-[14px] border-[#E6D0A8] pt-12 pb-16 md:pt-16 md:pb-24 px-6 md:px-16 rounded-sm">
                <div className="relative z-10 text-center">
                  <h1 className="text-[#8A0000] font-bold text-3xl md:text-5xl uppercase mb-4 italic leading-tight tracking-tighter">
                    Thông Tin Gia Chủ
                  </h1>
                  <p className="text-[#252525]/60 text-sm md:text-base italic mb-10 leading-relaxed">
                    Vui lòng cung cấp năm sinh và giới tính để tính toán phong thủy phù hợp.
                  </p>

                  <div className="space-y-10 text-left">
                    <div className="max-w-md mx-auto">
                      <label className="flex items-center gap-2 text-[11px] font-black text-[#8A0000] uppercase tracking-[0.2em] mb-3">
                        <Star size={12} fill="#8A0000" /> Năm sinh (Dương lịch)
                      </label>
                      <input 
                        type="number" 
                        value={formData.namSinh || ""}
                        onChange={(e) => setFormData({...formData, namSinh: parseInt(e.target.value) || 0})}
                        className="w-full bg-[#252525]/5 border-2 border-[#8A0000]/10 rounded-2xl py-5 px-6 text-2xl font-black outline-none focus:bg-white focus:border-[#8A0000] transition-all shadow-inner"
                        placeholder="Ví dụ: 1995"
                      />
                    </div>

                    <div className="max-w-md mx-auto">
                      <label className="flex items-center gap-2 text-[11px] font-black text-[#8A0000] uppercase tracking-[0.2em] mb-3">
                        <User size={14} /> Giới tính
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Nam", "Nữ"].map((g) => (
                          <button 
                            key={g} 
                            onClick={() => setFormData({ ...formData, gioiTinh: g })} 
                            className={`relative py-6 rounded-2xl border-2 transition-all font-black uppercase active:scale-95 ${
                              formData.gioiTinh === g 
                                ? "bg-white border-[#8A0000] shadow-xl text-[#8A0000]" 
                                : "bg-gray-100/50 border-transparent text-gray-400 hover:bg-gray-200/50"
                            }`}
                          >
                            {formData.gioiTinh === g && <Star className="absolute top-3 right-3 text-[#8A0000]" size={10} fill="currentColor" />}
                            {g} Mạng
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

          {/* LA BÀN PHẢI - Hiệu ứng hiện tại chỗ */}
          <div className="hidden lg:flex flex-col gap-8 w-1/4 items-center">
            <FadeIn direction="left" delay={0.4}>
              <div className="w-56 h-56 border-4 border-double border-[#8A0000]/40 rounded-full flex items-center justify-center relative bg-[#FDFBF7] shadow-2xl">
                <Compass size={120} className="text-[#8A0000]/60 animate-[spin_60s_linear_infinite]" strokeWidth={0.8} />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(30,58,138,0.1)]"></div>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.6}>
              <p className="text-[#D4AF37] font-black uppercase text-[11px] tracking-[0.6em] text-center leading-[2.5]">
                TỌA HUNG TRẤN SÁT<br/>THỦY ĐÁO CÁT TƯỜNG
              </p>
            </FadeIn>
          </div>
        </div>

        {/* PHẦN KẾT QUẢ */}
        {result && (
          <FadeIn direction="up">
            <div className="mt-20">
              <BathroomResultView result={result} namSinh={formData.namSinh} />
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  );
}