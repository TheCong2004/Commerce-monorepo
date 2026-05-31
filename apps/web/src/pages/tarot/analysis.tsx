import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";
import { Button } from "@/shared/ui/button";
import spreadsData from "@/features/tarot/data/spreads.json";
import { cardImageMap } from "@/features/tarot/tarot";
import {
  DrawnTarotCard,
  Gender,
  TarotSpread,
  generateTarotAnalysis,
  getFengShuiProfile,
  mapTarotReadingToGoal,
} from "@commerce/astrology-core";
import {
  CommerceRecommendation,
  getPersonalizedCommerceRecommendations,
} from "@/lib/astrologyRecommendations";
import i18nConfig from "../../../next-i18next.config";

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig)),
  },
});

const allSpreads = (spreadsData as { spreads: TarotSpread[] }).spreads;

const TarotAnalysisPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnTarotCard[]>([]);
  const [birthYear, setBirthYear] = useState(1995);
  const [gender, setGender] = useState<Gender>("Nam");

  useEffect(() => {
    const savedQuestion = sessionStorage.getItem("tarot_question");
    const savedSpreadId = sessionStorage.getItem("tarot_spread");
    const savedCards = sessionStorage.getItem("tarot_drawn_cards");

    if (!savedQuestion || !savedSpreadId || !savedCards) {
      router.replace("/tarot");
      return;
    }

    const selectedSpread = allSpreads.find((item) => item.id === savedSpreadId);
    if (!selectedSpread) {
      router.replace("/tarot");
      return;
    }

    setQuestion(savedQuestion);
    setSpread(selectedSpread);
    setDrawnCards(JSON.parse(savedCards));
    setBirthYear(Number(sessionStorage.getItem("tarot_birth_year") || 1995));
    setGender((sessionStorage.getItem("tarot_gender") as Gender) || "Nam");
  }, [router]);

  const analysis = useMemo(() => {
    if (!spread || drawnCards.length === 0) return "";
    return generateTarotAnalysis(question, spread, drawnCards);
  }, [question, spread, drawnCards]);

  const recommendations = useMemo(() => {
    const profile = getFengShuiProfile(birthYear, gender);
    const goal = mapTarotReadingToGoal(drawnCards);
    return getPersonalizedCommerceRecommendations(profile, goal, 6);
  }, [birthYear, gender, drawnCards]);

  const addToCart = (item: CommerceRecommendation, redirect = false) => {
    const currentCart = JSON.parse(window.localStorage.getItem("cart_items") || "[]");
    const existingItem = currentCart.find((cartItem: any) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.personalization = item.personalizationPrompt;
    } else {
      currentCart.push(item.cartPayload);
    }

    window.localStorage.setItem("cart_items", JSON.stringify(currentCart));
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { success: true, cart: currentCart } }));

    if (redirect) router.push("/cart");
  };

  const newReading = () => {
    sessionStorage.removeItem("tarot_question");
    sessionStorage.removeItem("tarot_spread");
    sessionStorage.removeItem("tarot_drawn_cards");
    router.push("/tarot");
  };

  if (!spread) return null;

  return (
    <section className="min-h-screen bg-[#f7edd6] px-4 py-10 text-[#3a2a14]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#bf7e26]">Ket qua Tarot</p>
          <h1 className="mt-2 text-4xl font-bold">{spread.name}</h1>
          <p className="mt-3 text-sm text-[#5c4033]">{question}</p>
        </div>

        <div className="rounded-lg border-4 border-[#bf7e26] bg-[#f9f4e8] p-5 shadow-xl sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {drawnCards.map((item) => (
              <article key={`${item.position.id}-${item.card.id}`} className="rounded-lg border border-[#d4c5a9] bg-white p-4 text-center">
                <img
                  src={cardImageMap[String(item.card.id)] || cardImageMap.back}
                  alt={item.card.name}
                  className={`mx-auto h-40 w-24 rounded-md object-cover shadow ${item.isReversed ? "rotate-180" : ""}`}
                />
                <p className="mt-3 text-xs font-bold uppercase text-[#8b4513]">{item.position.name}</p>
                <h2 className="mt-1 font-bold">{item.card.name}</h2>
                <p className="mt-2 text-xs text-[#5c4033]">
                  {(item.isReversed ? item.card.reversedKeywords : item.card.uprightKeywords).join(", ")}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-white p-5">
            <h2 className="text-xl font-bold text-[#8b4513]">Luan giai</h2>
            <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#3a2a14]">{analysis}</div>
          </div>

          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-wide text-[#8b4513]">Goi y ban hang theo trai bai</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {recommendations.map((item) => (
                <article key={item.id} className="rounded-lg border border-[#d4c5a9] bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5c4033]">{item.astrologyReason}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#f7edd6] px-2 py-1 text-xs font-bold text-[#8b4513]">{item.badge}</span>
                  </div>
                  <p className="mt-3 rounded-md bg-[#fff7ed] p-3 text-xs leading-5 text-[#7c2d12]">{item.personalizationPrompt}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="font-bold text-[#bf7e26]">{formatPrice(item)}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="h-9" onClick={() => addToCart(item)}>Them</Button>
                      <Button className="h-9 bg-[#bf7e26] text-white hover:bg-[#8b4513]" onClick={() => addToCart(item, true)}>
                        Mua ngay
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" onClick={newReading}>Trai bai moi</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

function formatPrice(item: CommerceRecommendation) {
  if (item.kind === "pod") return `$${(item.price / 100).toFixed(2)}`;
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(item.price);
}

TarotAnalysisPage.getLayout = function getLayout(page: any) {
  return (
    <PrimaryLayout seo={{ title: "Tarot Analysis | Commerce Monorepo", canonical: "/tarot/analysis" }}>
      {page}
    </PrimaryLayout>
  );
};

export default TarotAnalysisPage;
