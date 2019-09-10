/* TODO: Seperate Interfaces to different files */

/* AppContext Types */
export interface IAppContext {
  messages: Array<IAppContextMessage>,
  updateMessages: (value: Array<IAppContextMessage>) => void,
  removeMessageById: (value: number) => void,
}

/* AppContext Provider Types */
export interface IAppContextProvider {
  children: object
}

/* AppContext Message Types */
export interface IAppContextMessage {
  id: number,
  author: string,
  message: string,
  timestamp: number
}

/* Conversations List Types */
export interface IConversations {
  photo: string,
  name: string,
  text: string
}

/* Conversation List Component Props Types */
export interface IConversationsList {
  data: {
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
  cell: string,
  dob: object,
  email: string,
  gender: string,
  id: object,
  location: object,
  login: object,
  name: {
    first: string,
    last: string
  },
  nat: string,
  phone: string,
  picture: {
    large: string
  },
  registered: object
}
