import React, {useEffect, useContext} from 'react'
import shave from 'shave'
import axios from "axios"

import './ConversationListItem.css'
import {AppContext} from '../../../context/AppContext'
import {
  IConversations,
  IConversationsList,
} from "../../../interfaces/interfaces"

import PubNub from 'pubnub';

const pubnub = new PubNub({
  // subscribeKey: "sub-c-c7c006a6-9270-11e9-8277-da7aa9a31542",
  subscribeKey: "sub-c-c7c006a6-9270-11e9-8277-da7aa9a31542",
});
pubnub.addListener({
  status: function(statusEvent) {
    console.log(statusEvent)
  },
  message: function(message) {
    console.log(message)
  },
  presence: function(presenceEvent) {
    console.log(presenceEvent);
  }
});

pubnub.subscribe({
  channels: ["3408","3409","3767","3771"],
});

// pubnub.publish(
//     {
//       message: {
//         uuid: "66306f66-fdb9-4d89-98e0-203a8de382b2",
//         type: "TEXT",
//         content: "{\"text\":\"asd\"}"
//       },
//       channel: '3767',
//       sendByPost: true, // true to send via post
//       storeInHistory: true, //override default storage options
//       meta: {
//         "cool": "meta"
//       }   // publish extra meta with the request
//     },
//     function (status, response) {
//       if (status.error) {
//         // handle error
//         console.log(status)
//       } else {
//         console.log("message Published w/ timetoken", response.timetoken)
//       }
//     }
// );

// pubnub.hereNow({
//   channels: []
// }, function (status, response){
//   console.log(status);
//   console.log(response);
// });

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
