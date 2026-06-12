import React from "react";
import { Platform } from "../types";
import { cn } from "../helpers";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  platform?: Platform;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", platform = "web", ...props }, ref) => {
    const isMini = platform === "zalo" || platform === "telegram" || platform === "mini";
    
    const variants = {
      primary: "bg-neutral-950 text-white hover:bg-neutral-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all duration-200",
      secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
      outline: "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900",
      ghost: "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
    };
    
    const sizes = {
      sm: isMini ? "h-9 px-3.5 text-[12px] rounded-xl" : "h-8 px-3 text-xs rounded-lg",
      md: isMini ? "h-11.5 px-5 text-[13px] rounded-2xl" : "h-10 px-4 text-sm rounded-xl",
      lg: isMini ? "h-13 px-6 text-[14px] rounded-2xl" : "h-12 px-6 text-base rounded-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold tracking-wide transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
