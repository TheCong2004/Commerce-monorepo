"use client";

import StarBackground from "@/components/ui/animated-background";
import FadeIn from "@/components/ui/FadeIn";
import NumerologyCard from "@/features/thansohoc/thansohocpage/NumerologyCard";
import LifePathCircle2 from "@/features/thansohoc/thansohocpage/result/LifePathCircle2";

// Mảng 5 ảnh tự động đổi
const autoImageList = [
  "https://sieuthitranhsondau.com/wp-content/uploads/2021/08/Nhung-buc-tranh-phong-thuy-dep-nhat.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKnDySlc3e1ARYtARtmDXNliBvBd-j_Ol0hw&s",
  "https://furnibuy.com/wp-content/uploads/2020/12/ten-50-buc-tranh-phong-thuy-treo-tuong-y-nghia-nhat.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAR8lAr-gYiuIqCtcd9kZCqnNBlEm0l4KPdw&s",
  "https://imgt.taimienphi.vn/cf/Images/ptx/2019/3/28/hinh-nen-phong-thuy-cho-may-tinh-14.jpg",
];

export default function Thansohoc() {
  return (
    <StarBackground>
      <div>
        {/* 1. Vòng quay Thần số học: Hiện ra bằng hiệu ứng Phóng to (Scale) 
            Tạo cảm giác vòng quay "nở" ra từ không gian sao.
        */}
        <FadeIn scale={0.8} direction="up" >
          <LifePathCircle2
            centerType="auto-image"
            size="default"
            autoImages={autoImageList}
            intervalMs={3000} // đổi mỗi 3 giây
          />
        </FadeIn>

        {/* 2. NumerologyCard: Hiện sau vòng quay 0.3s
            Trượt nhẹ từ dưới lên để thông tin hiện ra một cách thanh thoát.
        */}
        <div>
          <FadeIn direction="up" delay={0.3}>
            <NumerologyCard />
          </FadeIn>
        </div>
      </div>
    </StarBackground>
  );
}