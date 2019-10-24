import React from 'react';
import './Login.css'

const style = {
    overflow: "hidden",
    border: "none",
    width: "501px",
    height: "662px",
};

function Login() {
    const authUrl: string | undefined = process.env.REACT_APP_AUTH_URL;
    return (
        <div className="Login">
            <iframe scrolling='no' title="authComponent" style={style}
                    src={authUrl}>
            </iframe>
        </div>
    );
}

export default Login;
