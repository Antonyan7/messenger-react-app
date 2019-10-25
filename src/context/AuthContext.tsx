import React, {useState} from 'react'
import {IAuthContext} from "../interfaces/IAuthContext";
import {IAuthContextProvider} from "../interfaces/IAuthContextProvider";

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

const token = localStorage.getItem("token");
console.log(token, 'IAuthContextProvider');
const AuthContextProvider = (props: IAuthContextProvider) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
    const [authToken, setAuthToken] = useState<string>(token || "");
    const [currentUser, setCurrentUser] = useState<any>({});

    const updateAuthToken = (token: string) => {
        setAuthToken(token)
    };
    const updateCurrentUser = (user: any) => {
        setCurrentUser(user)
    };

    return (
        <AuthContext.Provider
            value={{isAuthenticated, setIsAuthenticated, authToken, updateAuthToken, currentUser, updateCurrentUser}}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider
