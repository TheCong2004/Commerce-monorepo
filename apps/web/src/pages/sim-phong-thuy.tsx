import { GetStaticProps } from "next";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";
import { Button } from "@/shared/ui/button";
import {
  Gender,
  getFengShuiProfile,
  getPersonalizedCommerceRecommendations,
  scoreFengShuiSim,
} from "@/lib/astrologyRecommendations";
import i18nConfig from "../../next-i18next.config";

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig)),
  },
});

const SimPhongThuyPage = () => {
  const [simNumber, setSimNumber] = useState("0912.888.999");
  const [birthYear, setBirthYear] = useState(1995);
  const [gender, setGender] = useState<Gender>("Nam");

  const profile = getFengShuiProfile(birthYear, gender);
  const simResult = scoreFengShuiSim(simNumber, birthYear);
  const simRecommendations = getPersonalizedCommerceRecommendations(profile, "Mua sim phong thuy", 8).filter(
    (item) => item.kind === "sim",
  );

  const addToCart = (item: (typeof simRecommendations)[number], redirect = false) => {
    const currentCart = JSON.parse(window.localStorage.getItem("cart_items") || "[]");
    const existingItem = currentCart.find((cartItem: any) => cartItem.id === item.id);

    if (existingItem) existingItem.quantity += 1;
    else currentCart.push(item.cartPayload);

    window.localStorage.setItem("cart_items", JSON.stringify(currentCart));
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { success: true, cart: currentCart } }));
    if (redirect) window.location.href = "/cart";
  };

  return (
    <section className="min-h-screen bg-[#fbfaf7] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#9a3412]">Sim phong thuy</p>
          <h1 className="mt-2 text-4xl font-bold text-gray-950">Cham diem sim va goi y so hop menh</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Thuat toan duoc boc tu xemboituvi: ngu hanh theo nam sinh, tong nut, am duong va que dich.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="sim" className="text-sm font-semibold text-gray-800">So sim</label>
                <input
                  id="sim"
                  value={simNumber}
                  onChange={(event) => setSimNumber(event.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#c2410c]"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="birthYear" className="text-sm font-semibold text-gray-800">Nam sinh</label>
                  <input
                    id="birthYear"
                    type="number"
                    min={1900}
                    max={2026}
                    value={birthYear}
                    onChange={(event) => setBirthYear(Number(event.target.value))}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#c2410c]"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="text-sm font-semibold text-gray-800">Gioi tinh</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value as Gender)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#c2410c]"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nu">Nu</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-[#fff7ed] p-4">
              <p className="text-sm font-semibold text-[#7c2d12]">Ket qua sim dang xem</p>
              <p className="mt-2 text-3xl font-bold text-[#c2410c]">{simResult.totalScore}/10</p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-[#7c2d12]">
                <p>Menh nam sinh: {simResult.element}</p>
                <p>Tong nut: {simResult.totalPoint}</p>
                <p>Am duong: {simResult.yinYang.even}/{simResult.yinYang.odd} - {simResult.yinYang.status}</p>
                <p>Que dich: {simResult.queDich.name}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-950">Danh sach sim de ban</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {simRecommendations.map((item) => (
                <article key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{item.astrologyReason}</p>
                    </div>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">{item.score}</span>
                  </div>
                  <p className="mt-3 text-lg font-bold text-[#c2410c]">{formatVnd(item.price)}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" onClick={() => addToCart(item)}>Them</Button>
                    <Button className="bg-[#c2410c] text-white hover:bg-[#9a3412]" onClick={() => addToCart(item, true)}>
                      Mua ngay
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function formatVnd(value: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
}

SimPhongThuyPage.getLayout = function getLayout(page: any) {
  return (
    <PrimaryLayout seo={{ title: "Sim phong thuy | Commerce Monorepo", canonical: "/sim-phong-thuy" }}>
      {page}
    </PrimaryLayout>
  );
};

export default SimPhongThuyPage;
