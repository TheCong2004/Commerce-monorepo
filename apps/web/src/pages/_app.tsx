import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@commerce/shared-hooks';

const queryClient = new QueryClient();

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  // Nếu chưa mounted (đang SSR), chúng ta vẫn render để SEO, 
  // nhưng nếu lỗi useState xảy ra, việc bọc kỹ này sẽ giúp cô lập lỗi.
  return (
    <QueryClientProvider client={queryClient}>
      <div id="app-root">
        {getLayout(<Component {...pageProps} />)}
      </div>
    </QueryClientProvider>
  );
}

export default api.withTRPC(MyApp);
