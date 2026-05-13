import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PrimaryLayout } from '@/layouts/PrimaryLayout';

// Components from HomePage features (NAMED EXPORTS)
import { Hero } from '@/shared/features/page/HomePage/components/Hero';
import { SaleProduct } from '@/shared/features/page/HomePage/components/Promotions';
import { TopPick } from '@/shared/features/page/HomePage/components/TopPick';
import { Trending } from '@/shared/features/page/HomePage/components/Trending';
import { AdsSpace } from '@/shared/features/page/HomePage/components/SpaceAds';

// Components from HomePage features (DEFAULT EXPORTS)
import CreateYourOwn from '@/shared/features/page/HomePage/components/CreateYourOwn';

// Other shared components (NAMED EXPORTS)
import { QuickGiftFinder } from '@/shared/layout/header/QuickGiftFinder';

// Package-based components (DEFAULT EXPORTS)
import RecentlyViewedNew from '@/packages/browsing-history/components/RecentlyViewedNew';
import BasedOnWhatYouLove from '@/packages/BasedOnWhatYouLove/components/BasedOnWhatYouLove';

// Package-based components (NAMED EXPORTS)
import { InStory } from '@/packages/in-story';

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
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      productSalesData: [],
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