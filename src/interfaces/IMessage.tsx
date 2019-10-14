import {IAppContextMessage} from "./IAppContextMessage";

export interface IMessage {
    data: IAppContextMessage,
    endsSequence: boolean,
    isMine: boolean,
    showTimestamp: boolean,
    startsSequence: boolean
}
