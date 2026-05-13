import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { api } from '@/utils/api';
import '@/styles/globals.css';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Ưu tiên render trực tiếp Component nếu có thể để tránh lỗi Hook lồng nhau
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <div id="app-root">
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}

// Tạm thời bỏ appWithTranslation, chỉ giữ lại tRPC (vì tRPC là bắt buộc để build)
export default api.withTRPC(MyApp);
