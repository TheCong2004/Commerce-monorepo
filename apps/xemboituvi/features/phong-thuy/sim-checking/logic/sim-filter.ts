import { ALL_SIMS } from "../data/sim-database";

export const getCompatibleElements = (userElement: string) => {
  const map: Record<string, string[]> = {
    KIM: ["THO", "KIM"],    // Thổ sinh Kim
    MOC: ["THUY", "MOC"],   // Thủy sinh Mộc
    THUY: ["KIM", "THUY"],  // Kim sinh Thủy
    HOA: ["MOC", "HOA"],    // Mộc sinh Hỏa
    THO: ["HOA", "THO"],    // Hỏa sinh Thổ
  };
  return map[userElement] || ["KIM", "MOC", "THUY", "HOA", "THO"];
};

export const filterSimByElement = (userElement: string) => {
  const compatible = getCompatibleElements(userElement);
  return ALL_SIMS.filter(sim => compatible.includes(sim.nguHanh))
                 .sort((a, b) => b.score - a.score);
};

// Hàm tính Mệnh từ năm sinh
export const tinhNguHanhTuoi = (year: number): string => {
  const canMap: any = { 4: 1, 5: 1, 6: 2, 7: 2, 8: 3, 9: 3, 0: 4, 1: 4, 2: 5, 3: 5 };
  const chiMap: any = { 4: 0, 5: 0, 10: 0, 11: 0, 6: 1, 7: 1, 0: 1, 1: 1, 8: 2, 9: 2, 2: 2, 3: 2 };
  const sum = (canMap[year % 10] || 0) + (chiMap[year % 12] || 0);
  const res = sum > 5 ? sum - 5 : sum;
  const result: any = { 1: "KIM", 2: "THUY", 3: "HOA", 4: "THO", 5: "MOC" };
  return result[res] || "KIM";
};