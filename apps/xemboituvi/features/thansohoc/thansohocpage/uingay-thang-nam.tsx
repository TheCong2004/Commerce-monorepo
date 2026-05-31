"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface MysticSelectProps {
  value: string | number;
  onChange: (val: string) => void;
  options: (string | number)[];
  placeholder: string;
}

export const NgayThangNam = ({ value, onChange, options, placeholder }: MysticSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative flex-1 ${isOpen ? 'z-[100]' : 'z-10'}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1e293b]/50 border border-slate-600 text-white text-sm rounded-lg py-1.5 px-3 flex justify-between items-center transition-all duration-300 hover:border-[#D4AF37]/50 focus:border-[#D4AF37] outline-none"
      >
        <span className={value ? "text-white" : "text-slate-400"}>
          {value ? (placeholder === "Tháng" ? `Tháng ${value}` : value) : placeholder}
        </span>
        {/* Xoay icon ngược lại khi mở để chỉ hướng lên trên */}
        <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
      </button>

      {/* DANH SÁCH BUNG LÊN TRÊN: Thay đổi mt-1 thành mb-1 và top-full thành bottom-full */}
      {isOpen && (
        <div className="absolute left-0 right-0 bottom-full mb-1 min-w-full bg-[#0F172A] border border-[#D4AF37]/40 rounded-xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-[999] backdrop-blur-xl max-h-56 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="py-1">
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt.toString());
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors flex justify-between items-center
                  ${value.toString() === opt.toString() 
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-bold' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'}
                `}
              >
                {placeholder === "Tháng" ? `Tháng ${opt}` : opt}
                {value.toString() === opt.toString() && (
                   <div className="w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_5px_#D4AF37]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(212, 175, 55, 0.4); 
          border-radius: 10px; 
        }
      `}</style>
    </div>
  );
};