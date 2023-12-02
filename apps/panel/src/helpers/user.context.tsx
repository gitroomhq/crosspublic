"use client";

import {createContext, ReactNode, useContext} from "react";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";

export const UserHigherContext = createContext<{user: UserInterface} & {pricing: boolean}>({
  pricing: false,
  user: {
    email: '',
    id: '',
    name: '',
    internalId: '',
    organization: {
        organizationId: '',
        userId: '',
        role: 'USER',
    },
}});

export const UserContext = (props: {children: ReactNode, user: UserInterface, pricing: boolean}) => {
    return (
        <UserHigherContext.Provider value={{user: props.user, pricing: props.pricing}}>
            {props.children}
        </UserHigherContext.Provider>
    )
}
