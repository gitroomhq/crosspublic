import './global.css';
import type { AppProps } from 'next/app';
import React from "react";
import {Inter} from "next/font/google";
const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
