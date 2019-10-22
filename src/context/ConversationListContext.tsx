import React, {useState} from 'react'
import {IConversationListContext} from "../interfaces/IConversationListContext";
import {IConversationListContextProvider} from "../interfaces/IConversationListContextProvider";

export const ConversationListContext = React.createContext<IConversationListContext>({} as IConversationListContext);

const ConversationListContextProvider = (props: IConversationListContextProvider) => {
    const [isUsersListOpened, setIsUsersListOpened] = useState<boolean>(false);
    const [searchedChannels, setSearchedChannels] = useState<Array<object>>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const updateIsUsersListOpened = (state: boolean) => { setIsUsersListOpened(state) };
    const updateSearchedChannels = (channels: Array<object>) => { setSearchedChannels(channels) };
    const updateIsSearching = (state: boolean) => { setIsSearching(state) };

    return (
        <ConversationListContext.Provider value={{isUsersListOpened, updateIsUsersListOpened, searchedChannels, updateSearchedChannels, isSearching, updateIsSearching}}>
            {props.children}
        </ConversationListContext.Provider>
    )
};

export default ConversationListContextProvider
