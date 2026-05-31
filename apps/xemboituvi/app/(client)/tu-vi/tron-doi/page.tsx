"use client";

import { Navbar } from "@/components/ui/client";
import TuVi2025Card from "@/features/tu-vi/components/tu-vi-tron-doi";
import IntroTuViTronDoi from "./profile";
import TuVisticStars from "@/features/tu-vi/components/MysticStars";
import FadeIn from "@/components/ui/FadeIn";

export default function TuViTronDoiPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-15">
      <TuVisticStars />
      {/* LỚP PHỦ TỐI */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* NỘI DUNG */}
      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Bọc phần Card tra cứu */}
          <FadeIn direction="down">
            <TuVi2025Card />
          </FadeIn>
        </div>

        {/* Bọc phần Giới thiệu profile */}
        <FadeIn direction="up" delay={0.2}>
          <IntroTuViTronDoi />
        </FadeIn>
      </div>
    </main>
  );
}