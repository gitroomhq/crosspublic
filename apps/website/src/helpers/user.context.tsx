"use client";

import {createContext, ReactNode, useContext} from "react";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";

export const UserHigherContext = createContext<{user: UserInterface}>({user: {
    id: '',
    name: '',
        internalId: '',
        organization: {
            organizationId: '',
            userId: '',
        },
    }})

export const UserContext = (props: {children: ReactNode, user: UserInterface}) => {
    return (
        <UserHigherContext.Provider value={{user: props.user}}>
            {props.children}
        </UserHigherContext.Provider>
    )
}

export const useUser = () => useContext(UserHigherContext);
