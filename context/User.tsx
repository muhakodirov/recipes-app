'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from 'react'

type User = {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
}

type UserContextType = {
    currUser: User | null,
    setCurrUser: Dispatch<SetStateAction<User | null>>,
}


const UserContext = createContext<any>({
    currUser: { id: '', email: '', firstname: '', lastname: '' },
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

    return (
        <UserContext.Provider value={{ currUser, setCurrUser }}>
            {children}
        </UserContext.Provider>
    )
}



export function useUserContext() {
    return useContext(UserContext);
}