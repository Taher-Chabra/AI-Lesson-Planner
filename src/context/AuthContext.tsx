import React, { createContext, useContext, useState } from "react"

type AuthState = {
   isUser: boolean,
   setIsUser: (isUser: boolean) => void
}

const initialState: AuthState = {
   isUser: false,
   setIsUser: () => null
}

const authContext = createContext<AuthState>(initialState)

export function AuthProvider({children}: {children: React.ReactNode}): JSX.Element {
   const [isUser, setIsUser] = useState<boolean>(true);

   const value = {
      isUser,
      setIsUser: (isUserLogin: boolean) => {
         setIsUser(isUserLogin);
      },
    };

   return (
      <authContext.Provider value={value}>
         {children}
      </authContext.Provider>
   )
}

export const useAuth = () => useContext(authContext);

