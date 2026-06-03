import FengShuiResultView from "@/features/phong-thuy/components/FengShuiResultView";

export const BathroomResultView = ({ result, namSinh }: { result: any; namSinh: number }) => (
  <FengShuiResultView
    title="Kết quả hướng nhà tắm"
    goodTitle="Hướng nhìn phù hợp"
    badTitle="Vị trí nên đặt"
    result={result}
    namSinh={namSinh}
    note="Nhà tắm nên đặt tại cung xấu để giảm uế khí, đồng thời giữ thông thoáng và tránh nhìn thẳng vào khu vực sinh hoạt chính."
  />
);
