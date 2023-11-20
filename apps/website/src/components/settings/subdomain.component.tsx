"use client";

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {FC, useCallback, useState} from "react";
import {Input} from "@meetqa/website/src/components/utils/input";
import {Button} from "@meetqa/website/src/components/utils/button";
import {useFetch} from "@meetqa/website/src/helpers/fetch.context";
import {CheckDomainComponent} from "@meetqa/website/src/components/settings/check.domain.component";
import {useRouter} from "next/navigation";
import {deleteDialog} from "@meetqa/website/src/helpers/delete.dialog";

export const SubdomainComponent: FC<{subDomain: string}> = (props) => {
    const {subDomain} = props;
    const [initialSubdomain, setInitialSubdomain] = useState(subDomain);
    const router = useRouter();
    const axios = useFetch();

    const {watch, register, formState} = useForm({
        defaultValues: {
            subDomain,
            validInvalid: true
        },
        values: {
            subDomain,
            validInvalid: true
        },
        mode: 'onChange',
    });
    const validInvalid = register('validInvalid', {
        validate: (b: boolean) => {
            return b;
        }});
    const subDomainWatch = watch('subDomain');

    const {handleSubmit} = useForm();

    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (props) => {
        const currentUrl = new URL(window.location.href).host;
        const newUrl = currentUrl.replace(initialSubdomain, subDomainWatch);
        try {
            await deleteDialog('Are you sure you want to change your subdomain? Other people would be able to claim this subdomain. Any previous SEO you have had will be lost', 'Yes, do it!');
            await axios.post('/settings/subdomain', {subDomain: subDomainWatch});
            setInitialSubdomain(subDomainWatch);
            router.replace(window.location.href.replace(currentUrl, newUrl));
        }
        catch (err) {}
    }, [subDomainWatch]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start w-[615px]">
                <div className="flex flex-col flex-1">
                    <div className="text-sm mb-2">Subdomain:</div>
                    <div className="flex items-center">
                        <div className="flex flex-col flex-1">
                            <div className="rounded-container bg-white border-gray border outline-none text-sm flex flex-1 overflow-hidden">
                                <div className="flex-1">
                                    <Input maxLength={20} className="!border-0 w-full !rounded-none flex-1 py-[10px] px-[15px]" required={true} label="" placeholder="Subdomain" {...register('subDomain', {required: {value: true, message: 'Sub domain name is required'}, pattern: {value: /^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/, message: 'Invalid domain name'}, minLength: {value: 3, message: 'Sub domain must be at least 3 characters'}, maxLength: 20})} />
                                </div>
                                <div className="ml-[1px] flex items-center">.{new URL(process.env.FRONTEND_URL!).host}</div>
                                <div className="flex items-center pr-[15px] w-[47px]">
                                    {formState.isValid && <CheckDomainComponent setValidInvalid={(b) => validInvalid.onChange({target: {name: 'validInvalid', value: b}})} initialValue={initialSubdomain} newValue={subDomainWatch} />}
                                </div>
                            </div>
                            {!!formState.errors.subDomain && <div className="text-red-500 text-xs mt-1">{formState.errors.subDomain.message}</div>}
                        </div>
                    </div>
                </div>
                <Button type="submit" className="ml-2 mt-[1.6rem]" disabled={!formState.isValid}>Save</Button>
            </div>
        </form>
    )
}
