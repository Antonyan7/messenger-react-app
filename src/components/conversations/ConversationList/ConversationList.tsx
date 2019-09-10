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
    axios.get('https://randomuser.me/api/?results=20').then(response => {
      const conversationsList = response.data.results.map((result: IUsersListResponse) => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text: 'Hello world! This is a long message that needs to be truncated.'
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
        conversations.map(conversation =>
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
