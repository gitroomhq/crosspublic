import * as React from "react"
import { SVGProps } from "react"
const FaqIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M20.454 5H9.545A4.55 4.55 0 0 0 5 9.545v7.273a4.553 4.553 0 0 0 3.636 4.455v2.818a.91.91 0 0 0 1.414.756l5.223-3.484h5.181A4.55 4.55 0 0 0 25 16.819V9.545A4.55 4.55 0 0 0 20.454 5Zm-1.818 10.909h-7.272a.91.91 0 0 1 0-1.818h7.272a.909.909 0 0 1 0 1.818Zm1.818-3.636H9.545a.91.91 0 0 1 0-1.819h10.91a.91.91 0 0 1 0 1.819Z"
    />
  </svg>
)
export default FaqIcon;
