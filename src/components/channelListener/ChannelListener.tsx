import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {AppContext} from "../../context/AppContext";
import {client} from "../../helpers/initMessengerSdk";
import {Channel, ServiceNotification} from "globalid-messaging-web-sdk/dist";

function ChannelListener() {
    const {authToken,updateCurrentUser} = useContext(AuthContext);
    const {addChannel} = useContext(AppContext);


    if(authToken){
        const token: string = client.subscribe((channel: string, notification: ServiceNotification) => {
            console.log('Channel alias', channel);
            console.log('Notification payload', notification);
            if(notification.action == "NEW_CHANNEL_CREATED") {
                addChannel(notification.payload as Channel);
            }
        });
    }
    return (
        <div></div>
    );
};

export default ChannelListener;

