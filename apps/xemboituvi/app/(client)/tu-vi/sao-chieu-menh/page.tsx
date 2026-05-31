"use client";

import { Navbar } from "@/components/ui/client";
import FadeIn from "@/components/ui/FadeIn";
import IntroSaoChieuMenh from "@/features/tu-vi/components/IntroSaoChieuMenh";
import TuVisticStars from "@/features/tu-vi/components/MysticStars";
import SaoChieuMenh from "@/features/tu-vi/components/SaoChieuMenhPage";

export default function SaoChieuMenhPage() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* LỚP 1: NỀN SAO (CỐ ĐỊNH) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <TuVisticStars />
      </div>

      <div className="relative z-10 flex-1 w-full pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* 1. Form Tra Cứu: Rơi nhẹ từ trên xuống
              Sử dụng scale nhẹ để tạo cảm giác khối tra cứu nổi bật trên nền sao
          */}
          <FadeIn direction="down" scale={0.95} >
            <div className="mb-16">
              <SaoChieuMenh />
            </div>
          </FadeIn>
          {/* 2. Phần Giới Thiệu: Trượt từ dưới lên sau 0.3s
              Tạo sự chuyển tiếp mượt mà khi người dùng cuộn xuống tìm hiểu thêm
          */}
          <FadeIn direction="up" delay={0.3}>
            <IntroSaoChieuMenh />
          </FadeIn>

        </div>
      </div>
    </main>
  );
}