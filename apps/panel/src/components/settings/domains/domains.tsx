"use client";

import {useCallback, useState} from 'react'
import LoadingDots from './components/loading-dots'
import DomainCard from './components/domain-card'
import {Input} from "@meetfaq/panel/src/components/utils/input";
import {Button} from "@meetfaq/panel/src/components/utils/button";
import {useFetch} from "@meetfaq/panel/src/helpers/fetch.context";
import {SubmitHandler, useForm} from "react-hook-form";

export default function Domains({domains} : {domains: any[]}) {
    const fetchObject = useFetch();
    const [domainList, setDomainList] = useState<any[]>(domains);
    const {handleSubmit, setValue, register, formState} = useForm({
        values: {
            domain: ''
        },
        mode: 'onChange',
    });

    const submit: SubmitHandler<{domain: string}> = useCallback(async (a) => {
        try {
            const {data, status} = await fetchObject.post('/settings/domain', {domain: a.domain});
            if (status !== 200 && status !== 201) return;
            setValue('domain', '');
            setDomainList([...domainList, data]);
        }
        catch (err) {}
    }, []);

    return (
        <>
            {!domainList.length && (
                <form
                    onSubmit={handleSubmit(submit)}
                    className="flex"
                >
                    <div className="flex mt-5 w-[615px]">
                        <div className="flex flex-1">
                            <Input
                                label="Custom Domain"
                                type="text"
                                topDivClass="flex-1"
                                className="w-full"
                                {...register('domain', {required: {value: true, message: 'Domain name is required'}, pattern: {value: /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, message: 'Invalid domain name'}})}
                                placeholder="mydomain.com"
                                error={formState?.errors.domain}
                            />
                        </div>
                        <div className="mt-[1.6rem]">
                            <Button
                                type="submit"
                                disabled={!formState.isValid || formState.isSubmitting}
                                className="ml-2"
                            >
                                {formState.isSubmitting ? <LoadingDots /> : 'Save'}
                            </Button>
                        </div>
                    </div>
                </form>
            )}

            <div className="w-[615px]">
                {domainList.map((domain: any, index: any) => {
                    return (
                        <DomainCard
                            deleteDomain={() => {
                                setDomainList(
                                    domainList.filter((d) => d.id !== domain.id)
                                )
                            }}
                            key={index}
                            domain={domain.domain}
                            id={domain.id}
                        />
                    )
                })}
            </div>
        </>
    )
}
