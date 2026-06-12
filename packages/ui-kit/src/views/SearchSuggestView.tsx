import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, X, ChevronRight } from "lucide-react";
import { pageTransition } from "../helpers";

interface SearchSuggestViewProps {
  query: string;
  setQuery: (val: string) => void;
  goBack: () => void;
  navigateTo: (screen: any) => void;
}

export function SearchSuggestView({
  query,
  setQuery,
  goBack,
  navigateTo,
}: SearchSuggestViewProps) {
  return (
    <motion.div key="search-suggest" {...pageTransition} className="p-5 space-y-4">
      <header className="flex items-center gap-3">
        <button onClick={goBack} className="p-1 rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-[20px] font-bold tracking-tight">Search</h2>
      </header>

      {/* Simulated Search bar inside overlay */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 ring-2 ring-neutral-200 dark:ring-zinc-800 border border-zinc-200 dark:border-zinc-800">
          <Search className="h-[18px] w-[18px] shrink-0 text-zinc-400 dark:text-zinc-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery((e.target as any).value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                navigateTo("catalog");
              }
            }}
            placeholder="Tìm kiếm sản phẩm..."
            className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="grid h-5 w-5 place-items-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <button
          onClick={() => {
            setQuery("");
            goBack();
          }}
          className="text-xs font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          Clear
        </button>
      </div>

      {/* Suggestions list */}
      <div className="space-y-2 pt-2">
        {[
          "Wireless headphone",
          "Boat Headphones",
          "Skull Candy Neon Headphones",
          "Bluetooth JBL Headphones",
          "Micromax Headphone",
          "Iball Sports Headsets",
          "Skull Candy Wireless",
          "Apple Earpod",
          "Xiaomi Headphones"
        ].map((item) => (
          <button
            key={item}
            onClick={() => {
              setQuery(item);
              navigateTo("catalog");
            }}
            className="w-full flex items-center justify-between py-3 px-1 border-b border-zinc-100 dark:border-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 text-left"
          >
            <span>{item}</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
