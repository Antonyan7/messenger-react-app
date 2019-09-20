import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Redirect, Route} from "react-router";

// @ts-ignore
function PrivateHomeRoute({component: Component, ...rest}) {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <Route
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateHomeRoute;
