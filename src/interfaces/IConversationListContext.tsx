export interface IConversationListContext {
    isUsersListOpened: boolean,
    updateIsUsersListOpened: (state: boolean) => void,
    searchedChannels: Array<object>,
    updateSearchedChannels: (channels: Array<object>) => void,
    isSearching: boolean,
    updateIsSearching: (state: boolean) => void
    isLoading: boolean,
    updateIsLoading: (state: boolean) => void
}
