import { GoogleService } from "@/lib/services/google";
import { Language } from "@/lib/utils/constant";

interface IRequest extends Request {
  json: () => Promise<{audio: string, language: Language}>;
}

export async function POST(request: IRequest) {
  const body = await request.json();
  const { audio, language } = body;
  const googleService = GoogleService.getInstance();

  const transcription = await googleService.recognize(audio, language);

  return new Response(JSON.stringify({
    translate: transcription
  }));
}
