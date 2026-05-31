"use client";

import React, { useEffect, useState } from "react";

export default function MysticStars() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; delay: string; duration: string; glow: string }[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Theo dõi vị trí cuộn chuột để tạo hiệu ứng hiện dần
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Tạo 100 ngôi sao
    const starArray = Array.from({ length: 100 }).map((_, i) => {
      const size = Math.random() * 3 + 1.5;
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${size}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 4 + 3}s`,
        glow: size > 3 ? "4px" : "2px",
      };
    });
    setStars(starArray);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      
      {/* 1. HÌNH BÁT QUÁI XOAY CHẬM Ở NỀN */}
      <div 
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw]"
  style={{
    backgroundImage: `url('https://res.cloudinary.com/dzkcqktcl/image/upload/v1767168905/batquai_vod403.png')`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    animation: 'spin 80s linear infinite',
    
    /* ĐÂY LÀ CHỖ CHỈNH ĐỂ NỔI LÊN: */
    opacity: 0.25, // Tăng từ 0.1 lên 0.25 để nhìn rõ hơn
    filter: `
      drop-shadow(0 0 20px rgba(212, 175, 55, 0.4)) 
      brightness(${0.8 + scrollY * 0.001}) 
      contrast(1.2)
    `, 
    // drop-shadow tạo quầng sáng vàng xung quanh các đường nét của Bát Quái
    // contrast(1.2) làm cho màu vàng kim gắt và thật hơn
  }}
></div>

      {/* 2. LỚP MÂY NEBULA (VÀNG KIM) */}
      <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] opacity-20 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)] blur-3xl"></div>

      {/* 3. MẶT TRĂNG */}
      <div className="absolute top-10 right-10 md:top-20 md:right-32 w-24 h-24 md:w-32 md:h-32">
        <div className="absolute inset-0 rounded-full bg-amber-200/20 blur-[60px] animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fffdeb] via-[#f1d382] to-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.4)]">
           <div className="absolute top-[-5%] left-[-15%] w-full h-full bg-[#050505] rounded-full"></div>
        </div>
      </div>
      
      {/* 4. CÁC NGÔI SAO */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-0 animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
            boxShadow: `0 0 ${star.glow} ${star.glow} rgba(255, 255, 255, 0.6)`,
          }}
        ></div>
      ))}

      {/* 5. SAO BĂNG */}
      <div className="absolute top-[10%] left-[-10%] w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 animate-shooting-star"></div>
    </div>
  );
}