// src/utils/numerologyUtils.ts

// 1. Bảng quy đổi chữ cái Pythagoras
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

// 2. Hàm xóa dấu Tiếng Việt (Quan trọng để tính tên)
export const removeVietnameseTones = (str: string): string => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str.toLowerCase().trim();
};

// 3. Hàm rút gọn số (Giữ lại 11, 22, 33)
export const reduceNumber = (num: number): number => {
  if (num === 11 || num === 22 || num === 33) return num;
  if (num < 10) return num;
  
  // Tính tổng các chữ số: 39 -> 3+9=12 -> reduce(12) -> 3
  const sum = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  return reduceNumber(sum);
};

// 4. Tính Số Chủ Đạo (Life Path) từ ngày sinh
export const calculateLifePath = (day: number, month: number, year: number) => {
  const rDay = reduceNumber(day);
  const rMonth = reduceNumber(month);
  const rYear = reduceNumber(year);
  return reduceNumber(rDay + rMonth + rYear);
};

// 5. Tính Số Sứ Mệnh (Expression) từ Tên đầy đủ
export const calculateExpression = (fullName: string) => {
  const cleanName = removeVietnameseTones(fullName);
  let total = 0;
  
  for (let char of cleanName) {
    if (PYTHAGOREAN_MAP[char]) {
      total += PYTHAGOREAN_MAP[char];
    }
  }
  return reduceNumber(total);
};

// 6. (Tính năng ăn tiền) Tính độ hòa hợp Bố Mẹ & Con
export const checkCompatibility = (parentNum: number, childNum: number) => {
  // Logic đơn giản: Nhóm số giống nhau thì hợp
  const groups = [
    [1, 5, 7],    // Nhóm độc lập
    [2, 6, 9],    // Nhóm tình cảm
    [3, 5, 8],    // Nhóm năng động
    [4, 7]        // Nhóm kỷ luật
  ];
  
  // Tìm xem bố mẹ và con có cùng nhóm không
  // (Đây là logic demo, bạn có thể mở rộng sau)
  let isMatch = false;
  groups.forEach(g => {
    if (g.includes(parentNum) && g.includes(childNum)) isMatch = true;
  });

  return isMatch;
};
