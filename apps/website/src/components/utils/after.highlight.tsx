"use client";

import {FC, useEffect} from "react";
import hljs from "highlight.js";

export const AfterHighlight: FC<{id: string}> = (props) => {
  const {id} = props;
  useEffect(() => {
    const allCodes = Array.from(document.querySelectorAll('#' + id + ' code'));
    for (const code of allCodes) {
      // @ts-ignore
      hljs.highlightElement(code);
    }
  }, []);

  return <></>;
}
