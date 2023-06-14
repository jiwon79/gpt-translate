import { GoogleService } from "@/lib/services/google";
import { Language } from "@/lib/utils/constant";

interface IRequest extends Request {
  json: () => Promise<{text: string, language: Language}>;
}

export async function POST(request: IRequest) {
  const body = await request.json();
  const { text, language } = body;
  const googleService = GoogleService.getInstance();

  const audioContent = await googleService.textToSpeech(text, language);

  return new Response(JSON.stringify({
    audioContent: audioContent,
  }));
}
