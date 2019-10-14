import React from 'react';
import './Login.css'

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
                    src={process.env.REACT_APP_AUTH_URL}>
            </iframe>
        </div>
    );
};

export default Login;
