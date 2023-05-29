import { GoogleService } from "@/services/google";

interface IRequest extends Request {
  json: () => Promise<{text: string}>;
}

export async function POST(request: IRequest) {
  const body = await request.json();
  const text = body.text;
  const googleService = GoogleService.getInstance();

  const audioContent = await googleService.textToSpeech(text);

  return new Response(JSON.stringify({
    audioContent: audioContent,
  }));
}
