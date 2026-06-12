import React from "react";
import { cn } from "../helpers";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-zinc-100 bg-white shadow-sm dark:border-zinc-900 dark:bg-zinc-900/40 backdrop-blur-md",
        className
      )}
      {...props}
    />
  );
}
