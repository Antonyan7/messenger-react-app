import React, {useContext} from 'react';
import ArrowOutIcon from "../../../assets/icons/ArrowOutIcon";
import createBrowserHistory from "history/createBrowserHistory";
import {AuthContext} from "../../../context/AuthContext";
import './LogoutButton.css';
import {client} from "../../../helpers/initMessengerSdk";

function LogoutButton() {
    const history = createBrowserHistory();
    const {updateAuthToken, setIsAuthenticated} = useContext(AuthContext);

    const clientToken = localStorage.getItem('sdkClientToken');
    const handleLogoutClick = () => {
        if(clientToken){
            client.unsubscribe(clientToken)
        }
        updateAuthToken("");
        setIsAuthenticated(false);
        window.localStorage.removeItem("token");
        history.push("/preview");
    };
    return (
        <div className="LogoutButton">
            <div onClick={handleLogoutClick}>
                <ArrowOutIcon/>
            </div>
        </div>
    );
}

export default LogoutButton;
