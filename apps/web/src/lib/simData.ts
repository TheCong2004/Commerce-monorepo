export interface SimOffer {
  id: string;
  number: string;
  price: number;
  pattern: string;
  provider: string;
  handle?: string;
}

export const SIM_OFFERS: SimOffer[] = [
  {
    id: "s1",
    number: "098.333.8888",
    price: 85000000,
    pattern: "Ngu quy dep, de nho",
    provider: "Viettel",
    handle: "sim-viettel-0983338888-max120",
  },
  {
    id: "s2",
    number: "088.999.8888",
    price: 120000000,
    pattern: "Tu quy kep, premium",
    provider: "Vinaphone",
    handle: "sim-vinaphone-0889998888-data",
  },
  { id: "s3", number: "0912.888.999", price: 2000000, pattern: "Tam hoa kep, de nho", provider: "Vinaphone" },
  { id: "s4", number: "0988.123.456", price: 1500000, pattern: "Tien dau, hop kinh doanh", provider: "Viettel" },
  { id: "s5", number: "0909.111.222", price: 3500000, pattern: "Lap kep, noi bat", provider: "Mobifone" },
  { id: "s6", number: "0337.555.666", price: 800000, pattern: "Dong so mem, de dung", provider: "Viettel" },
  { id: "s7", number: "0868.99.88.77", price: 1200000, pattern: "Goi cuoc data, de nho", provider: "Viettel" },
];
