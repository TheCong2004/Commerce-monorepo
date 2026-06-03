import FengShuiResultView from "@/features/phong-thuy/components/FengShuiResultView";

export const AltarResultView = ({ result, namSinh }: { result: any; namSinh: number }) => (
  <FengShuiResultView
    title="Kết quả hướng bàn thờ"
    goodTitle="Tọa cát hướng cát"
    badTitle="Hướng cần tránh"
    result={result}
    namSinh={namSinh}
    note="Bàn thờ nên đặt nơi yên tĩnh, có điểm tựa vững và ưu tiên hướng cát để giữ sự trang nghiêm, ổn định cho gia đạo."
  />
);
