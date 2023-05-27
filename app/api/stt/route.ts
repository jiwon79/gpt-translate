import { GoogleService } from "@/services/google";

export async function POST(request: Request) {
  const body = await request.json();
  const audioBase64 = body.audio;
  const googleService = GoogleService.getInstance();

  const transcription = await googleService.recognize(audioBase64);
  console.log(transcription);

  return new Response(JSON.stringify({
    translate: transcription
  }));
}
