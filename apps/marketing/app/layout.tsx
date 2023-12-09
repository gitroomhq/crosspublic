import './global.css';
import HeaderSection from "@crosspublic/marketing/components/HeaderSection";
import {Inter} from "next/font/google";
import Footer from "@crosspublic/marketing/components/FooterSection";

export const metadata = {
  title: 'crosspublic - The place to meet and ask questions',
  description: '',
};

const inter = Inter({ subsets: ['latin'] })
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = new Date();
  const dateAndHour = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
  const {stargazers_count} = await (await fetch(`https://api.github.com/repos/github-20k/crosspublic?c=${dateAndHour}`)).json();
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderSection stars={stargazers_count} />
        <div className="min-h-screen flex flex-col gap-[40px]">
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
