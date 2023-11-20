import {headers} from "next/dist/client/components/headers";

export const userToken = () => headers().get('token')!;
