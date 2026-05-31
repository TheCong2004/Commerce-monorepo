import {
  AstrologyProfile,
  ElementName,
  elementCompatibility,
  elementLabels,
  elementThemes,
} from "@commerce/astrology-core";

export type CommerceRecommendationKind = "pod" | "sim" | "telecom" | "feng-shui";

export type ProductLike = {
  id: string;
  handle?: string;
  title: string;
  description?: string;
  category?: string;
  thumbnail?: string;
  images?: Array<{ url?: string }>;
  variants?: Array<{ calculated_price?: { calculated_amount?: number; original_amount?: number } }>;
  options?: Array<{ title?: string; values?: Array<{ value?: string }> }>;
  print_locations?: string[];
  metadata?: Record<string, unknown>;
};

export type SimOffer = {
  number: string;
  element: ElementName;
  score: number;
  price: number;
  pattern: string;
};

export type TelecomOffer = {
  id: string;
  title: string;
  description: string;
  element: ElementName;
  price: number;
  badge: string;
};

export type CommerceRecommendation = {
  id: string;
  kind: CommerceRecommendationKind;
  title: string;
  description: string;
  thumbnail?: string;
  href?: string;
  price: number;
  originalPrice?: number;
  score: number;
  badge: string;
  astrologyReason: string;
  personalizationPrompt: string;
  cartPayload: {
    id: string;
    title: string;
    thumbnail?: string;
    quantity: number;
    price: number;
    unit_price: number;
    handle?: string;
    variant_title: string;
    personalization: string;
  };
};

export type RecommendationInput = {
  profile: AstrologyProfile;
  goal: string;
  products: ProductLike[];
  sims?: SimOffer[];
  telecomPlans?: TelecomOffer[];
  limit?: number;
};

export function getPersonalizedCommerceRecommendations(input: RecommendationInput): CommerceRecommendation[] {
  const pod = getPodRecommendations(input.profile, input.goal, input.products);
  const sims = getSimRecommendations(input.profile, input.goal, input.sims ?? []);
  const telecom = getTelecomRecommendations(input.profile, input.goal, input.telecomPlans ?? []);

  return [...pod, ...sims, ...telecom]
    .sort((a, b) => b.score - a.score)
    .slice(0, input.limit ?? 12);
}

export function getPodRecommendations(profile: AstrologyProfile, goal: string, products: ProductLike[]) {
  const preferredColors = profile.luckyColors.map((color) => color.toLowerCase());
  const preferredCategories = profile.star.nature === "Hung" ? ["mug", "poster", "hoodie"] : ["t-shirt", "mug", "sweatshirt"];

  return products.map((product) => {
    const optionValues = (product.options || [])
      .flatMap((option) => option.values || [])
      .map((value) => String(value.value || "").toLowerCase());
    const text = normalize(`${product.title || ""} ${product.description || ""} ${product.category || ""}`);

    let score = 0;
    score += optionValues.some((value) => preferredColors.some((color) => value.includes(color))) ? 40 : 0;
    score += product.category && preferredCategories.includes(product.category) ? 25 : 0;
    score += product.metadata?.supports_customization ? 20 : 0;
    score += text.includes(profile.element.toLowerCase()) ? 10 : 0;
    score += product.print_locations?.length ? 8 : 0;
    score += product.variants?.[0]?.calculated_price?.calculated_amount ? 4 : 0;

    const price = product.variants?.[0]?.calculated_price?.calculated_amount || 0;
    const reason = buildPodReason(product, profile);
    const prompt = buildPodPrompt(product, profile, goal);

    return {
      id: product.id,
      kind: "pod" as const,
      title: product.title,
      description: reason,
      thumbnail: product.thumbnail || product.images?.[0]?.url,
      href: product.handle ? `/product/${product.handle}` : undefined,
      price,
      originalPrice: product.variants?.[0]?.calculated_price?.original_amount,
      score,
      badge: "Print on demand",
      astrologyReason: reason,
      personalizationPrompt: prompt,
      cartPayload: {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        quantity: 1,
        price,
        unit_price: price / 100,
        handle: product.handle,
        variant_title: `${profile.luckyColors[0]} / ${goal}`,
        personalization: prompt,
      },
    };
  });
}

function getSimRecommendations(profile: AstrologyProfile, goal: string, sims: SimOffer[]): CommerceRecommendation[] {
  const compatible = elementCompatibility[profile.element];

  return sims.map((sim) => {
    const score = sim.score * 5 + (compatible.includes(sim.element) ? 35 : 8) + (normalize(goal).includes("tai") ? 12 : 5);
    const description = `Sim ${sim.pattern}, hanh ${elementLabels[sim.element]}, ${compatible.includes(sim.element) ? "tuong sinh/tuong hop" : "co the dung neu thich day so"} voi menh ${elementLabels[profile.element]}.`;
    const id = `sim-${sim.number.replace(/\D/g, "")}`;

    return {
      id,
      kind: "sim" as const,
      title: `Sim phong thuy ${sim.number}`,
      description,
      price: sim.price,
      score,
      badge: "Sim so dep",
      astrologyReason: description,
      personalizationPrompt: `Giu so ${sim.number} cho khach sinh nam ${profile.birthYear}, muc tieu ${goal}.`,
      cartPayload: {
        id,
        title: `Sim phong thuy ${sim.number}`,
        quantity: 1,
        price: sim.price,
        unit_price: sim.price,
        variant_title: `${elementLabels[sim.element]} / ${goal}`,
        personalization: `Lead tu van sim ${sim.number}; menh ${elementLabels[profile.element]}; sao ${profile.star.name}.`,
      },
    };
  });
}

function getTelecomRecommendations(profile: AstrologyProfile, goal: string, plans: TelecomOffer[]): CommerceRecommendation[] {
  const compatible = elementCompatibility[profile.element];

  return plans.map((plan) => {
    const score = (compatible.includes(plan.element) ? 30 : 10) + (plan.price >= 300000 ? 18 : 12);
    const description = `${plan.description} Goi nay gan hanh ${elementLabels[plan.element]} de ca nhan hoa thong diep theo menh ${elementLabels[profile.element]}.`;

    return {
      id: plan.id,
      kind: "telecom" as const,
      title: plan.title,
      description,
      price: plan.price,
      score,
      badge: plan.badge,
      astrologyReason: description,
      personalizationPrompt: `Tu van ${plan.title} cho khach sinh nam ${profile.birthYear}, muc tieu ${goal}.`,
      cartPayload: {
        id: plan.id,
        title: plan.title,
        quantity: 1,
        price: plan.price,
        unit_price: plan.price,
        variant_title: `${plan.badge} / ${goal}`,
        personalization: `Lead goi cuoc: ${plan.title}; menh ${elementLabels[profile.element]}; muc tieu ${goal}.`,
      },
    };
  });
}

function buildPodReason(product: ProductLike, profile: AstrologyProfile) {
  const theme = elementThemes[profile.element][0];
  const category = product.category === "mug" ? "daily-use gift" : product.category === "poster" ? "workspace decor" : "personalized wearable";
  return `Hop menh ${elementLabels[profile.element]} nho mau ${profile.luckyColors[0]} va co the bien thanh ${category} voi chu de ${theme}.`;
}

function buildPodPrompt(product: ProductLike, profile: AstrologyProfile, goal: string) {
  return `In ten khach + nam sinh ${profile.birthYear}, phoi mau ${profile.luckyColors.slice(0, 2).join("/")} va hoa tiet ${elementThemes[profile.element].join(", ")} cho ${product.title}. Muc tieu: ${goal}.`;
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}
