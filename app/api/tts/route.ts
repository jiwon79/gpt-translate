import { GoogleService } from "@/services/google";

export async function POST(request: Request) {
  const body = await request.json();
  const text = body.text;
  const googleService = GoogleService.getInstance();

  const audioContent = await googleService.textToSpeech(text);

  return new Response(JSON.stringify({
    audioContent: audioContent,
  }));
}
