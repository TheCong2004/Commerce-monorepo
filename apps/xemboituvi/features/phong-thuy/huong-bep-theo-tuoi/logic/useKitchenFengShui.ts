// features/phong-thuy/hooks/useKitchenFengShui.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCungMenh } from '../../utils/getCungMenh';


export const useKitchenFengShui = () => {
  const [formData, setFormData] = useState({ namSinh: 1995, gioiTinh: "Nam" });
  const [result, setResult] = useState<any>(null);

  const handleSearch = () => {
    if (!formData.namSinh || formData.namSinh < 1900 || formData.namSinh > 2026) {
      return toast.error("Vui lòng nhập năm sinh hợp lệ (1900 - 2026)!");
    }
    
    try {
      const data = getCungMenh(formData.namSinh, formData.gioiTinh);
      setResult(data);
      toast.success("Đã tìm thấy bí pháp khai hỏa!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tra cứu.");
    }
  };

  return { formData, setFormData, result, handleSearch };
};