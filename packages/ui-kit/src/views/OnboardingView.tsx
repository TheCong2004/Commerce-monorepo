import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "../icons";
import { Button } from "../components/Button";
import { cn, ONBOARDING_SLIDES, pageTransition } from "../helpers";

interface OnboardingViewProps {
  onFinish: () => void;
}

export function OnboardingView({ onFinish }: OnboardingViewProps) {
  const [slide, setSlide] = useState(0);

  const isLast = slide === ONBOARDING_SLIDES.length - 1;

  return (
    <motion.div {...pageTransition} className="absolute inset-0 z-10 bg-white dark:bg-zinc-950 flex flex-col justify-between p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white select-none">
          Shope<span className="font-extrabold text-neutral-950 dark:text-white">.</span>
        </h1>
        <button onClick={onFinish} className="text-xs font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
          Bỏ qua
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col justify-center items-center my-6">
        <div className="relative h-64 w-52 rounded-[28px] overflow-hidden shadow-lg mb-6 rotate-2">
          <img src={ONBOARDING_SLIDES[slide].image} alt="Slide image" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-white max-w-[80%] leading-tight">
          {ONBOARDING_SLIDES[slide].title}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center max-w-[85%] leading-6 mt-3">
          {ONBOARDING_SLIDES[slide].description}
        </p>
      </div>

      {/* Bottom controls */}
      <div className="flex justify-between items-center mb-6">
        {/* Indicators */}
        <div className="flex gap-1.5">
          {ONBOARDING_SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === slide ? "w-6 bg-neutral-950 dark:bg-white" : "w-1.5 bg-zinc-200 dark:bg-zinc-800"
              )}
            />
          ))}
        </div>
        
        {/* Next Button */}
        <Button
          size="md"
          className="rounded-full h-12 px-6"
          onClick={() => {
            if (isLast) onFinish();
            else setSlide((prev) => prev + 1);
          }}
        >
          {isLast ? "Bắt đầu ngay" : "Tiếp tục"}
          <ArrowRight className="ml-2 h-4 w-4 stroke-[2.2]" />
        </Button>
      </div>
    </motion.div>
  );
}
