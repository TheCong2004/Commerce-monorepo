import React from 'react';
import { Footer } from '@/shared/layout/footer/Footer';

interface PrimaryLayoutProps extends React.PropsWithChildren {
  seo: any;
}

export const PrimaryLayout = ({ children }: PrimaryLayoutProps) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};
