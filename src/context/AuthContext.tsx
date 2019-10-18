import React, {useState} from 'react'
import {IAuthContext} from "../interfaces/IAuthContext";
import {IAuthContextProvider} from "../interfaces/IAuthContextProvider";

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

const AuthContextProvider = (props: IAuthContextProvider) => {
    let token = window.localStorage.getItem("token");
    let checkTokenAvailability = token != null;
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkTokenAvailability);
    const [authToken, setAuthToken] = useState<string>(token != null ? token : "");
    const [currentUser, setCurrentUser] = useState<any>({});

    const updateAuthToken = (token: string) => {
        setAuthToken(token)
    };
    const updateCurrentUser = (user: any) => {
        setCurrentUser(user)
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, authToken, updateAuthToken, currentUser, updateCurrentUser}}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider
