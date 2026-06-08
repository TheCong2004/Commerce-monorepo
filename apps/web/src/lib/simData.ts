export interface SimOffer {
  id: string;
  number: string;
  price: number;
  pattern: string;
  provider: string;
}

export const SIM_OFFERS: SimOffer[] = [
  { id: "s1", number: "0912.888.999", price: 2000000, pattern: "Tam hoa kép, dễ nhớ", provider: "Vinaphone" },
  { id: "s2", number: "0988.123.456", price: 1500000, pattern: "Tiến đều, hợp kinh doanh", provider: "Viettel" },
  { id: "s3", number: "0909.111.222", price: 3500000, pattern: "Lặp kép, năng lượng nổi bật", provider: "Mobifone" },
  { id: "s4", number: "0337.555.666", price: 800000, pattern: "Dòng số mềm, dễ dùng", provider: "Viettel" },
  { id: "s5", number: "0977.444.888", price: 4200000, pattern: "Tài lộc, phát triển", provider: "Viettel" },
  { id: "s6", number: "0868.99.88.77", price: 1200000, pattern: "Lộc phát, giữ tài", provider: "Viettel" },
  { id: "s7", number: "0702.180.388", price: 5000000, pattern: "Đầu số đẹp, phát tài", provider: "Mobifone" },
];
