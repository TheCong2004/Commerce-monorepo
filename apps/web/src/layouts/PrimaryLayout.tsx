import React from 'react';
import { NextSeo, type NextSeoProps } from 'next-seo';
import { Footer } from '@/shared/layout/footer/Footer';
import { Header } from '@/shared/layout/header/Header';

interface PrimaryLayoutProps extends React.PropsWithChildren {
  seo: NextSeoProps;
}

export const PrimaryLayout = ({ seo, children }: PrimaryLayoutProps) => {
  return (
    <>
      <NextSeo {...seo} />
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Toaster sẽ được bật lại sau khi hệ thống ổn định */}
    </>
  );
};
