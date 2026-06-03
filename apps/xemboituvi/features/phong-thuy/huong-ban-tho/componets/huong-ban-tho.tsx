"use client";

import FengShuiLookupShell from "@/features/phong-thuy/components/FengShuiLookupShell";
import { useAltarFengShui } from "../logic/useAltarFengShui";
import { AltarResultView } from "./AltarResultView";

export default function HuongBanTho() {
  const { formData, setFormData, result, handleSearch } = useAltarFengShui();

  return (
    <FengShuiLookupShell
      title="Hướng bàn thờ"
      subtitle="Tra cứu hướng đặt bàn thờ và các lưu ý bố trí không gian thờ cúng."
      menuItems={["Vị trí đặt bàn thờ", "Tọa cát hướng cát", "Đại kỵ thờ cúng", "Kích thước lỗ ban", "Vật phẩm linh thiêng"]}
      formData={formData}
      setFormData={setFormData}
      onSearch={handleSearch}
      result={result ? <AltarResultView result={result} namSinh={formData.namSinh} /> : null}
    />
  );
}
