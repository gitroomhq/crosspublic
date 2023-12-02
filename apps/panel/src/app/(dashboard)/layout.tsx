import '../styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import {LayoutComponent} from "@meetfaq/panel/src/components/layout/layout.component";
import {Metadata} from "next";
import { cookies, headers } from 'next/headers';
import { Inter } from 'next/font/google'
import {fetchBackend} from "@meetfaq/helpers/src/fetchObject/custom.fetch.backend";
import {redirect} from "next/navigation";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '',
    description: '',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode, params: any }) {
    const cookiesList = cookies();
    const cookieToken = cookiesList.get('auth')?.value;
    const headersToken = headers().get('auth');

    if (!cookieToken && !headersToken) {
      return redirect('/auth/login');
    }

    const response = await fetchBackend('/users/self', {
      headers: {
        auth: cookieToken || headersToken
      },
      cache: 'force-cache',
      tags: [cookieToken || headersToken],
      next: {
        revalidate: 3600
      }
    });

    if (response.status === 401) {
      return redirect('/auth/logout');
    }

    return (
        <>
            <LayoutComponent user={await response.json()} className={inter.className}>
                {children}
            </LayoutComponent>
        </>
    )
}
