import { SpeechClient } from "@google-cloud/speech";
import { google } from "googleapis";
import { google as googleSpeech } from "@google-cloud/speech/build/protos/protos";
import AudioEncoding = googleSpeech.cloud.speech.v1.RecognitionConfig.AudioEncoding;

export async function POST(request: Request) {
  console.log("POST")
  console.log(process.env.GOOGLE_PRIVATE_KEY)
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
    },
  });

  const client = new SpeechClient({
    auth: auth,
  });

  const audio = {
    uri: 'gs://audio-gpt/audio (5).wav',
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

  const [response] = await client.recognize(googleRequest);
  if (response.results === null || response.results === undefined) return;
  console.log(response.results);

  const transcription = response.results
    .map(result => {
      // @ts-ignore
      return result.alternatives[0].transcript;
    })
    .join('\n');
  console.log(`Transcription: ${transcription}`);

  return new Response(transcription);
}
