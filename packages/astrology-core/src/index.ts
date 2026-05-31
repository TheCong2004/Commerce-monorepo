export type Gender = "Nam" | "Nu";
export type ElementName = "Kim" | "Moc" | "Thuy" | "Hoa" | "Tho";

export type StarNature = "Cat" | "Trung" | "Hung";
export type DirectionGroup = "Dong tu menh" | "Tay tu menh";

export type AstrologyProfile = {
  birthYear: number;
  gender: Gender;
  element: ElementName;
  palace: string;
  group: DirectionGroup;
  luckyColors: string[];
  goodDirections: string[];
  star: {
    name: string;
    nature: StarNature;
    element: ElementName;
    advice: string;
  };
  summary: string;
};

export type DirectionAdvice = {
  direction: string;
  palace: string;
  meaning: string;
};

export type CungMenhResult = {
  palace: string;
  element: ElementName;
  group: DirectionGroup;
  luckyColors: string[];
  goodDirections: DirectionAdvice[];
  badDirections: DirectionAdvice[];
};

export type SaoHanResult = {
  lunarAge: number;
  star: {
    name: string;
    nature: StarNature;
    element: ElementName;
    advice: string;
  };
  term: {
    name: string;
    level: "Tieu han" | "Dai han";
    detail: string;
  };
};

export type QueDichType = "Dai Cat" | "Cat" | "Binh Hoa" | "Hung" | "Dai Hung";

export type QueDich = {
  id: number;
  name: string;
  hanTu: string;
  meaning: string;
  advice: string;
  type: QueDichType;
};

export type SimScoreResult = {
  totalScore: number;
  element: ElementName;
  totalPoint: number;
  yinYang: {
    even: number;
    odd: number;
    status: "Can bang" | "Chenh lech";
  };
  queDich: QueDich;
  analysis: string[];
};

export type TuViStar = {
  name: string;
  type: "main" | "secondary";
  nature: "good" | "bad" | "neutral";
  brightness?: "M" | "V" | "D" | "H";
  element?: ElementName;
};

export type TuViPalace = {
  name: string;
  position: number;
  branch: string;
  branchElement: ElementName;
  mainStars: TuViStar[];
  secondaryStars: TuViStar[];
  daiVan: number;
  trangSinh: string;
};

export type TuViChart = {
  fullName: string;
  birthYear: number;
  birthDate?: string;
  birthHour: string;
  gender: Gender;
  element: ElementName;
  cuc: string;
  menhBranch: string;
  thanBranch: string;
  chuMenh: string;
  chuThan: string;
  palaces: TuViPalace[];
};

export type TuViChartInput = {
  fullName: string;
  birthYear: number;
  birthDate?: string;
  birthHour?: string;
  gender: Gender;
};

export type TarotCard = {
  id: string | number;
  name: string;
  englishName: string;
  suit: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
};

export type TarotPosition = {
  id: number;
  name: string;
  description: string;
};

export type TarotSpread = {
  id: string;
  name: string;
  englishName: string;
  description: string;
  cardCount: number;
  positions: TarotPosition[];
};

export type DrawnTarotCard = {
  card: TarotCard;
  isReversed: boolean;
  position: TarotPosition;
};

export type TarotDeckData = {
  majorArcana: TarotCard[];
  minorArcana?: Record<string, TarotCard[]>;
};

export const elementLabels: Record<ElementName, string> = {
  Kim: "Kim",
  Moc: "Moc",
  Thuy: "Thuy",
  Hoa: "Hoa",
  Tho: "Tho",
};

export const elementColors: Record<ElementName, string[]> = {
  Kim: ["White", "Grey", "Silver", "Yellow"],
  Moc: ["Green", "Blue", "Light Blue"],
  Thuy: ["Black", "Navy", "Blue"],
  Hoa: ["Red", "Pink", "Purple", "Maroon"],
  Tho: ["Yellow", "Brown", "Sand", "Dark Gray"],
};

