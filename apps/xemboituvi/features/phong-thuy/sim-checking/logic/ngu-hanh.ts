export const NGU_HANH_MAP: Record<string, string[]> = {
  KIM: ["THO", "KIM"],    // Thổ sinh Kim
  MOC: ["THUY", "MOC"],   // Thủy sinh Mộc
  THUY: ["KIM", "THUY"],  // Kim sinh Thủy
  HOA: ["MOC", "HOA"],    // Mộc sinh Hỏa
  THO: ["HOA", "THO"],    // Hỏa sinh Thổ
};

export const tinhNguHanhTuoi = (year: number): string => {
  const can = year % 10;
  const chi = year % 12;
  const canMap: any = { 4: 1, 5: 1, 6: 2, 7: 2, 8: 3, 9: 3, 0: 4, 1: 4, 2: 5, 3: 5 };
  const chiMap: any = { 4: 0, 5: 0, 10: 0, 11: 0, 6: 1, 7: 1, 0: 1, 1: 1, 8: 2, 9: 2, 2: 2, 3: 2 };
  const sum = (canMap[can] || 0) + (chiMap[chi] || 0);
  const res = sum > 5 ? sum - 5 : sum;
  const result: any = { 1: "KIM", 2: "THUY", 3: "HOA", 4: "THO", 5: "MOC" };
  return result[res] || "KIM";
};