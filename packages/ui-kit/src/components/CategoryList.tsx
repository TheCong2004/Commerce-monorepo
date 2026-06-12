import React from "react";
import { motion } from "framer-motion";
import { cn, CATEGORIES } from "../helpers";

interface CategoryListProps {
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryList({ selected, onChange }: CategoryListProps) {
  return (
    <section className="py-2">
      <div className="flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] no-scrollbar">
        {CATEGORIES.map((category) => {
          const active = selected === category;
          return (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(category)}
              className={cn(
                "h-9 px-4 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap shadow-sm border",
                active
                  ? "bg-neutral-950 text-white border-neutral-950 dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 font-bold"
                  : "bg-zinc-50 text-zinc-600 border-zinc-200/50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:text-zinc-300 dark:border-zinc-800"
              )}
            >
              {category}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
