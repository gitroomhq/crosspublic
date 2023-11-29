"use client";

import {DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes} from "react";
import {clsx} from "clsx";
import {FieldError} from "react-hook-form";

// @ts-ignore
// eslint-disable-next-line react/display-name
export const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {label: string, error?: FieldError, topDivClass?: string}> = forwardRef((props, ref) => {
  const {className,label, error, required, topDivClass, ...rest} = props;
  return (
    <div className={topDivClass}>
      {!!label && <div className="text-sm mb-2">{label}{required && <span className="text-red-500">*</span>}</div>}
      <input {...rest} ref={ref} className={clsx("rounded-container bg-white py-[10px] px-[15px] border-gray border outline-none text-sm", className)} />
      {!!error && <div className="text-red-500 text-xs mt-1">{error.message}</div>}
    </div>
  )
});
