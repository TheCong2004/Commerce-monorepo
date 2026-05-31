import { tinhNguHanhTuoi } from "./sim-filter";
import { DATA_64_QUE } from "../data/data-que-dich";

export const chamDiemSim = (sim: string, formData: any) => {
  let score = 0;
  const analysis = [];
  const numbers = sim.replace(/\D/g, "");

  // --- STEP 1: XÁC ĐỊNH MỆNH NGƯỜI DÙNG ---
  const birthYear = formData.ngaySinh ? new Date(formData.ngaySinh).getFullYear() : 1990;
  const userNguHanh = tinhNguHanhTuoi(birthYear);

  // --- STEP 2: LẬP QUẺ DỊCH ĐỘNG (THUẬT TOÁN CHIA 8) ---
  // Chia 10 số thành: 5 số đầu (Quẻ Thượng), 5 số cuối (Quẻ Hạ)
  const thuongQuai = parseInt(numbers.slice(0, 5)) % 8 || 8;
  const haQuai = parseInt(numbers.slice(5, 10)) % 8 || 8;
  
  // Công thức tìm ID quẻ trong 64 quẻ Kinh Dịch
  // (ID này khớp với ID trong file data-que-dich.ts của bạn)
  const idQue = ((thuongQuai - 1) * 8) + haQuai;
  const dataQue = DATA_64_QUE[idQue] || DATA_64_QUE[1];

  // Cộng điểm dựa trên loại quẻ
  if (dataQue.loaiQue.includes("Cát")) score += 6;
  else if (dataQue.loaiQue === "Bình Hòa") score += 4;
  else score += 2;

  // --- STEP 3: TÍNH TỔNG NÚT ---
  const tongNut = numbers.split("").reduce((a, b) => a + parseInt(b), 0) % 10 || 10;
  if (tongNut >= 7) {
    score += 4;
    analysis.push(`Tổng nút của dãy số đạt ${tongNut} điểm: Thuộc cung Đại Cát, mang lại vượng khí.`);
  } else {
    score += 2;
    analysis.push(`Tổng nút là ${tongNut}: Cần chú ý bổ sung thêm các yếu tố phong thủy khác để cân bằng.`);
  }

  // --- STEP 4: PHÂN TÍCH ÂM DƯƠNG ---
  const even = numbers.split("").filter(n => parseInt(n) % 2 === 0).length;
  const odd = numbers.length - even;
  const amDuongStatus = Math.abs(even - odd) <= 2 ? "Cân bằng" : "Chênh lệch";
  analysis.push(`Tỷ lệ Âm Dương là ${even}/${odd} (${amDuongStatus}): ${
    amDuongStatus === "Cân bằng" ? "Giúp vạn vật hài hòa, ổn định." : "Năng lượng nội tại chưa thực sự ổn định."
  }`);

  return {
    totalScore: score,
    nguHanh: userNguHanh, // Truyền cho SuggestionList
    analysis: analysis,   // Truyền cho DetailedAnalysis
    detail: {             // Dữ liệu quẻ dịch thực tế
      tenQue: dataQue.tenQue,
      hanTu: dataQue.hanTu,
      yNghia: dataQue.yNghia,
      loiKhuyen: dataQue.loiKhuyen,
      loaiQue: dataQue.loaiQue
    }
  };
};