export const elementThemes: Record<ElementName, string[]> = {
  Kim: ["metal", "minimal", "silver light", "circle"],
  Moc: ["leaf", "growth", "forest", "organic"],
  Thuy: ["water wave", "flow", "deep blue", "adaptive"],
  Hoa: ["sun", "fire", "energy", "bold"],
  Tho: ["mountain", "earth", "stability", "warmth"],
};

export const elementCompatibility: Record<ElementName, ElementName[]> = {
  Kim: ["Tho", "Kim"],
  Moc: ["Thuy", "Moc"],
  Thuy: ["Kim", "Thuy"],
  Hoa: ["Moc", "Hoa"],
  Tho: ["Hoa", "Tho"],
};

const palaceElement: Record<string, ElementName> = {
  Kham: "Thuy",
  Ly: "Hoa",
  Chan: "Moc",
  Ton: "Moc",
  Can: "Kim",
  Doai: "Kim",
  CanTho: "Tho",
  Khon: "Tho",
};

const goodDirections: Record<AstrologyProfile["group"], string[]> = {
  "Dong tu menh": ["Nam", "Bac", "Dong Nam", "Dong"],
  "Tay tu menh": ["Tay Bac", "Dong Bac", "Tay Nam", "Tay"],
};

const directionDetails: Record<DirectionGroup, { good: DirectionAdvice[]; bad: DirectionAdvice[] }> = {
  "Dong tu menh": {
    good: [
      { direction: "Nam", palace: "Sinh Khi", meaning: "Phat phuc nhanh, tai loc doi dao" },
      { direction: "Bac", palace: "Thien Y", meaning: "Suc khoe tot, it benh tat" },
      { direction: "Dong Nam", palace: "Dien Nien", meaning: "Gia dinh hoa thuan, on dinh lau dai" },
      { direction: "Dong", palace: "Phuc Vi", meaning: "Quy nhan phu tro, tinh than vung vang" },
    ],
    bad: [
      { direction: "Tay", palace: "Tuyet Menh", meaning: "De hao ton suc khoe va tai san" },
      { direction: "Tay Bac", palace: "Luc Sat", meaning: "De co thi phi, tranh chap" },
      { direction: "Tay Nam", palace: "Ngu Quy", meaning: "Mat thu nhap, bat on cong viec" },
      { direction: "Dong Bac", palace: "Hoa Hai", meaning: "Khong may man, cong viec tri tre" },
    ],
  },
  "Tay tu menh": {
    good: [
      { direction: "Tay Bac", palace: "Sinh Khi", meaning: "Su nghiep thang tien, hanh thong" },
      { direction: "Dong Bac", palace: "Thien Y", meaning: "Gia chu khoe manh, hau van tot" },
      { direction: "Tay Nam", palace: "Dien Nien", meaning: "Quan he gia dao va xa hoi tot dep" },
      { direction: "Tay", palace: "Phuc Vi", meaning: "Nang luong binh an, tam tinh vung vang" },
    ],
    bad: [
      { direction: "Bac", palace: "Tuyet Menh", meaning: "Rat xau cho suc khoe va tai san" },
      { direction: "Nam", palace: "Ngu Quy", meaning: "Tai tieng, tieu nhan quay pha" },
      { direction: "Dong", palace: "Luc Sat", meaning: "Truc trac phap ly, tinh cam bat on" },
      { direction: "Dong Nam", palace: "Hoa Hai", meaning: "Tien bac hao hut, cong viec tri tre" },
    ],
  },
};

