import React, {useContext, useEffect, useState} from 'react'
import axios from "axios"

import './ConversationListItem.css'
import {AppContext} from '../../../context/AppContext'
import {IConversationsList} from "../../../interfaces/IConversationsList";
import {AuthContext} from "../../../context/AuthContext";
import {Channel, MessagesResponse} from "globalid-messaging-web-sdk/dist";

import {client} from "../../../helpers/initMessengerSdk";
import makeStyles from "@material-ui/core/styles/makeStyles";


function ConversationListItem(props: IConversationsList) {
    const {activeChannelId, updateMessages, updateActiveChannelId, updateActiveChannelName} = useContext(AppContext);
    const {authToken} = useContext(AuthContext);
    const [conversationInfo, setConversationInfo] = useState<any>([]);

    const config = {
        headers: {'Authorization': "bearer " + authToken}
    };

    const {id, image_url, title, description, participants}: Channel = props.data;
    let participantName: any;

    useEffect(() => {
        participantName = getParticipants();
    }, []);

    const getParticipants = () => {
        const filteredParticipants = participants.filter(function (id) {
            return id != localStorage.getItem('gid_uuid');
        });

        const participantsInfo = axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities/' + filteredParticipants[0], config).then(response => {
            const data = {
                title: response.data.display_name ? response.data.display_name : response.data.gid_name,
                description: response.data.description,
                image_url: response.data.display_image_url
            };
            setConversationInfo(data);
        });
    };

    const getChannelMessages = async () => {
        const messages: MessagesResponse = await client.message().getMessages(id, 1, 100);
        console.log(messages);
        const channelMessagesList = messages.data.messages;
        updateActiveChannelId(id);
        updateActiveChannelName(conversationInfo.title);
        updateMessages(channelMessagesList);
    };

    const handleChannelClick = async (e: React.MouseEvent) => {
        await getChannelMessages();
        const conversationsItems = document.getElementsByClassName("conversation-list-item");
    };

    const useStyles = makeStyles({
        userPhoto: {
            backgroundImage: "url(" + conversationInfo.image_url + ")",
            backgroundSize: "contain"
        },
    });

    const classes = useStyles();

    return (
        <div className={`conversation-list-item ${activeChannelId == id ? 'conversation-selected' : ''}`}
             onClick={(e) => handleChannelClick(e)}>
            <div className={`conversation-photo default-avatar ${conversationInfo.image_url != null ? classes.userPhoto : ""}`}>
                <h3>
                    {conversationInfo.image_url == null && title ? title.charAt(0) : ""}
                </h3>
            </div>

            <div className="conversation-info">
                <h1 className="conversation-title">{conversationInfo.title}</h1>
                <p className="conversation-snippet">{conversationInfo.description}</p>
            </div>
        </div>
    )
}

export default ConversationListItem
