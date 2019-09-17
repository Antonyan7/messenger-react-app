import React, {useState} from 'react'
import {IMessageContext, IMessageContextProvider} from "../interfaces/interfaces";

export const MessageContext = React.createContext<IMessageContext>({} as IMessageContext);

const MessageContextProvider = (props: IMessageContextProvider) => {
    const [message, setMessage] = useState<string>("");

    const updateMessage = (newMessage: string) => {
        setMessage(newMessage);
    };

    return (
        <MessageContext.Provider value={{message, updateMessage}}>
            {props.children}
        </MessageContext.Provider>
    )
};

export default MessageContextProvider
