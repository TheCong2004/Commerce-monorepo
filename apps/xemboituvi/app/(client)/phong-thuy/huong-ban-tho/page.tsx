"use client";
import HeroPhongThuy from "@/features/phong-thuy/HeroPhongThuy";
import HuongBanTho from "@/features/phong-thuy/huong-ban-tho/componets/huong-ban-tho";

export default function HuongBanThoPage() {
  return(
    <>
          <HeroPhongThuy
            title="Giải Mã"
            subTitle="Phong Thủy Hướng Bàn Thờ Theo Tuổi"
            desc="Khám phá bản mệnh qua 108 vì sao tinh tú."
          />
    <HuongBanTho/>
    </>
  )
}