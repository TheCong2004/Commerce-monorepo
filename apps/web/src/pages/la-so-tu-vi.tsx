import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";
import { Button } from "@/shared/ui/button";
import TuViProfessionalChart from "@/shared/features/page/TuViChart/TuViProfessionalChart";
import {
  CommerceRecommendation,
  Gender,
  generateTuViChart,
  getFengShuiProfile,
  getPersonalizedCommerceRecommendations,
} from "@/lib/astrologyRecommendations";
import i18nConfig from "../../next-i18next.config";

const BIRTH_HOURS = ["Ty", "Suu", "Dan", "Mao", "Thin", "Ti", "Ngo", "Mui", "Than", "Dau", "Tuat", "Hoi"];

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig)),
  },
});

function LaSoTuViPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("VO THE CONG");
  const [birthDate, setBirthDate] = useState("2004-10-26");
  const [birthHour, setBirthHour] = useState("Ty");
  const [gender, setGender] = useState<Gender>("Nu");
  const [selectedBranch, setSelectedBranch] = useState("");

  const birthYear = Number(birthDate.slice(0, 4)) || 2004;
  const chart = useMemo(
    () => generateTuViChart({ fullName, birthYear, birthDate, birthHour, gender }),
    [birthDate, birthHour, birthYear, fullName, gender],
  );
  const activePalace =
    chart.palaces.find((palace) => palace.branch === selectedBranch) ||
    chart.palaces.find((palace) => palace.name === "Menh") ||
    chart.palaces[0];
  const profile = useMemo(() => getFengShuiProfile(birthYear, gender), [birthYear, gender]);
  const recommendations = useMemo(
    () => getPersonalizedCommerceRecommendations(profile, `La so ${activePalace.name} ${activePalace.branch}`, 9),
    [activePalace.branch, activePalace.name, profile],
  );

  const addToCart = (product: CommerceRecommendation, redirect = false) => {
    const currentCart = JSON.parse(window.localStorage.getItem("cart_items") || "[]");
    const existingItem = currentCart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.personalization = `${product.personalizationPrompt} | La so: ${activePalace.name} ${activePalace.branch}`;
    } else {
      currentCart.push({
        ...product.cartPayload,
        personalization: `${product.personalizationPrompt} | La so: ${activePalace.name} ${activePalace.branch}`,
      });
    }

    window.localStorage.setItem("cart_items", JSON.stringify(currentCart));
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { success: true, cart: currentCart } }));

    if (redirect) {
      router.push("/cart");
    }
  };

  return (
    <div className="bg-[#fbfaf7]">
      <section className="border-b border-[#ead9b8] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#7c3aed]">Tu Vi AI commerce</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-5xl">
              Lap la so tu vi va ban san pham ca nhan hoa
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
              Phien ban nay boc phan manh cua tuvi-ai: la so 12 cung, Tam Hop, Doi Xung, zoom,
              chia se va tai du lieu. Ket qua duoc noi thang vao engine goi y POD, sim so dep va goi cuoc.
            </p>
          </div>

          <form className="rounded-lg border border-gray-200 bg-[#fffaf0] p-5 shadow-sm">
            <div className="grid gap-4">
              <div>
                <label htmlFor="fullName" className="text-sm font-semibold text-gray-800">Ho ten</label>
                <input
                  id="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7c3aed]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="birthDate" className="text-sm font-semibold text-gray-800">Ngay sinh</label>
                  <input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    min="1900-01-01"
                    max="2026-12-31"
                    onChange={(event) => setBirthDate(event.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label htmlFor="birthHour" className="text-sm font-semibold text-gray-800">Gio sinh</label>
                  <select
                    id="birthHour"
                    value={birthHour}
                    onChange={(event) => setBirthHour(event.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7c3aed]"
                  >
                    {BIRTH_HOURS.map((hour) => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="gender" className="text-sm font-semibold text-gray-800">Gioi tinh</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value as Gender)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7c3aed]"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nu</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <TuViProfessionalChart chart={chart} onSelectPalace={(palace) => setSelectedBranch(palace.branch)} />

        <section className="mt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#7c3aed]">
                Recommendation theo cung {activePalace.name}
              </p>
              <h2 className="text-2xl font-bold text-gray-950">San pham co the ban ngay</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-gray-600">
              Click tung cung tren la so de doi ngu canh goi y. Cart se luu ca thong tin ca nhan hoa tu la so.
            </p>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                {product.thumbnail ? (
                  <Link href={product.href || "#"} className="block">
                    <div className="relative aspect-[4/3] bg-gray-100">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-[#251540] px-6 text-center text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">{product.badge}</p>
                      <p className="mt-3 text-2xl font-bold">{product.kind === "sim" ? product.title.replace("Sim phong thuy ", "") : "Goi cuoc"}</p>
                      <p className="mt-2 text-sm text-violet-100">{activePalace.name} - {activePalace.branch}</p>
                    </div>
                  </div>
                )}
                <div className="space-y-3 p-4">
                  <div>
                    {product.href ? (
                      <Link href={product.href} className="line-clamp-1 font-semibold text-gray-950 hover:text-[#7c3aed]">
                        {product.title}
                      </Link>
                    ) : (
                      <h3 className="line-clamp-1 font-semibold text-gray-950">{product.title}</h3>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">{product.badge}</span>
                      <span className="text-sm font-bold text-[#7c3aed]">{formatRecommendationPrice(product)}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{product.astrologyReason}</p>
                  </div>
                  <div className="rounded-md bg-violet-50 p-3 text-xs leading-5 text-violet-950">
                    <span className="font-semibold">Prompt ca nhan hoa: </span>
                    {product.personalizationPrompt} | Cung {activePalace.name}, hanh {activePalace.branchElement}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Diem phu hop</p>
                      <p className="font-bold text-[#7c3aed]">{product.score}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => addToCart(product)} className="h-9">
                        Them
                      </Button>
                      <Button onClick={() => addToCart(product, true)} className="h-9 bg-[#7c3aed] text-white hover:bg-[#6d28d9]">
                        Mua ngay
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

LaSoTuViPage.getLayout = function getLayout(page: any) {
  return (
    <PrimaryLayout seo={{ title: "La so tu vi | Commerce Monorepo", canonical: "/la-so-tu-vi" }}>
      {page}
    </PrimaryLayout>
  );
};

function formatRecommendationPrice(product: CommerceRecommendation) {
  if (product.kind === "pod") {
    return `$${(product.price / 100).toFixed(2)}`;
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(product.price);
}

export default LaSoTuViPage;
