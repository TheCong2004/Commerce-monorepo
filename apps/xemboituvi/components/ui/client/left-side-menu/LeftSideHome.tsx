"use client";

interface LeftSideHomeProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LeftSideHome({ isActive, setIsActive }: LeftSideHomeProps) {
  const pathname = usePathname();
  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  return (
    <div className="z-[9999] flex items-center justify-between gap-3">
      <div
        onClick={() => setIsActive(!isActive)}
        className="w-[45px] h-[45px] rounded-full bg-[#c7a743] cursor-pointer flex items-center justify-center relative z-[10001] shadow-lg border border-gray-200"
      >
        <div
          className={`w-[50%] h-[2px] bg-white absolute ${!isActive && "top-[45%]"} transform left-1/4 -translate-y-1/2`}
          style={{
            transform: isActive ? "rotate(45deg)" : "none",
            transition: "transform 0.3s",
          }}
        />
        <div
          className={`w-[50%] h-[2px] bg-white absolute ${!isActive && "top-[55%]"} transform left-1/4 -translate-y-1/2`}
          style={{
            transform: isActive ? "rotate(-45deg)" : "none",
            transition: "transform 0.3s",
          }}
        />
      </div>
    </div>
  );
}
