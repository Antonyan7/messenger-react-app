import React, {useContext, useEffect, useState} from 'react'
import axios from "axios"
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AppContext} from '../../../context/AppContext'
import {AuthContext} from "../../../context/AuthContext";
import {IConversationsList} from "../../../interfaces/IConversationsList";
import {Channel, MessagesResponse} from "globalid-messaging-web-sdk";
import {client} from "../../../helpers/initMessengerSdk";
import './ConversationListItem.css';
import mobileToggleChatActive from '../../../helpers/mobileToggleChatActive';
import {ConversationListContext} from "../../../context/ConversationListContext";

function ConversationListItem(props: IConversationsList) {
    const {activeChannelId, updateMessages, updateActiveChannelId, updateActiveChannelName, updateActiveChannelUuid} = useContext(AppContext);
    const {authToken} = useContext(AuthContext);
    const {updateIsLoading} = useContext(ConversationListContext);
    const [conversationInfo, setConversationInfo] = useState<any>([]);

    const config = {
        headers: {'Authorization': "bearer " + authToken}
    };

    const {id, participants, uuid}: Channel = props.data;

    const getParticipants = () => {
      const gid_uuid = localStorage.getItem('gid_uuid');
      const filteredParticipants = participants.filter(function (id) {
        return id !== gid_uuid;
      });

      axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities/' + filteredParticipants[0], config).then(response => {
        const data = {
          title: response.data.display_name ? response.data.display_name : response.data.gid_name,
          description: response.data.description,
          image_url: response.data.display_image_url
        };
        setConversationInfo(data);
      });
    };

    useEffect(() => {
        getParticipants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getChannelMessages = async () => {
        const messages: MessagesResponse = await client.message().getMessages(id, 1, 200);
        const channelMessagesList = messages.data.messages;
        updateActiveChannelName(conversationInfo.title);
        updateMessages(channelMessagesList.reverse());
        updateActiveChannelId(id);
        updateActiveChannelUuid(uuid);
    };

    const handleChannelClick = async () => {
        mobileToggleChatActive(true);
        updateIsLoading(true);
        await getChannelMessages();
        updateIsLoading(false);
        const messageContainer = document.getElementById("messagesList");
        if (messageContainer) {
          messageContainer.scrollIntoView(false)
        }
    };

    const useStyles = makeStyles({
        userPhoto: {
            backgroundImage: "url(" + conversationInfo.image_url + ")",
            backgroundSize: "contain"
        },
    });

    const classes = useStyles();

    return (
        <div className={`conversation-list-item ${activeChannelId === id ? 'conversation-selected' : ''}`} id={`conversation-${id}`}
             onClick={() => handleChannelClick()}>
            <div className={`conversation-photo default-avatar ${conversationInfo.image_url != null ? classes.userPhoto : ""}`}>
                <h3>
                    {conversationInfo.image_url == null && conversationInfo.title ? conversationInfo.title.charAt(0) : ""}
                </h3>
            </div>

            <div className="conversation-info">
                <h1 className="conversation-title">{conversationInfo.title}</h1>
                <p className="conversation-snippet">{conversationInfo.description}</p>
            </div>
            <div className="conversation-active-dot"/>
        </div>
    )
}

export default ConversationListItem
