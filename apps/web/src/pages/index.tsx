import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PrimaryLayout } from '@/layouts/PrimaryLayout';
import { Hero } from '@/shared/components/Hero';
import { QuickGiftFinder } from '@/shared/components/QuickGiftFinder';
import { SaleProduct } from '@/shared/components/SaleProduct';
import { RecentlyViewedNew } from '@/shared/components/RecentlyViewedNew';
import { BasedOnWhatYouLove } from '@/shared/components/BasedOnWhatYouLove';
import { TopPick } from '@/shared/components/TopPick';
import { InStory } from '@/shared/components/InStory';
import { CreateYourOwn } from '@/shared/components/CreateYourOwn';
import { Trending } from '@/shared/components/Trending';
import { AdsSpace } from '@/shared/components/AdsSpace';
import i18nConfig from '../../next-i18next.config';

const Home = ({ productSalesData, productTopPickData, priceList }: any) => {
  return (
    <>
      <Hero />
      <QuickGiftFinder />
      <div >
        <SaleProduct TopSale={productSalesData as any} title={priceList?.price_lists?.[0]?.title as string} />
        <div className='px-[30px]'>
          <RecentlyViewedNew />
          <BasedOnWhatYouLove
            currentProductId="p1"
            category="t-shirt"
            limit={5}
          />
          <TopPick product={productTopPickData as any} title={priceList?.price_lists?.[1]?.title as string} />
          <InStory />
          <CreateYourOwn />
          <Trending />
        </div>
      </div>
      <div className='px-[30px]'>
        <AdsSpace />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  // Chúng ta vẫn có thể dùng serverSideTranslations để lấy dữ liệu dịch, 
  // dù tạm thời chưa dùng appWithTranslation ở _app.tsx
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      productSalesData: [], // Mock data hoặc lấy từ API
      productTopPickData: [],
      priceList: { price_lists: [{ title: 'Hot Sale' }, { title: 'Top Picks' }] }
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout seo={{ title: 'Home | Commerce Monorepo', canonical: '/' }}>
      {page}
    </PrimaryLayout>
  );
};

export default Home;