export const queDichData: Record<number, QueDich> = {
  1: {
    id: 1,
    name: "Thuan Can",
    hanTu: "Qian",
    meaning: "Troi, su khoi dau manh me, thoi co mo rong.",
    advice: "Giu tam the chu dong nhung tranh kieu ngao.",
    type: "Dai Cat",
  },
  2: {
    id: 2,
    name: "Thuan Khon",
    hanTu: "Kun",
    meaning: "Dat, su bao dung va ben bi.",
    advice: "Kien tri, di tung buoc chac chan.",
    type: "Cat",
  },
  11: {
    id: 11,
    name: "Dia Thien Thai",
    hanTu: "Tai",
    meaning: "Troi dat giao hoa, van khi hanh thong.",
    advice: "Tot cho khoi dong viec lon va kich hoat tai loc.",
    type: "Dai Cat",
  },
  12: {
    id: 12,
    name: "Thien Dia Bi",
    hanTu: "Pi",
    meaning: "Khi khong thong, de be tac.",
    advice: "Nen an nhan cho thoi, tranh quyet dinh lon.",
    type: "Dai Hung",
  },
  63: {
    id: 63,
    name: "Thuy Hoa Ky Te",
    hanTu: "Ji Ji",
    meaning: "Viec da vao trat tu, thanh qua ro net.",
    advice: "Thanh cong roi can giu ky luat de tranh suy thoai.",
    type: "Cat",
  },
  64: {
    id: 64,
    name: "Hoa Thuy Vi Te",
    hanTu: "Wei Ji",
    meaning: "Viec con dang do nhung co hy vong moi.",
    advice: "Can than o buoc cuoi, dung nong voi.",
    type: "Binh Hoa",
  },
};

export function getFengShuiProfile(birthYear: number, gender: Gender): AstrologyProfile {
  const digitsSum = birthYear
    .toString()
    .split("")
    .reduce((total, digit) => total + Number(digit), 0);
  const remainder = digitsSum % 9 || 9;

  const malePalace: Record<number, string> = {
    1: "Kham",
    2: "Ly",
    3: "CanTho",
    4: "Doai",
    5: "Can",
    6: "Khon",
    7: "Ton",
    8: "Chan",
    9: "Khon",
  };
  const femalePalace: Record<number, string> = {
    1: "CanTho",
    2: "Can",
    3: "Doai",
    4: "CanTho",
    5: "Ly",
    6: "Kham",
    7: "Khon",
    8: "Chan",
    9: "Ton",
  };

  const palace = gender === "Nam" ? malePalace[remainder] : femalePalace[remainder];
  const element = palaceElement[palace];
  const group = ["Kham", "Ly", "Chan", "Ton"].includes(palace) ? "Dong tu menh" : "Tay tu menh";
  const star = getYearlyStar(birthYear, gender);

  return {
    birthYear,
    gender,
    element,
    palace,
    group,
    luckyColors: elementColors[element],
    goodDirections: goodDirections[group],
    star,
    summary: `Menh ${elementLabels[element]}, hop mau ${elementColors[element].join(", ")}, nen uu tien chu de ${elementThemes[element].slice(0, 3).join(", ")}.`,
  };
}

export function getCungMenhDetailed(birthYear: number, gender: Gender): CungMenhResult {
  const profile = getFengShuiProfile(birthYear, gender);
  return {
    palace: profile.palace,
    element: profile.element,
    group: profile.group,
    luckyColors: profile.luckyColors,
    goodDirections: directionDetails[profile.group].good,
    badDirections: directionDetails[profile.group].bad,
  };
}

