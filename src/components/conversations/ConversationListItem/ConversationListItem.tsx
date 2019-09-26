import React, {useContext} from 'react'
import axios from "axios"

import './ConversationListItem.css'
import {AppContext} from '../../../context/AppContext'

import {IConversations} from "../../../interfaces/IConversations";
import {IConversationsList} from "../../../interfaces/IConversationsList";
import {AuthContext} from "../../../context/AuthContext";

function ConversationListItem(props: IConversationsList) {
  const { updateMessages, updateActiveChannelId, updateActiveChannelName } = useContext(AppContext);
  const { authToken } = useContext(AuthContext);

  const {id, photo, name, text}: IConversations = props.data;

  const config = {
    headers: {'Authorization': "bearer " + authToken}
  };

  const getChannelMessages = (e: React.MouseEvent) => {
    e.preventDefault();
    updateActiveChannelName(name);
    axios.get(process.env.REACT_APP_BASE_URL+"v1/channels/"+ id +"/messages", config).then(response => {
      const channelMessagesList = response.data.data.messages;
      updateActiveChannelId(id);
      updateMessages(channelMessagesList);
    });
  };

  // TODO change any type
  const setDefaultImage  = (e: any) => {
    e.target.src = process.env.REACT_APP_USER_DEFAULT_AVATAR_URL;
  };

  return (
    <div className="conversation-list-item" onClick={(e) => getChannelMessages(e)}>
      <img className="conversation-photo" src={photo != null ? photo : process.env.REACT_APP_USER_DEFAULT_AVATAR_URL} alt="conversation" onError={setDefaultImage}/>
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  )
}

export default ConversationListItem
