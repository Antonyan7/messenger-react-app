import React, {useContext, useEffect} from 'react';
import './Compose.css';
import {AppContext} from "../../../context/AppContext";
import axios from "axios";
import uuid from "uuid";
import {MessageContext} from "../../../context/MessageContext";
import {ICompose} from "../../../interfaces/ICompose";
import {AuthContext} from "../../../context/AuthContext";
import {
    ChannelsResponse,
    Config,
    GlobalidMessagingClient,
    init,
    SendMessageResponse
} from "globalid-messaging-web-sdk";
import {client} from "../../../helpers/initMessengerSdk";

const Compose = (props: ICompose) => {
    const {rightItems} = props;
    const {message, updateMessage} = useContext(MessageContext);
    const {authToken} = useContext(AuthContext);

    const {addMessage} = useContext(AppContext);
    const { activeChannelId } = useContext(AppContext);

    const sendMessage  = async (messagePayload: any) => {
        const message: SendMessageResponse = await client.message().sendMessage(messagePayload);
        console.log(message[0]);
        addMessage(message[0]);
        updateMessage("");
    };


    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateMessage(event.target.value);
    };

    const publishMessage = (e: React.KeyboardEvent) => {
        const props = {
            message: {
                uuid: uuid(),
                type: "TEXT",
                content: JSON.stringify({text: message})
            },
            channels: [ activeChannelId ]
        };

        if(e.key === 'Enter'){

            sendMessage(props);

        }
    };

    return (
        <div className="compose">

            <input
                type="text"
                className="compose-input"
                placeholder="Type a message, @name"
                value={message}
                onChange={handleMessageChange}
                onKeyPress={publishMessage}
            />

            <div className="compose-icons">
                {
                    rightItems
                }
            </div>
        </div>
    );
};

export default Compose
