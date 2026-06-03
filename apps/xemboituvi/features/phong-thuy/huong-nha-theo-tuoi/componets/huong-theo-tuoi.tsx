"use client";

import FengShuiLookupShell from "@/features/phong-thuy/components/FengShuiLookupShell";
import { useHouseFengShui } from "../logic/useHouseFengShui";
import { HouseResultView } from "./HouseResultView";

export default function HuongNhaTheoTuoi() {
  const { formData, setFormData, result, handleSearch } = useHouseFengShui();

  return (
    <FengShuiLookupShell
      title="Hướng nhà theo tuổi"
      subtitle="Cung cấp năm sinh và giới tính để tra cứu hướng nhà phù hợp."
      menuItems={["Hướng nhà đại cát", "Màu sắc hợp mệnh", "Hóa giải hướng xấu", "Bố trí huyền quan", "Kích thước cửa chính"]}
      formData={formData}
      setFormData={setFormData}
      onSearch={handleSearch}
      result={result ? <HouseResultView result={result} namSinh={formData.namSinh} /> : null}
    />
  );
}
