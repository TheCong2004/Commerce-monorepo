"use client";

import TraTuViAmLichCard from "@/features/tu-vi/components/tra-tu-vi-am-lich-card";
import IntroTuViNgay from "./profile";
import TuVisticStars from "@/features/tu-vi/components/MysticStars";
import FadeIn from "@/components/ui/FadeIn";

export default function TuViNgayPage() {
  return (
    <>
      <main className="pt-14 bg-[#050505] min-h-screen">
        {/* Nền sao huyền bí luôn chạy tĩnh phía dưới */}
        <TuVisticStars />

        <div className="relative z-10 max-w-6xl mx-auto px-4"> 
          
          {/* 1. Thẻ Tra Cứu: Hiện ra đầu tiên bằng hiệu ứng trượt nhẹ từ trên xuống */}
          <FadeIn direction="down" >
            <div className="mt-8">
              <TraTuViAmLichCard />
            </div>
          </FadeIn>

          {/* 2. Phần Giới Thiệu/Profile: Hiện ra sau 0.3s từ dưới lên
              Tạo cảm giác các thông tin chi tiết đang được trải ra
          */}
          <FadeIn direction="up" delay={0.3}>
            <div className="mt-12">
              <IntroTuViNgay />
            </div>
          </FadeIn>

        </div>
      </main>
    </>
  );
}