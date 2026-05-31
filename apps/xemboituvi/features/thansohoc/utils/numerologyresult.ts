// src/utils/numerologyUtils.ts

export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y']; // Y có thể xử lý kỹ hơn tùy logic

export function normalizeVietnameseName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

function digitSum(n: number): number {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}

export function reduceNumber(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = digitSum(n);
  }
  return n;
}

// 1. Life Path (Đường đời/Chủ đạo)
export function calcLifePath(dateStr: string): number {
  if (!dateStr) return 0;
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  return reduceNumber(reduceNumber(parseInt(dayStr)) + reduceNumber(parseInt(monthStr)) + reduceNumber(parseInt(yearStr)));
}

// 2. Expression (Sứ mệnh/Vận mệnh) - Tổng tên
export function calcExpression(name: string): number {
  const cleanName = normalizeVietnameseName(name);
  let sum = 0;
  for (let i = 0; i < cleanName.length; i++) {
    sum += PYTHAGOREAN_MAP[cleanName[i]] || 0;
  }
  return reduceNumber(sum);
}

// 3. Soul Urge (Linh hồn) - Tổng Nguyên Âm
export function calcSoulUrge(name: string): number {
  const cleanName = normalizeVietnameseName(name);
  let sum = 0;
  for (let i = 0; i < cleanName.length; i++) {
    if (VOWELS.includes(cleanName[i])) {
      sum += PYTHAGOREAN_MAP[cleanName[i]] || 0;
    }
  }
  return reduceNumber(sum);
}

// 4. Personality (Nhân cách) - Tổng Phụ Âm
export function calcPersonality(name: string): number {
  const cleanName = normalizeVietnameseName(name);
  let sum = 0;
  for (let i = 0; i < cleanName.length; i++) {
    if (!VOWELS.includes(cleanName[i])) {
      sum += PYTHAGOREAN_MAP[cleanName[i]] || 0;
    }
  }
  return reduceNumber(sum);
}

// 5. Attitude (Thái độ) - Ngày sinh + Tháng sinh
export function calcAttitude(dateStr: string): number {
    if (!dateStr) return 0;
    const [_, monthStr, dayStr] = dateStr.split('-');
    return reduceNumber(parseInt(dayStr) + parseInt(monthStr));
}

// 6. Birthday (Ngày sinh)
export function calcBirthdayNumber(dateStr: string): number {
  if (!dateStr) return 0;
  const parts = dateStr.split('-');
  return reduceNumber(parseInt(parts[2]));
}