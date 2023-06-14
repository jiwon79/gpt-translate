import { GoogleAuth } from "google-auth-library";
import { SpeechClient } from "@google-cloud/speech";
import { google as googleSpeech } from "@google-cloud/speech/build/protos/protos";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { google as googleText } from "@google-cloud/text-to-speech/build/protos/protos";
import { v2 as googleTranslate } from "@google-cloud/translate";
import SpeechAudioEncoding = googleSpeech.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import SsmlVoiceGender = googleText.cloud.texttospeech.v1.SsmlVoiceGender;
import TextAudioEncoding = googleText.cloud.texttospeech.v1.AudioEncoding;
import { Language } from "@/lib/utils/constant";

export class GoogleService {
  private static instance: GoogleService;
  private speechClient: SpeechClient;
  private textClient: TextToSpeechClient;
  private translateClient: googleTranslate.Translate;

  constructor() {
    const speechAuth = new GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
      },
    });

    const textAuth = new GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
      },
    });

    const translateAuthClient = {
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
      };

    this.translateClient = new googleTranslate.Translate({credentials: translateAuthClient});
    this.speechClient = new SpeechClient({auth: speechAuth});
    this.textClient = new TextToSpeechClient({auth: textAuth});
  }

  public static getInstance(): GoogleService {
    if (!GoogleService.instance) {
      GoogleService.instance = new GoogleService();
    }

    return GoogleService.instance;
  }

  /// param: audioBase64(base64): string
  public recognize = async (audioBase64: string, language: Language): Promise<string> => {
    const audio = {
      content: audioBase64,
    }

    const languageCode = language === Language.KO ? 'ko-KR' : 'en-US';

    const config = {
      encoding: SpeechAudioEncoding.WEBM_OPUS,
      sampleRateHertz: 48000,
      languageCode: languageCode,
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

  public textToSpeech = async (text: string) => {
    const request = {
      input: {text: text},
      voice: {languageCode: 'en-US', ssmlGender: SsmlVoiceGender.NEUTRAL},
      audioConfig: {audioEncoding: TextAudioEncoding.MP3},
    };

    const [response] = await this.textClient.synthesizeSpeech(request);

    return response.audioContent;
  }

  public translate = async (text: string, target: string) => {
    const [translations] = await this.translateClient.translate(text, target);
    const translationsArray = Array.isArray(translations) ? translations : [translations];

    return translationsArray.join(' ');
  }
}
