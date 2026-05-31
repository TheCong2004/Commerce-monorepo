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

const TuViPage = () => <AstrologyCommercePage kind="tu-vi" />;

TuViPage.getLayout = function getLayout(page: any) {
  return (
    <PrimaryLayout seo={{ title: "Tử vi chọn quà | Commerce Monorepo", canonical: "/tu-vi" }}>
      {page}
    </PrimaryLayout>
  );
};

export default TuViPage;
