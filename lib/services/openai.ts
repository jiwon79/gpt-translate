import { ChatCompletionResponseMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";
import type { ChatCompletionRequestMessage } from "openai";

export class ChatGPTService {
  private static instance: ChatGPTService;
  private openai: OpenAIApi;

  private constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  public static getInstance() {
    if (!ChatGPTService.instance) {
      ChatGPTService.instance = new ChatGPTService();
    }
    return ChatGPTService.instance;
  }

  public async createChatCompletion(
    messages: ChatCompletionRequestMessage[],
    temperature: number,
  ) {
    try {
      return await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: temperature,
        messages,
      });
    } catch (error) {
      return null;
    }
  }
}
