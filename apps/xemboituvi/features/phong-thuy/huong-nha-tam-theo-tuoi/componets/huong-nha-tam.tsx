"use client";

import FengShuiLookupShell from "@/features/phong-thuy/components/FengShuiLookupShell";
import { useBathroomFengShui } from "../logic/useBathroomFengShui";
import { BathroomResultView } from "./BathroomResultView";

export default function HuongNhaTamTheoTuoi() {
  const { formData, setFormData, result, handleSearch } = useBathroomFengShui();

  return (
    <FengShuiLookupShell
      title="Hướng nhà tắm"
      subtitle="Tra cứu vị trí, hướng nhìn và các điểm cần hóa giải cho khu vực nhà tắm."
      menuItems={["Vị trí đặt", "Hướng nhìn", "Hóa giải uế khí", "Màu sắc hành thủy", "Đại kỵ nhà vệ sinh"]}
      formData={formData}
      setFormData={setFormData}
      onSearch={handleSearch}
      result={result ? <BathroomResultView result={result} namSinh={formData.namSinh} /> : null}
    />
  );
}