export function getYearlyStar(birthYear: number, gender: Gender): AstrologyProfile["star"] {
  const currentYear = new Date().getFullYear();
  const lunarAge = currentYear - birthYear + 1;
  const remainder = lunarAge % 9;

  const maleStars: Record<number, AstrologyProfile["star"]> = {
    1: { name: "La Hau", nature: "Hung", element: "Kim", advice: "Uu tien thong diep binh an, mau sang va bo cuc toi gian." },
    2: { name: "Tho Tu", nature: "Trung", element: "Tho", advice: "Hop san pham on dinh, ben bi, mau dat hoac trung tinh." },
    3: { name: "Thuy Dieu", nature: "Cat", element: "Thuy", advice: "Hop song nuoc, xanh den, di xa va tai loc." },
    4: { name: "Thai Bach", nature: "Hung", element: "Kim", advice: "Uu tien thiet ke giu tai, can bang, mau trang hoac xam." },
    5: { name: "Thai Duong", nature: "Cat", element: "Hoa", advice: "Hop thiet ke noi bat, nang luong mat troi, do hoac cam." },
    6: { name: "Van Han", nature: "Trung", element: "Hoa", advice: "Chon san pham ca nhan hoa nhe, mau am vua phai." },
    7: { name: "Ke Do", nature: "Hung", element: "Tho", advice: "Hop vat pham binh an, mau dat va bo cuc chac chan." },
    8: { name: "Thai Am", nature: "Cat", element: "Thuy", advice: "Hop chu de trang, nuoc, dem xanh va qua tang cam xuc." },
    0: { name: "Moc Duc", nature: "Cat", element: "Moc", advice: "Hop mau xanh, cay la, phat trien va may man." },
  };

  const femaleStars: Record<number, AstrologyProfile["star"]> = {
    1: { name: "Ke Do", nature: "Hung", element: "Tho", advice: "Uu tien mau dat va thong diep bao ho." },
    2: { name: "Van Han", nature: "Trung", element: "Hoa", advice: "Hop mau am vua phai, mat troi nhe va chu ca nhan hoa." },
    3: { name: "Moc Duc", nature: "Cat", element: "Moc", advice: "Hop xanh la, thien nhien va thong diep khoi sac." },
    4: { name: "Thai Am", nature: "Cat", element: "Thuy", advice: "Hop xanh dem, trang, nuoc va qua tang tinh te." },
    5: { name: "Tho Tu", nature: "Trung", element: "Tho", advice: "Uu tien nau, vang dat va san pham dung hang ngay." },
    6: { name: "La Hau", nature: "Hung", element: "Kim", advice: "Hop trang, xam, hoa giai thi phi va giu tam an." },
    7: { name: "Thai Duong", nature: "Cat", element: "Hoa", advice: "Hop thiet ke ruc ro, tu tin va noi bat." },
    8: { name: "Thai Bach", nature: "Hung", element: "Kim", advice: "Chon mau sang, toi gian va tap trung giu tai." },
    0: { name: "Thuy Dieu", nature: "Cat", element: "Thuy", advice: "Hop xanh nuoc, song, du lich va qua tang tai loc." },
  };

  return gender === "Nam" ? maleStars[remainder] : femaleStars[remainder];
}

export function getSaoHan(birthYear: number, gender: Gender, currentYear = new Date().getFullYear()): SaoHanResult {
  const lunarAge = currentYear - birthYear + 1;
  const star = getYearlyStar(birthYear, gender);
  const termIndex = lunarAge % 8;
  const terms: Record<number, SaoHanResult["term"]> = {
    1: { name: "Huynh Tuyen", level: "Dai han", detail: "Chu y suc khoe, tranh song nuoc va viec qua rui ro." },
    2: { name: "Tam Kheo", level: "Tieu han", detail: "Chu y mat, tay chan va va cham xe co." },
    3: { name: "Ngu Mo", level: "Tieu han", detail: "De hao tai, can can than giao dich va giu tai san." },
    4: { name: "Thien Tinh", level: "Tieu han", detail: "De co thi phi, kien cao, can trong an uong." },
    5: { name: "Tan Tan", level: "Dai han", detail: "Can than tai nan bat ngo, hao ton tien bac." },
    6: { name: "Thien La", level: "Tieu han", detail: "Tam ly de bat an, nen nghi ngoi va can bang." },
    7: { name: "Dia Vong", level: "Tieu han", detail: "Chu y loi noi, tai tieng va viec di dem." },
    0: { name: "Diem Vuong", level: "Dai han", detail: "Can than kien tung, tranh quyet dinh nong voi." },
  };

  return { lunarAge, star, term: terms[termIndex] };
}

export function getBirthYearElement(birthYear: number): ElementName {
  const canMap: Record<number, number> = { 4: 1, 5: 1, 6: 2, 7: 2, 8: 3, 9: 3, 0: 4, 1: 4, 2: 5, 3: 5 };
  const chiMap: Record<number, number> = { 4: 0, 5: 0, 10: 0, 11: 0, 6: 1, 7: 1, 0: 1, 1: 1, 8: 2, 9: 2, 2: 2, 3: 2 };
  const sum = (canMap[birthYear % 10] || 0) + (chiMap[birthYear % 12] || 0);
  const resultIndex = sum > 5 ? sum - 5 : sum;
  const result: Record<number, ElementName> = { 1: "Kim", 2: "Thuy", 3: "Hoa", 4: "Tho", 5: "Moc" };
  return result[resultIndex] || "Kim";
}

