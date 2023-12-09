"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {Block} from "@crosspublic/panel/src/components/utils/block";
import {Input} from "@crosspublic/panel/src/components/utils/input";
import {Button} from "@crosspublic/panel/src/components/utils/button";
import {useCallback} from "react";
import * as process from "process";
import {HttpStatus} from "@nestjs/common";
import {useRouter} from "next/navigation";
import Link from "next/link";

interface RegistrationInterface {
  email: string;
  password: string;
  company: string;
  checked: boolean;
}

export default function RegistrationComponent ({token}: {token?: string}) {
  const router = useRouter();
  const {handleSubmit, setError, register, formState} = useForm<RegistrationInterface>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegistrationInterface> = useCallback(async (values) => {
    const registration = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/registration', {
      method: 'POST',
      body: JSON.stringify({...values, token}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (registration.status === HttpStatus.UNPROCESSABLE_ENTITY) {
      setError('email', {message: 'Email already exists'});
      return ;
    }

    if (token) {
      router.push('/success-add');
      return ;
    }
    router.push('/');
  }, []);

  return (
    <div className="max-w-[840px] flex-1">
      <Block className="flex flex-col w-full">
        <form className="flex-1 flex-col w-full gap-[30px] flex" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl text-primary font-[800]">Registration</h1>
          {!!token && <div className="text-center font-bold text-primary">Registering for an existing organization</div>}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-1 [&>div]:w-full [&>div]:flex [&>div]:flex-col">
              <Input label="Email" type="text" placeholder="nevo@crosspublic.com" error={formState.errors.email} {...register('email', {required: {value: true, message: 'Email is required'}, pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
               }})} />
            </div>
            <div className="flex flex-1 [&>div]:w-full [&>div]:flex [&>div]:flex-col">
              <Input label="Password" type="password" placeholder="HardPassword@#%zz" error={formState.errors.password} {...register('password', {required: {value: true, message: 'Password is required'}})}  />
            </div>
            <div className="flex flex-1 [&>div]:w-full [&>div]:flex [&>div]:flex-col">
              <Input label="Company Name" type="text" placeholder="Acme Corp." error={formState.errors.company} {...register('company', {required: {value: true, message: 'Company is required'}})}  />
            </div>
            <label className="flex flex-col">
              <div className="flex gap-2 items-center">
                <div><input type="checkbox" {...register('checked', {required: {value: true, message: 'You have to accept the terms and conditions'}})} /></div>
                <div>I agree to the terms and conditions</div>
              </div>
              <div className="text-red-500 text-xs">{formState.errors.checked?.message as string || <>&nbsp;</>}</div>
            </label>
          </div>
          <div>
            <Button type="submit" loading={formState.isSubmitting}>Register</Button>
          </div>
          <div className="text-center">
            Already registered? <Link href="/auth/login" className="underline hover:font-bold">Login</Link>
          </div>
        </form>
      </Block>
    </div>
  )
}
