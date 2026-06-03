"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Star } from "lucide-react";
import { TextReveal } from "@/components/ui";
import Link from "next/link";
import { sections } from "../data/datahome";

const iconMap = [Star, Sparkles];
const WOOD_BG_URL = "https://haycafe.vn/wp-content/uploads/2022/03/Hinh-nen-go-1.jpg";

interface FortuneHubProps {
  onlyTitle?: string;
}

export default function FortuneHub({ onlyTitle }: FortuneHubProps) {
  const [mounted, setMounted] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displaySections = onlyTitle
    ? sections.filter((s) => s.title === onlyTitle)
    : sections;

  if (!mounted) return null;

  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        <div ref={mainContentRef} className="flex-1">
          <div className="relative group/frame">
            <div className="absolute -inset-1.5 blur opacity-20 group-hover/frame:opacity-40 transition duration-1000"></div>

            <div className="relative rounded-[2rem] overflow-hidden">
              <CornerDecoration position="top-left" />
              <CornerDecoration position="top-right" />
              <CornerDecoration position="bottom-left" />
              <CornerDecoration position="bottom-right" />

              <div className="p-6 md:p-10 lg:p-12">
                {/* BANNER CHÍNH */}
                {!onlyTitle && (
                  <div
                    className="text-center mb-16 relative pt-20 pb-12 px-6 rounded-[3rem] shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_0_50px_rgba(0,0,0,0.5)] border-4 border-[#d4af37]"
                    style={{
                      backgroundImage: `url(${WOOD_BG_URL})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-[2.8rem]"></div>
                    <div className="relative z-10">
                      <TextReveal>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold papyrus text-[#ffeb3b] uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]  leading-[1.5] md:leading-[1.5]">
                          Tử Vi & Phong Thủy 2025
                        </h1>
                      </TextReveal>
                      <div className="mt-4 flex justify-center items-center gap-3">
                        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#ffeb3b]"></div>
                        <p className="text-[#f1d382] font-medium tracking-[0.3em] uppercase text-base">
                          Khai vận chiêu tài
                        </p>
                        <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#ffeb3b]"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* DANH SÁCH CÁC MỤC LỚN */}
                <div className="space-y-24">
                  {displaySections.map((section, idx) => {
                    const SectionIcon = iconMap[idx % iconMap.length];
                    return (
                      <div key={section.title} className="relative">
                        
                        {/* TIÊU ĐỀ MỤC GỖ */}
                        <div className="mb-6 flex font-semibold papyrus justify-center md:justify-start">
                          <div
                            className="inline-flex items-center gap-5 p-1 pr-8 rounded-full shadow-[5px_5px_15px_rgba(0,0,0,0.3)] border-2 border-[#d4af37] relative transition-transform hover:scale-105"
                            style={{
                              backgroundImage: `url(${WOOD_BG_URL})`,
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8b0000] to-[#4a0000] flex items-center justify-center border-2 border-[#ffd700] shadow-inner">
                              <SectionIcon className="w-7 h-7 text-[#ffd700]" />
                            </div>
                            <h2 className="text-2xl font-semibold papyrus text-[#fff8e1] uppercase tracking-wide drop-shadow-md">
                              {section.title}
                            </h2>
                          </div>
                        </div>

                        {/* PHẦN GIỚI THIỆU CHI TIẾT (MỚI THÊM) */}
                        <div className="mb-10 max-w-4xl border-l-4 border-amber-500 pl-6 py-2 bg-white/5 rounded-r-2xl backdrop-blur-sm">
                           <p className="text-[#d1cfca] text-lg leading-relaxed font-light italic">
                              {section.description}
                           </p>
                        </div>

                        {/* GRID CÁC CARD CON */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                          {section.items.map((item) => {
                            const ItemIcon = item.icon;
                            return (
                              <Link
                                href={item.url || "#"}
                                key={item.text}
                                className="group/item relative flex flex-col items-center justify-center gap-4 p-5 rounded-2xl bg-gradient-to-b from-white to-[#fdfaf1] border border-[#eaddca] shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(139,69,19,0.15)] hover:border-[#d4af37] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden min-h-[160px]"
                              >
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                  <div className="relative w-16 h-16 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#fdfaf1] rounded-2xl rotate-45 group-hover/item:rotate-180 group-hover/item:bg-[#d4af37] transition-all duration-500 border border-[#e6d0a8] group-hover/item:border-white shadow-sm"></div>
                                    <ItemIcon className="relative z-10 w-8 h-8 text-[#8b4513] group-hover/item:text-white transition-colors duration-300" />
                                  </div>

                                  <span className="text-[#3e2723] font-bold text-base text-center group-hover/item:text-[#8b4513] transition-colors duration-300 px-2 leading-tight drop-shadow-md uppercase tracking-wider">
                                    {item.text}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerDecoration({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const classes = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2 rotate-90",
    "bottom-left": "bottom-2 left-2 -rotate-90",
    "bottom-right": "bottom-2 right-2 rotate-180",
  };
  return (
    <div className={`absolute ${classes[position]} w-20 h-20 pointer-events-none z-20 opacity-40`}>
      <svg viewBox="0 0 100 100" fill="none">
        <path d="M5 5H40C25 10 10 25 10 60" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 5V40C10 25 25 10 60 10" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="8" r="4" fill="#8b0000" />
      </svg>
    </div>
  );
}