"use client";

import {Button} from "@meetqa/website/src/components/utils/button";
import {FC, useCallback, useState} from "react";
import {ExtendedCategory} from "@meetqa/website/src/components/faqs/faq.component";
import {deleteDialog} from "@meetqa/website/src/helpers/delete.dialog";
import {useFetch} from "@meetqa/website/src/helpers/fetch.context";

export const ChangeCategory: FC<{categories: ExtendedCategory[], faq: string, changeCategory: (cat: string) => void}> = (props) =>  {
  const {categories, changeCategory} = props;
  const fetchObject = useFetch();
  const [current, setCurrent] = useState('');
  const [state, setState] = useState(0);
  const changeSelect = useCallback(async (e: any) => {
    setCurrent(e.target.value);
    if (!e.target.value) {
      return;
    }

    try {
      const successDialog = await deleteDialog('Are you sure you want to change the category of this FAQ?', 'Yes, change it!', 'FAQ category changed!');
      await fetchObject.put(`/faq/${props.faq}/category/${e.target.value}`);
      successDialog();
      changeCategory(e.target.value);
      setState(0);
    }
    catch (err) {
    }
    setCurrent('');
  }, []);
  if (categories.length === 0) {
    return <></>;
  }

  return (
    <>
      {state === 0 && (
        <svg
          key="0"
          className="h-6 w-6 cursor-pointer text-pink"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setState(1)}
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      )}
      {state === 1 && (
        <select value={current} onChange={changeSelect} className="font-light p-1 rounded-container text-pink border border-pink outline-none">
          <option selected={current === ''} value="">Select a category</option>
          {categories.map((category, index) => (
            <option selected={current === category.id} key={index} value={category.id}>{category.name}</option>
          ))}
        </select>
      )}
    </>
  )
}
