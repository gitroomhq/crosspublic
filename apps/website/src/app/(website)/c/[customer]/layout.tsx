import '../../../styles.css';
import {Metadata} from "next";
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Home',
    description: '',
}

export const dynamic = 'force-static';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <div className="w-full h-[300px] p-10 bg-primary flex flex-col items-center text-white">
              <div className="w-full max-w-[800px] flex flex-col flex-1 justify-between">
                  <div>
                  Logo
                  </div>
                  <div className="text-4xl">Advice and answer from name team</div>
                  <div>
                      <input placeholder="Search FAQ..." className="text-black rounded-container w-full h-[60px] bg-white/20 outline-none px-5 hover:bg-white/30 focus:bg-white transition-all" />
                  </div>
              </div>
          </div>
          <div className="p-10 flex justify-center flex-1">
              <div className="w-full max-w-[800px] flex flex-col flex-1">
                  {children}
              </div>
          </div>
          <div>
            <div className="p-10 flex justify-center flex-1">
              <div className="w-full max-w-[800px] flex flex-1">
                <div>Powered by</div>
                <a href="https://meetfaq.com" target="_blank" className="text-primary ml-1">MeetFAQ</a>
              </div>
            </div>
          </div>
        </div>
        </body>
        </html>
    )
}
