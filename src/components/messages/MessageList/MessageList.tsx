import React, {useContext} from 'react';
import Compose from '../Compose';
import Message from '../Message';
import moment from 'moment';
import {AppContext} from '../../../context/AppContext';
import {AuthContext} from "../../../context/AuthContext";
import SendIcon from "../../../assets/icons/SendIcon";
import './MessageList.css';

function MessageList() {
    const {messages, activeChannelName} = useContext(AppContext);
    const {currentUser} = useContext(AuthContext);

    const renderMessages = () => {
        let i = 0;
        let messageCount = messages.length;
        let messagesList = [];

        while (i < messageCount) {
            let previous = messages[i - 1];
            let current = messages[i];
            let next = messages[i + 1];
            let isMine = current.author === currentUser.id;
            let currentMoment = moment(current.timestamp);
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;

            if (previous) {
                let previousMoment = moment(previous.timestamp);
                let previousDuration = moment.duration(currentMoment.diff(previousMoment));
                prevBySameAuthor = previous.author === current.author;

                if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                    startsSequence = false;
                }

                if (previousDuration.as('hours') < 1) {
                    showTimestamp = false;
                }
            }

            if (next) {
                let nextMoment = moment(next.timestamp);
                let nextDuration = moment.duration(nextMoment.diff(currentMoment));
                nextBySameAuthor = next.author === current.author;

                if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                    endsSequence = false;
                }
            }

            messagesList.push(
                <Message
                    key={i}
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    data={current}
                />
            );

            i += 1;
        }
        return messagesList;
    };

    return (
        <div className="message-list">
            <div className="message-list-container">
                <div className="messages">
                    {activeChannelName ? renderMessages() : ""}
                </div>
            </div>

            <Compose rightItems={[
                <SendIcon key="sendIcon"/>
            ]}/>
        </div>
    );
}

export default MessageList;
