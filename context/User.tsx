'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from 'react'

type User = {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
}


const UserContext = createContext<any>({
    currUser: {},
    setCurrUser: () => { }
})

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [currUser, setCurrUser] = useState<User | null>()
    useEffect(() => {
        const sessionData = JSON.parse(localStorage.getItem("userSession") || "null");
        if (sessionData && Date.now() < sessionData.expires) {
            setCurrUser(sessionData.user);
        } else {
            setCurrUser(null);
        }
    }, []);

    console.log(currUser)

    return (
        <UserContext.Provider value={{ currUser, setCurrUser }}>
            {children}
        </UserContext.Provider>
    )
}



export function useUserContext() {
    return useContext(UserContext);
}