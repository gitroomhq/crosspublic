import * as React from "react"
import { SVGProps } from "react"
export const SmallArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#74798C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.042 5.875 7.959 9.96 3.875 5.875"
    />
  </svg>
);
