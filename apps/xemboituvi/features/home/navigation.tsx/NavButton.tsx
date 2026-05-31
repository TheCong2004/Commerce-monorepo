"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavButton({ btn, x, y, index, isOpen, isSystemPaused, onToggle }: any) {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const mobileX = index % 2 === 0 ? -110 : 110;
    const mobileY = Math.floor(index / 2) * 75 - 180;

    const handleButtonClick = () => {
        if (btn.children && btn.children.length > 0) {
            onToggle(btn.id);
        } else {
            router.push(btn.href);
        }
    };

    return (
        <motion.div
            className="absolute pointer-events-auto"
            initial={false}
            style={{ left: "50%", top: "50%" }}
            animate={{
                x: isOpen ? 0 : (isMobile ? mobileX : x),
                y: isOpen ? -120 : (isMobile ? mobileY : y),
                translateX: "-50%",
                translateY: "-20%",
                zIndex: isOpen ? 100 : 10,
                scale: isMobile ? 0.9 : 1,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            {/* Vòng quay của Button */}
            <motion.div
                animate={{
                    rotate: (isSystemPaused || isMobile || isOpen) ? 0 : -360
                }}
                transition={
                    (isSystemPaused || isMobile || isOpen)
                        ? { duration: 0.5, ease: "easeOut" }
                        : { duration: 60, repeat: Infinity, ease: "linear" }
                }
            >
                <button
                    onClick={handleButtonClick}
                    className={`
                        px-7 py-3 rounded-full
                        /* Viền vàng đồng mờ */
                        border border-[#D4AF37]/40
                        /* Nền kính mờ Glassmorphism */
                        bg-black/40 backdrop-blur-md
                        text-[#F3E3BC] 
                        /* Đổ bóng phát sáng vàng */
                        shadow-[0_0_15px_rgba(212,175,55,0.2),inset_0_0_10px_rgba(212,175,55,0.1)]
                        transition-all duration-500 ease-out
                        whitespace-nowrap uppercase tracking-[0.15em] font-bold
                        hover:border-[#D4AF37]
                        hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]
                        hover:text-white
                        ${
                            isOpen
                                ? "opacity-0 invisible scale-50"
                                : "opacity-100 visible text-[10px] md:text-xs papyrus"
                        }
                    `}
                >
                    {btn.label}
                </button>
            </motion.div>

            {/* Modal Submenu (Phần này sẽ khớp với Golden Frame của bạn) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
                        className="absolute top-0 left-1/2 min-w-[280px] max-w-[95vw] 
                                   bg-black/60 backdrop-blur-2xl
                                   border border-[#D4AF37]/50 rounded-2xl 
                                   shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] 
                                   overflow-hidden"
                    >
                        {/* Header của Popup */}
                        <div 
                            className="bg-gradient-to-r from-[#D4AF37]/80 via-[#F3E3BC] to-[#D4AF37]/80 
                                       text-black font-black p-3 text-center cursor-pointer papyrus 
                                       flex justify-between px-5 items-center shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggle(null);
                            }}
                        >
                            <span className="text-[10px] bg-black/10 w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/30 transition-colors">✕</span>
                            <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase italic">{btn.label}</span>
                            <span className="w-5"></span>
                        </div>

                        {/* List danh sách con */}
                        <ul className="max-h-[50vh] overflow-y-auto custom-scrollbar p-2">
                            {btn.children?.map((sub: any, idx: number) => (
                                <li key={idx} className="mb-1 last:mb-0">
                                    <Link
                                        href={sub.href}
                                        className="block px-6 py-4 text-xs md:text-sm text-white/70 
                                                   hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] 
                                                   transition-all duration-300 rounded-xl 
                                                   border-b border-white/5 group flex justify-between items-center"
                                    >
                                        <span className="tracking-widest uppercase font-medium">{sub.label}</span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 text-[#D4AF37]">✦</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Tia sáng trang trí phía dưới cùng */}
                        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}