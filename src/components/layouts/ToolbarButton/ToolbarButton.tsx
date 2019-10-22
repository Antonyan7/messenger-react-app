import React, {useContext} from 'react';
import './ToolbarButton.css';
import {AppContext} from "../../../context/AppContext";
import axios from "axios";
import uuid from "uuid";
import {MessageContext} from "../../../context/MessageContext";
import {IToolbarButton} from "../../../interfaces/IToolbarButton";
import {AuthContext} from "../../../context/AuthContext";
import createBrowserHistory from "history/createBrowserHistory";
import {MessageType} from "globalid-messaging-web-sdk"; createBrowserHistory();

const ToolbarButton = (props: IToolbarButton) => {
    const {icon} = props;
    const {activeChannelId} = useContext(AppContext);
    const {authToken} = useContext(AuthContext);
    const {addMessage} = useContext(AppContext);
    const {message, updateMessage} = useContext(MessageContext);

    const addChannelEventHandler = () => {
        if (icon === "ion-md-send") {
            const props = {
                message: {
                    uuid: uuid(),
                    type: MessageType.Text,
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
    };

    return (
        <i className={`toolbar-button ${icon}`} onClick={addChannelEventHandler}/>
    );
};

export default ToolbarButton
