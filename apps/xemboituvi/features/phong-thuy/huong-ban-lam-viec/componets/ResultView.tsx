import FengShuiResultView from "@/features/phong-thuy/components/FengShuiResultView";

export const ResultView = ({ result, namSinh }: { result: any; namSinh: number }) => (
  <FengShuiResultView
    title="Kết quả bàn làm việc"
    goodTitle="Hướng ngồi tốt"
    badTitle="Hướng nên tránh"
    result={result}
    namSinh={namSinh}
    note="Nên chọn hướng ngồi có điểm tựa và luồng nhìn thoáng để tăng sự ổn định, tập trung và tài lộc trong công việc."
  />
);
