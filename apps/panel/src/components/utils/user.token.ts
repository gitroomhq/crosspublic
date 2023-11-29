import { cookies, headers } from 'next/headers';
export const userToken = () => cookies().get('auth')?.value ||  headers().get('auth') || '';
