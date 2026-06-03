export const tuviService = {
  formatSlug: (namSinh: string, gioiTinh: "Nam" | "Nữ"): string => {
    const nam = parseInt(namSinh, 10);
    const gioiTinhSlug = gioiTinh === "Nam" ? "nam" : "nu";

    return `tu-vi-2025/tu-vi-tuoi-${nam}-${gioiTinhSlug}-mang-nam-2025.html`;
  },

  validateNamSinh: (nam: string): string | null => {
    const n = parseInt(nam, 10);
    if (isNaN(n) || n < 1900 || n > 2030) {
      return "Năm sinh từ 1900 đến 2030";
    }
    return null;
  },
};
