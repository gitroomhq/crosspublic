"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {Block} from "@meetfaq/panel/src/components/utils/block";
import {Input} from "@meetfaq/panel/src/components/utils/input";
import {Button} from "@meetfaq/panel/src/components/utils/button";
import {useCallback} from "react";
import * as process from "process";
import {HttpStatus} from "@nestjs/common";
import {useRouter} from "next/navigation";
import Link from "next/link";

interface LoginInterface {
  email: string;
  password: string;
}

export default function LoginComponent () {
  const router = useRouter();
  const {handleSubmit, setError, register, formState} = useForm<LoginInterface>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginInterface> = useCallback(async (values) => {
    const registration = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login', {
      method: 'POST',
      body: JSON.stringify(values),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (registration.status === HttpStatus.UNAUTHORIZED) {
      setError('email', {message: 'Invalid username of password'});
      return ;
    }

    router.push('/');
  }, []);

  return (
    <div className="max-w-[840px] flex-1">
      <Block className="flex flex-col w-full">
        <form className="flex-1 flex-col w-full gap-[30px] flex" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl text-primary font-[800]">Login</h1>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-1 [&>div]:w-full [&>div]:flex [&>div]:flex-col">
              <Input label="Email" type="text" placeholder="nevo@meetfaq.com" error={formState.errors.email} {...register('email', {required: {value: true, message: 'Email is required'}, pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                }})} />
            </div>
            <div className="flex flex-1 [&>div]:w-full [&>div]:flex [&>div]:flex-col">
              <Input label="Password" type="password" placeholder="HardPassword@#%zz" error={formState.errors.password} {...register('password', {required: {value: true, message: 'Password is required'}})}  />
            </div>
          </div>
          <div>
            <Button type="submit" loading={formState.isSubmitting}>Login</Button>
          </div>
          <div className="text-center">
            Don{"'"}t have an account? <Link href="/auth/register" className="underline hover:font-bold">Register</Link>
          </div>
        </form>
      </Block>
    </div>
  )
}
