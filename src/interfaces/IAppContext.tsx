import {IAppContextMessage} from "./IAppContextMessage";
import {IConversations} from "./IConversations";
import {Channel, ChannelType, Message} from "globalid-messaging-web-sdk/dist";

export interface IAppContext {
    messages: Array<IAppContextMessage>,
    activeChannelId: string,
    addMessage: (singleMessage: IAppContextMessage) => void,
    updateMessages: (value: Array<IAppContextMessage>) => void,
    removeMessageById: (value: string) => void,
    channels: Array<Channel>,
    addChannels: (channelsList: Array<Channel>) => void,
    addChannel: (singleChannel: Channel) => void,
    updateActiveChannelId: (id: string) => void,
    filteredChannels: Array<Channel>,
    updateFilteredChannels: (channelsList: Array<Channel>) => void,
    activeChannelName?: string,
    updateActiveChannelName: (channelName?: string) => void
}
