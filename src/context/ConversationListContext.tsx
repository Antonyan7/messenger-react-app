import React, {useState} from 'react'
import {IConversationListContext} from "../interfaces/IConversationListContext";
import {IConversationListContextProvider} from "../interfaces/IConversationListContextProvider";

export const ConversationListContext = React.createContext<IConversationListContext>({} as IConversationListContext);

const ConversationListContextProvider = (props: IConversationListContextProvider) => {
    const [isUsersListOpened, setIsUsersListOpened] = useState<boolean>(false);

    const updateIsUsersListOpened = (state: boolean) => { setIsUsersListOpened(state) };

    return (
        <ConversationListContext.Provider value={{isUsersListOpened, updateIsUsersListOpened}}>
            {props.children}
        </ConversationListContext.Provider>
    )
};

export default ConversationListContextProvider
