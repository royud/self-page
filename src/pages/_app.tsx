import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";

import { MainLayout, AdminLayout } from "@/layout";
import { useRouter } from "next/router";

import { ROUTE_ADMIN } from "@/const";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>셀프 페이지</title>
      </Head>
      <GlobalStyle />
      {router.pathname.includes(ROUTE_ADMIN) ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </ThemeProvider>
  );
}
