import {
  ChatCompletionResponseMessage,
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum
} from "openai";

export enum ViewMessageRoleEnum {
  ViewSystem = "view-system",
}

export type MessageRole = ChatCompletionRequestMessageRoleEnum | ViewMessageRoleEnum;

interface ExtendedObject {
  role: MessageRole;
  content: string;
}

class Message {
  role: MessageRole;
  content: string;

  constructor(role: MessageRole, content: string) {
    this.role = role;
    this.content = content;
  }

  toChatCompletionRequestMessage(): ChatCompletionRequestMessage {
    if (this.role === ViewMessageRoleEnum.ViewSystem) {
      return {role: ChatCompletionRequestMessageRoleEnum.System, content: this.content};
    }

    return {role: this.role, content: this.content}
  }

  static fromObject(obj: ExtendedObject): Message {
    return new Message(obj.role, obj.content);
  }

  static fromChatCompletionRequestMessage(message: ChatCompletionRequestMessage): Message {
    return new Message(message.role, message.content);
  }

  static fromChatCompletionResponseMessage(message: ChatCompletionResponseMessage): Message {
    return new Message(message.role, message.content);
  }
}

export default Message;
