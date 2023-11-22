import '../styles.css';
import {Metadata} from "next";
import { Inter } from 'next/font/google'
import HeaderSectionComponent from "@meetqa/website/src/components/website/header.section.component";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Home',
    description: '',
}

export const dynamic = 'force-static';

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
      <html lang="en">
      <body className={inter.className}>
        <HeaderSectionComponent />
        <main className="mb-40">
          {children}
        </main>
      </body>
      </html>
  )
}
