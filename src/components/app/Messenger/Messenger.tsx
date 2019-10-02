import React from 'react';
import ConversationList from '../../conversations/ConversationList';
import MessageList from '../../messages/MessageList';
import './Messenger.css';
import Header from "../Header";

function Messenger() {
  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList/>
      </div>

      <div className="scrollable content">
        <MessageList/>
      </div>
    </div>
  );
};

export default Messenger;
