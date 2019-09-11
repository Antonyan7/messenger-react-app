import React, {useState} from 'react'
import {IAppContext, IAppContextProvider, IAppContextMessage, IConversations} from '../interfaces/interfaces';

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

const AppContextProvider = (props: IAppContextProvider) => {
    const [messages, setMessages] = useState<Array<IAppContextMessage>>([
    ]);
    const [channels, setChannels] = useState<Array<IConversations>>([]);


    const addMessage = (singleMessage: IAppContextMessage) => {
        setMessages([...messages, singleMessage])
    };

    const updateMessages = (messagesList: Array<IAppContextMessage>) => {
        setMessages(messagesList)
    };

    const removeMessageById = (id: number) => {
        setMessages(messages.filter((message: IAppContextMessage) => message.id !== id))
    };

    const addChannels = (channelsList: Array<IConversations>) => {
        setChannels(channelsList)
    };

    const addChannel = (singleChannel: IConversations) => {
        setChannels([...channels, singleChannel])
    };

    return (
        <AppContext.Provider value={{messages, addMessage, updateMessages, removeMessageById, channels, addChannels, addChannel}}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider
