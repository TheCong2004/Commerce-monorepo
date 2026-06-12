import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn, PROMO_SLIDES } from "../helpers";

export function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-5 py-4">
      <div className="relative h-44 w-full overflow-hidden rounded-[28px] shadow-sm">
        <AnimatePresence mode="wait">
          {PROMO_SLIDES.map((slide, index) => {
            if (index !== current) return null;
            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn("absolute inset-0 flex items-center justify-between p-6", slide.bgColor)}
              >
                <div className={cn("space-y-1.5 max-w-[55%]", slide.textColor)}>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-white/10 dark:bg-white/5 px-2.5 py-1 rounded-full backdrop-blur-md">
                    <Sparkles className="h-3 w-3 animate-pulse text-amber-300" /> Hot Offer
                  </span>
                  <h3 className="text-[20px] font-bold leading-tight select-none">
                    {slide.title}
                  </h3>
                  <p className="text-[12px] opacity-80 line-clamp-1">
                    {slide.subtitle}
                  </p>
                  <p className="text-[13px] font-extrabold tracking-wide pt-1">
                    {slide.discount}
                  </p>
                </div>
                
                <div className="relative h-36 w-28 shrink-0 rounded-2xl overflow-hidden shadow-inner rotate-3">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        <div className="absolute bottom-4 left-6 flex gap-1.5 z-10">
          {PROMO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default BannerSlider;
