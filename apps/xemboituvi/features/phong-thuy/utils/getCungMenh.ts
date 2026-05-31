export interface Huong {
  t: string; // Tên hướng
  c: string; // Tên cung
  y: string; // Ý nghĩa
}

export interface CungMenhResult {
  cung: string;
  hanh: string;
  nhom: string;
  huongTot: Huong[];
  huongXau: Huong[];
  mauSac: string;
}

export const getCungMenh = (year: number, gender: string): CungMenhResult => {
  // 1. Tính số dư (Quái số)
  let sum = year.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  let remainder = sum % 9;
  if (remainder === 0) remainder = 9;

  let cung = "";
  const isMale = gender === "Nam";

  // 2. Tra bảng Cung Mệnh
  if (isMale) {
    const namMap: any = { 1: "Khảm", 2: "Ly", 3: "Cấn", 4: "Đoài", 5: "Càn", 6: "Khôn", 7: "Tốn", 8: "Chấn", 9: "Khôn" };
    cung = namMap[remainder];
  } else {
    const nuMap: any = { 1: "Cấn", 2: "Càn", 3: "Đoài", 4: "Cấn", 5: "Ly", 6: "Khảm", 7: "Khôn", 8: "Chấn", 9: "Tốn" };
    cung = nuMap[remainder];
  }

  const hanhMap: any = { "Khảm": "Thủy", "Ly": "Hỏa", "Chấn": "Mộc", "Tốn": "Mộc", "Càn": "Kim", "Đoài": "Kim", "Cấn": "Thổ", "Khôn": "Thổ" };
  const mauMap: any = { "Thủy": "Đen, Xanh nước", "Hỏa": "Đỏ, Hồng, Tím", "Mộc": "Xanh lá", "Kim": "Trắng, Vàng kim", "Thổ": "Vàng đất, Nâu" };
  
  const nhom = ["Khảm", "Ly", "Chấn", "Tốn"].includes(cung) ? "Đông Tứ Mệnh" : "Tây Tứ Mệnh";

  const detail: any = {
    "Đông Tứ Mệnh": {
      tot: [
        { t: "Nam", c: "Sinh Khí", y: "Phát phúc nhanh, tài lộc dồi dào" },
        { t: "Bắc", c: "Thiên Y", y: "Sức khỏe tốt, ít bệnh tật" },
        { t: "Đông Nam", c: "Diên Niên", y: "Gia đình hòa thuận, vạn sự êm ấm" },
        { t: "Đông", c: "Phục Vị", y: "Quý nhân phù trợ, thi cử may mắn" }
      ],
      xau: [
        { t: "Tây", c: "Tuyệt Mệnh", y: "Họa phá sản, bệnh tật hiểm nghèo" },
        { t: "Tây Bắc", c: "Lục Sát", y: "Thị phi, kiện tụng, rạn nứt tình cảm" },
        { t: "Tây Nam", c: "Ngũ Quỷ", y: "Mất thu nhập, tranh chấp công việc" },
        { t: "Đông Bắc", c: "Họa Hại", y: "Thất bại, không may mắn" }
      ]
    },
    "Tây Tứ Mệnh": {
      tot: [
        { t: "Tây Bắc", c: "Sinh Khí", y: "Sự nghiệp thăng tiến, vạn sự hanh thông" },
        { t: "Đông Bắc", c: "Thiên Y", y: "Gia chủ khỏe mạnh, con cháu thông minh" },
        { t: "Tây Nam", c: "Diên Niên", y: "Quan hệ gia đạo và xã hội tốt đẹp" },
        { t: "Tây", c: "Phục Vị", y: "Năng lượng bình an, tâm tính vững vàng" }
      ],
      xau: [
        { t: "Bắc", c: "Tuyệt Mệnh", y: "Cực xấu, tổn hại sức khỏe và tài sản" },
        { t: "Nam", c: "Ngũ Quỷ", y: "Tai tiếng, tiểu nhân quấy phá" },
        { t: "Đông", c: "Lục Sát", y: "Trục trặc pháp lý, tình duyên lận đận" },
        { t: "Đông Nam", c: "Họa Hại", y: "Công việc đình trệ, tiền bạc hao hụt" }
      ]
    }
  };

  return { cung, hanh: hanhMap[cung], nhom, mauSac: mauMap[hanhMap[cung]], huongTot: detail[nhom].tot, huongXau: detail[nhom].xau };
};