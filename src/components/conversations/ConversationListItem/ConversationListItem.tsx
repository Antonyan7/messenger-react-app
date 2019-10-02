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
import makeStyles from "@material-ui/core/styles/makeStyles";
import {deepOrange} from "@material-ui/core/colors";


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

    const useStyles = makeStyles({
        userPhoto: {
            backgroundImage: "url("+photo+")",
            backgroundSize: "contain"
        },
    });

    const classes = useStyles();

    return (
        <div className={`conversation-list-item ${isSelected ? 'conversation-selected' : ''}`} onClick={(e) => handleChannelClick(e)}>
            <div className={`conversation-photo default-avatar ${photo != null ? classes.userPhoto : ""}`}>
                <h3>
                    {photo == null ? name.charAt(0) : ""}
                </h3>
            </div>

            <div className="conversation-info">
                <h1 className="conversation-title">{name}</h1>
                <p className="conversation-snippet">{text}</p>
            </div>
        </div>
    )
}

export default ConversationListItem
