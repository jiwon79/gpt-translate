import { ChatCompletionRequestMessage } from "openai";
import { ChatGPTService } from "@/lib/services/openai";
import Message from "@/lib/model/Message";

interface IRequest extends Request {
  json: () => Promise<{
    messages: ChatCompletionRequestMessage[];
    temperature: number | null;
  }>;
}

export async function POST(request: IRequest) {
  const body = await request.json();
  const messages = body.messages;

  const service = ChatGPTService.getInstance();
  const completion = await service.createChatCompletion(messages, body.temperature ?? 0.85);
  const message = completion?.data?.choices[0].message
    ?? {"role": "assistant", "content": ""};
  const responseMessage = Message.fromChatCompletionResponseMessage(message);
  console.log(responseMessage);

  return new Response(JSON.stringify({
    message: responseMessage,
    totalTokens: completion?.data.usage?.total_tokens ?? 3000,
  }));
}
