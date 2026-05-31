"use client";
import React, { useState, useEffect } from "react";
import NavButton from "./NavButton";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/components/ui/client/left-side-menu/nav-links";

export default function Navigation() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        // Quan trọng: Khi activeId có giá trị (đã click), rotate về 0
        animate={isMobile || activeId ? { rotate: 0 } : { rotate: 360 }}
        transition={
          isMobile || activeId 
            ? { duration: 0.5, ease: "easeOut" } // Dừng mượt trong 0.5s, KHÔNG lặp lại
            : { duration: 60, repeat: Infinity, ease: "linear" } // Xoay đều khi chờ
        }
      >
        {NAV_ITEMS.map((btn, index) => {
          let x, y;
          if (isMobile) {
            x = index % 2 === 0 ? -110 : 110;
            y = Math.floor(index / 2) * 80 - 180; 
          } else {
            const angleStep = 360 / NAV_ITEMS.length;
            const angleRad = ((index * angleStep - 90) * Math.PI) / 180; 
            const radius = 250; 
            x = Math.cos(angleRad) * radius;
            y = Math.sin(angleRad) * radius;
          }

          return (
            <NavButton 
              key={btn.id}
              index={index}
              btn={btn}
              x={x}
              y={y}
              // Truyền thêm activeId để NavButton biết toàn hệ thống đang dừng
              isSystemPaused={!!activeId}
              isOpen={activeId === btn.id} 
              onToggle={setActiveId}
            />
          );
        })}
      </motion.div>
    </div>
  );
}