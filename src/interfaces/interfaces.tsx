/* TODO: Seperate Interfaces to different files */

/* AppContext Types */
export interface IAppContext {
    messages: Array<IAppContextMessage>,
    activeChannelId: number,
    addMessage: (singleMessage: IAppContextMessage) => void,
    updateMessages: (value: Array<IAppContextMessage>) => void,
    removeMessageById: (value: number) => void,
    channels: Array<IConversations>,
    addChannels: (channelsList: Array<IConversations>) => void,
    addChannel: (singleChannel: IConversations) => void,
    updateActiveChannelId: (id: number) => void,
}

export interface IMessageContext {
    message: string,
    updateMessage: (newMessage: string) => void,
}

export interface IMessageContextProvider {
    children: object
}

/* AppContext Provider Types */
export interface IAppContextProvider {
    children: object
}

/* AppContext Message Types */
export interface IAppContextMessage {
    id: number,
    author: string,
    content: string,
    timestamp: string
}

/* Conversations List Types */
export interface IConversations {
    id: number,
    photo: string,
    name: string,
    text: string
}

/* Conversation List Component Props Types */
export interface IConversationsList {
    data: {
        id: number,
        photo: string,
        name: string,
        text: string
    },
    key: string
}

/* Compose Component Props Types */
export interface ICompose {
    rightItems: object
}

/* Single Message Component Props Types */
export interface IMessage {
    data: IAppContextMessage,
    endsSequence: boolean,
    isMine: boolean,
    showTimestamp: boolean,
    startsSequence: boolean
}

/* Toolbar Component Props Interface */
export interface IToolbar {
    leftItems?: Array<object>,
    rightItems?: Array<object>,
    title: string
}

/* ToolbarButton Component Props Interface */
export interface IToolbarButton {
    icon: string
}

export interface IUsersListResponse {
    alias: any
    created_at: any
    created_by: any
    deleted: any
    description: any
    exposed: any
    id: any
    image_url: any
    participants: any
    title: any
    type: any
    unread_count: any
    updated_at: any
    updated_by: any
    uuid: any
}
