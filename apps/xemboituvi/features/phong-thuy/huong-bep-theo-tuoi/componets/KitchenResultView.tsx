import FengShuiResultView from "@/features/phong-thuy/components/FengShuiResultView";

export const KitchenResultView = ({ result, namSinh }: { result: any; namSinh: number }) => (
  <FengShuiResultView
    title="Kết quả hướng bếp"
    goodTitle="Hướng nhìn nên chọn"
    badTitle="Vị trí nên tọa"
    result={result}
    namSinh={namSinh}
    note="Bếp nên theo nguyên tắc tọa hung hướng cát, đặt tại vị trí xấu và nhìn về hướng tốt để cân bằng năng lượng."
  />
);
