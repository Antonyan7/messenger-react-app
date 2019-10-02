import React, {useContext, useEffect, useState} from 'react'
import axios from "axios"

import './ConversationListItem.css'
import {AppContext} from '../../../context/AppContext'

import {IConversations} from "../../../interfaces/IConversations";
import {IConversationsList} from "../../../interfaces/IConversationsList";
import {AuthContext} from "../../../context/AuthContext";
import {
    ChannelsResponse,
    Config,
    GlobalidMessagingClient,
    init,
    MessagesResponse, ServiceNotification
} from "globalid-messaging-web-sdk";

import {client} from "../../../helpers/initMessengerSdk";
import {IAppContextMessage} from "../../../interfaces/IAppContextMessage";

function ConversationListItem(props: IConversationsList) {
    const {updateMessages, updateActiveChannelId} = useContext(AppContext);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const {id, photo, name, text}: IConversations = props.data;

    const token: string = client.subscribe((channel: string, notification: ServiceNotification) => {
        console.log('Channel alias', channel)
        console.log('Notification payload', notification)
    });

    const getChannelMessages = async () => {
        const messages: MessagesResponse = await client.message().getMessages(id, 1,100);
        const channelMessagesList = messages.data.messages;
        console.log(messages);
        updateActiveChannelId(id);
        updateMessages(channelMessagesList);
    };

    const handleChannelClick = async (e: React.MouseEvent) => {
        await getChannelMessages();
        setIsSelected(true);
    };

    // TODO change any type
    const setDefaultImage = (e: any) => {
        e.target.src = process.env.REACT_APP_USER_DEFAULT_AVATAR_URL;
    };

    return (
        <div className={`conversation-list-item ${isSelected ? 'conversation-selected' : ''}`} onClick={(e) => handleChannelClick(e)}>
            <img className="conversation-photo"
                 src={photo != null ? photo : process.env.REACT_APP_USER_DEFAULT_AVATAR_URL}
                 alt="conversation" onError={setDefaultImage}/>
            <div className="conversation-info">
                <h1 className="conversation-title">{name}</h1>
                <p className="conversation-snippet">{text}</p>
            </div>
        </div>
    )
}

export default ConversationListItem
