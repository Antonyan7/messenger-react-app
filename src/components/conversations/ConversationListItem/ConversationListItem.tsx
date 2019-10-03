import React, {useContext, useEffect, useState} from 'react'
import axios from "axios"

import './ConversationListItem.css'
import {AppContext} from '../../../context/AppContext'

import {IConversations} from "../../../interfaces/IConversations";
import {IConversationsList} from "../../../interfaces/IConversationsList";
import {AuthContext} from "../../../context/AuthContext";
import {
    Channel,
    ChannelsResponse,
    Config,
    GlobalidMessagingClient,
    init,
    MessagesResponse, ServiceNotification
} from "globalid-messaging-web-sdk/dist";

import {client} from "../../../helpers/initMessengerSdk";
import {IAppContextMessage} from "../../../interfaces/IAppContextMessage";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {deepOrange} from "@material-ui/core/colors";


function ConversationListItem(props: IConversationsList) {
    const {activeChannelId, updateMessages, updateActiveChannelId, updateActiveChannelName} = useContext(AppContext);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const {id, image_url, title, description} : Channel = props.data;

    const getChannelMessages = async () => {
        const messages: MessagesResponse = await client.message().getMessages(id, 1,100);
        console.log(messages);
        const channelMessagesList = messages.data.messages;
        updateActiveChannelId(id);
        updateActiveChannelName(title);
        updateMessages(channelMessagesList);
    };

    const handleChannelClick = async (e: React.MouseEvent) => {
        await getChannelMessages();
        const conversationsItems = document.getElementsByClassName("conversation-list-item");
    };

    const useStyles = makeStyles({
        userPhoto: {
            backgroundImage: "url("+image_url+")",
            backgroundSize: "contain"
        },
    });

    const classes = useStyles();

    return (
        <div className={`conversation-list-item ${activeChannelId == id ? 'conversation-selected' : ''}`} onClick={(e) => handleChannelClick(e)}>
            <div className={`conversation-photo default-avatar ${image_url != null ? classes.userPhoto : ""}`}>
                <h3>
                    {image_url == null && title ? title.charAt(0) : ""}
                </h3>
            </div>

            <div className="conversation-info">
                <h1 className="conversation-title">{title}</h1>
                <p className="conversation-snippet">{description}</p>
            </div>
        </div>
    )
}

export default ConversationListItem
