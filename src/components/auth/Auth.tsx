import React, {useEffect} from "react";

function Auth() {
    let urlParams = window.location.href.split("#token=");
    let token = urlParams[urlParams.length - 1];
    localStorage.setItem("token", token);

    useEffect(() => {
        window.top.location.href = '/';
    }, []);

    return (
        <div className="Auth">
        </div>
    );
}

export default Auth;

