import { GoogleAuth } from "google-auth-library";
import { SpeechClient } from "@google-cloud/speech";
import { google as googleSpeech } from "@google-cloud/speech/build/protos/protos";
import SpeechAudioEncoding = googleSpeech.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { google as googleText } from "@google-cloud/text-to-speech/build/protos/protos";
import SsmlVoiceGender = googleText.cloud.texttospeech.v1.SsmlVoiceGender;
import TextAudioEncoding = googleText.cloud.texttospeech.v1.AudioEncoding;

export class GoogleService {
  private static instance: GoogleService;
  private readonly auth: GoogleAuth;
  private speechClient: SpeechClient;
  private textClient: TextToSpeechClient;

  constructor() {
    this.auth = new GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
      },
    });

    this.speechClient = new SpeechClient({auth: this.auth});
    this.textClient = new TextToSpeechClient({auth: this.auth});
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
      encoding: SpeechAudioEncoding.WEBM_OPUS,
      sampleRateHertz: 48000,
      languageCode: 'ko-KR',
    }

    const googleRequest = {
      audio: audio,
      config: config,
    }

    const [response] = await this.speechClient.recognize(googleRequest);
    if (response.results === null || response.results === undefined) return "";

    return response.results
      .map((result) => {
        if (result.alternatives === null || result.alternatives === undefined) return "";

        return result.alternatives[0].transcript;
      })
      .join('\n');
  }

  public textToSpeech = async (text: string) =>  {
      const request = {
        input: {text: text},
        voice: {languageCode: 'en-US', ssmlGender: SsmlVoiceGender.NEUTRAL},
        audioConfig: {audioEncoding: TextAudioEncoding.MP3},
      };

      const [response] = await this.textClient.synthesizeSpeech(request);

      return response.audioContent;
  }
}
