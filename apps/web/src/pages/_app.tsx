import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { api } from '@/utils/api';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import NextNProgress from 'nextjs-progressbar';
import i18nConfig from '../../next-i18next.config';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className={`${inter.variable} font-sans`}>
      {getLayout(
        <>
          <NextNProgress
            color="#8b5cf6"
            height={3}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />
        </>
      )}
      <Analytics />
    </main>
  );
}

// Bọc cả tRPC và Đa ngôn ngữ (có truyền config)
export default api.withTRPC(appWithTranslation(MyApp, i18nConfig));
