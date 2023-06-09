import request, { BasicResponse } from "./index";
import Message from "@/app/model/Message";

interface ChatResponse extends BasicResponse {
  message: Message,
  totalTokens: number,
}

const chatAPI = {
  chat: async (messages: Message[]): Promise<ChatResponse> => request.post(`/api/chat`,
    {messages: messages.map((message) => message.toChatCompletionRequestMessage()), temperature: 0.1},
  ),
}

export default chatAPI;
