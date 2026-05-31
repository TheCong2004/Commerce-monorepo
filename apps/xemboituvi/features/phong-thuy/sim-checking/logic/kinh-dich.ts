// Định nghĩa 8 cung bát quái
export const BAT_QUAI = ["Khôn", "Càn", "Đoài", "Ly", "Chấn", "Tốn", "Khảm", "Cấn"];

export const tinhQueDichSim = (simNumber: string) => {
  // Lấy 8 số cuối, chia thành 2 phần: 4 số đầu (Thượng quẻ), 4 số cuối (Hạ quẻ)
  const last8 = simNumber.replace(/\D/g, "").slice(-8);
  if (last8.length < 8) return null;

  const phanDau = last8.slice(0, 4);
  const phanSau = last8.slice(4, 8);

  const tongPhanDau = phanDau.split("").reduce((a, b) => a + parseInt(b), 0);
  const tongPhanSau = phanSau.split("").reduce((a, b) => a + parseInt(b), 0);

  // Công thức: Tổng % 8 (Dư 0 thì lấy số 8 - Cung Cấn)
  const thuongQueIdx = tongPhanDau % 8 || 8;
  const haQueIdx = tongPhanSau % 8 || 8;

  return {
    thuongQue: BAT_QUAI[thuongQueIdx - 1],
    haQue: BAT_QUAI[haQueIdx - 1],
    tenQue: `${BAT_QUAI[thuongQueIdx - 1]} ${BAT_QUAI[haQueIdx - 1]}`,
  };
};