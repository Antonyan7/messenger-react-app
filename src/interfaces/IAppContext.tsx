import {IAppContextMessage} from "./IAppContextMessage";
import {Channel} from "globalid-messaging-web-sdk";

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
  activeChannelUuid: string,
  updateActiveChannelName: (channelName?: string) => void
  updateActiveChannelUuid: (uuid: string) => void
  updateChannelData: (createdChannel: Channel, id: string) => void
}
