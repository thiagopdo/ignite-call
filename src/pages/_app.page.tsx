import "../lib/dayjs";

import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { queryClient } from "../lib/react-query";
import { globalStyles } from "../styles/global";
import { DefaultSeo } from "next-seo";

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "pt_BR",
            url: "https://www.url.ie/",
            siteName: "SiteName",
          }}
        />
        <Component {...pageProps} />;
      </SessionProvider>
    </QueryClientProvider>
  );
}
