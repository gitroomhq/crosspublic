"use client";

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {FC, useCallback, useMemo, useState} from "react";
import {Input} from "@meetfaq/panel/src/components/utils/input";
import {Button} from "@meetfaq/panel/src/components/utils/button";
import {useFetch} from "@meetfaq/panel/src/helpers/fetch.context";
import {CheckDomainComponent} from "@meetfaq/panel/src/components/settings/check.domain.component";
import {useRouter} from "next/navigation";
import {deleteDialog} from "@meetfaq/panel/src/helpers/delete.dialog";
import slugify from "slugify";

export const SubdomainComponent: FC<{subDomain: string}> = (props) => {
    const {subDomain} = props;
    const [initialSubdomain, setInitialSubdomain] = useState(subDomain);
    const router = useRouter();
    const fetchObject = useFetch();

    const {watch, register, formState} = useForm({
        defaultValues: {
            subDomain,
            validInvalid: false
        },
        values: {
            subDomain,
            validInvalid: false
        },
        mode: 'onChange',
    });
    const validInvalid = register('validInvalid', {
        validate: (b: boolean) => {
            return b;
        }});
    const subDomainWatch        = watch('subDomain');
    const {handleSubmit} = useForm();

    const removeSubdomain = useMemo(() => {
      const frontend = new URL(process.env.FRONTEND_URL!).host;
      if (frontend.indexOf('.') === -1) {
        return frontend;
      }

      return frontend.split('.').slice(1).join('.');
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (props) => {
        try {
            const dialog = await deleteDialog('Are you sure you want to change your subdomain? Other people would be able to claim this subdomain. Any previous SEO you have had will be lost', 'Yes, do it!', 'Subdomain changed!');
            await fetchObject.post('/settings/subdomain', {subDomain: subDomainWatch});
            setInitialSubdomain(subDomainWatch);
            router.refresh();
            dialog()
        }
        catch (err) {}
    }, [subDomainWatch]);

    const {onChange, ...allParams} = register('subDomain', {required: {value: true, message: 'Sub domain name is required'}, pattern: {value: /^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/, message: 'Invalid domain name'}, minLength: {value: 3, message: 'Sub domain must be at least 3 characters'}, maxLength: 20})

    const changeSubDomain = useCallback((event: any) => {
      event.target.value = event.target.value.replace(/ /g, '-');
      event.target.value = event.target.value.replace(/--/g, '-');
      if (event.target.value.charAt(event.target.value.length-1) !== '-') {
        event.target.value = slugify(event.target.value, {lower: true, strict: true});
      }

      onChange(event);
    }, [onChange]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start w-[615px]">
                <div className="flex flex-col flex-1">
                    <div className="text-sm mb-2">Subdomain:</div>
                    <div className="flex items-center">
                        <div className="flex flex-col flex-1">
                            <div className="rounded-container bg-[#FAFAFD] border-[#EBE8E8] border outline-none text-sm flex flex-1 overflow-hidden">
                                <div className="flex-1">
                                    <Input maxLength={20} className="!border-0 w-full !rounded-none flex-1 py-[10px] px-[15px]" required={true} label="" placeholder="Subdomain" {...allParams} onChange={changeSubDomain} />
                                </div>
                                <div className="ml-[1px] flex items-center">.{removeSubdomain}</div>
                                <div className="flex items-center pr-[15px] w-[47px]">
                                    <CheckDomainComponent setValidInvalid={(b) => validInvalid.onChange({target: {name: 'validInvalid', value: b}})} initialValue={initialSubdomain} newValue={subDomainWatch} />
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
