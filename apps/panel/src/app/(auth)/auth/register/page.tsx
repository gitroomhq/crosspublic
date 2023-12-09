import {Metadata} from "next";
import dynamic from "next/dynamic";
const RegistrationComponent = dynamic(() => import('@crosspublic/panel/src/components/auth/registration.component'), { ssr: false });
export const metadata: Metadata = {
  title: 'crosspublic Registration',
  description: '',
}

export default async function Registration() {
  return <RegistrationComponent />
}
