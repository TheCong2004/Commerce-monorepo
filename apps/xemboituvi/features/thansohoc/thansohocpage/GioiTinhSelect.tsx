"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface GioiTinhProps {
  gender: string;
  setGender: (val: string) => void;
}

export const GioiTinhSelect = ({ gender, setGender }: GioiTinhProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: 'nam', label: 'Nam', icon: '♂', color: 'text-blue-400' },
    { value: 'nu', label: 'Nữ', icon: '♀', color: 'text-pink-400' },
    { value: 'khac', label: 'Khác', icon: '?', color: 'text-gray-400' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === gender) || options[0];

  return (
    <div className={`relative flex-1 ${isOpen ? 'z-[100]' : 'z-10'}`} ref={containerRef}>
      <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide mb-1 ml-1">
        Giới tính
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#1e293b]/50 border border-slate-600 text-white text-sm rounded-lg py-1.5 px-3 pl-9 flex justify-between items-center transition-all duration-300 hover:border-[#D4AF37]/50 focus:border-[#D4AF37] outline-none"
        >
          {/* Icon hiển thị ở ô chính */}
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className={`${selectedOption.color} text-xs font-bold`}>{selectedOption.icon}</span>
          </div>
          
          <span className="text-white">{selectedOption.label}</span>
          <ChevronDown size={12} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
        </button>

        {/* BẢNG CHỌN BUNG LÊN TRÊN */}
        {isOpen && (
          <div className="absolute left-0 right-0 bottom-full mb-1 min-w-full bg-[#0F172A] border border-[#D4AF37]/40 rounded-xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-[999] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200 overflow-hidden">
            <div className="py-1">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setGender(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-3
                    ${gender === opt.value 
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-bold' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <span className={`${opt.color} text-xs w-4`}>{opt.icon}</span>
                  {opt.label}
                  {gender === opt.value && (
                    <div className="ml-auto w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_5px_#D4AF37]"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};