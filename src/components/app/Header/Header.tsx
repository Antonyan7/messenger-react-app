import React, {useContext} from 'react';
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import Toolbar from "../../layouts/Toolbar";
import LogoutButton from "../../auth/Logout";
import './Header.css';
import {AppContext} from "../../../context/AppContext";
import AddChannelButton from "../../conversations/ConversationButtons";


function Header() {
    const {activeChannelName} = useContext(AppContext);

    return (
        <div className="Header">
            <div className="conversations-toolbar">
                <Toolbar
                    title="Messenger"
                    leftItems={[
                        <SettingsIcon key="settingsIcon"/>
                    ]}
                    rightItems={[
                        <AddChannelButton key="addChannelButton"/>
                    ]}
                />
            </div>
            <div className="messages-toolbar">
                <Toolbar
                    title={activeChannelName}
                    rightItems={[
                        <LogoutButton key="logoutButton"/>
                    ]}
                />
            </div>
        </div>
    );
};

export default Header;

