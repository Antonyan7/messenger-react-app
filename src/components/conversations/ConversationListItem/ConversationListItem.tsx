import React, {useContext, useEffect} from 'react'
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
    MessagesResponse
} from "globalid-messaging-web-sdk/dist";

function ConversationListItem(props: IConversationsList) {
    const {updateMessages, updateActiveChannelId} = useContext(AppContext);

    const {authToken} = useContext(AuthContext);

    const {id, photo, name, text}: IConversations = props.data;
    let client: GlobalidMessagingClient;

    const initSdk = async () => {
        const config: Config = {
            accessToken: authToken,
        };
        client = await init(config);
    };

    useEffect(() =>{
        initSdk().then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    },[]);

    const getChannelMessages = async () => {
          const messages: MessagesResponse = await client.message().getMessages(id, 1, 1);
          const channelMessagesList = messages.data.messages;
          updateActiveChannelId(id);
          updateMessages(channelMessagesList);
    };

    const handleChannelClick = (e: React.MouseEvent) => {
        e.preventDefault();
        getChannelMessages();
    };

    // TODO change any type
    const setDefaultImage = (e: any) => {
        e.target.src = process.env.REACT_APP_USER_DEFAULT_AVATAR_URL;
    };

    return (
        <div className="conversation-list-item" onClick={(e) => handleChannelClick(e)}>
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
