import '../../styles.css';
import 'react-toastify/dist/ReactToastify.css';
import {Metadata} from "next";
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen w-full bg-auth bg-cover flex">
          <div className="flex flex-1 items-center p-10 flex-col gap-4">
            <div className="flex items-center gap-2 justify-center w-full max-w-[840px]">
              <img src="/logobot.png" className="max-w-[30px]" />
              <div>crosspublic</div>
            </div>
            <div className="w-full max-w-[840px]">
              {children}
            </div>
          </div>
        </div>
      </body>
      </html>
  )
}

