'use client';

import React from 'react';
import { Compass, Star, User, MoveRight } from "lucide-react";
import { useFengShui } from '../logic/useFengShui';
import { ResultView } from './ResultView';
import FadeIn from '@/components/ui/FadeIn';

export default function HuongBanLamViec() {
  const { formData, setFormData, result, handleSearch } = useFengShui();

  const menuItems = [
    "Vị Trí Ngồi Tài Lộc", 
    "Bố Trí Bàn Làm Việc", 
    "Vật Phẩm Chiêu Tài", 
    "Màu Sắc Trợ Vận", 
    "Hóa Giải Hướng Xấu"
  ];

  return (
    <main className="min-h-screen bg-[#0C0D0F] py-8 md:py-12 relative overflow-hidden font-sans">
      {/* Hiệu ứng hào quang nền */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#D4AF37]/[0.05] blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 mt-12 md:mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          
          {/* MENU TRÁI - Hiệu ứng trượt từ trái sang lần lượt */}
          <div className="hidden lg:flex flex-col gap-4 w-1/4">
            {menuItems.map((item, idx) => (
              <FadeIn key={idx} direction="right" delay={idx * 0.1}>
                <div className="bg-[#FDFBF7] text-[#8A0000] px-6 py-4 rounded-sm text-xs font-black border-l-[6px] border-[#8A0000] shadow-lg hover:translate-x-2 transition-all cursor-pointer group">
                  <span className="flex items-center gap-3 uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">
                    <Star size={12} fill="#D4AF37" stroke="none" /> {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* FORM TRUNG TÂM (TỜ SỚ) - Hiệu ứng nở ra từ giữa */}
          <div className="flex-1 max-w-2xl w-full">
            <FadeIn scale={0.95} direction="up">
              <div className="relative bg-[#F3E3BC] shadow-[0_35px_60px_-15px_rgba(138,0,0,0.3)] border-x-[14px] border-[#E6D0A8] pt-16 pb-24 px-6 md:px-16 rounded-sm">
                <div className="text-center relative z-10">
                  <h1 className="text-[#8A0000] font-bold text-3xl md:text-5xl uppercase mb-10 italic tracking-tight">
                    Thông Tin Gia Chủ
                  </h1>
                  
                  <div className="space-y-10">
                    <div className="text-left">
                      <label className="text-[11px] font-black text-[#8A0000] uppercase tracking-[0.2em] mb-3 block flex items-center gap-2">
                        <Star size={12} fill="#8A0000" /> Năm sinh dương lịch
                      </label>
                      <input 
                        type="number" 
                        value={formData.namSinh || ""}
                        onChange={(e) => setFormData({...formData, namSinh: parseInt(e.target.value) || 0})}
                        className="w-full bg-[#252525]/5 border-2 border-[#8A0000]/10 rounded-2xl py-5 px-6 text-2xl font-black outline-none focus:bg-white focus:border-[#8A0000] transition-all"
                        placeholder="Ví dụ: 1990"
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[11px] font-black text-[#8A0000] uppercase tracking-[0.2em] mb-3 block flex items-center gap-2">
                        <User size={14} /> Giới tính bản mệnh
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Nam", "Nữ"].map((g) => (
                          <button 
                            key={g} 
                            onClick={() => setFormData({ ...formData, gioiTinh: g })}
                            className={`py-6 rounded-2xl border-2 font-black uppercase transition-all active:scale-95 ${
                              formData.gioiTinh === g 
                                ? "bg-white border-[#8A0000] text-[#8A0000] shadow-md" 
                                : "bg-gray-100/50 border-transparent text-gray-400 hover:bg-gray-200/50"
                            }`}
                          >
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

                {/* Trục cuộn của tờ sớ */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[106%] h-12 bg-[#8A0000] rounded-full border-x-[12px] border-[#252525] shadow-xl"></div>
              </div>
            </FadeIn>
          </div>

          {/* LA BÀN PHẢI - Hiệu ứng hiện hình tại chỗ */}
          <div className="hidden lg:flex w-1/4 justify-center">
            <FadeIn direction="left" delay={0.4}>
              <div className="flex flex-col items-center gap-6">
                <div className="w-56 h-56 border-4 border-double border-[#8A0000]/40 rounded-full flex items-center justify-center relative bg-[#FDFBF7] shadow-2xl">
                  <Compass size={120} className="text-[#8A0000]/60 animate-[spin_60s_linear_infinite]" strokeWidth={0.8} />
                </div>
                <p className="text-[#D4AF37] font-black uppercase text-[10px] tracking-[0.5em] text-center leading-loose">
                  THUẬN THEO PHONG THỦY<br/>CÔNG DANH TẤN TỚI
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* PHẦN KẾT QUẢ - Xuất hiện khi có dữ liệu */}
        {result && (
          <FadeIn direction="up" delay={0.2}>
            <div className="mt-20">
              <ResultView result={result} namSinh={formData.namSinh} />
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  );
}