export function getCompatibleElements(element: ElementName): ElementName[] {
  return elementCompatibility[element] || ["Kim", "Moc", "Thuy", "Hoa", "Tho"];
}

export function tinhQueDichSim(simNumber: string) {
  const batQuai = ["Khon", "Can", "Doai", "Ly", "Chan", "Ton", "Kham", "CanTho"];
  const last8 = simNumber.replace(/\D/g, "").slice(-8);
  if (last8.length < 8) return null;

  const first = last8.slice(0, 4);
  const second = last8.slice(4, 8);
  const firstTotal = first.split("").reduce((sum, digit) => sum + Number(digit), 0);
  const secondTotal = second.split("").reduce((sum, digit) => sum + Number(digit), 0);
  const upperIndex = firstTotal % 8 || 8;
  const lowerIndex = secondTotal % 8 || 8;

  return {
    upper: batQuai[upperIndex - 1],
    lower: batQuai[lowerIndex - 1],
    name: `${batQuai[upperIndex - 1]} ${batQuai[lowerIndex - 1]}`,
  };
}

export function scoreFengShuiSim(simNumber: string, birthYear: number): SimScoreResult {
  const numbers = simNumber.replace(/\D/g, "");
  const element = getBirthYearElement(birthYear);
  const upper = Number(numbers.slice(0, 5)) % 8 || 8;
  const lower = Number(numbers.slice(5, 10)) % 8 || 8;
  const queId = (upper - 1) * 8 + lower;
  const queDich = queDichData[queId] || queDichData[1];

  let totalScore = queDich.type.includes("Cat") ? 6 : queDich.type === "Binh Hoa" ? 4 : 2;
  const totalPoint = numbers.split("").reduce((sum, digit) => sum + Number(digit), 0) % 10 || 10;
  if (totalPoint >= 7) totalScore += 4;
  else totalScore += 2;

  const even = numbers.split("").filter((digit) => Number(digit) % 2 === 0).length;
  const odd = numbers.length - even;
  const yinYangStatus = Math.abs(even - odd) <= 2 ? "Can bang" : "Chenh lech";

  return {
    totalScore,
    element,
    totalPoint,
    yinYang: {
      even,
      odd,
      status: yinYangStatus,
    },
    queDich,
    analysis: [
      `Tong nut ${totalPoint}: ${totalPoint >= 7 ? "vuong khi tot" : "can bo tro them yeu to phong thuy"}.`,
      `Am duong ${even}/${odd}: ${yinYangStatus}.`,
      `Que dich ${queDich.name}: ${queDich.meaning}`,
    ],
  };
}

export function flattenTarotDeck(data: TarotDeckData): TarotCard[] {
  const minor = data.minorArcana ? Object.values(data.minorArcana).flat() : [];
  return [...data.majorArcana, ...minor];
}

export function shuffleTarotDeck(cards: TarotCard[], seed = Date.now()) {
  const decorated = cards.map((card, index) => ({
    card,
    sort: seededRandom(seed + index),
    isReversed: seededRandom(seed + index + 99) > 0.5,
  }));

  return decorated
    .sort((a, b) => a.sort - b.sort)
    .map(({ card, isReversed }) => ({ ...card, isReversed }));
}

export function buildDrawnTarotCard(
  card: TarotCard,
  position: TarotPosition,
  isReversed: boolean,
): DrawnTarotCard {
  return { card, position, isReversed };
}

