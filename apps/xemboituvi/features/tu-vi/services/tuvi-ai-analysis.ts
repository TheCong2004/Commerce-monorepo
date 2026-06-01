import type { TuViAiChartInput, TuViPalace } from "./tuvi-ai-chart";

const PALACE_THEMES: Record<string, string[]> = {
  "MỆNH": ["khí chất cá nhân", "cách ra quyết định", "năng lực tự chủ"],
  "PHỤ MẪU": ["nền tảng gia đình", "sự nâng đỡ của trưởng bối", "quan hệ cha mẹ"],
  "PHÚC ĐỨC": ["phúc khí dòng họ", "đời sống tinh thần", "nội lực khi gặp khó"],
  "ĐIỀN TRẠCH": ["nhà cửa đất đai", "môi trường sống", "tài sản cố định"],
  "QUAN LỘC": ["sự nghiệp", "danh vọng", "vai trò xã hội"],
  "NÔ BỘC": ["bạn bè cộng sự", "mạng lưới hỗ trợ", "quan hệ hợp tác"],
  "THIÊN DI": ["di chuyển", "cơ hội bên ngoài", "danh tiếng khi ra xã hội"],
  "TẬT ÁCH": ["sức khỏe", "áp lực tinh thần", "khả năng hồi phục"],
  "TÀI BẠCH": ["tiền bạc", "nguồn thu", "khả năng giữ tài sản"],
  "TỬ TỨC": ["con cái", "sự kế thừa", "niềm vui gia đình"],
  "PHU THÊ": ["hôn nhân", "quan hệ thân mật", "sự hòa hợp"],
  "HUYNH ĐỆ": ["anh chị em", "bạn ngang hàng", "sự tương trợ"],
};

function starNames(stars: TuViPalace["mainStars"]) {
  return stars.map((star) => `${star.name}${star.status ? ` (${star.status})` : ""}`).join(", ");
}

export function buildTuViPalaceAnalysis(input: TuViAiChartInput, palace: TuViPalace) {
  const themes = PALACE_THEMES[palace.name] || ["vận trình", "quan hệ", "nội lực"];
  const mainStars = starNames(palace.mainStars);
  const secondaryStars = [...palace.leftStars, ...palace.rightStars].map((star) => star.name).join(", ");
  const genderLabel = input.gender === "female" || input.gender === "Nữ" ? "nữ mệnh" : "nam mệnh";

  return [
    `### Tổng quan cung ${palace.name}`,
    `Với ${genderLabel} sinh năm ${input.year}, cung ${palace.name} an tại ${palace.branch} cho thấy trọng tâm nằm ở ${themes.join(", ")}. Bộ chính tinh ${mainStars || "vô chính diệu"} làm cung này có màu sắc rõ hơn về cách ứng xử và hướng phát triển.`,
    "",
    "### Điểm nổi bật",
    `- Chủ đề mạnh nhất: ${themes[0]}.`,
    `- Nhóm sao phụ cần chú ý: ${secondaryStars || "chưa có phụ tinh nổi bật"}.`,
    `- Vòng trạng thái đáy cung: ${palace.bottomLeft} - ${palace.bottomCenter} - ${palace.bottomRight}.`,
    "",
    "### Gợi ý ứng dụng",
    `Nên xem cung ${palace.name} cùng Tam Hợp và cung Đối Xứng để tránh kết luận đơn lẻ. Nếu các sao cát nằm nhiều ở nhóm phụ tinh, nên tận dụng quan hệ hỗ trợ; nếu sao áp lực xuất hiện dày, nên đi chậm và ưu tiên ổn định trước khi mở rộng.`,
  ].join("\n");
}
