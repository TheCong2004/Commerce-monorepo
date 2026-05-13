import React from 'react';
import { Footer } from '@/shared/layout/footer/Footer';
import { Header } from '@/shared/layout/header/Header';
import { Toaster } from 'sonner';

interface PrimaryLayoutProps extends React.PropsWithChildren {
  seo: any;
}

export const PrimaryLayout = ({ children }: PrimaryLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
};
