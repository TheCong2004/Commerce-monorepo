"use client";
import { Navbar } from "@/components/ui/client";
import FadeIn from "@/components/ui/FadeIn";
import HeroPhongThuy from "@/features/phong-thuy/HeroPhongThuy";
import ChamDiemSim from "@/features/phong-thuy/sim-checking/components/phong-thuy-sim";


export default function SimPhongThuyPage() {
  return (
    <>

      <FadeIn direction="down">
        <HeroPhongThuy
          title="Giải Mã"
          subTitle="Chấm Điểm Sim Phong Thủy"
          desc="Khám phá bản mệnh qua 108 vì sao tinh tú."
        />
      </FadeIn>

      {/* 2. Công cụ Chấm Điểm Sim: Trượt từ dưới lên sau 0.2s.
          Giúp người dùng tập trung vào ô nhập số điện thoại sau khi đã đọc xong mô tả.
      */}
      <div className="relative z-10">
        <FadeIn direction="up" delay={0.2}>
          <ChamDiemSim />
        </FadeIn>
      </div>
    </>
  );
}