export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export const tuviService = {
  getCanChiSlug: (nam: number): string => {
    const canIndex = (nam - 4) % 10;
    const chiIndex = (nam - 4) % 12;
    const can = CAN[canIndex].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const chi = CHI[chiIndex].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return `${can}-${chi}`;
  },

  generateOptions: () => ({
    days: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    months: Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
    years: Array.from({ length: 131 }, (_, i) => (2030 - i).toString()),
    hours: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")),
    minutes: Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")),
    viewYears: Array.from({ length: 11 }, (_, i) => (2020 + i).toString()),
  }),
};
