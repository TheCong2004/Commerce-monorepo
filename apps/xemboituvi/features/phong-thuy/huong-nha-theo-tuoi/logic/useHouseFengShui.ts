// features/phong-thuy/hooks/useHouseFengShui.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCungMenh } from '../../utils/getCungMenh';


export const useHouseFengShui = () => {
  const [formData, setFormData] = useState({ namSinh: 1995, gioiTinh: "Nam" });
  const [result, setResult] = useState<any>(null);

  const handleSearch = () => {
    if (!formData.namSinh || formData.namSinh < 1900 || formData.namSinh > 2026) {
      return toast.error("Vui lòng nhập năm sinh hợp lệ (1900 - 2026)!");
    }
    
    try {
      const data = getCungMenh(formData.namSinh, formData.gioiTinh);
      setResult(data);
      toast.success("Đã tính toán thiên địa linh khí!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tra cứu.");
    }
  };

  return { formData, setFormData, result, handleSearch };
};