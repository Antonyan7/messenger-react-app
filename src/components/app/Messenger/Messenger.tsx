import React from 'react';
import ConversationList from '../../conversations/ConversationList';
import MessageList from '../../messages/MessageList';
import './Messenger.css';
import ConversationListContextProvider from "../../../context/ConversationListContext";

function Messenger() {
    return (
        <React.Fragment>
            <ConversationListContextProvider>
                <div className="messenger">
                    <div className="sidebar">
                        <ConversationList/>
                    </div>
                    <div className="content">
                        <MessageList/>
                    </div>
                </div>
            </ConversationListContextProvider>
        </React.Fragment>
    );
}

export default Messenger;
