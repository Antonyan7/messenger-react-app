import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {AppContext} from "../../context/AppContext";
import {client} from "../../helpers/initMessengerSdk";
import {Channel, NotificationAction, ServiceNotification} from "globalid-messaging-web-sdk";
import {IAppContextMessage} from "../../interfaces/IAppContextMessage";

function ChannelListener() {
    const {authToken,currentUser} = useContext(AuthContext);
    const {addChannel, addMessage, activeChannelId} = useContext(AppContext);

    useEffect(function () {
      if (authToken) {
        try {
          const token: string = client.subscribe((channel: string, notification: ServiceNotification) => {
            if(notification.sender !== currentUser.gidName) {
              // @ts-ignore
              document.getElementById("conversation-"+notification.payload.channel_id).classList.add("conversation-highlight");
            }
            if (notification.action === NotificationAction.NewChannelCreated) {
              addChannel(notification.payload as Channel);
            }
            if (notification.action === NotificationAction.NewMessage) {
              // @ts-ignore
              if(notification.payload.channel_id === activeChannelId){
                  // @ts-ignore
                  if(currentUser.id !== notification.payload.author) {
                    addMessage(notification.payload as IAppContextMessage);
                  }
              }
            }
          });
          localStorage.setItem('sdkClientToken', token);
        } catch (e) {
          window.top.location.href = '/preview';
          localStorage.clear();
        }
      }
      return function cleanup() {
        client.unsubscribe(localStorage.getItem('sdkClientToken') as string)
      };
    });
    return (
        <React.Fragment />
    );
}

export default ChannelListener;
