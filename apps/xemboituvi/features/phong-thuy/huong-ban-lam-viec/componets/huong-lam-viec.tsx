"use client";

import FengShuiLookupShell from "@/features/phong-thuy/components/FengShuiLookupShell";
import { useFengShui } from "../logic/useFengShui";
import { ResultView } from "./ResultView";

export default function HuongBanLamViec() {
  const { formData, setFormData, result, handleSearch } = useFengShui();

  return (
    <FengShuiLookupShell
      title="Hướng bàn làm việc"
      subtitle="Tra cứu hướng ngồi, vị trí bàn và gợi ý bố trí giúp công việc thuận lợi hơn."
      menuItems={["Vị trí tài lộc", "Bố trí bàn làm việc", "Vật phẩm chiêu tài", "Màu sắc trợ vận", "Hóa giải hướng xấu"]}
      formData={formData}
      setFormData={setFormData}
      onSearch={handleSearch}
      result={result ? <ResultView result={result} namSinh={formData.namSinh} /> : null}
    />
  );
}
