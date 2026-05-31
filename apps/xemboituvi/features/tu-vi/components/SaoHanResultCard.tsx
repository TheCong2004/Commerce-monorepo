"use client";

import React from "react";
import { Star, ShieldAlert, Sparkles, Gem } from "lucide-react";

interface SaoHanResultProps {
  result: any;
  namSinh: number;
}

export default function SaoHanResultCard({ result, namSinh }: SaoHanResultProps) {
  if (!result) return null;

  return (
    <div className="mt-20 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* --- Vòng tròn Sao rực rỡ --- */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* Vòng tròn quỹ đạo chuyển động */}
          <div className="absolute -inset-10 border border-dashed border-amber-500/20 rounded-full animate-[spin_40s_linear_infinite]"></div>
          
          <div className={`relative w-72 h-72 rounded-full border-[8px] flex flex-col items-center justify-center bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all ${
            result.sao.tinhChat === 'Cát' ? 'border-emerald-500/30' : result.sao.tinhChat === 'Hung' ? 'border-rose-600/30' : 'border-sky-500/30'
          }`}>
            <span className="text-[10px] uppercase text-amber-500/60 font-black tracking-[0.3em] mb-2">Sao Chiếu Mệnh</span>
            <span className={`text-5xl font-black mb-2 drop-shadow-2xl ${
              result.sao.tinhChat === 'Hung' ? 'text-rose-500' : result.sao.tinhChat === 'Cát' ? 'text-emerald-400' : 'text-sky-400'
            }`}>
              {result.sao.ten}
            </span>
            <div className="px-5 py-1 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest">
              Tuổi Mụ: {result.tuoiMu}
            </div>
          </div>
        </div>
      </div>

      {/* --- Chi tiết Sao & Hạn (2 Cột) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Sao */}
        <div className="bg-[#050505]/70 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Star size={80} />
          </div>
          <h3 className="text-amber-500 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
            <Star size={14} className="text-emerald-400" /> Chi tiết Sao {result.sao.ten}
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-white/30 text-[10px] uppercase font-bold">Tính chất:</span>
              <span className={`font-black uppercase text-sm ${result.sao.tinhChat === 'Cát' ? 'text-emerald-400' : 'text-rose-500'}`}>
                {result.sao.tinhChat}
              </span>
            </div>
            <p className="italic text-white/70 leading-relaxed border-l-2 border-amber-500/30 pl-6 text-base">
              "{result.sao.loiKhuyen}"
            </p>
          </div>
        </div>

        {/* Card Hạn */}
        <div className="bg-[#050505]/70 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldAlert size={80} />
          </div>
          <h3 className="text-amber-500 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
            <Sparkles size={14} className="text-rose-500" /> Chi tiết Hạn {result.han.ten}
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-white/30 text-[10px] uppercase font-bold">Mức độ:</span>
              <span className="font-black text-rose-400 uppercase text-sm">{result.han.mucDo}</span>
            </div>
            <p className="text-white/50 leading-relaxed text-sm">
              <strong className="text-white/80 block mb-1 uppercase text-[9px]">Hệ lụy dự báo:</strong> 
              {result.han.chiTiet}
            </p>
          </div>
        </div>
      </div>

      {/* --- Luận giải tổng hợp --- */}
      <div className="bg-[#050505]/80 backdrop-blur-2xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        <Gem className="absolute -right-10 -bottom-10 w-64 h-64 text-amber-500 opacity-5" />
        <h3 className="text-amber-500 font-black uppercase tracking-[0.3em] text-center mb-10 text-xs">Luận giải tổng quan</h3>
        <div className="relative z-10 leading-[2.2] text-justify text-lg text-white/80 font-light">
          <p className="first-letter:text-6xl first-letter:font-black first-letter:text-amber-500 first-letter:mr-4 first-letter:float-left drop-shadow-lg">
            Bước sang năm 2025, gia chủ tuổi {namSinh} bước vào tuổi {result.tuoiMu}. Năm nay bản mệnh gặp sao <span className="font-bold text-amber-400">{result.sao.ten}</span> chiếu mệnh và vướng hạn <span className="font-bold text-rose-400">{result.han.ten}</span>. 
            Đây là một năm {result.sao.tinhChat === 'Cát' ? 'nhiều cơ hội thăng tiến, quý nhân phù trợ' : 'cần nhiều sự tĩnh tâm, cẩn trọng trong mọi quyết định'}. 
          </p>
          <p className="mt-8 border-t border-white/5 pt-8 text-white/40 text-base italic">
            Về mặt ngũ hành, sao {result.sao.ten} thuộc hành {result.sao.hanh}, gia chủ nên sử dụng vật phẩm phong thủy tông màu tương sinh để hóa giải hung tinh.
          </p>
        </div>
      </div>
    </div>
  );
}