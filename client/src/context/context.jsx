import { createContext, useState } from "react";

const TokenContext = createContext();
const TokenContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const values = {
        token,
        setToken
    }
    return (
        <div>
            <TokenContext.Provider value={values}>
                {children}
            </TokenContext.Provider>
        </div>
    )
}

export {TokenContext, TokenContextProvider}