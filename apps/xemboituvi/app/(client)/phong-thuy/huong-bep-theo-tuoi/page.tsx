"use client";
import FadeIn from "@/components/ui/FadeIn";
import HeroPhongThuy from "@/features/phong-thuy/HeroPhongThuy";
import HuongBepTheoTuoi from "@/features/phong-thuy/huong-bep-theo-tuoi/componets/huong-nha-bep";


export default function HuongNhaBepPage() {
  return (
    <>
      {/* 1. Phần Hero: Rơi nhẹ từ trên xuống (Direction Down) 
          giúp người dùng tập trung ngay vào tiêu đề "Giải Mã" 
      */}
      <FadeIn direction="down">
        <HeroPhongThuy
          title="Giải Mã"
          subTitle=" Phong Thủy Hướng Bếp Theo Tuổi"
          desc="Khám phá bản mệnh qua 108 vì sao tinh tú."
        />
      </FadeIn>

      {/* 2. Phần nội dung chính: Trượt từ dưới lên (Direction Up)
          Delay 0.2s để tạo nhịp điệu sau khi Hero đã hiện xong
      */}
      <div className="relative z-10">
        <FadeIn direction="up" delay={0.2}>
          <HuongBepTheoTuoi />
        </FadeIn>
      </div>
    </>
  );
}