import React, {useContext, useEffect, useState} from 'react';
import './Compose.css';
import {AppContext} from "../../../context/AppContext";
import uuid from "uuid";
import {ICompose} from "../../../interfaces/ICompose";
import {client} from "../../../helpers/initMessengerSdk";
import {MessageType} from "globalid-messaging-web-sdk";
import {IAppContextMessage} from "../../../interfaces/IAppContextMessage";
import {AuthContext} from "../../../context/AuthContext";

const Compose = (props: ICompose) => {
  const {rightItems} = props;
  const [message, setMessage] = useState<string>("");

  const {activeChannelId, addMessage} = useContext(AppContext);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    setMessage('');
  }, [activeChannelId]);

  const sendMessage = async (messagePayload: any) => {
    await client.message().sendMessage(messagePayload);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

    const lastMessage = {
      id: uuid(),
      author: currentUser.id,
      content: props.message.content
    };

    setMessage("");
    addMessage(lastMessage as IAppContextMessage);

    await sendMessage(props);
  };

  const handleEnterPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && message.trim().length) {
      e.preventDefault();
      await publishMessage();
    }
  };

  return (
    <div className="compose">
            <textarea
              className="compose-field"
              placeholder="Type a message ..."
              value={message}
              disabled={activeChannelId == "0"}
              onChange={(e) => handleMessageChange(e)}
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
