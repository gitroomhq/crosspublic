"use client";

import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const TitleContext = createContext({title: '', changeTitle: (title: string) => {}});

export const TitleProvider: FC<{children: ReactNode}> = ({ children}) => {
    const [titleState, changeTitle] = useState('');
    return (
        <TitleContext.Provider value={{title: titleState, changeTitle}}>
            {children}
        </TitleContext.Provider>
    )
}

export const Title = () => {
    const {title} = useContext(TitleContext);
    return (
        <>{title}</>
    )
}

export const ChangeTitle: FC<{newTitle: string}> = ({newTitle}) => {
    const {changeTitle} = useContext(TitleContext);
    useEffect(() => {
        changeTitle(newTitle);
        return () => {
            changeTitle('');
        }
    }, []);
    return <></>;
}
