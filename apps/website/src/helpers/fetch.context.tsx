"use client";

import {createContext, ReactNode, useContext} from "react";
import {HttpStatus} from "@nestjs/common";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {Payment} from "@meetqa/website/src/components/payment/payment";
const MySwal = withReactContent(Swal);

export const customFetch = {
    get: async (url: string, request?: RequestInit) => {
        const load = await fetch(process?.env?.NEXT_PUBLIC_BACKEND_URL + url, {
            ...request,
            method: "GET",
            cache: request?.cache || "no-store",
            credentials: "include",
            headers: {
                ...request?.headers
            }
        });

        return interceptResponse(load);
    },
    post: async (url: string, body?: object, request?: RequestInit) => {
        const load = await fetch(process?.env?.NEXT_PUBLIC_BACKEND_URL + url, {
            ...request,
            ...body ? {body: JSON.stringify(body)} : {},
            method: "POST",
            credentials: "include",
            headers: {
                ...request?.headers,
                "Content-Type": "application/json"
            },
            cache: request?.cache || "no-store",
        });

        return interceptResponse(load);
    },
    put: async (url: string, body?: object, request?: RequestInit) => {
        const load = await fetch(process?.env?.NEXT_PUBLIC_BACKEND_URL + url, {
            ...request,
            ...body ? {body: JSON.stringify(body)} : {},
            method: "PUT",
            credentials: "include",
            headers: {
                ...request?.headers,
                "Content-Type": "application/json"
            }
        });

        return interceptResponse(load);
    },
    delete: async (url: string, body?: object, request?: RequestInit) => {
        const load = await fetch(process?.env?.NEXT_PUBLIC_BACKEND_URL + url, {
            ...request,
            ...body ? {body: JSON.stringify(body)} : {},
            method: "DELETE",
            credentials: "include",
            headers: {
                ...request?.headers,
                "Content-Type": "application/json"
            }
        });

        return interceptResponse(load);
    }
}

const parseData = async (response: Response) => {
    try {
        const data = await response.json();
        return data;
    }
    catch (err) {
        return undefined;
    }
}

const interceptResponse = async (response: Response) => {
    const data = await parseData(response);
    if (!response.ok) {
        if (response.status === HttpStatus.PAYMENT_REQUIRED) {
            const billing = await MySwal.fire({
                title: 'Payment Required',
                width: 1400,
                confirmButtonText: 'Move to billing',
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                html: <Payment message={data.message} />
            });

            if (billing.isConfirmed) {
                window.open('/dashboard/billing');
            }
        }
        throw new Error(response.statusText);
    }

    return {data, status: response.status};
}

export const CustomFetchHigherContext = createContext(customFetch);
export const useFetch = () => useContext(CustomFetchHigherContext);

export const FetchContext = (props: {children: ReactNode}) => {
    return (
        <CustomFetchHigherContext.Provider value={customFetch}>
            {props.children}
        </CustomFetchHigherContext.Provider>
    )
}
