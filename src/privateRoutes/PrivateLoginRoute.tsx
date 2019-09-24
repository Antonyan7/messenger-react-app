import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Redirect, Route} from "react-router";

// @ts-ignore
function PrivateLoginRoute({component: Component, ...rest}) {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <Route
            render={props =>
                isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />

                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

export default PrivateLoginRoute;
