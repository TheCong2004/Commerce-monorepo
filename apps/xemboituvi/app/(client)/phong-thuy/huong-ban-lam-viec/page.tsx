"use client";
import HeroPhongThuy from "@/features/phong-thuy/HeroPhongThuy";
import HuongBanLamViec from "@/features/phong-thuy/huong-ban-lam-viec/componets/huong-lam-viec";
import FadeIn from "../../../../components/ui/FadeIn";


export default function HuongBanLamViecPage() {
  return (
    <>
      {/* 1. Phần Hero: Rơi nhẹ từ trên xuống để tạo sự chú ý vào tiêu đề */}
      <FadeIn direction="down">
        <HeroPhongThuy
          title="Giải Mã"
          subTitle=" Phong Thủy Hướng Bàn Làm Việc Theo Tuổi"
          desc="Khám phá bản mệnh qua 108 vì sao tinh tú."
        />
      </FadeIn>

      {/* 2. Phần nội dung chính: Trượt từ dưới lên sau khi Hero hiện ra */}
      <div className="relative z-10">
        <FadeIn direction="up" delay={0.2}>
          <HuongBanLamViec />
        </FadeIn>
      </div>
    </>
  );
}