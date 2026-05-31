"use client";
import React, { useState, useEffect } from "react";

type CenterType = "number" | "icon" | "image" | "custom" | "auto-image";

interface LifePathCircleProps {
  children?: React.ReactNode;
  centerType?: CenterType;
  size?: "small" | "default" | "large";
  autoImages?: string[];
  intervalMs?: number;
}

// Component con: 3 vòng xoay nền
function RotatingOrbs() {
  return (
    <>
      {/* Vòng 1 - ngoài cùng */}
      <div
        className="absolute w-[400px] h-[400px] md:w-[420px] md:h-[420px] bg-center bg-contain bg-no-repeat animate-spin-cw"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dzkcqktcl/image/upload/v1766912322/moon-sign-outer_fqab4f.webp')" }}
      />
      {/* Vòng 2 - giữa */}
      <div
        className="absolute w-[336px] h-[332px] md:w-[320px] md:h-[320px] bg-center bg-contain bg-no-repeat animate-spin-ccw"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dzkcqktcl/image/upload/v1766912322/moon-inverse_nftmyk.webp')" }}
      />
      {/* Vòng 3 - trong cùng */}
      <div
        className="absolute w-[288px] h-[288px] md:w-[256px] md:h-[256px] bg-center bg-contain bg-no-repeat animate-spin-cw-slow"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dzkcqktcl/image/upload/v1766914992/moon-sign-inner_ir2l5d.webp')" }}
      />
    </>
  );
}

export default function LifePathCircle({
  children,
  centerType = "custom",
  size = "default",
  autoImages = [],
  intervalMs = 3000,
}: LifePathCircleProps) {
  const sizeClasses = {
    small: "w-24 h-24",
    default: "w-40 h-40 md:w-48 md:h-48",
    large: "w-52 h-52 md:w-64 md:h-64",
  }[size];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Tự động đổi ảnh nếu dùng auto-image
  useEffect(() => {
    if (centerType !== "auto-image" || autoImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % autoImages.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [centerType, autoImages, intervalMs]);

  return (
    <div className="relative flex items-center justify-center h-[460px] md:h-[560px]">
      {/* Luôn hiển thị 3 vòng xoay */}
      <RotatingOrbs />

      {/* Trung tâm tùy loại */}
      {centerType === "auto-image" && autoImages.length > 0 ? (
        <div
          className={`relative z-20 ${sizeClasses} rounded-full border-2 border-white shadow-[0_0_12px_rgba(255,255,255,0.7),0_0_24px_rgba(255,255,255,0.4)] overflow-hidden shadow-2xl`}
        >
          <img
            src={autoImages[currentImageIndex]}
            alt={`Auto Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 w-full h-full rounded-full animate-spin-cw-slow"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dzkcqktcl/image/upload/v1766955306/z7375248751148_58279cb13e2f6aa6afdbe02a856920dd_ngvgc2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      ) : (
        // 👇 ĐÂY LÀ NHÁNH MẶC ĐỊNH — HIỂN THỊ SỐ VỚI ẢNH NỀN
        <div
          className={`relative z-20 ${sizeClasses} rounded-full border-[4px] border-white/20 flex items-center justify-center shadow-2xl overflow-hidden`}
        >
          {/* 🖼️ Ảnh nền trung tâm */}
          <div
            className="absolute inset-0 w-full h-full rounded-full animate-spin-cw-slow"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dzkcqktcl/image/upload/v1766955306/z7375248751148_58279cb13e2f6aa6afdbe02a856920dd_ngvgc2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* 💫 Số phát sáng */}
          <div
            className={`font-bold z-10 ${
              size === "small" ? "text-[60px]" : size === "large" ? "text-[80px]" : "text-[80px]"
            }`}
            style={{
              lineHeight: 1,
              color: "#f9f1f6ff",
            textShadow: `
              0 0 10px rgba(240, 214, 255, 0.9),
              0 0 20px rgba(224, 176, 255, 1),
              0 0 30px rgba(231, 134, 179, 1),
              0 0 40px rgba(213, 45, 165, 1)
            `
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}