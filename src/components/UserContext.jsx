import React, { createContext, useState } from "react";

// the UserContext
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(undefined);

// the UserProvider component
export function UserProvider({ children }) {
    const [name, setName] = useState("");

    return (
        <UserContext.Provider value={{ name, setName }}>
            {children}
        </UserContext.Provider>
    );
}