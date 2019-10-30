import React, {useContext, useEffect, useState} from 'react';
import './Compose.css';
import {AppContext} from "../../../context/AppContext";
import uuid from "uuid";
import {ICompose} from "../../../interfaces/ICompose";
import {client} from "../../../helpers/initMessengerSdk";
import {ChannelPayload, ChannelType, MessageType} from "globalid-messaging-web-sdk";
import {IAppContextMessage} from "../../../interfaces/IAppContextMessage";
import {AuthContext} from "../../../context/AuthContext";

const Compose = (props: ICompose) => {
  const {rightItems} = props;
  const [message, setMessage] = useState<string>("");

  const {activeChannelId, addMessage, activeChannelUuid, messages, updateChannelData} = useContext(AppContext);
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

  const addConversation = async () => {
    const channelPayload: ChannelPayload = {
      uuid: uuid(),
      type: ChannelType.Personal,
      exposed: false,
      participants: [activeChannelUuid]
    };

    return await client.channel().createChannel(channelPayload);
  };

  const publishMessage = async () => {
    let channel;

    if(!messages.length) {
      console.log(activeChannelId);
      channel = await addConversation();
      updateChannelData(channel, activeChannelId);
    }

    const props = {
      message: {
        uuid: uuid(),
        type: MessageType.Text,
        content: JSON.stringify({text: message})
      },
      channels: [channel ? channel.id : activeChannelId]
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
        disabled={activeChannelId === "0"}
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
