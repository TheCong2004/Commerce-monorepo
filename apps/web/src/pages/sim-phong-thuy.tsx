import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";
import { Button } from "@/shared/ui/button";
import { SIM_OFFERS } from "@/lib/simData";
import i18nConfig from "../../next-i18next.config";

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig)),
  },
});

const SimPage = () => {
  const addToCart = (item: any) => {
    const checkoutItem = {
      id: item.id,
      title: `Sim số đẹp ${item.number}`,
      quantity: 1,
      unit_price: item.price,
      variant_title: `${item.provider} - ${item.pattern}`,
      thumbnail: "",
      metadata: { source: "sim-page" }
    };

    const url = new URL(window.location.origin + "/cart");
    url.searchParams.set("checkout_items", JSON.stringify([checkoutItem]));
    window.location.href = url.toString();
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Kho Sim Số Đẹp</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Tìm kiếm và sở hữu ngay sim số đẹp từ các nhà mạng hàng đầu. Thanh toán nhanh chóng, giao sim tận nơi.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SIM_OFFERS.map((item) => (
            <article key={item.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-0.5 text-xs font-medium text-orange-800">
                    {item.provider}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{item.number}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.pattern}</p>
                <p className="mt-6 text-2xl font-bold text-orange-600">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  className="w-full bg-orange-600 py-6 text-lg font-bold text-white hover:bg-orange-700 focus:ring-4 focus:ring-orange-300"
                  onClick={() => addToCart(item)}
                >
                  Mua ngay
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

SimPage.getLayout = function getLayout(page: any) {
  return (
    <PrimaryLayout seo={{ title: "Mua Sim Số Đẹp | Commerce", canonical: "/sim-phong-thuy" }}>
      {page}
    </PrimaryLayout>
  );
};

export default SimPage;
