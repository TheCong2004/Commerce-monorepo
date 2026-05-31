"use client";

import React from "react";
import WoodFrame from "../shared/WoodFrame";

export default function DetailedAnalysis({ result }: { result: any }) {
  if (!result || !result.detail) return null;

  const { totalScore, nguHanh, analysis, detail } = result;

  // CẬP NHẬT: Hàm trả về màu bệt (Solid Color) để không bị pha hay trắng màu
  const getQueColor = (loai: string) => {
    if (loai?.includes("Cát")) return "bg-[#8b0000] border-[#d4af37]"; // Đỏ đậm nguyên bản
    if (loai?.includes("Hung")) return "bg-[#1a1a1a] border-[#666666]"; // Đen nguyên bản
    return "bg-[#5d2e0d] border-[#d4af37]"; // Nâu gỗ nguyên bản
  };

  return (
    <div className="mt-12 space-y-12 max-w-4xl mx-auto font-sans animate-in fade-in duration-700">
      {/* PHẦN 1: NGŨ HÀNH & ÂM DƯƠNG */}
      <WoodFrame title="Phân Tích Ngũ Hành & Âm Dương">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          <div className="space-y-4">
            <h4 className="text-[#8b4513] font-bold text-base border-b border-[#d4af37]/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#8b4513] rotate-45"></span>
              Chi Tiết Luận Giải
            </h4>
            <ul className="space-y-4">
              {analysis && analysis.length > 0 ? (
                analysis.map((item: string, index: number) => (
                  <li key={index} className="flex gap-3 items-start text-[#3e2723]">
                    <span className="text-[#d4af37] mt-1 text-sm">✦</span>
                    <span className="leading-relaxed text-base md:text-lg">{item}</span>
                  </li>
                ))
              ) : (
                <li className="italic text-gray-500">Đang tính toán dữ liệu ngũ hành...</li>
              )}
            </ul>
          </div>

          <div className="bg-[#fdf9f0] p-6 rounded-2xl border border-[#d4c5a3] shadow-inner flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -bottom-6 -right-4 opacity-10 text-5xl pointer-events-none italic">福</div>
            
            <h5 className="text-[#8b4513] font-bold mb-3 uppercase text-[10px] tracking-[0.2em]">
              Lời khuyên bản mệnh
            </h5>
            <p className="text-[#5c3a21] leading-relaxed text-base">
              Chủ nhân thuộc mệnh <span className="font-bold text-[#8b0000] text-base uppercase underline decoration-[#d4af37]">{nguHanh || "Đang tính"}</span>. 
              Dãy số này mang năng lượng {totalScore >= 7 ? "tương sinh rất tốt" : "cần được bổ trợ thêm"} cho bản mệnh, 
              giúp hỗ trợ vượng khí và cân bằng từ trường cá nhân.
            </p>
          </div>
        </div>
      </WoodFrame>

      {/* PHẦN 2: KINH DỊCH */}
      <WoodFrame title="Luận Giải Theo Quẻ Kinh Dịch">
        <div className="flex flex-col md:flex-row items-start gap-10 p-4">
          
          {/* Đồ hình Quẻ động - ĐÃ CHỈNH MÀU BỆT */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className={`w-40 h-52 ${getQueColor(detail.loaiQue)} text-[#f1d382] flex flex-col items-center justify-between p-4 rounded-3xl border-4 shadow-2xl transform hover:scale-105 transition-transform`}>
              <div className="text-center">
                <span className="text-[9px] uppercase opacity-60 tracking-[0.3em] block mb-1">
                  Quẻ {detail.loaiQue}
                </span>
                <span className="text-lg font-black leading-tight block">
                  {detail.tenQue}
                </span>
                <span className="text-[10px] italic opacity-80">
                  {detail.hanTu}
                </span>
              </div>
              
              {/* Vẽ Hào (Tượng quẻ) */}
              <div className="flex flex-col gap-2 w-16 mb-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex justify-between items-center w-full h-1.5">
                    {/* Luôn hiển thị màu vàng kim rực rỡ trên nền bệt */}
                    <div className="h-full w-full bg-[#f1d382] rounded-full shadow-sm"></div>
                  </div>
                ))}
              </div>
              
              <div className="text-[9px] font-bold border border-[#f1d382]/30 px-2 py-0.5 rounded uppercase tracking-widest">
                Số {detail.id?.toString().padStart(2, '0') || "01"}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-5">
            <div className="flex items-center gap-3">
              <h4 className="text-xl font-black text-[#8b0000] tracking-tighter">
                Ý nghĩa quẻ: {detail.tenQue}
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${detail.loaiQue.includes('Cát') ? 'border-green-600 text-green-700 bg-green-50' : 'border-red-600 text-red-700 bg-red-50'}`}>
                {detail.loaiQue}
              </span>
            </div>
            
            <div className="text-[#3e2723] text-base leading-loose text-justify space-y-4">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#8b0000] first-letter:mr-3 first-letter:float-left">
                {detail.yNghia}
              </p>
              
              <div className="p-5 bg-white/60 border-l-4 border-[#8b0000] italic text-sm text-[#5c3a21] shadow-sm rounded-r-xl">
                <strong className="block not-italic text-[#8b4513] mb-1 uppercase text-[10px]">Lời khuyên từ cổ nhân:</strong>
                {detail.loiKhuyen}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#d4af37]/20">
              <span className="text-[10px] font-bold text-[#8b4513] bg-[#d4af37]/10 px-3 py-1 rounded-md tracking-tighter border border-[#d4af37]/20 uppercase">Tượng quẻ Hà Đồ</span>
              <span className="text-[10px] font-bold text-[#8b4513] bg-[#d4af37]/10 px-3 py-1 rounded-md tracking-tighter border border-[#d4af37]/20 uppercase">Dịch lý Việt Nam</span>
            </div>
          </div>
        </div>
      </WoodFrame>
    </div>
  );
}