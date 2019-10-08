import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {AppContext} from "../../context/AppContext";
import {client} from "../../helpers/initMessengerSdk";
import {Channel, ServiceNotification} from "globalid-messaging-web-sdk";
import {IAppContextMessage} from "../../interfaces/IAppContextMessage";
import {MessageContext} from "../../context/MessageContext";

function ChannelListener() {
    const {authToken} = useContext(AuthContext);
    const {addChannel, addMessage} = useContext(AppContext);
    const {updateMessage} = useContext(MessageContext);

    if(authToken){
        try {
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
            localStorage.setItem('sdkClientToken', token);
        }
        catch (e) {
            console.log(e);
            window.top.location.href = '/preview';
            localStorage.clear();
            console.log(e);
        }
    }
    return (
        <div></div>
    );
};

export default ChannelListener;

