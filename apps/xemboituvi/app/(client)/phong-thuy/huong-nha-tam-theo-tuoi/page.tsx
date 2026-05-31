"use client";
import FadeIn from "@/components/ui/FadeIn";
import HeroPhongThuy from "@/features/phong-thuy/HeroPhongThuy";
import HuongNhaTamTheoTuoi from "@/features/phong-thuy/huong-nha-tam-theo-tuoi/componets/huong-nha-tam";


export default function HuongNhaTamTheoTuoiPage() {
  return (
    <>
      {/* 1. Phần Hero: Rơi từ trên xuống, hiện ngay lập tức để giữ chân người dùng */}
      <FadeIn direction="down">
        <HeroPhongThuy
          title="Giải Mã"
          subTitle="Phong Thủy Hướng Nhà Theo Tuổi"
          desc="Khám phá bản mệnh qua 108 vì sao tinh tú."
        />
      </FadeIn>

      {/* 2. Nội dung chính: Trượt từ dưới lên sau 0.2s 
          Giúp người dùng không bị "ngộp" thông tin khi vừa vào trang
      */}
      <div className="relative z-10">
        <FadeIn direction="up" delay={0.2}>
          <HuongNhaTamTheoTuoi />
        </FadeIn>
      </div>
    </>
  );
}