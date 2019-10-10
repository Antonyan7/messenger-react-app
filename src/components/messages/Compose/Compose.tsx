import React, {useContext} from 'react';
import './Compose.css';
import {AppContext} from "../../../context/AppContext";
import uuid from "uuid";
import {MessageContext} from "../../../context/MessageContext";
import {ICompose} from "../../../interfaces/ICompose";
import {client} from "../../../helpers/initMessengerSdk";
import {MessageType} from "globalid-messaging-web-sdk";

const Compose = (props: ICompose) => {
    const {rightItems} = props;
    const {message, updateMessage} = useContext(MessageContext);

    const {activeChannelId} = useContext(AppContext);

    const sendMessage = async (messagePayload: any) => {
        await client.message().sendMessage(messagePayload);
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateMessage(event.target.value);
    };

    const publishMessage = async (e: React.KeyboardEvent) => {
        const props = {
            message: {
                uuid: uuid(),
                type: MessageType.Text,
                content: JSON.stringify({text: message})
            },
            channels: [activeChannelId]
        };

        if (e.key === 'Enter' && message !== "") {
            updateMessage("");
            await sendMessage(props);
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
