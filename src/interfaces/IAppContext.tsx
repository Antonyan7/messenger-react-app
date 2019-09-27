import {IAppContextMessage} from "./IAppContextMessage";
import {IConversations} from "./IConversations";

export interface IAppContext {
    messages: Array<IAppContextMessage>,
    activeChannelId: string,
    addMessage: (singleMessage: IAppContextMessage) => void,
    updateMessages: (value: Array<IAppContextMessage>) => void,
    removeMessageById: (value: string) => void,
    channels: Array<IConversations>,
    addChannels: (channelsList: Array<IConversations>) => void,
    addChannel: (singleChannel: IConversations) => void,
    updateActiveChannelId: (id: string) => void,
    filteredChannels: Array<IConversations>,
    updateFilteredChannels: (channelsList: Array<IConversations>) => void,
    activeChannelName: string,
    updateActiveChannelName: (channelName: string) => void,
}