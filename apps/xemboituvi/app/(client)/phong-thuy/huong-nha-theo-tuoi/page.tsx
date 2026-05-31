"use client";
import FadeIn from "@/components/ui/FadeIn";
import HeroPhongThuy from "@/features/phong-thuy/HeroPhongThuy";
import HuongNhaTheoTuoi from "@/features/phong-thuy/huong-nha-theo-tuoi/componets/huong-theo-tuoi";

export default function HuongNhaTheoTuoiPage() {
  return (
    <>
      {/* 1. Phần Hero: Rơi nhẹ từ trên xuống. 
          Đây là "lời chào" đầu tiên, giúp tiêu đề Giải Mã hiện ra trang trọng.
      */}
      <FadeIn direction="down">
        <HeroPhongThuy
          title="Giải Mã"
          subTitle="Phong Thủy Hướng Nhà Theo Tuổi"
          desc="Khám phá bản mệnh qua 108 vì sao tinh tú."
        />
      </FadeIn>

      {/* 2. Công cụ tra cứu: Trượt từ dưới lên sau 0.2s.
          Hiệu ứng này tạo cảm giác các tầng lớp kiến thức đang được mở ra.
      */}
      <div className="relative z-10">
        <FadeIn direction="up" delay={0.2}>
          <HuongNhaTheoTuoi />
        </FadeIn>
      </div>
    </>
  );
}