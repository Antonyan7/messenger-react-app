import React from 'react';

const style = {
    overflow: "hidden",
    border: "none",
    width: "501px",
    height: "662px",
};

function Login() {
    return (
        <div className="Login">
            <iframe scrolling='no' title="authComponent" style={style}
                    src={`https://dev-auth.global.id?client_id=2136875a-d896-482a-bdf4-d22c2793310a&response_type=token&scope=public&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth`}>
            </iframe>
        </div>
    );
};

export default Login;
