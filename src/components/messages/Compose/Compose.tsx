import React, {useContext, useEffect, useState} from 'react';
import './Compose.css';
import {AppContext} from "../../../context/AppContext";
import uuid from "uuid";
import {MessageContext} from "../../../context/MessageContext";
import {ICompose} from "../../../interfaces/ICompose";
import {client} from "../../../helpers/initMessengerSdk";
import {MessageType} from "globalid-messaging-web-sdk";

const Compose = (props: ICompose) => {
    const {rightItems} = props;
    const [message, setMessage] = useState<string>("");
    const [currentMessages, setCurrentMessages] = useState<any>({});

    const {activeChannelId} = useContext(AppContext);


    useEffect(() => {
      // if(message !== "") {
      //   let unsentMessage: any = {};
      //   unsentMessage[activeChannelId] = message;
      //   setCurrentMessages(Object.assign(currentMessages, unsentMessage));
      //   console.log(currentMessages);
      //   if(activeChannelId in currentMessages) {
      //     setMessage(currentMessages[activeChannelId]);
      //   }
      // }
      setMessage('');
    },[activeChannelId]);

    const sendMessage = async (messagePayload: any) => {
        await client.message().sendMessage(messagePayload);
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    };

    const publishMessage = async () => {
        const props = {
            message: {
                uuid: uuid(),
                type: MessageType.Text,
                content: JSON.stringify({text: message})
            },
            channels: [activeChannelId]
        };

        setMessage("");
        await sendMessage(props);
    };

    const handleEnterPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && message !== "") {
            publishMessage();
        }
    };

    return (
        <div className="compose">
            <input
                type="text"
                className="compose-input"
                placeholder="Type a message ..."
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleEnterPress}
            />

            <div className="compose-icons" onClick={publishMessage}>
                {
                    rightItems
                }
            </div>
        </div>
    );
};

export default Compose
