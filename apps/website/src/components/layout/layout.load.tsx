"use client"
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const LayoutLoad = () => {
    const router = useRouter();
    useEffect(() => {
        const auth = new URL(window.location.href);
        if (auth.searchParams.get('auth')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            auth.searchParams.delete('auth');
            router.replace(
                auth.toString(),
                undefined,
            );
        }
    }, [router]);

    return <></>;
}

export default LayoutLoad;
