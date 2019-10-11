import React from 'react'
import moment from 'moment'
import './Message.css'
import {IMessage} from "../../../interfaces/IMessage";

const Message = (props: IMessage) => {
    const {
        data,
        isMine,
        startsSequence,
        endsSequence,
        showTimestamp,
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');

    return (
        <div className={[
            'message',
            `${startsSequence ? 'start' : ''}`,
            `${isMine ? 'mine' : ''}`,
            `${endsSequence ? 'end' : ''}`,
        ].join(' ')}>
            {
                showTimestamp &&
                <div className="timestamp">
                    {friendlyTimestamp}
                </div>
            }

            <div className="bubble-container">
                <div className="bubble" title={friendlyTimestamp}>
                    {JSON.parse(data.content).text}
                </div>
            </div>
        </div>
    )
};

export default Message
