import * as React from "react"
import { SVGProps } from "react"
const BillingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M2.5 13.062v6.47a3.373 3.373 0 0 0 3.374 3.374h18.253a3.373 3.373 0 0 0 3.373-3.374v-6.47a.587.587 0 0 0-.587-.586H3.087a.587.587 0 0 0-.587.586Zm6.242 4.107H7.177a1.027 1.027 0 0 1 0-2.053h1.565a1.027 1.027 0 0 1 0 2.053ZM27.5 9.835v-.211a3.374 3.374 0 0 0-3.373-3.374H5.873A3.374 3.374 0 0 0 2.5 9.624v.211c0 .324.263.587.587.587h23.826a.587.587 0 0 0 .587-.587Z"
    />
  </svg>
)
export default BillingIcon;
