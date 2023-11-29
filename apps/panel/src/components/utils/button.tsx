"use client";

import {ButtonHTMLAttributes, DetailedHTMLProps, FC, useCallback} from "react";
import {clsx} from "clsx";
import {Oval} from "react-loader-spinner";
import NiceModal from "@ebay/nice-modal-react";

export const Button: FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {loading?: boolean, size?: 'normal' | 'medium' | 'small', btnStyle?: 'primary' | 'secondary' | 'error', modal?: {component: FC, callback?:(val: any) => void, args?: any}}> = (props) => {
    const {children, modal, onClick, type, className, btnStyle, size, loading, ...rest } = props;
    const triggerOnClick = useCallback(async (e: any) => {
        if (onClick) {
            onClick(e);
        }
        if (modal) {
            const callback = await NiceModal.show(modal.component, modal.args);
            if (modal.callback) {
                modal.callback(callback);
            }
        }
    }, [onClick, modal]);

    return (
        <div className="relative text-black">
            <div onClick={triggerOnClick} className={clsx("relative rounded-container", className, (btnStyle || 'primary') === 'primary' ? 'text-white hover:bg-btnHover bg-btn' : (btnStyle || 'primary') === 'error' ? 'hover:bg-red-50 text-red-400 border border-red-400' : 'hover:bg-[#f6f6f6] text-pink border border-pink', (props.disabled || props.loading) && 'opacity-50 pointer-events-none')}>
                <button {...rest} disabled={props.loading || props.disabled} type={type || 'button'} className={clsx("w-full h-full relative rounded-container", ((size || 'normal') === 'normal') ? 'py-[10px] px-[24px]' : ((size || 'medium') === 'medium') ? 'h-[42px] px-[15px]' : 'text-sm py-[5px] px-[12px]')}>
                    {loading && (
                        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
                            <Oval width={30} strokeWidth={5} color={props.btnStyle === "primary" ? "white" : '#3B1D61'} secondaryColor={props.btnStyle === "primary" ? "white" : '#3B1D61'} />
                        </div>
                    )}
                    <div className={clsx(loading && 'invisible')}>
                        {children}
                    </div>
                </button>
            </div>
        </div>
    )
}
