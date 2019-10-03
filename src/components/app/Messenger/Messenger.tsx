import React from 'react';
import ConversationList from '../../conversations/ConversationList';
import MessageList from '../../messages/MessageList';
import './Messenger.css';
import Header from "../Header";
import ConversationListContextProvider from "../../../context/ConversationListContext";

function Messenger() {
    return (
        <div>
            <ConversationListContextProvider>
                <Header/>
                <div className="messenger">
                    <div className="scrollable sidebar">
                        <ConversationList/>
                    </div>

                    <div className="scrollable content">
                        <MessageList/>
                    </div>
                </div>
            </ConversationListContextProvider>
        </div>
    );
};

export default Messenger;
