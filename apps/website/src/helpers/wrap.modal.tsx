import {ReactNode, JSX, ComponentType} from "react";
import {useModal} from "@ebay/nice-modal-react";
import {NiceModalHandler} from "@ebay/nice-modal-react/src";

// eslint-disable-next-line react/display-name
export const wrapModal = <T, >(WrapperComponent: ComponentType<T & {modal: undefined | NiceModalHandler<any>}>) => {
  // eslint-disable-next-line react/display-name
  return (props: T & { id?: string, title?: string }): JSX.Element => {
    const modal = props.id ? useModal(props.id) : undefined;
    if (!props.id) {
      return (
        <WrapperComponent {...props} modal={undefined} />
      )
    };

    return (
      <WrapModal id={props.id} title="" {...modal?.args!}>
        <WrapperComponent {...props} {...modal?.args} modal={modal} />
      </WrapModal>
    );
  }
};
export const WrapModal = (props: {id: string, title: string, children: ReactNode}) => {
  const {id, children, title} = props;
  const modal = useModal(id);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-50 p-4 z-[100]" onClick={() => modal.remove()}>
        <div className="bg-white dark:bg-gray-800 rounded-container shadow-lg p-4 relative max-w-[70%]" onClick={e => {
          e.stopPropagation();
        }}>
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">{title}</div>
            <div className="p-1">
              <svg
                onClick={() => modal.remove()}
                className=" h-6 w-6"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
          </div>
          <div className="py-4">
            {children}
          </div>
        </div>
    </div>
  )
}
