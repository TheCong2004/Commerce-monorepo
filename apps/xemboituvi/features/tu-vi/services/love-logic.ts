// Bảng quy đổi Thần số học chuẩn Pythagoras
const numerologyMap: { [key: string]: number } = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const getNamePower = (name: string): number => {
  const cleanName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
  return cleanName.split('').reduce((acc, char) => acc + (numerologyMap[char] || 0), 0);
};

const sumDate = (d: string) => d.replace(/\D/g, '').split('').reduce((a, b) => a + (parseInt(b) || 0), 0);

export const calculateLoveScore = (name1: string, date1: string, name2: string = "", date2: string = "") => {
  // CHỈ kiểm tra name1 và date1 (vì Độc thân hay Có đôi đều cần 2 cái này)
  if (!name1 || !date1) return { score: 0, message: "Thiếu thông tin cơ bản" };

  // --- TRƯỜNG HỢP 1: BÓI ĐỘC THÂN (Tìm vận đào hoa) ---
  if (!name2 || name2.trim() === "") {
    const p1 = getNamePower(name1);
    const d1 = sumDate(date1);
    const day = new Date().getDate(); // Lấy ngày hiện tại để tạo biến thiên theo ngày

    // Thuật toán vận đào hoa: (Chỉ số tên + ngày sinh + ngày hiện tại)
    const combinedSeed = p1 + d1 + day;
    const score = (combinedSeed % 41) + 59; // Ra kết quả từ 59% - 99%

    let message = "";
    if (score >= 90) message = "Vận đào hoa cực thịnh! Hãy mở lòng, người ấy đang ở rất gần bạn.";
    else if (score >= 80) message = "Sức hút của bạn đang tăng cao, nhiều vệ tinh đang chú ý đến bạn đấy.";
    else if (score >= 70) message = "Một mối quan hệ mới sắp chớm nở, hãy chăm sóc bản thân nhiều hơn.";
    else message = "Tình duyên đang chậm lại để bạn hoàn thiện chính mình trước khi gặp đúng người.";

    return { score, message };
  }

  // --- TRƯỜNG HỢP 2: BÓI CẶP ĐÔI (Khi có đủ name2) ---
  if (!date2) return { score: 0, message: "Thiếu ngày sinh người ấy" };

  const p1 = getNamePower(name1);
  const p2 = getNamePower(name2);
  const d1 = sumDate(date1);
  const d2 = sumDate(date2);

  const combinedSeed = (p1 * p2) + (d1 + d2);
  let score = (combinedSeed % 55) + 45; // Ra kết quả từ 45% - 99%

  if (name1[0]?.toLowerCase() === name2[0]?.toLowerCase()) score += 5;
  score = Math.min(score, 99);

  let message = "";
  if (score >= 90) message = "Hai bạn là 'Twin Flames' - ngọn lửa song sinh không thể tách rời!";
  else if (score >= 80) message = "Sự thấu hiểu tuyệt vời, một mối quan hệ đầy năng lượng tích cực.";
  else if (score >= 70) message = "Tình yêu bền vững dựa trên sự tôn trọng và sẻ chia.";
  else if (score >= 60) message = "Cần học cách kiềm chế cái tôi để hòa hợp hơn nhé.";
  else message = "Duyên phận đôi khi cần sự thử thách để trở nên bền chặt hơn.";

  return { score, message };
};