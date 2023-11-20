"use client";

import {FC} from "react";

export const Payment: FC<{message?: string}> = (props) => {
  const {message} = props;
  return (
    <>{message}</>
  )
}
