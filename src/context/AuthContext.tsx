import React, { createContext, useContext, useState, useEffect } from "react"

type AuthState = {
   user: string,
   setUser: (user: string) => void
}

const initialState: AuthState = {
   user: "",
   setUser: () => null
}

const authContext = createContext<AuthState>(initialState)

export function AuthProvider({children}: {children: React.ReactNode}): JSX.Element {
   const [user, setUser] = useState<string>("");

   useEffect(() => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) setUser(storedUser);
    }, []);

   const value = {
      user,
      setUser: (userCreds: string) => {
         setUser(userCreds);
         sessionStorage.setItem("user", userCreds);
      },
    };

   return (
      <authContext.Provider value={value}>
         {children}
      </authContext.Provider>
   )
}

export const useAuth = () => useContext(authContext);

