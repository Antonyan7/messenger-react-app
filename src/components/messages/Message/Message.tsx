import React, {useContext} from 'react'
import moment from 'moment'
import './Message.css'
import {AppContext} from '../../../context/AppContext'
import {IMessage} from "../../../interfaces/IMessage";

const Message = (props: IMessage) => {
  const {removeMessageById} = useContext(AppContext);
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
  } = props;

  const friendlyTimestamp = moment(data.timestamp).format('LLLL');

  return (

    <div onClick={() => removeMessageById(data.id)} className={[
      'message',
      `${isMine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
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
