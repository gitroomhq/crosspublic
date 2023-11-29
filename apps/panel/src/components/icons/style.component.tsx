import * as React from "react"
import { SVGProps } from "react"
const StyleComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="nonzero"
      d="m17.404 4.722 2.717 10.142a2.75 2.75 0 0 1-1.944 3.368l-6.279 1.683A2.75 2.75 0 0 1 8.53 17.97L5.813 7.828A2.75 2.75 0 0 1 7.757 4.46l6.279-1.683a2.75 2.75 0 0 1 3.368 1.945Zm-6.438 3.02a1 1 0 1 0-1.932.517 1 1 0 0 0 1.932-.518Zm-5.163 3.916 1.761 6.57a3.733 3.733 0 0 0 1.003 1.714l-.443-.024a2.75 2.75 0 0 1-2.603-2.89l.282-5.37Zm-.925-1.478-.355 6.796c-.037.698.12 1.362.424 1.94l-.414-.161a2.75 2.75 0 0 1-1.582-3.553l1.927-5.022Z"
    />
  </svg>
)
export default StyleComponent;
