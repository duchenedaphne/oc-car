
import { MessageType } from "../interfaces/message-type";

export interface ChatMessage {

    content: string;
    sender: string;
    type: MessageType;
}
