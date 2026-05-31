"use client";
import React, { useState } from 'react';
import { CalendarDays, Search } from 'lucide-react';

interface Props {
  title: string; 
  onSearch: (d: string, m: string, y: string) => void;
}

export default function DateSelector({ title, onSearch }: Props) {
  const [day, setDay] = useState('29');
  const [month, setMonth] = useState('12');
  const [year, setYear] = useState('2025');

  const inputFields = [
    { label: 'Ngày', value: day, setter: setDay, placeholder: 'DD' },
    { label: 'Tháng', value: month, setter: setMonth, placeholder: 'MM' },
    { label: 'Năm', value: year, setter: setYear, placeholder: 'YYYY' },
  ];

  return (
    <div className="bg-[#FDFBF7] border-2 border-[#D4AF37] p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center mb-12 relative max-w-3xl mx-auto">
      {/* Huy hiệu Tiêu đề phía trên */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#8B0000] text-[#F3E3BC] px-8 py-2 rounded-full font-black uppercase text-sm md:text-base border-2 border-[#D4AF37] shadow-xl whitespace-nowrap tracking-widest">
        {title} NĂM 2025
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-[#8B4513]">
          <CalendarDays size={24} strokeWidth={1.5} />
          <h3 className="font-bold papyrus text-xl uppercase tracking-tighter">{title}</h3>
        </div>
        <p className="text-[#5C4033]/70 text-sm italic font-medium">Vui lòng nhập chính xác ngày tháng theo Dương Lịch</p>
        
        <div className="flex flex-wrap justify-center gap-6 mt-4 items-end w-full">
          {/* Render các ô Input */}
          <div className="flex gap-4 items-center">
            {inputFields.map((field, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-[#8B4513]/60 tracking-widest">{field.label}</label>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-16 md:w-24 bg-white border-b-2 border-[#D4AF37]/30 focus:border-[#8B0000] text-[#252525] text-2xl font-bold py-3 text-center outline-none transition-all shadow-inner rounded-t-lg"
                />
              </div>
            ))}
          </div>

          {/* Nút Tìm kiếm */}
          <button 
            onClick={() => onSearch(day, month, year)} 
            className="group flex items-center gap-2 bg-[#8B0000] hover:bg-[#5D0000] text-[#F3E3BC] font-black py-4 px-10 rounded-xl shadow-[0_5px_15px_rgba(139,0,0,0.3)] border border-[#D4AF37]/50 uppercase transition-all duration-300 active:scale-95"
          >
            <Search size={18} className="group-hover:scale-110 transition-transform" />
            <span>Xem ngay</span>
          </button>
        </div>
      </div>

      {/* Trang trí góc chìm */}
      <div className="absolute bottom-2 right-4 opacity-5 pointer-events-none">
        <CalendarDays size={80} className="text-[#8B4513]" />
      </div>
    </div>
  );
}