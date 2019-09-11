import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../../layouts/Toolbar';
import ToolbarButton from '../../layouts/ToolbarButton';
import axios from 'axios';
import {IConversations, IUsersListResponse} from "../../../interfaces/interfaces";

import './ConversationList.css';

function ConversationList() {
  const [conversations, setConversations] = useState<Array<IConversations>>(
    []
  );

  const getConversations = () => {
    const config = {
      headers: {'Authorization': "bearer " + process.env.REACT_APP_AUTH_TOKEN}
    };

    axios.get('https://dev-api.gidstaging.net/v1/channels', config).then(response => {
      const conversationsList = response.data.data.channels.map((result: IUsersListResponse) => {
        return {
          photo: result.image_url,
          name: result.title,
          text: result.description
        };
      });
      setConversations(conversationsList)
    });
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog"/>
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline"/>
        ]}
      />
      <ConversationSearch/>
      {
        conversations.map((conversation: IConversations) =>
          <ConversationListItem
            key={conversation.name}
            data={conversation}
          />
        )
      }
    </div>
  );
}

export default ConversationList;
