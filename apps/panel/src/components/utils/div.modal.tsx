import {DetailedHTMLProps, FC, HTMLAttributes, useCallback} from "react";
import NiceModal from "@ebay/nice-modal-react";

export const DivModal: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {modal?: {component: FC, callback?:(val: any) => void, args?: any}}> = (props) => {
    const {modal, onClick, ...rest} = props;
    const newOnClick = useCallback(async (e: any) => {
        onClick && onClick(e);
        if (modal && modal.callback) {
            const callback = await NiceModal.show(modal.component, modal.args);
            modal.callback(callback);
        }
    }, [onClick, modal]);

    return (
       <div {...rest} {...(onClick || modal) ? {onClick: newOnClick} : {}} />
    );
}
