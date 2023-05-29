import { GoogleService } from "@/lib/services/google";

interface IRequest extends Request {
  json: () => Promise<{audio: string}>;
}

export async function POST(request: IRequest) {
  const body = await request.json();
  const audio = body.audio;
  const googleService = GoogleService.getInstance();

  const transcription = await googleService.recognize(audio);

  return new Response(JSON.stringify({
    translate: transcription
  }));
}
