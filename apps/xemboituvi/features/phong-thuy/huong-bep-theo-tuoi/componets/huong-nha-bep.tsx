"use client";

import FengShuiLookupShell from "@/features/phong-thuy/components/FengShuiLookupShell";
import { useKitchenFengShui } from "../logic/useKitchenFengShui";
import { KitchenResultView } from "./KitchenResultView";

export default function HuongBepTheoTuoi() {
  const { formData, setFormData, result, handleSearch } = useKitchenFengShui();

  return (
    <FengShuiLookupShell
      title="Hướng bếp theo tuổi"
      subtitle="Tra cứu hướng bếp, vị trí đặt bếp và các điểm cần tránh theo tuổi gia chủ."
      menuItems={["Vị trí đặt bếp", "Hướng nhìn của bếp", "Tọa hung hướng cát", "Đại kỵ thủy hỏa", "Màu sắc nhà bếp"]}
      formData={formData}
      setFormData={setFormData}
      onSearch={handleSearch}
      result={result ? <KitchenResultView result={result} namSinh={formData.namSinh} /> : null}
    />
  );
}
