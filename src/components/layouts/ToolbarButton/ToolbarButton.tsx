import React, {useContext, useState} from 'react';
import './ToolbarButton.css';
import {AppContext} from "../../../context/AppContext";
import axios from "axios";
import uuid from "uuid";
import {MessageContext} from "../../../context/MessageContext";
import {IToolbarButton} from "../../../interfaces/IToolbarButton";
import {AuthContext} from "../../../context/AuthContext";
import {ConversationListContext} from "../../../context/ConversationListContext";
import createBrowserHistory from "history/createBrowserHistory"; createBrowserHistory();

const ToolbarButton = (props: IToolbarButton) => {
    const history = createBrowserHistory();
    const {icon} = props;
    const {activeChannelId} = useContext(AppContext);
    const {authToken, updateAuthToken, setIsAuthenticated} = useContext(AuthContext);
    const {addMessage} = useContext(AppContext);
    const {message, updateMessage} = useContext(MessageContext);
    const {updateIsUsersListOpened} = useContext(ConversationListContext);

    const addChannelEventHandler = () => {
        if (icon === "ion-md-send") {
            const props = {
                message: {
                    uuid: uuid(),
                    type: "TEXT",
                    content: JSON.stringify({text: message})
                },
                channels: [activeChannelId]
            };

            const config = {
                headers: {'Authorization': "bearer " + authToken}
            };

            axios.post(process.env.REACT_APP_BASE_URL+'v1/messages', props, config).then(response => {
                const messageInfo = response.data[0];

                let newMessage = {
                    id: messageInfo.id,
                    author: messageInfo.author,
                    content: messageInfo.content,
                    timestamp: messageInfo.created_at
                };

                addMessage(newMessage);
                updateMessage("");
            });
        }
        if (icon === "ion-ios-add-circle-outline") {
            updateIsUsersListOpened(true);
        }
        if (icon === "ion-ios-log-out") {
            updateAuthToken("");
            setIsAuthenticated(false);
            window.localStorage.removeItem("token");
            history.push("/login");
        }
    };

    return (
        <i className={`toolbar-button ${icon}`} onClick={addChannelEventHandler}/>
    );
};

export default ToolbarButton
