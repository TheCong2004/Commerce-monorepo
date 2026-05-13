import React from 'react';
import { NextSeo } from 'next-seo';
import { Footer } from '@/shared/layout/footer/Footer';
import { Toaster } from 'sonner';

// Đổi tên để tránh trùng lặp hệ thống
const DebugHeader = () => (
  <header style={{ padding: '20px', background: '#fce4ec', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
    <h1 style={{ fontWeight: 'bold' }}>HEADER DEBUG</h1>
  </header>
);

interface PrimaryLayoutProps extends React.PropsWithChildren {
  seo: any;
}

export const PrimaryLayout = ({ seo, children }: PrimaryLayoutProps) => {
  return (
    <>
      {/* Tạm tắt NextSeo để loại trừ khả năng lỗi SEO */}
      {/* <NextSeo {...seo} /> */}
      <DebugHeader />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
};
