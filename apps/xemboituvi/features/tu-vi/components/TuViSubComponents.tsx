import React from "react";
import { ChevronDown, Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Label = ({ text, icon }: { text: string; icon?: React.ReactNode }) => (
  <label className="ml-1 mb-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
    {icon} {text}
  </label>
);

export const GenderOption = ({ label, value, current, set, setError }: any) => (
  <button
    type="button"
    onClick={() => {
      set(value);
      setError(null);
    }}
    className={cn(
      "relative flex h-11 w-full items-center justify-center rounded-lg border px-2 text-[13px] font-bold uppercase tracking-[0.1em] transition",
      current === value
        ? "border-[#D4AF37] bg-[#D4AF37] text-black"
        : "border-[#D4AF37]/25 bg-black/35 text-white/70 hover:border-[#D4AF37]/55"
    )}
  >
    {current === value && (
      <div className="absolute right-1.5 top-1.5 text-black/70">
        <Star size={8} fill="currentColor" />
      </div>
    )}
    <span className="truncate">{label}</span>
  </button>
);

export const CustomSelect = ({ value, onChange, options, suffix = "", highlight = false }: any) => (
  <div className="relative w-full">
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "h-11 w-full cursor-pointer appearance-none rounded-lg border px-3 pr-9 text-[13px] font-semibold outline-none transition",
        highlight
          ? "border-[#D4AF37] bg-[#D4AF37]/25 text-white"
          : "border-[#D4AF37]/30 bg-black/45 text-white focus:border-[#D4AF37]"
      )}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt} className="bg-[#121218] text-white">
          {opt}
          {suffix}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/60" />
  </div>
);
