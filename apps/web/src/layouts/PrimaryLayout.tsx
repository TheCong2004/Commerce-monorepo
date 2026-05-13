import React from 'react';
import { NextSeo, type NextSeoProps } from 'next-seo';
import { Footer } from '@/shared/layout/footer/Footer';
import { Toaster } from 'sonner';

// Tạm thời dùng Header đơn giản để tránh lỗi 500
const Header = () => (
  <header style={{ padding: '20px', background: '#fce4ec', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
    <h1 style={{ fontWeight: 'bold' }}>Header (Đang kiểm tra lỗi)</h1>
  </header>
);

interface PrimaryLayoutProps extends React.PropsWithChildren {
  seo: NextSeoProps;
}

export const PrimaryLayout = ({ seo, children }: PrimaryLayoutProps) => {
  return (
    <>
      <NextSeo {...seo} />
      <Header />
      {children}
      <Toaster />
      <Footer />
    </>
  );
};
