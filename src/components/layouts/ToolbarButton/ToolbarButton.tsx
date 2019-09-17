import React, {useContext} from 'react';
import './ToolbarButton.css';
import {AppContext} from "../../../context/AppContext";
import axios from "axios";
import uuid from "uuid";
import {MessageContext} from "../../../context/MessageContext";
import {IToolbarButton} from "../../../interfaces/IToolbarButton";

const ToolbarButton = (props: IToolbarButton) => {
    const {icon} = props;
    const {activeChannelId} = useContext(AppContext);
    const {addMessage} = useContext(AppContext);
    const {message, updateMessage} = useContext(MessageContext);
    const {addChannel} = useContext(AppContext);

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
                headers: {'Authorization': "bearer " + process.env.REACT_APP_AUTH_TOKEN}
            };

            axios.post('https://dev-api.gidstaging.net/v1/messages', props, config).then(response => {
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
            const props = {
                participants: [
                    "967eb266-14a1-4190-9c0b-c4b1f1799fa9"
                ],
                uuid: uuid(),
                type: "PERSONAL",
                exposed: true,
                title: "TestChannel" + Math.random(),
                description: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                image_url: "https://st2.depositphotos.com/9223672/12056/v/950/depositphotos_120568248-stock-illustration-male-face-avatar-logo-template.jpg"
            };

            const config = {
                headers: {'Authorization': "bearer " + process.env.REACT_APP_AUTH_TOKEN}
            };

            axios.post('https://dev-api.gidstaging.net/v1/channels', props, config).then(response => {

                const newChannel = {
                    id: response.data.id,
                    photo: response.data.image_url,
                    name: response.data.title,
                    text: response.data.description
                };

                addChannel(newChannel);
            });
        }
    };

    return (
        <i className={`toolbar-button ${icon}`} onClick={addChannelEventHandler}/>
    );
};

export default ToolbarButton
