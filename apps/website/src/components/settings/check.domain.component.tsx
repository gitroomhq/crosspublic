"use client";

import {FC, useEffect, useState} from "react";
import { useDebouncedCallback } from 'use-debounce';
import {useFetch} from "@meetqa/website/src/helpers/fetch.context";
import {Oval} from "react-loader-spinner";

export const CheckDomainComponent: FC<{initialValue: string, newValue: string, setValidInvalid: (b: boolean) => void}> = (props) => {
  const {initialValue, newValue, setValidInvalid} = props;
  const [check, setCheck] = useState(0);
  const axios = useFetch();

  const checkDomain = useDebouncedCallback(async (val: string) => {
    if (!val || val.length < 3) {
      return ''
    }

    setCheck(1);
    const {data} = await axios.post('/settings/check-subdomain', {subDomain: val});
    if (data.exists) {
      setCheck(3);
    }
    else {
      setValidInvalid(true);
      setCheck(2);
    }
  }, 500);

  useEffect(() => {
    if (newValue === '') {
      setCheck(0);
      setValidInvalid(false);
      return;
    }
    setCheck(0);
    if (initialValue !== newValue) {
      checkDomain(newValue);
    }
    else {
      setValidInvalid(true);
    }
  }, [newValue]);

  if (initialValue === newValue || newValue === '') {
    return <></>;
  }

  switch (check) {
    case 0:
    default:
      return <></>;
    case 1:
      return <Oval color="#3B1C60" secondaryColor="#3B1C60" wrapperClass="ml-2" width={30} strokeWidth={5} height={30} />;
    case 2:
      return (
        <svg
          key="0"
          className="ml-2 w-6 h-6 text-green-500"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    case 3:
      return (
        <svg
          key="0"
          className="ml-2 h-6 w-6 text-red-500"
          fill="currentColor"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      );
  }
}
