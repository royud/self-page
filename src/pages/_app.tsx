import { createContext } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "@/styles/global-style";

import { MainLayout, AdminLayout } from "@/layout";
import { useRouter } from "next/router";

import { ROUTE_ADMIN } from "@/const";
import { useTheme } from "@/hooks/useTheme";
import { lightTheme, darkTheme } from "@/styles/theme";

const defaultTheme = {
  theme: "light",
  changeTheme: () => {},
};

export const CustomThemeContext = createContext(defaultTheme);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const themeProps = useTheme();

  return (
    <>
      <Head>
        <title>셀프 페이지</title>
      </Head>
      <CustomThemeContext.Provider value={themeProps}>
        <ThemeProvider
          theme={themeProps.theme === "light" ? lightTheme : darkTheme}
        >
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
      </CustomThemeContext.Provider>
    </>
  );
}
