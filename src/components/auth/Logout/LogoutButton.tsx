import React, {useContext} from 'react';
import ArrowOutIcon from "../../../assets/icons/ArrowOutIcon";
import createBrowserHistory from "history/createBrowserHistory";
import {AuthContext} from "../../../context/AuthContext";
import './LogoutButton.css';

function LogoutButton() {
    const history = createBrowserHistory();
    const {updateAuthToken, setIsAuthenticated} = useContext(AuthContext);

    const handleLogoutClick = () => {
        updateAuthToken("");
        setIsAuthenticated(false);
        window.localStorage.removeItem("token");
        history.push("/login");
    };
    return (
        <div className="LogoutButton">
            <div onClick={handleLogoutClick}>
                <ArrowOutIcon/>
            </div>
        </div>
    );
};

export default LogoutButton;
