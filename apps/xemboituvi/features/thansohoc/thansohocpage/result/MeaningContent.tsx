"use client";
import React, { useState, useRef } from "react";
import { Lock, ChevronDown } from "lucide-react";
import ReportPage from "../../luan-giai/ReportPage"; 

interface MeaningContentProps {
  lifePath: number;
  dob: string;
  fullName: string;
  onUnlock: () => void; // Thêm callback này
}

export default function MeaningContent({ lifePath, dob, fullName, onUnlock }: MeaningContentProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleUnlock = () => {
    setIsUnlocked(true);
    onUnlock(); // Gọi hàm thông báo cho trang cha để hiện Sidebar
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="px-4 mb-20" ref={detailsRef}>
      <div className="relative">
        {isUnlocked ? (
          <div className="animate-in fade-in duration-700">
            <ReportPage />
          </div>
        ) : (
          <>
            <div className="text-gray-300 text-base leading-relaxed space-y-4 filter blur-[2px] opacity-50 select-none">
              <p>Người mang số chủ đạo {lifePath} thường sở hữu tiềm năng lãnh đạo bẩm sinh...</p>
              <p>Bạn sinh ra để tiên phong và dẫn dắt người khác đi đến thành công...</p>
              <p>Cuộc đời bạn là những chuỗi ngày chinh phục những đỉnh cao mới...</p>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/80 to-transparent flex flex-col items-center justify-center pt-10">
              <Lock className="w-8 h-8 text-[#ffd700] mb-3 animate-bounce" />
              <button
                onClick={handleUnlock}
                className="px-8 py-3 bg-gradient-to-r from-[#a21caf] to-[#d946ef] hover:from-[#86198f] hover:to-[#c026d3] text-white font-bold rounded-full text-lg shadow-[0_0_20px_rgba(162,28,175,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Mở Khóa Luận Giải Ngay <ChevronDown size={22} className="animate-bounce" />
              </button>
              <p className="text-gray-400 text-xs mt-3">Hoàn toàn miễn phí</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}