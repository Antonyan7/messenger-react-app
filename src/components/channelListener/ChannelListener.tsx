import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {AppContext} from "../../context/AppContext";
import {client} from "../../helpers/initMessengerSdk";
import {Channel, ServiceNotification} from "globalid-messaging-web-sdk/dist";
import {IAppContextMessage} from "../../interfaces/IAppContextMessage";
import {MessageContext} from "../../context/MessageContext";

function ChannelListener() {
    const {authToken,updateCurrentUser} = useContext(AuthContext);
    const {addChannel, addMessage} = useContext(AppContext);
    const {updateMessage} = useContext(MessageContext);

    if(authToken){
        const token: string = client.subscribe((channel: string, notification: ServiceNotification) => {
            console.log('Channel alias', channel);
            console.log('Notification payload', notification);
            if(notification.action == "NEW_CHANNEL_CREATED") {
                addChannel(notification.payload as Channel);
            }
            if(notification.action == "NEW_MESSAGE_RECEIVED") {
                console.log(notification.payload);
                addMessage(notification.payload as IAppContextMessage);
                updateMessage("");
            }
        });
    }
    return (
        <div></div>
    );
};

export default ChannelListener;

