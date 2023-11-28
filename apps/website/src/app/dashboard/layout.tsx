import '../styles.css';
import 'react-toastify/dist/ReactToastify.css';
import {LayoutComponent} from "@meetfaq/website/src/components/layout/layout.component";
import {Metadata} from "next";
import { headers } from 'next/dist/client/components/headers';
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '',
    description: '',
}

export default function DashboardLayout({ children, params }: { children: React.ReactNode, params: any }) {
    const headersList = headers();
    return (
        <>
            <LayoutComponent user={JSON.parse(headersList.get('user')!)} className={inter.className}>
                {children}
            </LayoutComponent>
        </>
    )
}
