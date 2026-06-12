import React from "react";
import { Search, X, SlidersHorizontal } from "../icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
  onFocus?: () => void;
}

export function SearchBar({
  value,
  onChange,
  onFilterClick,
  onFocus,
}: SearchBarProps) {
  return (
    <div className="px-5 py-2">
      <div className="flex items-center gap-3">
        {/* Pill-shaped Input Container */}
        <div className="flex h-12 flex-1 items-center gap-3 rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 ring-2 ring-transparent transition-all focus-within:bg-white focus-within:ring-neutral-200 dark:focus-within:bg-zinc-950 dark:focus-within:ring-zinc-800 border border-transparent focus-within:border-zinc-200 dark:focus-within:border-zinc-800">
          <Search className="h-[18px] w-[18px] shrink-0 text-zinc-400 dark:text-zinc-500" />
          <input
            value={value}
            onChange={(event) => onChange((event.target as any).value)}
            onFocus={onFocus}
            placeholder="Tìm kiếm sản phẩm..."
            className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-medium"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="grid h-5 w-5 place-items-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        
        {/* Filter Trigger Button */}
        <button
          onClick={onFilterClick}
          className="grid h-12 w-12 place-items-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-neutral-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95"
          aria-label="Bộ lọc"
        >
          <SlidersHorizontal className="h-[18px] w-[18px] stroke-[1.8]" />
        </button>
      </div>
    </div>
  );
}
