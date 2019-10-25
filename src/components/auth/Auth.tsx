import React, {Component} from "react";

class Auth extends Component {
    UNSAFE_componentWillMount(): void {
        let urlParams = window.location.href.split("#token=");
        let token = urlParams[urlParams.length - 1];
        localStorage.setItem("token", token);
        window.top.location.href = `/`;
    }

    render(): any {
        return (
            <div className="Auth">
            </div>
        )
    }
}

export default Auth;

