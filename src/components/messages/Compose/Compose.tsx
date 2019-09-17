import React, {useContext} from 'react';
import './Compose.css';
import {AppContext} from "../../../context/AppContext";
import axios from "axios";
import uuid from "uuid";
import {MessageContext} from "../../../context/MessageContext";
import {ICompose} from "../../../interfaces/ICompose";

const Compose = (props: ICompose) => {
    const {rightItems} = props;
    const { message, updateMessage } = useContext(MessageContext);

    const {addMessage} = useContext(AppContext);
    const { activeChannelId } = useContext(AppContext);

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