export function generateTarotAnalysis(question: string, spread: TarotSpread, cards: DrawnTarotCard[]) {
  const lines = cards.map((item) => {
    const keywords = item.isReversed ? item.card.reversedKeywords : item.card.uprightKeywords;
    const direction = item.isReversed ? "nguoc" : "xuoi";
    return `${item.position.name}: ${item.card.name} (${direction}) - ${keywords.join(", ")}.`;
  });

  return [
    `Cau hoi: ${question}`,
    `Trai bai: ${spread.name} - ${spread.description}`,
    "",
    ...lines,
    "",
    "Ket luan: Tarot la cong cu phan chieu. Hay dung thong diep tren de chon hanh dong va san pham ca nhan hoa phu hop.",
  ].join("\n");
}

export function mapTarotReadingToGoal(cards: DrawnTarotCard[]) {
  const text = cards
    .flatMap((item) => (item.isReversed ? item.card.reversedKeywords : item.card.uprightKeywords))
    .join(" ")
    .toLowerCase();

  if (text.includes("tien") || text.includes("tai") || text.includes("thinh")) return "Thu hut tai loc";
  if (text.includes("tinh") || text.includes("yeu") || text.includes("gia dinh")) return "Do doi ca nhan hoa";
  if (text.includes("suc") || text.includes("binh") || text.includes("chua")) return "Binh an trong nam";
  if (text.includes("lam viec") || text.includes("su nghiep") || text.includes("hoc")) return "Trang tri goc lam viec";
  return "Qua sinh nhat";
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const tuViBranches = ["Ty", "Suu", "Dan", "Mao", "Thin", "Ti", "Ngo", "Mui", "Than", "Dau", "Tuat", "Hoi"];
const tuViBranchElements: Record<string, ElementName> = {
  Ty: "Thuy",
  Suu: "Tho",
  Dan: "Moc",
  Mao: "Moc",
  Thin: "Tho",
  Ti: "Hoa",
  Ngo: "Hoa",
  Mui: "Tho",
  Than: "Kim",
  Dau: "Kim",
  Tuat: "Tho",
  Hoi: "Thuy",
};

const tuViPalaceNames = [
  "Menh",
  "Phu Mau",
  "Phuc Duc",
  "Dien Trach",
  "Quan Loc",
  "No Boc",
  "Thien Di",
  "Tat Ach",
  "Tai Bach",
  "Tu Tuc",
  "Phu The",
  "Huynh De",
];

const tuViMainStars: TuViStar[] = [
  { name: "Tu Vi", type: "main", nature: "good", brightness: "V", element: "Tho" },
  { name: "Thien Co", type: "main", nature: "neutral", brightness: "M", element: "Moc" },
  { name: "Thai Duong", type: "main", nature: "good", brightness: "H", element: "Hoa" },
  { name: "Vu Khuc", type: "main", nature: "good", brightness: "V", element: "Kim" },
  { name: "Thien Dong", type: "main", nature: "good", brightness: "M", element: "Thuy" },
  { name: "Liem Trinh", type: "main", nature: "neutral", brightness: "M", element: "Hoa" },
  { name: "Thien Phu", type: "main", nature: "good", brightness: "M", element: "Tho" },
  { name: "Thai Am", type: "main", nature: "good", brightness: "H", element: "Thuy" },
  { name: "Tham Lang", type: "main", nature: "neutral", brightness: "D", element: "Moc" },
  { name: "Cu Mon", type: "main", nature: "neutral", brightness: "M", element: "Thuy" },
  { name: "Thien Tuong", type: "main", nature: "good", brightness: "M", element: "Thuy" },
  { name: "Thien Luong", type: "main", nature: "good", brightness: "H", element: "Moc" },
  { name: "That Sat", type: "main", nature: "bad", brightness: "M", element: "Kim" },
  { name: "Pha Quan", type: "main", nature: "bad", brightness: "V", element: "Thuy" },
];

const tuViSecondaryStars: TuViStar[] = [
  { name: "Hoa Loc", type: "secondary", nature: "good", element: "Moc" },
  { name: "Hoa Quyen", type: "secondary", nature: "good", element: "Hoa" },
  { name: "Hoa Khoa", type: "secondary", nature: "good", element: "Moc" },
  { name: "Hoa Ky", type: "secondary", nature: "bad", element: "Thuy" },
  { name: "Van Xuong", type: "secondary", nature: "good", element: "Kim" },
  { name: "Van Khuc", type: "secondary", nature: "good", element: "Thuy" },
  { name: "Ta Phu", type: "secondary", nature: "good", element: "Tho" },
  { name: "Huu Bat", type: "secondary", nature: "good", element: "Tho" },
  { name: "Kinh Duong", type: "secondary", nature: "bad", element: "Kim" },
  { name: "Da La", type: "secondary", nature: "bad", element: "Kim" },
  { name: "Dia Khong", type: "secondary", nature: "bad", element: "Hoa" },
  { name: "Dia Kiep", type: "secondary", nature: "bad", element: "Hoa" },
  { name: "Thien Khoc", type: "secondary", nature: "bad", element: "Thuy" },
  { name: "Thien Viet", type: "secondary", nature: "good", element: "Hoa" },
  { name: "Thien Quan", type: "secondary", nature: "good", element: "Hoa" },
  { name: "Thien Phuc", type: "secondary", nature: "good", element: "Tho" },
];

export const tamHopBranchGroups = [
  ["Than", "Ty", "Thin"],
  ["Ti", "Dau", "Suu"],
  ["Dan", "Ngo", "Tuat"],
  ["Hoi", "Mao", "Mui"],
];

export const oppositeBranches: Record<string, string> = {
  Ty: "Ngo",
  Suu: "Mui",
  Dan: "Than",
  Mao: "Dau",
  Thin: "Tuat",
  Ti: "Hoi",
  Ngo: "Ty",
  Mui: "Suu",
  Than: "Dan",
  Dau: "Mao",
  Tuat: "Thin",
  Hoi: "Ti",
};

export function getTamHopBranches(branch: string) {
  return tamHopBranchGroups.find((group) => group.includes(branch)) || [];
}

export function getOppositeBranch(branch: string) {
  return oppositeBranches[branch] || "";
}

export function generateTuViChart(input: TuViChartInput): TuViChart {
  const profile = getFengShuiProfile(input.birthYear, input.gender);
  const startIndex = Math.abs(input.birthYear + (input.birthHour || "Ty").length) % 12;
  const menhBranch = tuViBranches[startIndex];
  const thanBranch = tuViBranches[(startIndex + 6) % 12];
  const cuc = `${elementLabels[profile.element]} Cuc`;

  const palaces = tuViBranches.map((branch, index) => {
    const palaceName = tuViPalaceNames[(index - startIndex + 12) % 12];
    const mainOne = tuViMainStars[(input.birthYear + index) % tuViMainStars.length];
    const hasSecondMain = (input.birthYear + index) % 3 === 0;
    const mainStars = hasSecondMain
      ? [mainOne, tuViMainStars[(input.birthYear + index + 5) % tuViMainStars.length]]
      : [mainOne];
    const secondaryStars = [
      tuViSecondaryStars[(input.birthYear + index * 2) % tuViSecondaryStars.length],
      tuViSecondaryStars[(input.birthYear + index * 2 + 7) % tuViSecondaryStars.length],
      tuViSecondaryStars[(input.birthYear + index * 2 + 11) % tuViSecondaryStars.length],
    ];

    return {
      name: palaceName,
      position: index,
      branch,
      branchElement: tuViBranchElements[branch],
      mainStars,
      secondaryStars,
      daiVan: index * 10 + 6,
      trangSinh: ["Trang Sinh", "Moc Duc", "Quan Doi", "Lam Quan", "De Vuong", "Suy", "Benh", "Tu", "Mo", "Tuyet", "Thai", "Duong"][index],
    };
  });

  return {
    fullName: input.fullName,
    birthYear: input.birthYear,
    birthDate: input.birthDate,
    birthHour: input.birthHour || "Ty",
    gender: input.gender,
    element: profile.element,
    cuc,
    menhBranch,
    thanBranch,
    chuMenh: palaces.find((palace) => palace.name === "Menh")?.mainStars[0]?.name || "Tu Vi",
    chuThan: palaces.find((palace) => palace.branch === thanBranch)?.mainStars[0]?.name || "Thien Luong",
    palaces,
  };
}
