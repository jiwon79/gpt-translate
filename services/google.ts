import { GoogleAuth } from "google-auth-library";
import { SpeechClient } from "@google-cloud/speech";
import { google as googleSpeech } from "@google-cloud/speech/build/protos/protos";
import AudioEncoding = googleSpeech.cloud.speech.v1.RecognitionConfig.AudioEncoding;

export class GoogleService {
  private static instance: GoogleService;
  private readonly auth: GoogleAuth;
  private speechClient: SpeechClient;

  constructor() {
    this.auth = new GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
      },
    });

    this.speechClient = new SpeechClient({auth: this.auth});
  }

  public static getInstance(): GoogleService {
    if (!GoogleService.instance) {
      GoogleService.instance = new GoogleService();
    }

    return GoogleService.instance;
  }

  /// param: audioBase64(base64): string
  public recognize = async (audioBase64: string): Promise<string> => {
    const audio = {
      content: audioBase64,
    }

    const config = {
      encoding: AudioEncoding.WEBM_OPUS,
      sampleRateHertz: 48000,
      languageCode: 'ko-KR',
    }

    const googleRequest = {
      audio: audio,
      config: config,
    }

    const [response] = await this.speechClient.recognize(googleRequest);
    if (response.results === null || response.results === undefined) return "";
    console.log(response.results);

    return response.results
      .map((result) => {
        if (result.alternatives === null || result.alternatives === undefined) return "";

        return result.alternatives[0].transcript;
      })
      .join('\n');
  }
}
