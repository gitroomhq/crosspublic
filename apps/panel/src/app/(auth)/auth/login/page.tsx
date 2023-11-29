import {Metadata} from "next";
import dynamic from "next/dynamic";
const LoginComponent = dynamic(() => import('@meetfaq/panel/src/components/auth/login.component'), { ssr: false });

export const metadata: Metadata = {
  title: 'MeetFAQ Login',
  description: '',
}

export default async function Registration() {
  return <LoginComponent />
}
