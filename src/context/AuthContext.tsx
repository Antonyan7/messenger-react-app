import React, {useState} from 'react'
import {IAuthContext} from "../interfaces/IAuthContext";
import {IAuthContextProvider} from "../interfaces/IAuthContextProvider";

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

const AuthContextProvider = (props: IAuthContextProvider) => {
    let token = window.localStorage.getItem("token");
    let checkTokenAvailability = token != null;
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkTokenAvailability);
    console.log(checkTokenAvailability);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider
