import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {AppContext} from "../../context/AppContext";
import {client} from "../../helpers/initMessengerSdk";
import {Channel, NotificationAction, ServiceNotification} from "globalid-messaging-web-sdk";
import {IAppContextMessage} from "../../interfaces/IAppContextMessage";

function ChannelListener() {
    const {authToken} = useContext(AuthContext);
    const {addChannel, addMessage} = useContext(AppContext);

    if (authToken) {
        try {
            const token: string = client.subscribe((channel: string, notification: ServiceNotification) => {
                if (notification.action === NotificationAction.NewChannelCreated) {
                    addChannel(notification.payload as Channel);
                }
                if (notification.action === NotificationAction.NewMessage) {
                    addMessage(notification.payload as IAppContextMessage);
                }
            });
            localStorage.setItem('sdkClientToken', token);
        } catch (e) {
            window.top.location.href = '/preview';
            localStorage.clear();
        }
    }
    return (
        <div />
    );
}

export default ChannelListener;
