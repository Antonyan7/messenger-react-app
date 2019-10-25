import React, {useEffect} from "react";

function Auth() {
    let urlParams = window.location.href.split("#token=");
    console.log(urlParams, 'urlParams');
    let token = urlParams[urlParams.length - 1];
    localStorage.setItem("token", token);
    console.log(token)
    alert(urlParams)

    useEffect(() => {
        window.top.location.href = '/';
    }, []);

    return (
        <div className="Auth">
        </div>
    );
}

export default Auth;

