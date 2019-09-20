import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Redirect} from "react-router";

function Auth() {
    const {setIsAuthenticated} = useContext(AuthContext);
    let urlParams = window.location.href.split("#token=");
    let token = urlParams[urlParams.length-1];
    setIsAuthenticated(true);
    window.localStorage.setItem("token", token);
    return (
        <div className="Auth">
            <Redirect to="/" />
        </div>
    );
};

export default Auth;

