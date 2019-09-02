import React, {useEffect, useContext} from 'react'
import shave from 'shave'

import './ConversationListItem.css'
import {AppContext} from '../../../context/AppContext'
import {IAppContextMessage, IConversations, IConversationsList} from "../../../interfaces/interfaces";

function ConversationListItem(props: IConversationsList) {
    const {updateMessages} = useContext(AppContext);
    useEffect(() => {
        shave('.conversation-snippet', 20)
    }, []);

    const {photo, name, text}: IConversations = props.data;

    const getUserMessages = (e: React.MouseEvent) => {
        e.preventDefault();
        const messages: Array<IAppContextMessage> = [
            {
                id: 1,
                message: name + text,
                author: name,
                timestamp: new Date().getTime()
            },
        ];
        updateMessages(messages)
    };

    return (
        <div className="conversation-list-item" onClick={getUserMessages}>
            <img className="conversation-photo" src={photo} alt="conversation"/>
            <div className="conversation-info">
                <h1 className="conversation-title">{name}</h1>
                <p className="conversation-snippet">{text}</p>
            </div>
        </div>
    )
}

export default ConversationListItem
