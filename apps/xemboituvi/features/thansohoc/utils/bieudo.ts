// features/thansohoc/hooks/usePersonalYearCycle.ts
import { useMemo } from 'react';
import { reduceNumber } from './numerologyresult';//hàm tính toán cơ bản


// Hàm helper (hoặc import từ utils nếu đã có)
const getPersonalYear = (d: number, m: number, y: number) => {
  return reduceNumber(reduceNumber(d) + reduceNumber(m) + reduceNumber(y));
};

export const usePersonalYearCycle = (dob: string | null) => {
  const chartData = useMemo(() => {
    if (!dob) return [];

    // Xử lý ngày sinh: 1990-05-20 -> [1990, 5, 20]
    const parts = dob.split("-");
    if (parts.length !== 3) return []; // Validate sơ bộ
    
    const [y, m, d] = parts.map(Number);
    const currentYear = new Date().getFullYear();
    const data = [];

    // Logic 9 năm: từ năm ngoái (-1) đến 8 năm tới
    for (let i = -1; i <= 8; i++) {
      const viewYear = currentYear + i;
      const val = getPersonalYear(d, m, viewYear);
      data.push({ 
        year: viewYear.toString(), 
        value: val, 
        label: `Năm ${viewYear}` 
      });
    }
    return data;
  }, [dob]);

  return chartData;
};