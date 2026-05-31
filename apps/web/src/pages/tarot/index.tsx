import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";
import { Button } from "@/shared/ui/button";
import spreadsData from "@/features/tarot/data/spreads.json";
import type { Gender, TarotSpread } from "@commerce/astrology-core";
import i18nConfig from "../../../next-i18next.config";

const spreads = (spreadsData as { spreads: TarotSpread[] }).spreads;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig)),
  },
});

const TarotPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [selectedSpread, setSelectedSpread] = useState(spreads[1]?.id || spreads[0]?.id || "");
  const [birthYear, setBirthYear] = useState(1995);
  const [gender, setGender] = useState<Gender>("Nam");

  const startReading = () => {
    if (!question.trim() || !selectedSpread) return;
    sessionStorage.setItem("tarot_question", question.trim());
    sessionStorage.setItem("tarot_spread", selectedSpread);
    sessionStorage.setItem("tarot_birth_year", String(birthYear));
    sessionStorage.setItem("tarot_gender", gender);
    router.push("/tarot/draw");
  };

  return (
    <section className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Tarot from xemboituvi</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Trai bai Tarot ca nhan hoa</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300">
            Flow tarot duoc migrate tu xemboituvi, sau do noi sang recommendation POD, sim so dep va goi cuoc.
          </p>
        </div>

        <div className="rounded-lg border border-[#d4af37]/40 bg-[#f9f4e8] p-5 text-gray-950 shadow-2xl sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div>
              <label className="text-sm font-bold uppercase tracking-wide text-[#8b4513]" htmlFor="question">
                Cau hoi cua ban
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                rows={5}
                placeholder="Ban muon biet dieu gi?"
                className="mt-2 w-full rounded-md border border-[#d4c5a9] bg-white px-4 py-3 text-sm outline-none focus:border-[#bf7e26]"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold uppercase tracking-wide text-[#8b4513]" htmlFor="birthYear">Nam sinh</label>
                <input
                  id="birthYear"
                  type="number"
                  min={1900}
                  max={2026}
                  value={birthYear}
                  onChange={(event) => setBirthYear(Number(event.target.value))}
                  className="mt-2 w-full rounded-md border border-[#d4c5a9] bg-white px-4 py-3 text-sm outline-none focus:border-[#bf7e26]"
                />
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wide text-[#8b4513]" htmlFor="gender">Gioi tinh</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value as Gender)}
                  className="mt-2 w-full rounded-md border border-[#d4c5a9] bg-white px-4 py-3 text-sm outline-none focus:border-[#bf7e26]"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nu</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-bold uppercase tracking-wide text-[#8b4513]">Chon kieu trai bai</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {spreads.map((spread) => (
                <button
                  key={spread.id}
                  onClick={() => setSelectedSpread(spread.id)}
                  className={`rounded-lg border-2 p-4 text-left transition ${
                    selectedSpread === spread.id
                      ? "border-[#8b4513] bg-[#bf7e26] text-white"
                      : "border-[#d4c5a9] bg-white text-[#3a2a14] hover:border-[#bf7e26]"
                  }`}
                >
                  <h2 className="font-bold">{spread.name}</h2>
                  <p className="mt-2 text-sm opacity-80">{spread.description}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide">{spread.cardCount} la bai</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={startReading}
              disabled={!question.trim() || !selectedSpread}
              className="bg-[#bf7e26] px-8 text-white hover:bg-[#8b4513]"
            >
              Bat dau trai bai
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

TarotPage.getLayout = function getLayout(page: any) {
  return (
    <PrimaryLayout seo={{ title: "Tarot | Commerce Monorepo", canonical: "/tarot" }}>
      {page}
    </PrimaryLayout>
  );
};

export default TarotPage;
