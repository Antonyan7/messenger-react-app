import React, {useEffect, useContext} from 'react'
import shave from 'shave'
import axios from "axios"

import './ConversationListItem.css'
import {AppContext} from '../../../context/AppContext'
import {
  IConversations,
  IConversationsList,
} from "../../../interfaces/interfaces"

function ConversationListItem(props: IConversationsList) {
  const { addMessage } = useContext(AppContext);
  const { updateMessages } = useContext(AppContext);
  useEffect(() => {
    shave('.conversation-snippet', 20)
  }, []);

  const {id, photo, name, text}: IConversations = props.data;

  const config = {
    headers: {'Authorization': "bearer " + process.env.REACT_APP_AUTH_TOKEN}
  };

  const getChannelMessages = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(e);
    axios.get("https://dev-api.gidstaging.net/v1/channels/"+ id +"/messages", config).then(response => {
      const channelMessagesList = response.data.data.messages;
      updateMessages(channelMessagesList);
    });
  };

  // TODO change any type
  const setDefaultImage  = (e: any) => {
    e.target.src = process.env.REACT_APP_USER_DEFAULT_AVATAR_URL;
  };

  return (
    <div className="conversation-list-item" onClick={(e) => getChannelMessages(e)}>
      <img className="conversation-photo" src={photo} alt="conversation" onError={setDefaultImage}/>
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  )
}

export default ConversationListItem
