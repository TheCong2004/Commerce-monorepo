import FengShuiResultView from "@/features/phong-thuy/components/FengShuiResultView";

export const HouseResultView = ({ result, namSinh }: { result: any; namSinh: number }) => (
  <FengShuiResultView
    title="Kết quả hướng nhà"
    goodTitle="Hướng nhà tốt"
    badTitle="Hướng nên tránh"
    result={result}
    namSinh={namSinh}
    note="Ưu tiên các hướng Sinh Khí, Thiên Y, Diên Niên và Phục Vị để tăng sinh khí cho không gian sống."
  />
);
