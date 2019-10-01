import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Redirect} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

function Auth() {
    const {setIsAuthenticated, updateAuthToken} = useContext(AuthContext);
    let urlParams = window.location.href.split("#token=");
    let token = urlParams[urlParams.length-1];
    setIsAuthenticated(true);
    window.localStorage.setItem("token", token);
    updateAuthToken(token);
    window.top.location.href = '/';
    return (
        <div className="Auth">
        </div>
    );
};

export default Auth;

