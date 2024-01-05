import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { Router } from 'next/router';
import { NextPage } from 'next';
import { theme } from '../theme';
import { LoaderAnimation } from '@/components/__utils__/Loader';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [loading, setLoading] = useState(true);
  const getLayout = Component.getLayout ?? ((page) => page);
  const handlePageScroll = useCallback(() => {
    setTimeout(() => {
      if (typeof window !== undefined && window.location.hash) {
        const pageSection = document.getElementById(window.location.hash.substring(1));
        if (pageSection && pageSection.offsetTop) {
          window.scrollTo({
            top: pageSection.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    setLoading(false);
    handlePageScroll();
  }, [handlePageScroll]);

  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
    handlePageScroll();
  });
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Hermoney</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? <LoaderAnimation /> : <> {getLayout(<Component {...pageProps} />)}</>}
    </MantineProvider>
  );
}
