import {client} from '../helpers/initMessengerSdk'
import {ServiceNotification} from 'globalid-messaging-web-sdk'

client.subscribe((channel: string, notification: ServiceNotification) => {
    console.log('Channel alias', channel);
    console.log('Notification payload', notification);
});
