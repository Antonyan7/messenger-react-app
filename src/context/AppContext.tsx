import React, {useState} from 'react'
import {IAppContext} from "../interfaces/IAppContext";
import {IAppContextProvider} from "../interfaces/IAppContextProvider";
import {IAppContextMessage} from "../interfaces/IAppContextMessage";
import {IConversations} from "../interfaces/IConversations";
import {Channel} from "globalid-messaging-web-sdk/dist";

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

const AppContextProvider = (props: IAppContextProvider) => {
    const [messages, setMessages] = useState<Array<IAppContextMessage>>([]);
    const [channels, setChannels] = useState<Array<Channel>>([]);
    const [filteredChannels, setFilteredChannels] = useState<Array<Channel>>( []);
    const [activeChannelId, setActiveChannelId] = useState<string>("0");
    const [activeChannelName, setActiveChannelName] = useState<string>("");

    const addMessage = (singleMessage: IAppContextMessage) => {
        setMessages([...messages, singleMessage])
    };

    const updateMessages = (messagesList: Array<IAppContextMessage>) => {
        setMessages(messagesList)
    };

    const removeMessageById = (id: string) => {
        setMessages(messages.filter((message: IAppContextMessage) => message.id !== id))
    };

    const addChannels = (channelsList: Array<Channel>) => {
        setChannels(channelsList)
    };

    const addChannel = (singleChannel: Channel) => {
        setChannels([singleChannel, ...channels]);
        setFilteredChannels([singleChannel, ...filteredChannels]);
    };

    const updateActiveChannelId = (id: string) => {
        setActiveChannelId(id);
    };

    const updateFilteredChannels = (channelsList: Array<Channel>) => {
        setFilteredChannels(channelsList);
    };

    const updateActiveChannelName = (channelName: any) => {
        setActiveChannelName(channelName);
    };

    return (
        <AppContext.Provider value={{messages, addMessage, updateMessages, removeMessageById, channels, addChannels, addChannel, activeChannelId, updateActiveChannelId, filteredChannels, updateFilteredChannels, activeChannelName, updateActiveChannelName}}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider
