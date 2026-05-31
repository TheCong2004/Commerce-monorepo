import {
  AstrologyProfile,
  ElementName,
  Gender,
  TuViChart,
  TuViChartInput,
  TuViPalace,
  getCungMenhDetailed,
  getFengShuiProfile,
  generateTuViChart,
  getOppositeBranch,
  getSaoHan,
  getTamHopBranches,
  getYearlyStar,
  scoreFengShuiSim,
} from "@commerce/astrology-core";
import {
  CommerceRecommendation,
  SimOffer,
  TelecomOffer,
  getPersonalizedCommerceRecommendations as getCommerceRecommendations,
  getPodRecommendations,
} from "@commerce/recommendation-core";
import { mockProducts } from "@/lib/mockProduct";

export type {
  AstrologyProfile,
  CommerceRecommendation,
  ElementName,
  Gender,
  TuViChart,
  TuViChartInput,
  TuViPalace,
};

export {
  generateTuViChart,
  getCungMenhDetailed,
  getFengShuiProfile,
  getOppositeBranch,
  getSaoHan,
  getTamHopBranches,
  getYearlyStar,
  scoreFengShuiSim,
};

const SIM_OFFERS: Array<Omit<SimOffer, "score">> = [
  { number: "0912.888.999", element: "Kim", price: 2000000, pattern: "tam hoa kep, de nho" },
  { number: "0988.123.456", element: "Tho", price: 1500000, pattern: "tien deu, hop kinh doanh" },
  { number: "0909.111.222", element: "Hoa", price: 3500000, pattern: "lap cap, nang luong noi bat" },
  { number: "0337.555.666", element: "Thuy", price: 800000, pattern: "dong so mem, de dung" },
  { number: "0977.444.888", element: "Moc", price: 4200000, pattern: "tai loc, phat trien" },
  { number: "0868.99.88.77", element: "Kim", price: 1200000, pattern: "loc phat, giu tai" },
  { number: "0702.180.388", element: "Hoa", price: 5000000, pattern: "dau so dep, phat tai" },
];

const TELECOM_PLANS: TelecomOffer[] = [
  {
    id: "fiber-home-150",
    title: "Goi Internet Home 150Mbps",
    description: "Goi mang gia dinh on dinh, hop khach can hoc tap, lam viec va giai tri hang ngay.",
    element: "Tho",
    price: 165000,
    badge: "Internet gia dinh",
  },
  {
    id: "fiber-business-300",
    title: "Goi Internet Business 300Mbps",
    description: "Goi y cho nguoi can toc do cao, ban hang online, livestream hoac van hanh shop.",
    element: "Hoa",
    price: 320000,
    badge: "Kinh doanh",
  },
  {
    id: "mobile-data-flow",
    title: "Goi data di dong linh hoat",
    description: "Phu hop nguoi di chuyen nhieu, can ket noi lien tuc va toi uu chi phi theo thang.",
    element: "Thuy",
    price: 90000,
    badge: "Data mobile",
  },
  {
    id: "family-combo",
    title: "Combo Internet + truyen hinh",
    description: "Combo cho gia dinh, can bang nhu cau hoc tap, giai tri va ket noi nhieu thiet bi.",
    element: "Moc",
    price: 240000,
    badge: "Combo",
  },
  {
    id: "premium-stable",
    title: "Goi Premium IP on dinh",
    description: "Danh cho khach uu tien do on dinh, camera, smart home va lam viec tu xa.",
    element: "Kim",
    price: 450000,
    badge: "Premium",
  },
];

export function getAstrologyProductRecommendations(profile: AstrologyProfile, limit = 6) {
  return getPodRecommendations(profile, "Qua sinh nhat", mockProducts as any).slice(0, limit);
}

export function getPersonalizedCommerceRecommendations(
  profile: AstrologyProfile,
  goal: string,
  limit = 12,
): CommerceRecommendation[] {
  const scoredSims: SimOffer[] = SIM_OFFERS.map((sim) => ({
    ...sim,
    score: scoreFengShuiSim(sim.number, profile.birthYear).totalScore,
  }));

  return getCommerceRecommendations({
    profile,
    goal,
    products: mockProducts as any,
    sims: scoredSims,
    telecomPlans: TELECOM_PLANS,
    limit,
  });
}
