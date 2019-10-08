import {Config, GlobalidMessagingClient, init} from "globalid-messaging-web-sdk";

const token = localStorage.getItem('token');
export let client: GlobalidMessagingClient;

export async function initSdk(token: any) {
    const config: Config = {
        accessToken: token,
    };

    return init(config);
}

export async function initClient() {
    if (token) {
        client = await initSdk(token)
    }
}
