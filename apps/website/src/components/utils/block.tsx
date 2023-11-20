import {DetailedHTMLProps, FC, HTMLAttributes} from "react";
import {clsx} from "clsx";

export const Block: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
  return <div {...props} className={clsx("bg-white py-[23px] px-[30px] rounded-container", props.className)} />
}
