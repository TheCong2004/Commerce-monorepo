import React from "react";
import { ChevronDown, Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Label = ({ text, icon }: { text: string; icon?: React.ReactNode }) => (
  <label className="text-[#8A0000]/80 font-black text-[10px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] ml-1 flex items-center gap-2 mb-1 font-sans">
    {icon} {text}
  </label>
);

export const GenderOption = ({ label, value, current, set, setError }: any) => (
  <button
    type="button" 
    onClick={() => { set(value); setError(null); }}
    // Sửa h-[58px] thành min-h-[48px] và bỏ tracking-widest trên mobile
    className={cn(
      "flex items-center justify-center rounded-xl border-2 transition-all duration-300 font-black text-xs md:text-sm uppercase tracking-wider md:tracking-widest relative shadow-sm min-h-[48px] md:min-h-[58px] w-full px-2",
      current === value
        ? "border-[#8A0000] bg-white text-[#8A0000] shadow-md scale-[1.02] z-10"
        : "border-[#8A0000]/10 bg-white/50 text-[#8b4513]/40 hover:border-[#8A0000]/30"
    )}
  >
    {current === value && (
      <div className="absolute top-1 right-1 bg-[#8A0000] text-white rounded-full p-0.5 shadow-sm">
        <Star size={8} fill="currentColor" />
      </div>
    )}
    <span className="truncate">{label}</span>
  </button>
);

export const CustomSelect = ({ value, onChange, options, suffix = "", highlight = false }: any) => (
  <div className="relative group w-full">
    <select
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      // Tối ưu padding cho mobile
      className={cn(
        "w-full appearance-none px-3 md:px-4 py-3 md:py-4 rounded-xl text-xs md:text-sm font-bold border-2 cursor-pointer focus:outline-none transition-all font-sans shadow-sm",
        highlight 
          ? "border-[#8A0000] bg-white text-[#8A0000]" 
          : "bg-white/50 border-[#8A0000]/10 text-[#252525] focus:border-[#8A0000]/40"
      )}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt} className="bg-[#FDFBF7] text-[#252525] font-sans">
          {opt}{suffix}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#8A0000]/30 pointer-events-none group-focus-within:text-[#8A0000] transition-colors" />
  </div>
);