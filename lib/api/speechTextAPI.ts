import request, { BasicResponse } from "./index";
import { Language } from "@/lib/utils/constant";

interface STTResponse extends BasicResponse {
  translate: string;
}

interface TTSResponse extends BasicResponse {
  audioContent: {
    type: string;
    data: number[];
  };
}

interface TranslateResponse extends BasicResponse {
  result: string;
}

const speechTextAPI = {
  stt: async (audio: string, language: Language): Promise<STTResponse> => request.post(`/api/stt`,
    {audio: audio, language: language},
    {'Content-Type': 'application/pdf'},
  ),
  tts: async (text: string, language: Language): Promise<TTSResponse> => request.post(`/api/tts`,
    {text: text, language: language},
  ),
  translate: async (text: string, lang: string): Promise<TranslateResponse> => request.post(`/api/translate`,
    {text: text, target: lang},
  ),
}

export default speechTextAPI;
