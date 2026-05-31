import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";
import AstrologyCommercePage from "@/shared/features/page/AstrologyCommerce/AstrologyCommercePage";
import i18nConfig from "../../next-i18next.config";

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig)),
  },
});

const TuVanCaNhanPage = () => <AstrologyCommercePage kind="tu-van" />;

TuVanCaNhanPage.getLayout = function getLayout(page: any) {
  return (
    <PrimaryLayout seo={{ title: "Tư vấn cá nhân | Commerce Monorepo", canonical: "/tu-van-ca-nhan" }}>
      {page}
    </PrimaryLayout>
  );
};

export default TuVanCaNhanPage;
