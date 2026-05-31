import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";
import { Button } from "@/shared/ui/button";
import tarotCardsData from "@/features/tarot/data/tarot-cards.json";
import spreadsData from "@/features/tarot/data/spreads.json";
import { cardImageMap } from "@/features/tarot/tarot";
import {
  DrawnTarotCard,
  TarotCard,
  TarotDeckData,
  TarotSpread,
  buildDrawnTarotCard,
  flattenTarotDeck,
  shuffleTarotDeck,
} from "@commerce/astrology-core";
import i18nConfig from "../../../next-i18next.config";

type ShuffledCard = TarotCard & { isReversed: boolean };

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig)),
  },
});

const allSpreads = (spreadsData as { spreads: TarotSpread[] }).spreads;

const TarotDrawPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnTarotCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const deck = useMemo(() => {
    const cards = flattenTarotDeck(tarotCardsData as TarotDeckData);
    return shuffleTarotDeck(cards).slice(0, 22) as ShuffledCard[];
  }, []);
  const [remainingDeck, setRemainingDeck] = useState<ShuffledCard[]>(deck);

  useEffect(() => {
    const savedQuestion = sessionStorage.getItem("tarot_question");
    const savedSpreadId = sessionStorage.getItem("tarot_spread");
    if (!savedQuestion || !savedSpreadId) {
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
  }, [router]);

  const drawCard = (card: ShuffledCard) => {
    if (!spread || currentIndex >= spread.cardCount) return;

    const position = spread.positions[currentIndex];
    const drawn = buildDrawnTarotCard(card, position, card.isReversed);
    setDrawnCards((items) => [...items, drawn]);
    setRemainingDeck((items) => items.filter((item) => item.id !== card.id));
    setCurrentIndex((value) => value + 1);
  };

  const finish = () => {
    sessionStorage.setItem("tarot_drawn_cards", JSON.stringify(drawnCards));
    router.push("/tarot/analysis");
  };

  if (!spread) return null;

  const isComplete = currentIndex >= spread.cardCount;

  return (
    <section className="min-h-screen bg-[#08080b] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-400">{question}</p>
          <h1 className="mt-2 text-3xl font-bold text-[#d4af37]">{spread.name}</h1>
          {!isComplete && (
            <p className="mt-3 text-sm font-semibold text-[#d4af37]">
              Chon la bai cho vi tri: {spread.positions[currentIndex]?.name}
            </p>
          )}
        </div>

        <div className="mb-10 flex min-h-56 flex-wrap items-center justify-center gap-5">
          {drawnCards.map((item) => (
            <div key={`${item.position.id}-${item.card.id}`} className="text-center">
              <img
                src={cardImageMap[String(item.card.id)] || cardImageMap.back}
                alt={item.card.name}
                className={`h-44 w-28 rounded-lg border-2 border-[#d4af37] object-cover shadow-2xl ${item.isReversed ? "rotate-180" : ""}`}
              />
              <p className="mt-2 text-xs font-bold uppercase text-[#d4af37]">{item.position.name}</p>
              <p className="text-xs text-gray-200">{item.card.name}</p>
            </div>
          ))}
        </div>

        {isComplete ? (
          <div className="text-center">
            <Button onClick={finish} className="bg-[#bf7e26] px-8 text-white hover:bg-[#8b4513]">
              Xem luan giai va goi y san pham
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
            {remainingDeck.map((card) => (
              <button key={card.id} onClick={() => drawCard(card)} className="group">
                <img
                  src={cardImageMap.back}
                  alt="Tarot back"
                  className="h-32 w-full rounded-md border border-white/20 object-cover shadow-lg transition group-hover:-translate-y-2 group-hover:border-[#d4af37]"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

TarotDrawPage.getLayout = function getLayout(page: any) {
  return (
    <PrimaryLayout seo={{ title: "Draw Tarot | Commerce Monorepo", canonical: "/tarot/draw" }}>
      {page}
    </PrimaryLayout>
  );
};

export default TarotDrawPage;
