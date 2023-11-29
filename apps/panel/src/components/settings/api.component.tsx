"use client";

import { Input } from "../utils/input"
import {FC, useCallback} from "react";
import {Button} from "@meetfaq/panel/src/components/utils/button";
import {toast} from "react-toastify";

export const ApiComponent: FC<{apiKey: string}> = (props) => {
    const {apiKey} = props;
    const copyToClipboard = useCallback(async () => {
        await navigator.clipboard.writeText(apiKey);
        toast.success('Copied to clipboard');
    }, []);
    return (
        <div>
            <div className="w-[615px] mt-20 flex items-end">
                <div className="flex-1">
                    <Input onClick={copyToClipboard} label="API KEY" className="w-full" value={apiKey} readOnly={true} />
                </div>
                <div className="ml-2">
                    <Button onClick={copyToClipboard}>Copy</Button>
                </div>
            </div>
            <div className="text-xs mt-2">
                <a className="underline hover:font-bold" target="_blank" href="https://docs.meetfaq.com/public-api-reference/introduction">
                    Read the docs
                </a>
            </div>
        </div>
    )
}
