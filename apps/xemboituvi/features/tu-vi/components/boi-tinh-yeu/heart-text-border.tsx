"use client";

import { motion } from "framer-motion";

interface HeartTextBorderProps {
  isMobile: boolean;
}

export default function HeartTextBorder({ isMobile }: HeartTextBorderProps) {
  // Nội dung chữ chạy quanh trái tim
  const text = isMobile
    ? "LOVE DESTINY • BÓI TÌNH YÊU • SOULMATE • ".repeat(3)
    : "LOVE DESTINY  •  BÓI TÌNH YÊU  •  SOULMATE  •  ETERNAL  •  ".repeat(4);

  // Kích thước vòng ngoài
  const size = isMobile ? 450 : 700;

  return (
    <div
      className="relative flex items-center justify-center opacity-60 pointer-events-none select-none"
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full" viewBox="0 0 500 500">
        <defs>
          {/* Định nghĩa đường dẫn hình trái tim */}
          <path
            id="heart-path-static"
            d="M250,100 C250,100 350,0 450,100 C550,200 250,400 250,400 C250,400 -50,200 50,100 C150,0 250,100 250,100 Z"
          />
        </defs>

        {/* Vẽ đường viền mờ đứt đoạn để làm khung */}
        <path
          d="M250,100 C250,100 350,0 450,100 C550,200 250,400 250,400 C250,400 -50,200 50,100 C150,0 250,100 250,100 Z"
          fill="none"
          stroke="#fda4af"
          strokeWidth="1"
          strokeDasharray="4,4"
        />

        {/* Hiển thị chữ chạy theo đường dẫn trái tim */}
     <text
  fill="#ec4899"
  fontSize={isMobile ? "15" : "16"}
  fontWeight="900"
  letterSpacing="4px"
  style={{
    textTransform: "uppercase",
    filter: "drop-shadow(0 0 6px rgba(236,72,153,0.8))",
  }}
>
  <textPath href="#heart-path-static" startOffset="0%">
    {text}
    <animate
      attributeName="startOffset"
      from="-100%"
      to="0%"
      dur={isMobile ? "30s" : "22s"}
      repeatCount="indefinite"
      calcMode="linear"
    />
  </textPath>
</text>

      </svg>
    </div>
  );
}
