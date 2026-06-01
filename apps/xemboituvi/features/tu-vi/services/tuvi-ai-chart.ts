export type TuViStarTone = "red" | "blue" | "green" | "purple" | "black" | "orange";

export type TuViStar = {
  name: string;
  tone: TuViStarTone;
  status?: "M" | "V" | "D" | "H";
};

export type TuViPalace = {
  name: string;
  branch: string;
  age: number;
  mainStars: TuViStar[];
  leftStars: TuViStar[];
  rightStars: TuViStar[];
  bottomLeft: string;
  bottomCenter: string;
  bottomRight: string;
};

export type TuViAiChartInput = {
  fullName: string;
  gender: string;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  viewYear: number;
};

export type TuViAiChart = {
  input: TuViAiChartInput;
  lunarDate: string;
  canChiYear: string;
  menh: string;
  cuc: string;
  chuMenh: string;
  chuThan: string;
  palaces: TuViPalace[];
};

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

const MAIN_STAR_SETS: TuViStar[][] = [
  [{ name: "Thiên Lương", tone: "green", status: "H" }],
  [{ name: "Thất Sát", tone: "blue", status: "M" }],
  [{ name: "Liêm Trinh", tone: "red", status: "M" }],
  [{ name: "Thái Dương", tone: "red", status: "H" }, { name: "Thái Âm", tone: "blue", status: "M" }],
  [{ name: "Vũ Khúc", tone: "blue", status: "V" }, { name: "Thiên Phủ", tone: "orange", status: "M" }],
  [{ name: "Thiên Đồng", tone: "blue", status: "M" }],
  [{ name: "Phá Quân", tone: "blue", status: "V" }],
  [{ name: "Tham Lang", tone: "blue", status: "Đ" }],
  [{ name: "Tử Vi", tone: "red", status: "V" }, { name: "Thiên Tướng", tone: "blue", status: "M" }],
  [{ name: "Thiên Cơ", tone: "green", status: "M" }, { name: "Cự Môn", tone: "blue", status: "M" }],
  [{ name: "Liêm Trinh", tone: "red", status: "M" }],
  [{ name: "Thiên Đồng", tone: "blue", status: "M" }],
];

const SIDE_STARS: TuViStar[] = [
  { name: "Hóa Khoa", tone: "red" },
  { name: "Thái Tuế", tone: "red" },
  { name: "Phượng Các", tone: "red" },
  { name: "Giải Thần", tone: "red" },
  { name: "Tả Phụ", tone: "red" },
  { name: "Thiên Hỷ", tone: "red" },
  { name: "Thiên Long", tone: "red" },
  { name: "Lộc Tồn", tone: "red" },
  { name: "Bác Sỹ", tone: "red" },
  { name: "Văn Khúc", tone: "red" },
  { name: "Thiên Tài", tone: "red" },
  { name: "Đào Hoa", tone: "red" },
  { name: "Lực Sĩ", tone: "blue" },
  { name: "Đà La", tone: "blue" },
  { name: "Thiên Thương", tone: "blue" },
  { name: "Lưu Hà", tone: "blue" },
  { name: "Thiên Hình", tone: "blue" },
  { name: "Cô Thần", tone: "blue" },
  { name: "Phục Binh", tone: "blue" },
  { name: "Thiên Sứ", tone: "blue" },
  { name: "Bạch Hổ", tone: "blue" },
  { name: "Thiên Khốc", tone: "blue" },
  { name: "Địa Võng", tone: "blue" },
  { name: "Phi Liêm", tone: "blue" },
];

const PALACE_LAYOUT = [
  { name: "QUAN LỘC", branch: "Tỵ", age: 82, bottom: ["Mão", "LÂM QUAN", "+Hỏa"] },
  { name: "NÔ BỘC", branch: "Ngọ", age: 72, bottom: ["Thìn", "QUAN ĐỚI", "+Hỏa"] },
  { name: "THIÊN DI", branch: "Mùi", age: 62, bottom: ["Tỵ", "MỘC DỤC", "+Thổ"] },
  { name: "TẬT ÁCH", branch: "Thân", age: 52, bottom: ["Ngọ", "TRƯỜNG SINH", "+Kim"] },
  { name: "ĐIỀN TRẠCH", branch: "Thìn", age: 92, bottom: ["Dần", "ĐẾ VƯỢNG", "+Thổ"] },
  { name: "TÀI BẠCH", branch: "Dậu", age: 42, bottom: ["Mùi", "DƯỠNG", "+Kim"] },
  { name: "PHÚC ĐỨC", branch: "Mão", age: 102, bottom: ["Sửu", "SUY", "+Mộc"] },
  { name: "TỬ TỨC", branch: "Tuất", age: 32, bottom: ["Thân", "THAI", "+Thổ"] },
  { name: "PHỤ MẪU", branch: "Dần", age: 112, bottom: ["Tý", "BỆNH", "+Mộc"] },
  { name: "MỆNH", branch: "Sửu", age: 2, bottom: ["Hợi", "TỬ", "+Thổ"] },
  { name: "HUYNH ĐỆ", branch: "Tý", age: 12, bottom: ["Tuất", "MỘ", "+Thủy"] },
  { name: "PHU THÊ", branch: "Hợi", age: 22, bottom: ["Dậu", "TUYỆT", "+Thủy"] },
];

function pick<T>(items: T[], index: number) {
  return items[((index % items.length) + items.length) % items.length];
}

function getCanChiYear(year: number) {
  return `${pick(CAN, year - 4)} ${pick(CHI, year - 4)}`;
}

function pseudoLunarDate(day: number, month: number) {
  const lunarDay = ((day + 4) % 30) || 30;
  const lunarMonth = ((month + 10) % 12) || 12;
  return `${lunarDay}/${lunarMonth}`;
}

export function generateTuViAiChart(input: TuViAiChartInput): TuViAiChart {
  const seed = input.year + input.month * 13 + input.day * 17 + input.hour * 3;
  const palaces = PALACE_LAYOUT.map((palace, index) => {
    const starOffset = seed + index * 5;
    return {
      name: palace.name,
      branch: palace.branch,
      age: palace.age,
      mainStars: pick(MAIN_STAR_SETS, starOffset),
      leftStars: [pick(SIDE_STARS, starOffset), pick(SIDE_STARS, starOffset + 3), pick(SIDE_STARS, starOffset + 6)],
      rightStars: [pick(SIDE_STARS, starOffset + 12), pick(SIDE_STARS, starOffset + 15), pick(SIDE_STARS, starOffset + 18)],
      bottomLeft: palace.bottom[0],
      bottomCenter: palace.bottom[1],
      bottomRight: palace.bottom[2],
    };
  });

  return {
    input,
    lunarDate: pseudoLunarDate(input.day, input.month),
    canChiYear: getCanChiYear(input.year),
    menh: pick(["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"], seed),
    cuc: pick(["Thủy Nhị Cục", "Mộc Tam Cục", "Kim Tứ Cục", "Thổ Ngũ Cục", "Hỏa Lục Cục"], seed),
    chuMenh: pick(["Vũ Khúc", "Thiên Cơ", "Thái Dương", "Liêm Trinh", "Tham Lang"], seed),
    chuThan: pick(["Thiên Cơ", "Thiên Lương", "Văn Xương", "Thiên Đồng", "Thiên Tướng"], seed + 2),
    palaces,
  };
}
