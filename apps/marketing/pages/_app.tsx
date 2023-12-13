import './global.css';
import type { AppProps } from 'next/app';
import React from "react";
import {Inter} from "next/font/google";
const inter = Inter({ subsets: ['latin'] });
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.url.ie/',
          siteName: 'crosspublic',
          images: [
            {
              url: '/og.png',
              width: 1200,
              height: 630,
              alt: 'crosspublic',
            },
          ]
        }}
        twitter={{
          handle: '@nevodavid',
          site: '@nevodavid',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </main>
  );
}
